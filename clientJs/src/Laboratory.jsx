/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ITable from './components/ITable';

// FAKE DATA
// import computers_data from './assets/computers_data.json'
// import rooms_data from './assets/rooms_data.json'

// 
import { Accordion, AccordionDetails, Button, CardContent, Grid2, Paper, Stack, Typography, Box, Menu, Chip, ListItemIcon, MenuItem, Modal, TextField, Alert, FormControl, Autocomplete, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import StatBox from './components/StatBox';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types'
import '@fontsource/inter/700.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter';
import Checkbox from '@mui/material/Checkbox';
import DrawerMenu from './components/DrawerMenu'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import palette from './assets/palette';
import NavSetting from './components/NavSetting';
import axios from 'axios'
import ITableV2 from './components/ITableV2';
import { createTheme, ThemeProvider, alpha, getContrastRatio } from '@mui/material/styles';
import { getChipTheme_condition, handleErrorFetch} from './customMethods';
import {MRT_ActionMenuItem,} from 'material-react-table';
import useStore from './useStore';
import { getComputersByRoom, getRoomsByBuilding } from './customMethods.js';
import ReportModal from './components/ReportModal';
import { useLocation, useNavigate } from 'react-router-dom';
import SharedModal from './components/SharedModal.jsx';
import { Controller, useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'motion/react';
import {SnackbarProvider, enqueueSnackbar} from 'notistack'

const COMPUTERS_DOWNLOAD_FILE_NAME = ''

function createData(computer_id, room, building_code, system_unit, monitor, status, condition, pending_reports, has_mouse, has_keyboard, has_internet, has_software){
    return {computer_id, room,building_code,system_unit, monitor, condition, status, pending_reports, has_mouse, has_keyboard, has_internet, has_software}
}

function getRoomData(room, building_code, total_pc, total_active_pc, total_inactive_pc, total_major_issues, total_minor_issues, total_reports, room_id){
    return {room, building_code, total_pc, total_active_pc, total_inactive_pc, total_major_issues, total_minor_issues, total_reports, room_id}
}
function getBuildingData(building_code, building_name){
    return {building_code, building_name}
}

function LabelTop() {
    return <div className="label">
    <div className="text-wrapper">Laboratory</div>
    </div>
}
function RoomBox({setcreateRoomModalOpen,rooms, setSelectedRooms, selectedRooms, getPcRows, onContextMenu, setIsCompTableOpen, setComputersData, setPcDCond, setPcDStat}) {

    const handleCheckRoomBox = (e, r)=> {
        // console.log(r);
        
        if (e.target.checked){
            setSelectedRooms([...selectedRooms, {"roomnum": r.room, "building_code": r.building_code}])
            // console.log("checked room: ", r.room)
            // console.log(r.building_code)
        } else {
            // console.log("unchecked room: ", r.room)
            setSelectedRooms(selectedRooms.filter((sr) => sr.roomnum !== r.room || sr.building_code !== r.building_code))

        }
    }
    const stacksx = {
        textAlign: 'left', 
        width: '100%', 
        paddingTop: 1.2,
        paddingBottom:0.2, 
        borderTopLeftRadius: '16px', 
        borderTopRightRadius: '16px',
        transition: 'background-color 0.15s ease-in-out', 
    }
    const typographysx = {
        color: palette.txtStrong, 
        fontFamily: 'Inter, sans-serif', 
        fontWeight: 600, 
        width: '100%',
        marginLeft: 2,
        marginBottom: 1,
    }
    const res = () => {
        
        return [rooms.map(r => {
            return <Grid2 md={6} lg={6} xl={6} key={r.room}>
                    <CardContent 
                        onContextMenu={(e)=>onContextMenu(e, r)}
                        key={r.room} 
                        sx={{
                            border: `1.5px solid ${palette.strokeMain}`, 
                            borderRadius: '16px',
                            width: '270px', 
                            padding:0,
                        }}
                    >
                        <Checkbox 
                            onChange={(e) => handleCheckRoomBox(e, r)}
                            disableRipple
                            sx={{ 
                                borderBottom: `1px solid ${palette.strokeMain}`,
                                borderRadius: 0,
                                padding: 0,
                                margin: 0,
                                width: '100%',
                                transition: 'all 0.2s ease-in-out',
                            }}
                            icon={
                                <Stack 
                                    direction="row" 
                                    sx={{
                                        ...stacksx
                                    }}
                                >
                                    <Typography
                                        variant='button'
                                        sx={{ 
                                            ...typographysx
                                        }}
                                    >
                                    <Typography
                                            sx={{letterSpacing:1.3, fontSize:'14px'}}
                                        >
                                            {`Room ${r.room}-${r.building_code}`}
                                        </Typography>
                                    </Typography>
                                </Stack>
                            }
                            checkedIcon={
                                <Stack 
                                    direction="row" 
                                    sx={{
                                        ...stacksx,
                                        backgroundColor: '#4681f4', 
                                    }}
                                >
                                    <Typography
                                        variant="button"
                                        sx={{ 
                                            ...typographysx,
                                            color: 'white', 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'space-between', 
                                            width: '100%', 
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                letterSpacing: 1.3, 
                                                fontSize: '14px',
                                                whiteSpace: 'nowrap', 
                                            }}
                                        >
                                            {`Room ${r.room}-${r.building_code}`}
                                        </Typography>

                                        <Typography
                                            sx={{ 
                                                lineHeight: 1.2,
                                                fontSize: '0.75rem', 
                                                fontWeight: 700,
                                                display: { xs: 'none', md: 'none', lg:'inline-block' }, 
                                                marginLeft: '6px', 
                                                marginRight:2,
                                                color: '#4681f4',
                                                backgroundColor: 'white',
                                                padding: 0.3,
                                                paddingRight: 0.5,
                                                paddingLeft: 0.5,
                                                borderRadius: '16px',
                                            }}
                                        >
                                            {"selected"}
                                        </Typography>
                                    </Typography>
                                </Stack>

                            }
                        />


                        <Box sx={{margin:2, marginBottom:0}}>
                            <Stack>
                                <Stack direction={'row'} width={1} textAlign={'center'} paddingBottom={1}>
                                    <Stack width={1/3}>
                                        <Typography variant='caption' sx={{color: palette.txtStrong, fontFamily: 'Inter, sans-serif' }}>Active</Typography>
                                        <Typography variant='h6'>{r.total_active_pc}</Typography>
                                    </Stack>
                                    <Stack width={1/3}>
                                        <Typography variant='caption' sx={{color: palette.txtStrong, fontFamily: 'Inter, sans-serif' }}>Inactive</Typography>
                                        <Typography variant='h6'>{r.total_inactive_pc}</Typography>
                                    </Stack>
                                    <Stack width={1/3}>
                                        <Typography variant='caption' sx={{color: palette.txtStrong, fontFamily: 'Inter, sans-serif' }}>Reports</Typography>
                                        <Typography variant='h6' sx={{color: palette.bad}} >{r.total_reports}</Typography>
                                    </Stack>
                                </Stack>

                                <Button variant='outlined' size='small' sx={{borderRadius: '16px', marginTop: 1}} onClick={()=> {
                                    setComputersData([])
                                    setPcDCond([]) 
                                    setPcDStat([])
                                    getPcRows("single", [{"roomnum": r.room, "building_code": r.building_code}])
                                    setIsCompTableOpen(true)
                                }}>
                                    View Table
                                </Button>
                            </Stack>

                        </Box>

                    </CardContent>
            </Grid2>;  
        }), <Grid2 md={6} lg={6} xl={6} key={'r-add'} sx={{height:'180px'}}>
            <CardContent 
                sx={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='${encodeURIComponent("#4C64D9")}' stroke-width='2' stroke-dasharray='16' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
                    borderRadius: '16px',
                    width: '270px', 
                    height: '100%',
                    alignContent: 'center',
                    textAlign: 'center',
                    color:'#4C64D9'
                }}
                onClick={()=>setcreateRoomModalOpen(true)}
            >
                <AddIcon/> <br/>
                Add Room
            </CardContent>
        </Grid2>]
    }


    return res()
}
RoomBox.propTypes = {
    rooms: PropTypes.array
}
function Form_Create_Computer({createComputerModalOpen, setcreateComputerModalOpen, getPcRows, handleSnackBarClick, fetchLabRooms, targetedRoomsUI, typeTargetedRoomsUI}){
    const [available_monitors, setavailable_monitors] = useState([]);
    const [available_systemUnits, setavailable_systemUnits] = useState([]);
    const [available_consumables, setavailable_consumables] = useState(0);
    const [loadingMonitor, setloadingMonitor] = useState(false);
    const [loadingSysu, setloadingSysu] = useState(false);
    // FORM SUBMISSION 
    const {register, handleSubmit, formState: {errors}, reset} = useForm()
    const fetchMonitor = () => {
        axios.get('/api/available_monitor').then(dta =>
            setavailable_monitors(dta.data)
        ).catch(err =>{
            console.log(err)
            handleSnackBarClick('error', err.response.data)
        })
    }
    const fetchSysu = () => {
        axios.get('/api/available_sysu').then(dta =>
            setavailable_systemUnits(dta.data)
        ).catch(err =>{
            console.log(err)
            handleSnackBarClick('error', err.response.data)
        })
    }

    const submitCreateComputer = async (dta)=> {
        try {
            await axios.post('/api/create/computer', {
                room: dta.room, 
                building_code: dta.building_code,
                system_unit:dta.system_unit,
                monitor: dta.monitor
            })
        
            // console.log()
            if (targetedRoomsUI.length > 0){
                // console.log(targetedRoomsUI);
                
                getPcRows(typeTargetedRoomsUI, targetedRoomsUI)
            }
            
            await fetchLabRooms()
            handleSnackBarClick('success', "Successfully Created a Computer")
            setcreateComputerModalOpen(false)
            reset()
            
        } catch (err) {
            console.error("CONSOLE ERROR ", err)
            handleSnackBarClick('error', err.response.data)
        }

    }

    const ModalMotion = ({alertComponent}) => <motion.div
        key={"modal"} 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
    >
        {alertComponent}
    </motion.div>



    return <>
        <Modal
            open={createComputerModalOpen}
            onClose={()=>setcreateComputerModalOpen(false)}
        >
            <form noValidate onSubmit={handleSubmit(submitCreateComputer)}>
                <Box 
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Stack>
                        {/* ROOM TEXTFIELD */}
                        <TextField
                            required
                            label={'Room Number'}
                            {...register("room", {
                                    required: true,
                            })}
                            fullWidth
                        />
                        <AnimatePresence>
                            {errors.room?.type === 'required' && <ModalMotion alertComponent={ <Alert severity="error" sx={{p:0.3, px:1, m:0}}>Please indicate Room Number</Alert>}/>}
                        </AnimatePresence>
                        {/* BUIDLING TEXT FIELD */}
                        <TextField
                            required
                            label={'Building (MB, ANB, MND'}
                            {...register("building_code", {
                                    required: true,
                            })}
                            fullWidth
                            sx={{
                                mt:2, 
                            }}
                        />      
                        <AnimatePresence>
                            {errors.building_code?.type === 'required' && <ModalMotion alertComponent={ <Alert severity="error" sx={{p:0.3, px:1, m:0}}>Please indicate Building</Alert>}/>}
                        </AnimatePresence>
                        {/* MONITOR AUTO COMPLETE */}
                        <Autocomplete
                        sx={{mt:2}}
                            options={available_monitors }
                            onOpen={fetchMonitor}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Monitor ID"
                                    sx={{ fontFamily: 'Inter' }}
                                    {...register("monitor", { required: true })}
                                />
                            )}                          
                        />
                        <AnimatePresence>
                            {errors.monitor?.type === 'required' && <ModalMotion alertComponent={ <Alert severity="error" sx={{p:0.3, px:1, m:0}}>Please select the available monitor</Alert>}/>}
                        </AnimatePresence>
                        {/* SYSU AUTO COMPLETE */}
                        <Autocomplete
                            sx={{mt:2}}
                            options={available_systemUnits || ['']}
                            onOpen={fetchSysu}
                            renderInput={params => 
                                <TextField
                                    {...params}
                                    label="System Unit ID"
                                    sx={{ fontFamily: 'Inter', }}
                                    {...register("system_unit", {required:true})}
                                />
                            }
                        />
                        <AnimatePresence>
                            {errors.system_unit?.type === 'required' && <ModalMotion alertComponent={ <Alert severity="error" sx={{p:0.3, px:1, m:0}}>Please select the available System Unit</Alert>}/>}
                        </AnimatePresence>
                    </Stack>
                    <Button
                        type='submit'
                        sx={{
                            color: 'white',
                            textTransform:'none',
                            fontFamily:'Inter',
                            minWidth:'100%',
                            p:1.3,
                            mt:2.5,
                            bgcolor:'#323e8a',
                        }}
                    >
                        Add Computer
                    </Button>
                </Box>
            </form>
        </Modal>
    </>

}
function Form_Create_Room({createRoomModalOpen, setcreateRoomModalOpen, mapRoomCards, handleSnackBarClick, }){


    // FORM SUBMISSION 
    const {register, handleSubmit, formState: {errors}, reset} = useForm()
    
    const ModalMotion = ({alertComponent}) => <motion.div
        key={"modal"} 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
    >
        {alertComponent}
    </motion.div>
    return <>
        <Modal
            open={createRoomModalOpen}
            onClose={()=>setcreateRoomModalOpen(false)}
        >
            <form noValidate onSubmit={handleSubmit((dta)=> {
                axios.post('/api/create/room', {
                    room: dta.room, 
                    building_code: dta.building_code,
                }).then(res=> {
                    mapRoomCards(res.data)
                    handleSnackBarClick('success', "Successfully Created a Room")
                    setcreateRoomModalOpen(false)
                    reset()
                }).catch(err => {
                    console.error("CONSOLE ERROR ", err)
                    handleSnackBarClick('error', err.response.data)
                    
                })
                
            })}>
                <Box 
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Stack>
                        <TextField
                            required
                            label={'Room Number'}
                            {...register("room", {
                                    required: true,
                            })}
                            fullWidth
                            sx={{
                                my:1, 
                                mt:2,
                            }}
                        />
                        <AnimatePresence>
                            {errors.room?.type === 'required' && 
                                <ModalMotion alertComponent={ <Alert severity="error" sx={{p:0.3, px:1, m:0}}>Please indicate Room Number</Alert>}/>
                            }
                        </AnimatePresence>
                        <TextField
                            required
                            label={'Building (MB, ANB, MND'}
                            {...register("building_code", {
                                    required: true,
                            })}
                            fullWidth
                            sx={{
                                my:1, 
                                mt:2,
                            }}
                        />      
                            <AnimatePresence>
                                {errors.building_code?.type === 'required' && 
                                    <ModalMotion alertComponent={ <Alert severity="error" sx={{p:0.3, px:1, m:0}}>Please indicate Building</Alert>}/>
                                }
                            </AnimatePresence>            
                    </Stack>
                    <Button
                        type='submit'
                        sx={{
                            color: 'white',
                            textTransform:'none',
                            fontFamily:'Inter',
                            minWidth:'100%',
                            p:1.3,
                            mt:2.5,
                            bgcolor:'#323e8a',
                        }}
                    >
                        Add Room
                    </Button>
                </Box>
            </form>
        </Modal>
    </>

}
function Form_Update_Room({open, setopen, fetchLabRooms, handleSnackBarClick, register, handleSubmit, errors, reset, fetchNonConsumableComponents}){
    // FORM SUBMISSION 
    const ModalMotion = ({alertComponent}) => <motion.div
        key={"modal"} 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
    >
        {alertComponent}
    </motion.div>
    return <>
        <Modal
            open={open}
            onClose={()=>setopen(false)}
        >
            <form noValidate onSubmit={handleSubmit((dta)=> {
                console.log(dta)
                axios.post('/api/update/room_name', {
                    room: dta.room, 
                    building_code: dta.building_code,
                    room_id: dta.room_id,
                }).then(res=> {
                    fetchLabRooms()
                    handleSnackBarClick('success', "Successfully Created a Room")
                    setopen(false)
                    reset()
                }).catch(err => {
                    console.error("CONSOLE ERROR ", err)
                    handleSnackBarClick('error', err.response.data)
                })
                
            })}>
                <Box 
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Stack>
                        <TextField
                            required
                            label={'Room Number'}
                            {...register("room", {
                                    required: true,
                            })}
                            fullWidth
                            sx={{
                                my:1, 
                                mt:2,
                            }}
                        />
                        <AnimatePresence>
                            {errors.room?.type === 'required' && 
                                <ModalMotion alertComponent={ <Alert severity="error" sx={{p:0.3, px:1, m:0}}>Please indicate Room Number</Alert>}/>
                            }
                        </AnimatePresence>
                        <TextField
                            required
                            label={'Building (MB, ANB, MND'}
                            {...register("building_code", {
                                    required: true,
                            })}
                            fullWidth
                            sx={{
                                my:1, 
                                mt:2,
                            }}
                        />      
                            <AnimatePresence>
                                {errors.building_code?.type === 'required' && 
                                    <ModalMotion alertComponent={ <Alert severity="error" sx={{p:0.3, px:1, m:0}}>Please indicate Building</Alert>}/>
                                }
                            </AnimatePresence>            
                    </Stack>
                    <Button
                        type='submit'
                        sx={{
                            color: 'white',
                            textTransform:'none',
                            fontFamily:'Inter',
                            minWidth:'100%',
                            p:1.3,
                            mt:2.5,
                            bgcolor:'#323e8a',
                        }}
                    >
                        Update Room
                    </Button>
                </Box>
            </form>
        </Modal>
    </>

}
function Form_Update_Computer({open, setopen, getPcRows, handleSnackBarClick, fetchLabRooms, targetedRoomsUI, typeTargetedRoomsUI, register, handleSubmit, errors, reset, currentMonitor, currentSysu, control}){
    const [available_monitors, setavailable_monitors] = useState([]);
    const [available_systemUnits, setavailable_systemUnits] = useState([]);
    const [available_consumables, setavailable_consumables] = useState(0);
    const [loadingMonitor, setloadingMonitor] = useState(false);
    const [loadingSysu, setloadingSysu] = useState(false);
    // FORM SUBMISSION 
    const fetchMonitor = () => {
        axios.get('/api/available_monitor').then(dta =>
            setavailable_monitors(dta.data)
        ).catch(err =>{
            console.log(err)
            handleSnackBarClick('error', err.response.data)
        })
    }
    const fetchSysu = () => {
        axios.get('/api/available_sysu').then(dta =>
            setavailable_systemUnits(dta.data)
        ).catch(err =>{
            console.log(err)
            handleSnackBarClick('error', err.response.data)
        })
    }

    const submitUpdateComputer = async (dta)=> {
        console.log(dta)
        try {
            await axios.post('/api/update/computer', {
                room: dta.room, 
                building_code: dta.building_code,
                new_system_unit:dta.system_unit,
                new_monitor: dta.monitor,
                has_internet:dta.has_internet,
                has_keyboard:dta.has_keyboard,
                has_mouse:dta.has_mouse,
                has_software:dta.has_software,
                computer_id:dta.computer_id
            })
        
            // console.log()
            if (targetedRoomsUI.length > 0){
                console.log(targetedRoomsUI);
                
                getPcRows(typeTargetedRoomsUI, targetedRoomsUI)
            }
            
            await fetchLabRooms()
            handleSnackBarClick('success', "Successfully Created a Computer")
            setopen(false)
            reset()
            
        } catch (err) {
            console.error("CONSOLE ERROR ", err)
            handleSnackBarClick('error', err.response.data)
        }

    }

    const ModalMotion = ({alertComponent}) => <motion.div
        key={"modal"} 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
    >
        {alertComponent}
    </motion.div>

    return <>
        <Modal
            open={open}
            onClose={()=>setopen(false)}
        >
            <form noValidate onSubmit={handleSubmit(submitUpdateComputer)}>
                <Box 
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Stack>
                        {/* ROOM TEXTFIELD */}
                        <TextField
                            required
                            label={'Room Number'}
                            {...register("room", {
                                    required: true,
                            })}
                            fullWidth
                        />
                        <AnimatePresence>{errors.room?.type === 'required' && <ModalMotion alertComponent={ <Alert severity="error" sx={{p:0.3, px:1, m:0}}>Please indicate Room Number</Alert>}/>}</AnimatePresence>
                        {/* BUIDLING TEXT FIELD */}
                        <TextField
                            required
                            label={'Building (MB, ANB, MND'}
                            {...register("building_code", {
                                    required: true,
                            })}
                            fullWidth
                            sx={{
                                mt:2, 
                            }}
                        />      
                        <AnimatePresence>
                            {errors.building_code?.type === 'required' && <ModalMotion alertComponent={ <Alert severity="error" sx={{p:0.3, px:1, m:0}}>Please indicate Building</Alert>}/>}
                        </AnimatePresence>

                        {/* MONITOR AUTO COMPLETE */}
                        <TextField
                            disabled
                            {...register("old_monitor")}
                            sx={{ fontFamily: 'Inter', mt:2}}
                            label={"Current Monitor"}
                        />
                        <Autocomplete
                            sx={{mt:2}}
                            options={available_monitors }
                            onOpen={fetchMonitor}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="New Monitor ID"
                                    sx={{ fontFamily: 'Inter' }}
                                    {...register("monitor", { required: true })}
                                />
                            )}                          
                        />
                        <AnimatePresence>
                            {errors.monitor?.type === 'required' && <ModalMotion alertComponent={ <Alert severity="error" sx={{p:0.3, px:1, m:0}}>Please select the available monitor</Alert>}/>}
                        </AnimatePresence>
                        {/* SYSU AUTO COMPLETE */}
                        <TextField
                            disabled
                            {...register("old_system_unit")}
                            sx={{ fontFamily: 'Inter', mt:2}}
                            label={"Current System Unit"}
                        />
                        <Autocomplete
                            sx={{mt:2}}
                            options={available_systemUnits || ['']}
                            onOpen={fetchSysu}
                            renderInput={params => 
                                <TextField
                                    {...params}
                                    label="New System Unit ID"
                                    sx={{ fontFamily: 'Inter', }}
                                    {...register("system_unit", {required:true})}
                                />
                            }
                        />
                        <AnimatePresence>
                            {errors.system_unit?.type === 'required' && <ModalMotion alertComponent={ <Alert severity="error" sx={{p:0.3, px:1, m:0}}>Please select the available System Unit</Alert>}/>}
                        </AnimatePresence>

                        {/* PC PARTS */}
    <Stack spacing={2} sx={{mt:2}}>
    <Grid2 container spacing={2} >
        {/* Has Keyboard */}
        <Grid2 xs={6}>
            <FormControl component="fieldset" error={!!errors.has_keyboard}>
                <FormLabel component="legend">Has Keyboard?</FormLabel>
                <Controller
                    name="has_keyboard"
                    control={control}
                    defaultValue=""
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                        <RadioGroup {...field} row>
                            <FormControlLabel value={1} control={<Radio />} label="Yes" />
                            <FormControlLabel value={0} control={<Radio />} label="No" />
                        </RadioGroup>
                    )}
                />
                <AnimatePresence>
                    {errors.has_keyboard && (
                        <Alert severity="error" sx={{ p: 0.3, px: 1, m: 0 }}>
                            {errors.has_keyboard.message}
                        </Alert>
                    )}
                </AnimatePresence>
            </FormControl>
        </Grid2>

        {/* Has Mouse */}
        <Grid2 xs={6}>
            <FormControl component="fieldset" error={!!errors.has_mouse}>
                <FormLabel component="legend">Has Mouse?</FormLabel>
                <Controller
                    name="has_mouse"
                    control={control}
                    defaultValue=""
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                        <RadioGroup {...field} row>
                            <FormControlLabel value={1} control={<Radio />} label="Yes" />
                            <FormControlLabel value={0} control={<Radio />} label="No" />
                        </RadioGroup>
                    )}
                />
                <AnimatePresence>
                    {errors.has_mouse && (
                        <Alert severity="error" sx={{ p: 0.3, px: 1, m: 0 }}>
                            {errors.has_mouse.message}
                        </Alert>
                    )}
                </AnimatePresence>
            </FormControl>
        </Grid2>

        {/* Has Software */}
        <Grid2 xs={6}>
            <FormControl component="fieldset" error={!!errors.has_software}>
                <FormLabel component="legend">Has Software?</FormLabel>
                <Controller
                    name="has_software"
                    control={control}
                    defaultValue=""
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                        <RadioGroup {...field} row>
                            <FormControlLabel value={1} control={<Radio />} label="Yes" />
                            <FormControlLabel value={0} control={<Radio />} label="No" />
                        </RadioGroup>
                    )}
                />
                <AnimatePresence>
                    {errors.has_software && (
                        <Alert severity="error" sx={{ p: 0.3, px: 1, m: 0 }}>
                            {errors.has_software.message}
                        </Alert>
                    )}
                </AnimatePresence>
            </FormControl>
        </Grid2>

        {/* Has Internet */}
        <Grid2 xs={6}>
            <FormControl component="fieldset" error={!!errors.has_internet}>
                <FormLabel component="legend">Has Internet?</FormLabel>
                <Controller
                    name="has_internet"
                    control={control}
                    defaultValue=""
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                        <RadioGroup {...field} row>
                            <FormControlLabel value={1} control={<Radio />} label="Yes" />
                            <FormControlLabel value={0} control={<Radio />} label="No" />
                        </RadioGroup>
                    )}
                />
                <AnimatePresence>
                    {errors.has_internet && (
                        <Alert severity="error" sx={{ p: 0.3, px: 1, m: 0 }}>
                            {errors.has_internet.message}
                        </Alert>
                    )}
                </AnimatePresence>
            </FormControl>
        </Grid2>
    </Grid2>
</Stack>

                        
                    </Stack>
                    <Button
                        type='submit'
                        sx={{
                            color: 'white',
                            textTransform:'none',
                            fontFamily:'Inter',
                            minWidth:'100%',
                            p:1.3,
                            mt:2.5,
                            bgcolor:'#323e8a',
                        }}
                    >
                        Update
                    </Button>
                </Box>
            </form>
        </Modal>
    </>

}
const headCellsV2 = [
    {
        accessorKey: "computer_id",
        header: "Computer ID",
        size: 30,
    },
    {
        accessorKey: "room",
        header: "Room",
        size: 50,
    },
    {
        accessorKey: "building_code",
        header: "Building",
        size: 50,
    },
    {
        accessorKey: "system_unit",
        header: "System Unit Tag",
        size: 50,
    },
    {
        accessorKey: "monitor",
        header: "Monitor Tag",
        size: 50,
    },
    {
        accessorKey: "condition",
        header: "Condition",
        size: 50,
        Cell: ({cell}) => {
            const theme = getChipTheme_condition(cell.getValue())
            return <ThemeProvider theme={theme}>
                <Chip
                    variant='filled'
                    sx={{
                        m: 0.5,
                        p: 0.5,
                        backgroundColor:theme.palette.custom.main,
                        color: theme.palette.custom.fontColor,
                        fontWeight:'600',
                    }}
                    label={
                        (cell.getValue() === 0) ? "Good" : 
                        (cell.getValue() === 1) ? "Minor Issue" : 
                        (cell.getValue() === 2) ? "Major Issue" : 
                        (cell.getValue() === 3) ? "Bad" : "Unlisted"
                    }
                />

            </ThemeProvider>
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        size: 50,
        Cell:({cell}) => {
            const status = cell.getValue()
            return <Typography                    
                sx={{
                    fontFamily:'Inter',
                    fontWeight:'600', 
                    color:(status === 0) ? palette.badFont : palette.darkBlueFont 
                }}
                >
                {(status === 0) ? "Inactive" : "Active" }
            </Typography>
        }
    },
    {
        accessorKey: "pending_reports",
        header: "Pending Reports",
        size: 30,
    },
    {
        accessorKey: "has_mouse",
        header: "Mouse",
        size:30,
    },
    {
        accessorKey: "has_keyboard",
        header: "Keyboard",
        size:30,
    },
    {
        accessorKey: "has_internet",
        header: "Internet",
        size:30,
    },
    {
        accessorKey: "has_software",
        header: "Software",
        size:30,
    }
]
function Laboratory() {
    const [computerTable_addReportModalOpen, setComputerTable_AddReportModalOpen] = useState(false);
    const [isCompTableOpen, setIsCompTableOpen] = useState(false);

    // STATE FOR ROOM CHECKBOX
    const [selectedRooms, setSelectedRooms] = useState([]);

    const [roomcards, setRoomcards] = useState([]);
    const [allRooms, setAllRooms] = useState([])
    const [computersData, setComputersData] = useState([])
    const [pcDCond, setPcDCond] = useState([]);
    const [pcDStat, setPcDStat] = useState([]);
    const [totalReports, setTotalReports] = useState(0)
    const [pcIds, setPcIds] = useState([]);

    // WHEN RIGHT CLICKED
    const [roomAnchorPosition, setRoomAnchorPosition] = useState(null)
    const [rightClickedRoom, setrightClickedRoom] = useState(null);
    const [rightClickedComputer, setrightClickedComputer] = useState('');
    const [selectedComputersToDelete, setselectedComputersToDelete] = useState({});
    const [createRoomModalOpen, setcreateRoomModalOpen] = useState(false) 

    // IN THE CASE OF PASSING PROPS IN LINK OR REDIRECT
    const location = useLocation()
    const {urlRoom, urlBuilding} = location.state || {}

    // COMPUTER DETAILS MODAL
    const [computerDetailsModalOpen , setComputerDetailsModalOpen ] = useState(false)
    const [computerDetailsItems, setComputerDetailsItems] = useState({})

    // CREATE COMPUTER MODAL
    const [createComputerModalOpen, setcreateComputerModalOpen] = useState(false);

    // UPDATE STATES ANF FORMS
    const {register, handleSubmit, formState: {errors}, reset, control} = useForm()
    const [updateComputerModal, setupdateComputerModal] = useState(false);
    const [updateRoomModal, setupdateRoomModal] = useState(false);

    // ROOM OR PC DELETE
    const [confirmDeleteRoomModalSelected, setconfirmDeleteRoomModalSelected] = useState(false);
    const [confirmDeleteRoomModalSingle, setconfirmDeleteRoomModalSingle] = useState(false);
    const [confirmDeleteComputerModal, setconfirmDeleteComputerModal] = useState(false);


    // FORMS SNACK BAR
    const handleSnackBarClick = (variant, err_msg) => {
        enqueueSnackbar(err_msg, {variant: variant, anchorOrigin:{ vertical: 'bottom', horizontal: 'center' }})
    } 

    // TARGETED ROOMS IN UI INCASE IF NEEDED
    const [targetedRoomsUI, settargetedRoomsUI] = useState([]);
    const [typeTargetedRoomsUI, settypeTargetedRoomsUI] = useState('');
    
    const navigate= useNavigate()
    const {
        tableType, setTableType,
        reportedRoom, setReportedRoom,
        reportedBuilding, setReportedBuilding,
        reportedPcID, setReportedPcID,
        targetedRooms, setTargetedRooms,
        targetedComputerIDs, setTargetedComputerIDs
    }= useStore()
    const mapRoomCards = (roomsData) => {
        const roomCards_data = roomsData.map((rd) => getRoomData(
            rd.room,
            rd.building_code,
            rd.total_pc,
            rd.total_active_pc,
            rd.total_inactive_pc,
            rd.total_major_issue,
            rd.total_minor_issue,
            rd.total_reports,
            rd.room_id,
        ))
        setRoomcards(roomCards_data)
        const allr = roomCards_data.map(r => {return {roomnum: r.room, building_code: r.building_code}})
        // console.log("ALL ROOM: ", allr);
        
        setAllRooms(allr)
    }
    const fetchLabRooms = useCallback(() => {
        axios.get('/api/laboratories').then(res => {
            mapRoomCards(res.data)
        }).catch(err => handleErrorFetch(err, navigate))
    }, [navigate])

    const ComputersSummary = (data)=> {
        let dataPc = new Map();
        for (let obj of data) {
          if (!dataPc.has(obj['building_code'])) {
            dataPc.set(obj['building_code'], {
              active: 0,
              inactive: 0,
              good: 0,
              minor: 0,
              major: 0,
              bad: 0,
            });
          }
      
          const buildingData = dataPc.get(obj['building_code']);
      
          // Update condition counts
          if (obj['condition_id'] === 0) buildingData.good++;
          else if (obj['condition_id'] === 1) buildingData.minor++;
          else if (obj['condition_id'] === 2) buildingData.major++;
          else if (obj['condition_id'] === 3) buildingData.bad++;
      
          // Update status counts
          if (obj['computer_status'] === 1) buildingData.active++;
          else if (obj['computer_status'] === 0) buildingData.inactive++;
      
          dataPc.set(obj['building_code'], buildingData);
        }
      
        const dataset_condition = [];
        const dataset_status = []
        for (let [bd, values] of dataPc) {
          dataset_condition.push({ 
            building: bd, 
            good: values['good'],
            minor: values['minor'],
            major: values['major'],
            bad: values['bad'],
          });
          dataset_status.push({
            building: bd,
            active: values['active'],
            inactive: values['inactive']
          })
        }
        setPcDCond(dataset_condition)
        setPcDStat(dataset_status)
      }
    const getPcRows = useCallback(async (type_sel, singleRoom) => {
        const pcIds_tmp =[]
        // FETCH
        let targetRooms = []
        if (type_sel === "single"){
            targetRooms = singleRoom
        } else if (type_sel === "all") {
            targetRooms = allRooms
            // console.log(allRooms);
            
        } else {
            targetRooms = selectedRooms
        }
        settypeTargetedRoomsUI(type_sel)
        settargetedRoomsUI(targetRooms)
        try {
            const fetched_computers = await axios({
                    url: "/api/rooms/computers",
                    method: 'POST',
                    headers: {
                        // Authorization if meron
                    },
                    data: {rooms: targetRooms},
                })
            const dataPc= fetched_computers.data
               
            dataPc.forEach(dpc => {
                pcIds_tmp.push(dpc.computer_id)
            });
            // console.log(dataPc)
            const pcRes = dataPc.map((cd)=> createData(
                cd.computer_id,
                cd.room,
                cd.building_code,
                cd.system_unit,
                cd.monitor,
                cd.computer_status,
                cd.condition_id,
                cd.report_count,
                cd.has_mouse,
                cd.has_keyboard,
                cd.has_internet,
                cd.has_software,
            ))
            setComputersData(pcRes)
            
            // console.log("PCROWS: ",pcRes)
            ComputersSummary(dataPc)
                
            
            // console.log("pcidTmp", pcIds_tmp.length)

            const total_reports_fetched= await axios({
                url: "/api/report/selected",
                method: 'POST',
                headers: {
                    // Authorization if meron
                },
                 
                data: {pcIds: pcIds_tmp},
            })

            const dataTotalReps= total_reports_fetched.data.report_count
            setTotalReports(dataTotalReps)
            
        } catch (error) {
            console.error("error ", error)
            setComputersData([])
            setPcDCond([])
            setPcDStat([])
            handleSnackBarClick("error", error.response.data ||error.message || "Failed to fetch computers")

        }
    }, [allRooms, selectedRooms])

    const handleRoomCardMenuClose= () => {
        setRoomAnchorPosition(null)
    }
    const handleRoomCardMenuOpen= (e, r) => {
        e.preventDefault()
        setRoomAnchorPosition({top: e.clientY, left: e.clientX})
        setrightClickedRoom({room: r.room, building_code: r.building_code, room_id:r.room_id})
        // console.log(r.room)
    }

    const handleDeleteComputer = async ()=>{
        try{
            const selectedList= Object.keys(selectedComputersToDelete)
            let tobeDeletedComputers = (selectedList.length > 0) ? selectedList : [rightClickedComputer];
            await axios.post('/api/delete/computer', {computer_ids: tobeDeletedComputers})
            if (targetedRoomsUI.length > 0){
                // console.log(targetedRoomsUI);
                
                getPcRows(typeTargetedRoomsUI, targetedRoomsUI)
            }
            await fetchLabRooms()
            handleSnackBarClick('success', "Successfully updated a Computer")
            

        } catch (err) {
            const ermsg = err.response.data || err
            console.log("ERROR: ", ermsg)
            handleSnackBarClick("error", ermsg)
        }
        setselectedComputersToDelete({})
        setrightClickedComputer('')
        setconfirmDeleteComputerModal(false)
        // console.log("Right Clicked Room: ",rightClickedRoom)
    }

    const handleUpdateComputerStatus = async (computer_id, computer_status) => {
        try{
            await axios.post('/api/update/computer_status', {computer_id: computer_id, status: computer_status})
            if (targetedRoomsUI.length > 0){
                // console.log(targetedRoomsUI);
                
                getPcRows(typeTargetedRoomsUI, targetedRoomsUI)
            }
            await fetchLabRooms()
            handleSnackBarClick('success', "Successfully updated the Computer Status")
        } catch (err) {
            const ermsg = err.response.data || err
            console.log("ERROR: ", ermsg)
            handleSnackBarClick("error", ermsg)
        }
    }
    const handleReportComputerRefresh = async () => {
        if (targetedRoomsUI.length > 0){
            // console.log(targetedRoomsUI);
            
            getPcRows(typeTargetedRoomsUI, targetedRoomsUI)
        }
        await fetchLabRooms()
    }

    useEffect(() => {
        fetchLabRooms()
        // console.log("ROOOO: ", ({urlRoom, urlBuilding}));

        if (urlRoom && urlBuilding){
            getPcRows("single", [{roomnum: urlRoom, building_code: urlBuilding}])
            setIsCompTableOpen(true)
        }
      }, []);
    const building_data = [{building_code: 'MB', building_name:'Main Building'}, {building_code: 'ANB', building_name:'Annex Building'}, {building_code: 'MND', building_name:'Mendiola Building'}]
    const buildings = building_data.map((bd) => getBuildingData(bd.building_code, bd.building_name))

    return <div style={{display: 'flex', height:'100vh'}}>
        <DrawerMenu menuType={'laboratory'}/>
        <Stack width={'100vw'} overflow={'auto'}>
        <NavSetting/>
        <div className='mx-4'>
        <Stack direction={'row'} justifyContent={'space-between'} marginTop={2}>
            <LabelTop/>
            <div>
            {!isCompTableOpen && <>
            <Button
                variant='contained'
                color='error'
                disabled={selectedRooms.length === 0 ? true : false}
                style={{marginLeft:12, borderRadius:'24px',fontSize:'14px', textTransform: 'inherit'}}
                onClick={()=>setconfirmDeleteRoomModalSelected(true)}
            >
                Delete Selected
            </Button>
            <Button
                variant='contained'
                disabled={selectedRooms.length === 0 ? true : false}
                style={{
                    marginLeft:12, 
                    borderRadius:'24px',
                    fontSize:'14px', 
                    textTransform: 'inherit',
                }}
                onClick={()=> {
                        setComputersData([])
                        setPcDCond([])
                        setPcDStat([])
                        getPcRows("select")
                        setIsCompTableOpen(true)
                }}
            >
                View selected
            </Button>
            <Button variant='outlined' 
                style={{
                    marginLeft:12, 
                    borderRadius:'24px',
                    fontSize:'14px', 
                    textTransform: 'inherit', 
                    borderColor:palette.darkBlueFont, 
                    backgroundColor:palette.darkBlueFont, 
                    color:"white"
                }}
                onClick={()=> {
                    setComputersData([])
                    setPcDCond([])
                    setPcDStat([])
                    getPcRows("all")
                    setIsCompTableOpen(true)
                }}
            >
                View all
            </Button>
            </>}
            <Button
                variant='outlined' 
                style={{marginLeft:12, borderRadius:'24px',fontSize:'14px', textTransform: 'inherit', borderColor:palette.darkBlueFont, backgroundColor:palette.darkBlueFont, color:"white"}}
                onClick={()=> setcreateComputerModalOpen(true)}
            >
                Add Computer
            </Button>
            {isCompTableOpen && <>
                <Button variant='outlined' style={{marginLeft:12, borderRadius:'24px',fontSize:'14px', textTransform: 'inherit', borderColor:'black', color:'black'}} 
                    onClick={()=> {
                        setIsCompTableOpen(false) 
                        setSelectedRooms([])
                        settargetedRoomsUI([])
                        settypeTargetedRoomsUI('')
                    }}
                >
                    View Rooms List
                </Button>
                <Button 
                    variant='contained'
                    color='error'
                    disabled={Object.entries(selectedComputersToDelete).length===0}
                    style={{
                        marginLeft:12, 
                        borderRadius:'24px',
                        fontSize:'14px', 
                        textTransform: 'inherit', 
                    }}  
                    onClick={()=> setconfirmDeleteComputerModal(true)}
                >
                    Delete Selected Computers
                </Button>
            </>}

            </div>

        </Stack>
        {isCompTableOpen ?
        <Grid2 container spacing={2}>
            <Grid2 size={{xs: 12, md:12, lg:12}}>
                <ITableV2 
                    columns={headCellsV2} 
                    data={computersData} 
                    type={'computerTable'}
                    extraActionsTable={{
                        initialState:{ columnVisibility: { 
                            has_keyboard: false,
                            has_mouse: false,
                            has_software: false,
                            has_internet: false,
                        }},
                        enableRowSelection:true,
                        enableRowActions:true,
                        onRowSelectionChange: setselectedComputersToDelete,
                        state: {rowSelection: selectedComputersToDelete},
                        getRowId: (originalRow)=>originalRow.computer_id,
                        positionActionsColumn: 'last',
                        renderRowActionMenuItems:({row, table})=>{
                            const menuRow = row.original
                            return [
                            <MRT_ActionMenuItem
                                key={"report"}
                                label='Report this computer'
                                table={table}
                                onClick={() => {
                                    setReportedBuilding(String(menuRow.building_code))
                                    getRoomsByBuilding(String(menuRow.building_code), setTargetedRooms, "admin")
                    
                                    setReportedRoom(String(menuRow.room))
                                    getComputersByRoom(String(menuRow.room), setTargetedComputerIDs, String(menuRow.building_code), "admin")
                    
                                    setReportedPcID(String(menuRow.computer_id))
                                    setComputerTable_AddReportModalOpen(true)
                                    // console.log(Object.entries(row), row.getValue)
                                }}
                            />,
                            <MRT_ActionMenuItem
                                key={"edit"}
                                label='Edit Details'
                                table={table}
                                onClick={() => {
                                    // console.log(menuRow)
                                    const reset_config_pc = {
                                        room:menuRow.room,
                                        building_code:menuRow.building_code,
                                        has_mouse:menuRow.has_mouse,
                                        has_keyboard:menuRow.has_keyboard,
                                        has_internet:menuRow.has_internet,
                                        has_software:menuRow.has_software,
                                        old_monitor: menuRow.monitor,
                                        old_system_unit: menuRow.system_unit,
                                        computer_id:menuRow.computer_id,
                                    }
                                    reset(reset_config_pc)
                                    setupdateComputerModal(true)
                                }}
                            />,
                            <MRT_ActionMenuItem
                                key={"delete"}
                                label='Delete computer'
                                table={table}
                                onClick={() => {
                                    // MARK
                                    setrightClickedComputer(menuRow.computer_id)
                                    setconfirmDeleteComputerModal(true)

                                }}
                            />,
                            <MRT_ActionMenuItem
                                key={"details"}
                                label='Computer details'
                                table={table}
                                onClick={() => {
                                    setComputerDetailsItems({
                                        "Computer ID:": menuRow.computer_id,
                                        "Building: ": menuRow.building_code,
                                        "Room: " : menuRow.room,
                                        "System Unit: ": menuRow.system_unit,
                                        "Monitor: " : menuRow.monitor,
                                        "Condition: ":(menuRow.condition === 0)  ? "Good" 
                                                    : (menuRow.condition  === 1) ? "Minor Issue" 
                                                    : (menuRow.condition  === 2) ? "Major Issue" 
                                                    : (menuRow.condition  === 3) ? "Bad" 
                                                    : "Unknown",
                                        "Status: ": (menuRow.status === 0) ? "Inactive" 
                                                : (menuRow.status === 1 ) ? "Active" : "Unknown",
                                        "Pending Reports: ": menuRow.pending_reports,
                                        "Keyboard" : menuRow.has_keyboard === 1 ? "Keyboard Available" : "No Keyboard",
                                        "Mouse" : menuRow.has_mouse === 1 ? "Mouse Available" : "No Mouse",
                                        "Internet" : menuRow.has_internet === 1 ? "Internet Available" : "No Internet",
                                        "Software" : menuRow.has_software === 1 ? "Software/s Available" : "No Software/s",
                                        
                                    })
                                    setComputerDetailsModalOpen(true)
                                    // console.log(Object.entries(row), row.getValue)
                                }}
                            />,
                            <MRT_ActionMenuItem
                                key={"activate"}
                                label='Activate'
                                table={table}
                                onClick={() => handleUpdateComputerStatus(menuRow.computer_id, 1)}
                            />,
                            <MRT_ActionMenuItem
                                key={"deactivate"}
                                label='Deactivate'
                                table={table}
                                onClick={() => handleUpdateComputerStatus(menuRow.computer_id, 0)}
                            />,
                        ]}
                    }}
                />
            </Grid2>
            <Grid2 container spacing={2} size={{xs: 12, md:12, lg:12}} >
                <Grid2 size={{xs: 12, md:12, lg:12}} >
                    <Box sx={{fontFamily:'Inter',textAlign:'left', border: '1px solid '+palette.strokeWeak, p:2, borderRadius:'16px'}} width={'100%'} height={'100px'}>
                        <Typography sx={{fontSize:'16px', fontWeight:600, fontFamily:'Inter'}}>Total pending reports</Typography>
                        <Typography sx={{fontSize:'14px', fontWeight:400, fontFamily:'Inter', textAlign:'justify'}} > 
                            {totalReports === 0 
                                ? "There are currently no pending reports. Click here to submit a report" 
                                : <>The system detected <b style={{color:palette.badFont}}>{totalReports} pending report/s</b>. To submit a report, please click here or instead go to the reports section </>
                            }
                        </Typography>
                    </Box>
                </Grid2>
                <Grid2 size={{xs: 12, md:6, lg:6}} height={'300px'} maxHeight={'400px'}>
                    <StatBox head={'Computers Condition'} data={pcDCond} type="condition" keys={['good', 'minor', 'major', 'bad']}/>
                </Grid2>
                <Grid2 size={{xs: 12, md:6, lg:6}} height={'300px'} maxHeight={'400px'}>
                    <StatBox head={'Computers Status'} data={pcDStat} type="status" keys={['inactive', 'active']}/>
                </Grid2>

            </Grid2>
        </Grid2> :
        <Stack sx={{marginTop:2}}>
            {buildings.map((bdt, i) => {
                const filtered_rooms = roomcards.filter((rc) => rc.building_code === bdt.building_code)
                return <div key={`${bdt.building_code}-${i}`} style={{marginBottom: '4px', border:'1px solid #CCCCCC', borderRadius:'2px'}}>
                    <Accordion sx={{paddingTop:1, paddingBottom:2}} defaultExpanded={(i === 0) ? true : false}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            {bdt.building_name}
                        </AccordionSummary>
                        <AccordionDetails>
                        <Grid2 container spacing={2}>
                            <RoomBox 
                                setcreateRoomModalOpen={setcreateRoomModalOpen} 
                                rooms={filtered_rooms} 
                                selectedRooms={selectedRooms} 
                                setSelectedRooms={setSelectedRooms} 
                                getPcRows={getPcRows} 
                                onContextMenu={handleRoomCardMenuOpen}
                                setIsCompTableOpen={setIsCompTableOpen}
                                setComputersData={setComputersData}
                                setPcDCond={setPcDCond}
                                setPcDStat={setPcDStat}
                            />
                        </Grid2>
                    </AccordionDetails>
                    </Accordion>
                </div>
            })}
        </Stack>
        
        }
        </div>
        </Stack>
        <Menu
            open={Boolean(roomAnchorPosition)}
            onClose={handleRoomCardMenuClose}
            anchorReference='anchorPosition'
            anchorPosition={roomAnchorPosition}
        >
            <MenuItem
                onClick={()=>{
                    // TODO
                    setconfirmDeleteRoomModalSingle(true)
                    handleRoomCardMenuClose()
                }}
            >
                Delete Room
            </MenuItem>
            <MenuItem 
                onClick={()=>{
                    // TODO
                    setupdateRoomModal(true)
                    // console.log({room: rightClickedRoom.room, building_code:rightClickedRoom.building_code})
                    reset({room: rightClickedRoom.room, building_code:rightClickedRoom.building_code, room_id:rightClickedRoom.room_id})
                    handleRoomCardMenuClose()
                }}
            >

                Edit / Update
            </MenuItem>
        </Menu>
        <ReportModal
            open={computerTable_addReportModalOpen}
            setOpen={setComputerTable_AddReportModalOpen}
            permissionType={"admin"}
            toRefreshPc = {true}
            fetchLaboratoryData={handleReportComputerRefresh}

        />
        <SharedModal
            open={computerDetailsModalOpen}
            setOpen={setComputerDetailsModalOpen}
            items={computerDetailsItems}
        />
        <Form_Create_Computer
            createComputerModalOpen={createComputerModalOpen}
            setcreateComputerModalOpen={setcreateComputerModalOpen}
            getPcRows={getPcRows}
            handleSnackBarClick={handleSnackBarClick}
            fetchLabRooms={fetchLabRooms}
            targetedRoomsUI={targetedRoomsUI}
            typeTargetedRoomsUI={typeTargetedRoomsUI}
        />
        {/* UPDATE COMPUTER */}
        <Form_Update_Computer
            open={updateComputerModal}
            setopen={setupdateComputerModal}
            getPcRows={getPcRows}
            handleSnackBarClick={handleSnackBarClick}
            fetchLabRooms={fetchLabRooms}
            targetedRoomsUI={targetedRoomsUI}
            typeTargetedRoomsUI={typeTargetedRoomsUI}
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            reset={reset}
            control={control}

        />


        <Form_Create_Room
            createRoomModalOpen={createRoomModalOpen}
            setcreateRoomModalOpen={setcreateRoomModalOpen}
            mapRoomCards={mapRoomCards}
            handleSnackBarClick={handleSnackBarClick}
        />
        {/* UPDATE ROOM */}
        <Form_Update_Room
            open={updateRoomModal}
            setopen={setupdateRoomModal}
            fetchLabRooms={fetchLabRooms}
            handleSnackBarClick={handleSnackBarClick}
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            reset={reset}
        />

        {/* DELETE MODAL ROOM (SELECTED)*/}
        <Modal open={confirmDeleteRoomModalSelected} onClose={()=>setconfirmDeleteRoomModalSelected(false)}>
            <Box 
                sx={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400, bgcolor: 'background.paper',
                    boxShadow: 24, p: 4,
                }}
            >
                <Typography sx={{mb:2, fontFamily:'Inter'}} variant="h6">Are you sure you want to delete these rooms?</Typography>
                <Stack direction={'row'} sx={{justifyContent:'end'}}>
                    <Button
                        onClick={()=>{
                            const resselected =selectedRooms.map(sr=> ({room:sr.roomnum, building_code:sr.building_code}))
                            // console.log("SelectedRoom: ",resselected)
                            axios.post('/api/delete/room', {room: resselected})
                            .then(res => {
                                fetchLabRooms()
                                handleSnackBarClick("success", "Room Successfully edited")
                            }).catch((err)=>{
                                const ermsg = err.response.data || err
                                console.log("ERROR: ", ermsg)
                                handleSnackBarClick("error", ermsg)
                            }).finally(()=>{
                                setSelectedRooms([])
                                setconfirmDeleteRoomModalSelected(false)
                            })
                        }}
                    
                    >
                        Delete
                    </Button>
                    <Button
                        onClick={()=>setconfirmDeleteRoomModalSelected(false)}
                    >
                        Cancel
                    </Button>
                </Stack>
            </Box>
        </Modal>

        {/* DELETE MODAL ROOM (SINGLE) */}
        <Modal open={confirmDeleteRoomModalSingle} onClose={()=>{
            setconfirmDeleteRoomModalSingle(false)
            setrightClickedRoom({})
        }}>
            <Box 
                sx={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400, bgcolor: 'background.paper',
                    boxShadow: 24, p: 4,
                }}
            >
                <Typography sx={{mb:2, fontFamily:'Inter'}} variant="h6">Are you sure you want to delete this room?</Typography>
                <Stack direction={'row'} sx={{justifyContent:'end'}}>
                    <Button
                        onClick={()=>{
                            // console.log("Right Clicked Room: ",rightClickedRoom)
                            axios.post('/api/delete/room', {room: [rightClickedRoom]})
                            .then(res => {
                                fetchLabRooms()
                                handleSnackBarClick("success", "Room Successfully edited")
                            }).catch((err)=>{
                                const ermsg = err.response.data || err
                                console.log("ERROR: ", ermsg)
                                handleSnackBarClick("error", ermsg)
                            }).finally(()=>{
                                setrightClickedRoom({})
                                setconfirmDeleteRoomModalSingle(false)
                            })
                        }}
                    
                    >
                        Delete
                    </Button>
                    <Button
                        onClick={()=>{
                            setrightClickedRoom({})
                            setconfirmDeleteRoomModalSingle(false)
                        } }
                    >
                        Cancel
                    </Button>
                </Stack>
            </Box>
        </Modal>

        {/* DELETE MODAL PC (SINGLE) and selected */}
        <Modal open={confirmDeleteComputerModal} onClose={()=>{
            setconfirmDeleteComputerModal(false)
            // setrightClickedRoom({})
        }}>
            <Box 
                sx={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400, bgcolor: 'background.paper',
                    boxShadow: 24, p: 4,
                }}
            >
                <Typography sx={{mb:2, fontFamily:'Inter'}} variant="h6">{Object.entries(selectedComputersToDelete).length === 0 ? "Do you want to delete this computer?": "Delete selected computers?"}</Typography>
                <Stack direction={'row'} sx={{justifyContent:'end'}}>
                    <Button
                        onClick={handleDeleteComputer}
                    
                    >
                        Delete
                    </Button>
                    <Button
                        onClick={()=>{
                            setrightClickedComputer('')
                            // setselectedComputersToDelete({})                            
                            setconfirmDeleteComputerModal(false)
                        }}
                    >
                        Cancel
                    </Button>
                </Stack>
            </Box>
        </Modal>
        <SnackbarProvider maxSnack={2} autoHideDuration={2000}/>
    </div>
}

export default Laboratory;