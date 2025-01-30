import express from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import {
    getRoom, createRoom,
    getComputer, createComputer, getRoomComputer,
    getComponentCondition, createComponentCondition,
    getNonConsumableComponent, createNonConsumableComponent,
    getReport, createReport, getReportCount, getArchivedReport, selectedReportAll,
    getBuilding, createBuilding, getConsumableComponent,
    getAdmin, createAdmin, verifyAdminId,
    updateRoom, updateNonConsumableComponent
} from './be_comlab.js';

const app = express();

app.use(express.json());
app.use(cors());

// AUTHENTICATION LIBRARY
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET_KEY || 'default',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true },
}));

// MIDDLEWARE
async function checkAdminIdSession(req, res, next) {
    if (!req.session.adminId) {
        return res.status(401).json({ forceLogin: true, error_message: "Unauthorized access, please login." });
    }
    const admins = await verifyAdminId(req.session.adminId);
    if (admins.length === 0) {
        return res.status(500).json({ forceLogin: true, error_message: "Invalid Account, please login again." });
    }
    next();
}

// Function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}

// LOGIN
app.post('/login', async (req, res) => {
    const { adminId, password } = req.body;

    try {
        const admins = await verifyAdminId(adminId);
        if (admins.length === 0) {
            return res.status(401).send("Admin Id not found");
        }
        const adminData = admins[0];

        if (adminData.password !== password) {
            return res.status(401).send("Incorrect Password");
        }

        req.session.adminId = adminData.admin_id;
        res.status(200).send("Login Successful");
    } catch (error) {
        res.status(500).send("There was an error on the server admin verification");
    }
});

// LOGOUT
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.status(500).send("Logout Failed");
        }
        res.clearCookie('connect.sid');
        res.status(200).send("Logged out successfully");
    });
});

// [DASHBOARD RELATED QUERY]
app.get("/dashboard", checkAdminIdSession, async (req, res) => {
    try {
        const rooms = await updateRoom();  // replaced the getRoom() to update room data
        const computers = await getComputer();
        const reports = await getReport();
        const buildings = await getBuilding();
        const pending_report_count = await getReportCount();

        const formatted_report = reports.map(report => ({
            ...report, date_submitted: formatDate(report.date_submitted)
        }));

        const dashboard_dictionary = {
            rooms,
            computers,
            formatted_report,
            buildings,
            pending_report_count
        };

        res.status(200).json(dashboard_dictionary);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching data.");
    }
});

// [LABORATORIES TABLE RELATED QUERY]
app.get("/laboratories", checkAdminIdSession, async (req, res) => {
    const get_room = await getRoom();
    res.send(get_room);
});

// FOR GUESTS / STUDENT
app.get("/guest/laboratories", async (req, res) => {
    const get_room = await getRoom();
    res.send(get_room);
});

app.get("/laboratories/:room_id", checkAdminIdSession, async (req, res) => {
    const room_id = req.params.room_id;
    const get_room = await getRoom(room_id);
    res.send(get_room ? get_room : `Room id: ${room_id} doesn't exist`);
});

app.post("/create/room", checkAdminIdSession, async (req, res) => {
    const { room, building_code } = req.body;

    try {
        // console.log(room, building_code);
        const create_room = await createRoom(room, building_code);
        return res.status(201).send(create_room);
    } catch (error) {
        // probably will not reach this part because the room and building_code are not unique
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).send(`Room '${room}' in building '${building_code}' already exists.`);
        }
        return res.status(500).send("An error occurred while creating the room.");
    }
});

// [COMPUTERS TABLE RELATED QUERY]
app.get("/rooms/all_computers", checkAdminIdSession, async (req, res) => {
    const get_computer = await getComputer();
    res.send(get_computer);
});

app.post("/create/computer", checkAdminIdSession, async (req, res) => {
    const { room, building_code, system_unit, monitor } = req.body;

    try {
        const create_computer = await createComputer(room, building_code, system_unit, monitor);
        const create_component_condition = await createComponentCondition(create_computer.computer_id);
        const location = `${room}${building_code}`;
        const update_non_consumable_component = await updateNonConsumableComponent(location, system_unit, monitor);

        res.status(201).json({
            create_computer,
            create_component_condition,
            update_non_consumable_component
        });
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).send(`System unit tag '${system_unit}' or monitor tag '${monitor}' already in use.`);
        }
        if (error.code === "ER_NO_REFERENCED_ROW_2") {
            return res.status(404).send(`System unit tag '${system_unit}' or monitor tag '${monitor}' doesn't exists.`);
        }
    }
});

app.post("/rooms/computers", checkAdminIdSession, async (req, res) => {
    const { rooms } = req.body;

    if (!Array.isArray(rooms)) {
        return res.status(400).send("Invalid array format.");
    }

    try {
        const results = await Promise.all(
            rooms.map(async ({ roomnum, building_code }) => {
                const roomData = await getRoomComputer(roomnum, building_code);
                return roomData;
            })
        );

        if (results.flat().length === 0) {
            return res.status(404).send("No computers in the given room/s.");
        }

        res.status(200).json(results.flat());
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching room data.");
    }
});

// FOR GUESTS / STUDENT
app.post("/guest/rooms/computers", async (req, res) => {
    const { rooms } = req.body;

    if (!Array.isArray(rooms)) {
        return res.status(400).send("Invalid array format.");
    }

    try {
        const results = await Promise.all(
            rooms.map(async ({ roomnum, building_code }) => {
                const roomData = await getRoomComputer(roomnum, building_code);
                return roomData;
            })
        );

        if (results.flat().length === 0) {
            return res.status(404).send("No computers in the given room/s.");
        }

        res.status(200).json(results.flat());
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching room data.");
    }
});

// [NON-CONSUMABLE-COMPONENT TABLE RELATED QUERY]
app.get("/non_consum_comp", checkAdminIdSession, async (req, res) => {
    const get_non_consumable_component = await getNonConsumableComponent();
    res.send(get_non_consumable_component);
});

app.post("/create/non_consum_comp", checkAdminIdSession, async (req, res) => {
    const { component_id, reference_id, location, specs } = req.body;

    try {
        const create_non_consumable_component = await createNonConsumableComponent(component_id, reference_id, location, specs);
        res.status(201).send(create_non_consumable_component);
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).send(`Component id '${component_id}' already exist`);
        }
        return res.status(400).send(error)
    }
});

// [CONSUMABLE-COMPONENT TABLE RELATED QUERY]
app.get("/consum_comp", checkAdminIdSession, async (req, res) => {
    const get_consumable_component = await getConsumableComponent();
    res.send(get_consumable_component);
});

// [REPORT TABLE RELATED QUERY]
app.get('/report', checkAdminIdSession, async (req, res) => {
    const get_report = await getReport();
    const formatted_report = get_report.map(report => ({
        ...report, date_submitted: formatDate(report.date_submitted)
    }));
    res.send(formatted_report);
});

app.post('/report/selected', checkAdminIdSession, async (req, res) => {
    const { pcIds } = req.body;
    if (!Array.isArray(pcIds)) {
        return res.status(400).send("Invalid array format.");
    }

    const report_count = await selectedReportAll(pcIds);
    res.send({ report_count: report_count });
});

app.get('/archived_report', checkAdminIdSession, async (req, res) => {
    const get_report = await getArchivedReport();
    const formatted_report = get_report.map(report => ({
        ...report, date_submitted: formatDate(report.date_submitted), date_resolve: formatDate(report.date_resolve)
    }));
    res.status(200).send(formatted_report);
});

app.post("/create/report",  async (req, res) => {
    const { pcId, room, building_code, reported_conditions, report_comment, submittee } = req.body;
    //const { mouse, keyboard, software, internet, monitor, other } = req.body.reported_conditions;


    try {
        //get date
        const date = new Date();
        const date_submitted = formatDate(date);
        console.log(date_submitted);

        const create_report = await createReport(room, building_code, pcId, report_comment, date_submitted, submittee, reported_conditions);
        res.status(201).send(create_report);
    } catch (error) {
        if (error.code === "ER_NO_REFERENCED_ROW_2") {
            return res.status(404).send(`Submit report failed. Computer id '${computer_id}' doesn't exists.`);
        }
    }
});

app.get('/report_count/:status', checkAdminIdSession, async (req, res) => {
    const report_status = req.params.status;
    const get_report = await getReportCount(report_status);
    res.send(get_report);
});

// [REFERENCES TABLE RELATED QUERY]
app.get("/building", checkAdminIdSession, async (req, res) => {
    const get_building = await getBuilding();
    res.send(get_building);
});

app.post("/create/building", checkAdminIdSession, async (req, res) => {
    const { building_code, building_name } = req.body;

    try {
        const create_building = await createBuilding(building_code, building_name);
        res.status(201).send(create_building);
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).send(`Building code '${building_code}' already exist`);
        }
    }
});

// [ADMIN RELATED QUERY]
app.get("/admin", checkAdminIdSession, async (req, res) => {
    const get_admin = await getAdmin();
    if (!get_admin || get_admin.length === 0) {
        return res.status(404).send(`Admin empty`);
    }
    res.send(get_admin);
});

app.get("/admin/:id", checkAdminIdSession, async (req, res) => {
    const admin_id = req.params.id;
    const get_admin = await getAdmin(admin_id);
    if (!get_admin) {
        return res.status(404).send(`Admin id: ${admin_id} not found`);
    }
    res.send(get_admin);
});

app.post("/create/admin", checkAdminIdSession, async (req, res) => {
    const { admin_id, password, first_name, last_name } = req.body;

    try {
        const create_admin = await createAdmin(admin_id, password, first_name, last_name);
        res.status(201).send(create_admin);
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).send(`Admin id '${admin_id}' already exist`);
        }
    }
});

// [UPDATE ROOM]
app.get("/update/room", checkAdminIdSession, async (req, res) => {
    try {
        const update_room = await updateRoom();
        res.status(201).send(update_room);
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).send(`Room id '${room_id}' already exist`);
        }
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(process.env.PORT || 8080, () => {
    console.log('Server is running on port 8080 ' + process.env.PORT);
});