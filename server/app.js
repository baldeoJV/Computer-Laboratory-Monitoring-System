import express from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import {
    getRoom, createRoom, updateRoomData, updateRoomName, deleteRoom,
    getComputer, createComputer, getRoomComputer, updateComputer, updateComputerStatus, deleteComputer,
    getNonConsumableComponent, createNonConsumableComponent, deleteNonConsumableComponent,
    updateNonConsumableComponentFlag, updateNonConsumableComponent,
    getReport, createReport, getReportCount, getArchivedReport, selectedReportAll,
    archiveReport,
    getBuilding, createBuilding, getConsumableComponent, updateConsumableComponent,
    getAdmin, createAdmin, verifyAdminId, updatePassword, updateName,
    getAvailableMonitor, getAvailableSystemUnit, getAvailableConsumableComponents,
    resolveComputer, createActivationCode, verifyActivationCode, getActivationCode
} from './be_comlab.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// for encryption
import crypto from 'crypto';
import 'dotenv/config';

const algorithm = 'aes-256-cbc';
const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); // Must be 32 bytes
const iv = Buffer.from(process.env.IV_KEY, 'hex'); // Must be 16 bytes

// Encrypt Function
function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

// Decrypt Function
function decrypt(encryptedText) {
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}

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
    // const adminId = process.env.adminId;
    // const password = process.env.password;
    const encrypted_password = encrypt(password);
    
    try {
        const admins = await verifyAdminId(adminId);
        if (admins.length === 0) {
            return res.status(401).send("Admin Id not found");
        }
        const adminData = admins[0];

        if (adminData.password !== encrypted_password) {
            return res.status(401).send("Incorrect Password");
        }

        req.session.adminId = adminData.admin_id;
        const adminDetails = await getAdmin(adminData.admin_id)
        // console.log(adminDetails);
        
        res.status(200).send(adminDetails);
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
        await updateRoomData(); // update room data
        const rooms = await getRoom();
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
    try {
        await updateRoomData();
        const get_room = await getRoom();
        res.status(200).send(get_room);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching laboratories.");
    }
});

// FOR GUESTS / STUDENT
app.get("/guest/laboratories", async (req, res) => {
    try {
        const get_room = await getRoom();
        res.status(200).send(get_room);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching laboratories.");
    }
});

app.get("/laboratories/:room_id", checkAdminIdSession, async (req, res) => {
    const room_id = req.params.room_id;
    try {
        const get_room = await getRoom(room_id);
        if (get_room) {
            res.status(200).send(get_room);
        } else {
            res.status(404).send(`Room id: ${room_id} doesn't exist`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching the laboratory.");
    }
});

app.post("/create/room", checkAdminIdSession, async (req, res) => {
    const { room, building_code } = req.body;

    try {
        const create_room = await createRoom(room, building_code.toUpperCase());
        return res.status(201).send(create_room);
    } catch (error) {
        // probably will not reach this part because the room and building_code are not unique
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).send(`Room '${room}' in building '${building_code.toUpperCase()}' already exists.`);
        }
        return res.status(500).send("An error occurred while creating the room.");
    }
});

app.post("/delete/room", checkAdminIdSession, async (req, res) => {
    const { room } = req.body;

    try {
        await deleteRoom(room);
        res.status(201).send("Room deleted successfully");
    } catch (error) {
        if(error.code === "ER_ROW_IS_REFERENCED_2"){
            return res.status(409).send(`Room/s still in use.`);
        }
        return res.status(500).send("An error occurred while deleting the room.");
    }
});

// [COMPUTERS TABLE RELATED QUERY]
app.get("/rooms/all_computers", checkAdminIdSession, async (req, res) => {
    try {
        const get_computer = await getComputer();
        res.status(201).send(get_computer);
    } catch (error) {
        res.status(500).send("An error occurred while fetching computers.");
    }
});

app.post("/create/computer", checkAdminIdSession, async (req, res) => {
    const { room, building_code, system_unit, monitor } = req.body;

    try {
        await createComputer(room, building_code.toUpperCase(), system_unit, monitor);
        await updateRoomData();

        res.status(201).send('Created Computer Successfully');
    } catch (error) {
        if (error.message === 'Stock count is 0') {
            return res.status(400).send("Some components are out of stock. Please check the consumable components inventory.");
        }
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).send(`System unit tag '${system_unit}' or monitor tag '${monitor}' already in use.`);
        }
        if (error.code === "ER_NO_REFERENCED_ROW_2") {
            return res.status(404).send("Invalid room or system unit/monitor tag.");
        }

        return res.status(500).send(error);
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
                const roomData = await getRoomComputer(roomnum, building_code.toUpperCase());
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

app.post("/update/computer", checkAdminIdSession, async (req, res) => {
    const { new_monitor, new_system_unit, room, building_code,
        has_mouse, has_keyboard, has_internet, has_software, computer_id } = req.body;

    try {
        await updateComputer(new_monitor, new_system_unit, room, building_code,
            has_mouse, has_keyboard, has_internet, has_software, computer_id);
        res.status(201).send("Successfully updated");
    } catch (error) {
        if (error.message === 'Computer has reports') {
            return res.status(409).send("Computer has reports. Cannot update.");
        }
        if (error.code === "ER_NO_REFERENCED_ROW_2"){
            return res.status(404).send(`Computer id '${computer_id}' doesn't exists.`)
        }
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).send(`System unit tag '${new_system_unit}' or monitor tag '${new_monitor}' already in use.`);
        }
        return res.status(400).send(error);
    }
});

app.post("/update/computer_status", checkAdminIdSession, async (req, res) => {
    const { computer_id, status } = req.body;

    try {
        await updateComputerStatus(computer_id, status);
        res.status(201).send("Successfully updated");
    } catch (error) {
        return res.status(400).send(error);
    }
});

app.post("/delete/computer", checkAdminIdSession, async (req, res) => {
    const { computer_ids } = req.body;

    try {
        await deleteComputer(computer_ids);
        res.status(201).send("Computer deleted successfully");
    } catch (error) {
        console.error(error);
        if (error.code === "ER_ROW_IS_REFERENCED_2") {
            return res.status(409).send(`Computer still in use.`);
        }
        return res.status(500).send(error || error.message);
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
                const roomData = await getRoomComputer(roomnum, building_code.toUpperCase());
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

app.post("/update/non_consum_comp_flag", checkAdminIdSession, async (req, res) => {
    const { component_id, flag } = req.body;
    // flag values: 0 - available, 1 - defective

    try {
        await updateNonConsumableComponentFlag(component_id, flag);
        res.status(201).send("success");
    } catch (error) {
        return res.status(400).send(error);
    }
});

app.post("/delete/non_consum_comp", checkAdminIdSession, async (req, res) => {
    const {component_id}  = req.body;
    try {
        const delete_non_consumable_component = await deleteNonConsumableComponent(component_id);
        res.status(201).send(delete_non_consumable_component);
    } catch (error) {
        console.log(error);
        
        if (error.code === "ER_ROW_IS_REFERENCED_2"){
            return res.status(409).send(`A component is still in use.`);
        }
        return res.status(400).send(error.code||error);
    }
});

// update non consumable component
app.post("/update/non_consum_comp", checkAdminIdSession, async (req, res) => {
    const { old_component_id, new_component_id, location, specs } = req.body;
    
    try {
        await updateNonConsumableComponent(old_component_id, new_component_id, location, specs);
        res.status(201).send("Successfully updated");
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).send(`Component id '${new_component_id}' already exist`);
        }
        return res.status(400).send(error);
    }
});


// [CONSUMABLE-COMPONENT TABLE RELATED QUERY]
app.get("/consum_comp", checkAdminIdSession, async (req, res) => {
    const get_consumable_component = await getConsumableComponent();
    res.send(get_consumable_component);
});

app.get("/available_monitor", checkAdminIdSession, async (req, res) => {
    try {
        const get_available_monitor = await getAvailableMonitor();
        res.status(200).send(get_available_monitor);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching available monitors.");
    }
});

app.get("/available_sysu", checkAdminIdSession, async (req, res) => {
    try {
        const get_available_system_unit = await getAvailableSystemUnit();
        res.status(200).send(get_available_system_unit);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching available system unit.");
    }
});

app.get("/available_consumables", checkAdminIdSession, async (req, res) => {
    try {
        const get_available_consumable_components = await getAvailableConsumableComponents();
        res.status(200).send(get_available_consumable_components);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching available consumable components.");
    }
});



// [REPORT TABLE RELATED QUERY]
app.get('/report', checkAdminIdSession, async (req, res) => {
    try {
        const get_report = await getReport();

        let formatted_report;
        if (Array.isArray(get_report)) {
            formatted_report = get_report.map(report => ({
                ...report, date_submitted: formatDate(report.date_submitted)
            }));
        } else {
            formatted_report = {...get_report, date_submitted: formatDate(get_report.date_submitted)};
        }

        res.status(200).send(formatted_report);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching reports.");
    }
});


app.post('/report/selected', checkAdminIdSession, async (req, res) => {
    const { pcIds } = req.body;
    if (!Array.isArray(pcIds)) {
        return res.status(400).send("Invalid array format.");
    }

    const report_count = await selectedReportAll(pcIds);
    res.send({ report_count: report_count });
});


app.post("/create/report",  async (req, res) => {
    const { pcId, room, building_code, reported_conditions, report_comment, submittee } = req.body;

    try {
        //get date
        const date = new Date();
        const date_submitted = formatDate(date);

        const create_report = await createReport(room, building_code.toUpperCase(), pcId, report_comment, date_submitted, submittee, reported_conditions);
        res.status(201).send(create_report);
    } catch (error) {
        console.error(error);
        if (error.code === "ER_NO_REFERENCED_ROW_2") {
            return res.status(404).send(`Submit report failed. Computer id '${computer_id}' doesn't exists.`);
        }
        return res.status(400).send(error);
    }
});

// get archived reports
app.get('/archived_report', checkAdminIdSession, async (req, res) => {
    try {
        const get_report = await getArchivedReport();

        let formatted_report;
        if (Array.isArray(get_report)) {
            formatted_report = get_report.map(report => ({
            ...report, 
            date_submitted: formatDate(report.date_submitted),
            date_resolve: formatDate(report.date_resolve)
            }));
        } else {
            formatted_report = { 
            ...get_report, 
            date_submitted: formatDate(get_report.date_submitted),
            date_resolve: formatDate(get_report.date_resolve)
            };
        }

        res.status(200).send(formatted_report);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching reports.");
    }
});

// archive report (for resolved reports)
app.post('/resolve/report', checkAdminIdSession, async (req, res) => {
    try {
        const { report_id, archived_by, report_status, archive_comment } = req.body;

    // get first the report to be archived
        const get_report = await getReport(report_id);
        const date = new Date();
        const date_submitted = formatDate(date);

        let formatted_report;
        if (Array.isArray(get_report)) {
            formatted_report = get_report.map(report => ({
                ...report, date_submitted: formatDate(report.date_submitted)
            }));
        } else {
            formatted_report = {...get_report, date_submitted: formatDate(get_report.date_submitted)};
        }

    // then archive the report
        const archive_report = archiveReport(formatted_report, archived_by, report_status, archive_comment, date_submitted);

        res.status(200).send('Report archived successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching reports.");
    }
});

// resolve computer (archive all related reports) [WILL MAKE A SEPERATE FUNCTION FOR THIS]
app.post('/resolve/computer', checkAdminIdSession, async (req, res) => {
    try {
        const { computer_id, archived_by } = req.body;

        // set computer status to available
        await resolveComputer(computer_id, archived_by);

        res.status(200).send('Computer resolved successfully. All related reports archived.');
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching reports.");
    }
});

app.get('/report_count/:status', checkAdminIdSession, async (req, res) => {
    const report_status = req.params.status;
    const get_report = await getReportCount(report_status);
    res.send(get_report);
});

// [REFERENCES TABLE RELATED QUERY]
app.get("/building", checkAdminIdSession, async (req, res) => {
    try {
        const get_building = await getBuilding();
        res.status(200).send(get_building);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching buildings.");
    }
});

app.post("/create/building", checkAdminIdSession, async (req, res) => {
    const { building_code, building_name } = req.body;

    try {
        const create_building = await createBuilding(building_code.toUpperCase(), building_name);
        res.status(201).send(create_building);
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).send(`Building code '${building_code.toUpperCase()}' already exist`);
        }
    }
});

// [ADMIN RELATED QUERY]
app.get("/admin", checkAdminIdSession, async (req, res) => {
    try {
        const get_admin = await getAdmin();
        if (!get_admin || get_admin.length === 0) {
            return res.status(404).send("Admin empty");
        }
        res.status(200).send(get_admin);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching admins.");
    }
});

app.get("/admin/:id", checkAdminIdSession, async (req, res) => {
    const admin_id = req.params.id;
    const get_admin = await getAdmin(admin_id);
    if (!get_admin) {
        return res.status(404).send(`Admin id: ${admin_id} not found`);
    }
    res.send(get_admin);
});

app.post("/register/admin", checkAdminIdSession, async (req, res) => {

    const { admin_id, password, activation_key, first_name, last_name } = req.body;

    try {
        // first verify activation key
        const decrypted_activation_key = decrypt(activation_key);
        const validate_activation_code = await verifyActivationCode(decrypted_activation_key);

        if (!validate_activation_code) {
            return res.status(404).send("Invalid activation key");
        }

        const create_admin = await createAdmin(admin_id, password, first_name, last_name);
        res.status(201).send('Admin created successfully');
    } catch (error) {
        // console.error(error);
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).send(`Admin id '${admin_id}' already exist`);
        } else if (error.message === 'Incorrect activation code') {
            return res.status(404).send("The activation code is incorrect.");
        } else if (error.code === "ERR_OSSL_BAD_DECRYPT"
             || error.code === "ERR_INVALID_ARG_VALUE"
             || error.code === "ERR_INVALID_ARG_TYPE") {
            return res.status(400).send("Invalid activation code.");
        } else if (error.code === 'ERR_OSSL_EVP_BAD_DECRYPT') {
            return res.status(400).send("Decryption failed: Incorrect key, IV, or corrupted data.");
        } else if (error.code === 'ERR_CRYPTO_INVALID_IV') {
            return res.status(400).send("Decryption failed: Invalid IV length.");
        } else if (error.code === 'ERR_CRYPTO_INVALID_KEYLEN') {
            return res.status(400).send("Decryption failed: Invalid key length.");
        } else if (error.code === 'ERR_BUFFER_TOO_SMALL') {
            return res.status(400).send("Decryption failed: Buffer too small.");
        } else {
            return res.status(500).send("An error occurred while fetching activation code.");
        }
        // return res.status(400).send(error);
    }
});

app.post("/update/admin_password", checkAdminIdSession, async (req, res) => {
    const { admin_id, old_password, new_password } = req.body;

    const encrypted_old_password = encrypt(old_password);
    const encrypted_new_password = encrypt(new_password);

    try {
        await updatePassword(admin_id, encrypted_old_password, encrypted_new_password);
        res.status(201).send("Successfully updated");
    } catch (error) {
        if (error.message === 'Invalid account') {
            return res.status(404).send("Invalid account");
        }
        if (error.message === 'Password is the same') {
            return res.status(409).send("Password is the same");
        }
        return res.status(400).send(error);
    }
});

app.post("/update/admin_name", checkAdminIdSession, async (req, res) => {
    const { admin_id, first_name, last_name } = req.body;

    try {
        await updateName(admin_id, first_name, last_name);
        res.status(201).send("Successfully updated");
    } catch (error) {
        return res.status(400).send(error);
    }
});

// update room (just refreshes the room data)
app.get("/update/room", checkAdminIdSession, async (req, res) => {
    try {
        const update_room = await updateRoomData();
        res.status(201).send(update_room);
    } catch (error) {
        return res.status(400).send(error);
    }
});

// update consumable component 
app.post("/update/consum_comp", checkAdminIdSession, async (req, res) => {
    const { component_name, stock_count } = req.body;

    try {
        await updateConsumableComponent(component_name, stock_count);
        res.status(201).send("Successfully updated");
    } catch (error) {
        return res.status(400).send(error);
    }
});

// update room name
app.post("/update/room_name", checkAdminIdSession, async (req, res) => {
    const { room_id, room, building_code } = req.body;

    try{
        await updateRoomName(room, building_code.toUpperCase(), room_id);
        res.status(201).send("Successfully updated");
    }catch(error){
        res.status(400).send(error);
    }
});

// get activation code
app.post('/activation_code', checkAdminIdSession, async (req, res) => {
    try {
        const get_activation_code = await getActivationCode();
        // encrypt activation code
        const encrypted_activation_code = encrypt(get_activation_code);

        res.status(200).send(`Activation code for ${get_activation_code}: ${encrypted_activation_code}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching activation code.");
    }
});

// verify activation code
app.post('/verify/activation_code', async (req, res) => {
    const { activation_code } = req.body;

    try {
        // decrypt activation code
        const decrypted_activation_code = decrypt(activation_code);

        const validate_activation_code = await verifyActivationCode(decrypted_activation_code);
        
        res.status(200).send(validate_activation_code);
    } catch (error) {
        console.error(error);
        if (error.message === 'Incorrect activation code') {
            return res.status(404).send("The activation code is incorrect.");
        } else if (error.code === "ERR_OSSL_BAD_DECRYPT" || error.code === "ERR_INVALID_ARG_VALUE") {
            return res.status(400).send("Invalid activation code.");
        } else if (error.code === 'ERR_OSSL_EVP_BAD_DECRYPT') {
            res.status(400).send("Decryption failed: Incorrect key, IV, or corrupted data.");
        } else if (error.code === 'ERR_CRYPTO_INVALID_IV') {
            res.status(400).send("Decryption failed: Invalid IV length.");
        } else if (error.code === 'ERR_CRYPTO_INVALID_KEYLEN') {
            res.status(400).send("Decryption failed: Invalid key length.");
        } else if (error.code === 'ERR_BUFFER_TOO_SMALL') {
            res.status(400).send("Decryption failed: Buffer too small.");
        } else {
            res.status(500).send("An error occurred while fetching activation code.");
        }
    }
});

// create activation code
app.post('/create/activation_code', checkAdminIdSession, async (req, res) => {
    const { activation_code } = req.body;

    // encrypt activation code
    const encrypted_activation_code = encrypt(activation_code);

    try {
        await createActivationCode(encrypted_activation_code);
        res.status(201).send('Activation code created successfully');
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).send(`Activation code '${activation_code}' already exist`);
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