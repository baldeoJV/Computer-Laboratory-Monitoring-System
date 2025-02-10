/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Modal, Box, Button, TextField, MenuItem, Select, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions, Stack, IconButton, Grid2, Chip, Tooltip } from '@mui/material';
import { Typography as InterTypography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
// FAKE DATA
import computers_data from '../assets/computers_data.json'
import rooms_data from '../assets/rooms_data.json'
import Countdown from 'react-countdown';

import axios from 'axios'

import CircularProgress from '@mui/material/CircularProgress';
import Slide from '@mui/material/Slide';
import MonitorIcon from '@mui/icons-material/Monitor';
import { BsCpuFill } from "react-icons/bs";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MouseIcon from '@mui/icons-material/Mouse';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import AppsIcon from '@mui/icons-material/Apps';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types'
import '@fontsource/inter'; 
import '@fontsource/inter/700.css';
import '@fontsource/inter/600.css';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import {bgcolor, color, display, padding, styled, textTransform} from '@mui/system'
import palette from '../assets/palette';
import SendIcon from '@mui/icons-material/Send';
import useStore from '../useStore';
import { getComputersByRoom, getRoomsByBuilding } from '../customMethods';
import { NavLink } from 'react-router-dom';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// PDF
import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import ReportDocument from './ReportDocument';

import { useForm } from 'react-hook-form';
import { motion, AnimatePresence, delay } from 'motion/react';
import {SnackbarProvider, enqueueSnackbar} from 'notistack'
import Zoom from '@mui/material/Zoom';


function MaxHeightTextarea({textAreaValue, setTextAreaValue}) {
    const handleChange = (e) => {
        setTextAreaValue(e.target.value)
    }
    const blue = {
        100: '#DAECFF',
        200: '#b6daff',
        400: '#3399FF',
        500: '#007FFF',
        600: '#0072E5',
        900: '#003A75',
    };

    const grey = {
        50: '#F3F6F9',
        100: '#E5EAF2',
        200: '#DAE2ED',
        300: '#C7D0DD',
        400: '#B0B8C4',
        500: '#9DA8B7',
        600: '#6B7A90',
        700: '#434D5B',
        800: '#303740',
        900: '#1C2025',
    };

    const Textarea = styled(BaseTextareaAutosize)(
        ({ theme }) => `
        box-sizing: border-box;
        width: 320px;
        font-family: 'Inter', sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 8px 12px;
        border-radius: 8px;
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

        &:hover {
        border-color: ${blue[400]};
        }

        &:focus {
        border-color: ${blue[400]};
        box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
        }

        // firefox
        &:focus-visible {
        outline: 0;
        }
    `,
    );

    return (
        <Textarea 
            sx={{width:'100%'}}
            maxRows={4}
            value={textAreaValue}
            onChange={handleChange}
            placeholder={`Input your comment (optional). If you reported ${'"Others"'}, please write out a comment to explain the problem`}
        />
    );
}

MaxHeightTextarea.propTypes = {
    textAreaValue: PropTypes.string,
    setTextAreaValue: PropTypes.func,
};
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} {...props}/>;
});

const ReportIconButton = ({ icon: Icon, label, partsStatuses, setPartsStatuses }) => {
    const partKey = label.toLowerCase().replaceAll(" ", "");
    const partStatus = partsStatuses[partKey].background;
    const partLabel = partStatus === palette.minorBg ? "Minor Issue"
                    : partStatus === palette.majorBg ? "Major Issue"
                    : partStatus === palette.badBg ? "Bad Condition"
                    : "Condition";
    const handleClick = () => {
        setPartsStatuses(prevStatuses => {
            const currentCondition = partsStatuses[partKey].condition;
            let newBackground = null;
            let newColor = null;
            let newCondition = ''
            if (currentCondition === '') {
                newBackground = palette.minorBg;
                newColor = palette.minorFont;
                newCondition = 'Minor Issue'
            } else if (currentCondition === 'Minor Issue') {
                newBackground = palette.majorBg;
                newColor = palette.majorFont;
                newCondition = 'Major Issue'
            } else if (currentCondition === 'Major Issue') {
                newBackground = palette.badBg;
                newColor = palette.badFont;
                newCondition = 'Bad Condition'
            } else {
                newBackground = 'transparent';
                newColor = palette.txtStrong;
                newCondition = ''
            }

            return {
                ...prevStatuses,
                [partKey]: {
                    ...prevStatuses[partKey],
                    background: newBackground,
                    color: newColor,
                    condition: newCondition,
                }
            };
        });
    };

    return (
        <IconButton 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '8px',
                width: '110px', 
                height: '80px',
                border: `1px solid ${palette.strokeMain}`, 
                borderRadius: '8px',
                backgroundColor: partsStatuses[partKey].background,
                color: partsStatuses[partKey].color
            }}
            disableRipple
            onClick={handleClick}
        >
            <Icon style={{ fontSize: '1.9rem' }} />
            <InterTypography 
                variant='caption'
                sx={{
                    color: partsStatuses[partKey].color,
                    marginTop: 0.5,
                    fontWeight:'600',
                }}
            >
                {partLabel}
            </InterTypography>
        </IconButton>
    );
};

ReportIconButton.propTypes = {
    icon: PropTypes.any,
    label: PropTypes.string,
    partsStatuses: PropTypes.object,
    setPartsStatuses: PropTypes.func,
};

const gridPreset = {
    xs: 12, // Full width on super small screens (1 button per row)
    sm: 6,  // Two buttons per row on small screens
    md: 4,  // Three buttons per row on medium screens
    lg: 3,  // Four buttons per row on large screens
    textAlign: 'center',
    marginBottom: 1,
  };

const ReportGridItem = ({ icon: Icon, label, partsStatuses, setPartsStatuses }) => {
    return (
        <Grid2 {...gridPreset}>
            <ReportIconButton 
                icon={Icon} 
                label={label} 
                partsStatuses={partsStatuses}
                setPartsStatuses={setPartsStatuses}
            />
            <InterTypography 
                fontFamily={'Inter'} 
                variant='caption'
                marginTop={1} 
                sx={{ fontSize: { xs: '0.70rem', sm: '0.90rem', md: '1rem' } }}
            >
                {label}
            </InterTypography>
        </Grid2>
    );
};

ReportGridItem.propTypes = {
    icon: PropTypes.any,
    label: PropTypes.string,
    partsStatuses: PropTypes.object,
    setPartsStatuses: PropTypes.func,
};

const smallButtonStyle = {
    textTransform: 'none'
}

const ReportModal = ({open = true, setOpen, isClosable = true, permissionType, toRefresh = false, fetchReport = null}) => {
    const [partsStatuses, setPartsStatuses] = useState({
        systemunit: { background: 'transparent', color: palette.txtStrong, condition: '', key:'System Unit',},
        monitor: { background: 'transparent', color: palette.txtStrong, condition: '', key:'Monitor',},
        software: { background: 'transparent', color: palette.txtStrong, condition: '', key:'Software',},
        internet: { background: 'transparent', color: palette.txtStrong, condition: '', key:'Internet',},
        keyboard: { background: 'transparent', color: palette.txtStrong, condition: '', key:'Keyboard',},
        mouse: { background: 'transparent', color: palette.txtStrong, condition: '', key:'Mouse',},
        other: { background: 'transparent', color: palette.txtStrong, condition: '', key:'Others',},
    });
    const {
        reportedRoom, setReportedRoom,
        reportedBuilding, setReportedBuilding,
        reportedPcID, setReportedPcID,
        targetedRooms, setTargetedRooms,
        targetedComputerIDs, setTargetedComputerIDs
    } = useStore()
    const wantedDelay = 10000
    const [openConfirmModal, setopenConfirmModal] = useState(false);
    const [toDownload, settoDownload] = useState(false);
    const [commentValue, setCommentValue] = useState('');
    const [studentId, setStudentId] = useState('');
    const [timer, settimer] = useState({date: Date.now(), delay: 0});
    // const [building, setBuilding] = useState('');
    // const [room, setRoom] = useState(null);
    // const [computerId, setComputerId] = useState(null);
    const handleSnackBarClick = (variant, err_msg) => {
        enqueueSnackbar(err_msg, {variant: variant, anchorOrigin:{ vertical: 'bottom', horizontal: 'center' }})
    } 


    const handleCommentChange = (e) => {
        setCommentValue(e.target.value)
    }

    const handleStudentIdChange = (e) => {
        setStudentId(e.target.value)
    }
    
    const submitReport = async (toDl = false) => {
        try {
            const response = await axios.post('/api/create/report', {
                pcId: reportedPcID,
                room: reportedRoom,
                building_code: reportedBuilding,
                reported_conditions: {
                    mouse : partsStatuses['mouse'].condition,
                    internet : partsStatuses['internet'].condition,
                    monitor : partsStatuses['monitor'].condition,
                    other : partsStatuses['other'].condition,
                    software : partsStatuses['software'].condition,
                    keyboard : partsStatuses['keyboard'].condition,
                    system_unit : partsStatuses['systemunit'].condition,
                },
                report_comment: commentValue,
                submittee: studentId
            });
            if (toDownload || toDl) {
                const partConArray = Object.entries(partsStatuses).filter(([k, v]) => v.condition).map(([k,v]) => v);
                const blob = await pdf(<ReportDocument 
                    reportedBuilding={reportedBuilding}
                    reportedPcID={reportedPcID}
                    reportedRoom={reportedRoom}
                    comment={commentValue}
                    submittee={studentId}
                    partsCondition={partConArray}
                />).toBlob();
                console.log("Doiwnload");
                
                saveAs(blob, `${studentId}-report-form.pdf`);
            }
            if (toRefresh){
                fetchReport()
            }
            handleSnackBarClick("success", "Report Submitted")
        } catch (err) {
            console.error("Error on report: ", err);            
            handleSnackBarClick("error", err.response.data || err.message)
        }
        setopenConfirmModal(false)
        settoDownload(false)
    }
    const getLocalStorageValue = (s) => localStorage.getItem(s);
    useEffect(()=> {
        if (permissionType === "guest"){
            const savedDate = getLocalStorageValue("end_date")
            // IF THERE IS EXISTING TIMER
            if (savedDate != null && !isNaN(savedDate)){
                const currentTime = Date.now()
                // GET REMAINING TIME OF THE TIMER
                const delta = parseInt(savedDate, 10) - currentTime
    
                // IF THE SAVED TIMER ALREADY EXPIRED
                if (delta > wantedDelay){
                    true
                }
            }
        }

    }, [])
    return (
        <div>
            <Dialog
                fullWidth={true}
                maxWidth={'lg'}
                open={open}
                onClose={isClosable? () => setOpen(false) : null}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle 
                    sx={{
                        borderBottom:'1px solid '+palette.strokeMain
                    }}
                >
                    {"Report a Computer Issue"}
                </DialogTitle>
                <DialogContent
                    sx={{
                        borderTopRightRadius:'16px',
                        borderTopLeftRadius:'16px',
                    }}
                >
                    
                    <FormControl fullWidth>
                        <Stack sx={{ marginTop: 2}}>
                            <Stack direction={'row'} sx={{justifyContent: 'space-between'}}>
                                <InterTypography variant='h5' fontFamily={'Inter'} color={palette.textWeak} mb={3} fontWeight={500}>
                                    Choose reporting area
                                </InterTypography>
                                <Tooltip
                                    sx={{ cursor: "pointer" }}
                                    arrow
                                    title={
                                        <Stack>
                                            <InterTypography>
                                                <span style={{ color: palette.goodFont, fontWeight: "bold" }}>1. Good Condition:</span> No issues detected, fully functional, and operates smoothly.
                                            </InterTypography>
                                            <InterTypography>
                                                <span style={{ color: palette.minorFont, fontWeight: "bold" }}>2. Minor Issue:</span> Slight wear and tear, but performance remains mostly unaffected.
                                            </InterTypography>
                                            <InterTypography>
                                                <span style={{ color: palette.majorFont, fontWeight: "bold" }}>3. Major Issue:</span> Significant functional problems that may affect performance or usability.
                                            </InterTypography>
                                            <InterTypography>
                                                <span style={{ color: palette.badFont, fontWeight: "bold" }}>4. Bad Condition:</span> Severe damage or malfunction, requiring immediate repair or replacement.
                                            </InterTypography>
                                        </Stack>
                                    }
                                    slots={{
                                        transition: Zoom,
                                    }}
                                    slotProps={{
                                        tooltip: {
                                            sx: {
                                                backgroundColor: "rgba(255, 255, 255, 0.8)", // Light background
                                                color: "#000", // Dark text for contrast
                                                boxShadow: 2, // Soft shadow effect
                                                borderRadius: 1, // Slightly rounded corners
                                                padding: "8px",
                                            },
                                        },
                                    }}
                                >
                                    <InfoOutlinedIcon sx={{color: palette.strongFill, cursor:'pointer'}}/>
                                </Tooltip>

                            </Stack>

                            <Grid2 container spacing={2}   
                                sx={{
                                    gap: { xs: 1, sm: 2 },
                                    width:'100%',
                                }}
                            >
                                <ReportGridItem icon={BsCpuFill} label="System Unit" partsStatuses={partsStatuses} setPartsStatuses={setPartsStatuses} />
                                <ReportGridItem icon={MonitorIcon} label="Monitor" partsStatuses={partsStatuses} setPartsStatuses={setPartsStatuses} />
                                <ReportGridItem icon={AppsIcon} label="Software" partsStatuses={partsStatuses} setPartsStatuses={setPartsStatuses} />
                                <ReportGridItem icon={WifiOffIcon} label="Internet" partsStatuses={partsStatuses} setPartsStatuses={setPartsStatuses} />
                                <ReportGridItem icon={KeyboardIcon} label="Keyboard" partsStatuses={partsStatuses} setPartsStatuses={setPartsStatuses} />
                                <ReportGridItem icon={MouseIcon} label="Mouse" partsStatuses={partsStatuses} setPartsStatuses={setPartsStatuses} />
                                <ReportGridItem icon={MoreHorizIcon} label="Other" partsStatuses={partsStatuses} setPartsStatuses={setPartsStatuses} />
                            </Grid2>
                        </Stack>
                    </FormControl>
                    {permissionType === "guest" && <>
                        <InterTypography variant='h5' fontFamily={'Inter'} color={palette.textWeak} mt={2} mb={1.5} fontWeight={500}>
                            Enter your student / faculty ID
                        </InterTypography>
                        <TextField
                            id="outlined-multiline-static"
                            label="student / faculty ID"
                            placeholder={`e.g 2021-106072, 2023-106671`}
                            sx={{width:'30%'}}
                            value={studentId}
                            onChange={handleStudentIdChange}
                        />
                    </>}

                    <InterTypography variant='h5' fontFamily={'Inter'} color={palette.textWeak} mt={2} fontWeight={500}>
                        Select Location
                    </InterTypography>

                    {/*BUILDING FIELD*/}
                    <FormControl fullWidth sx={{ mt: 2, mb:2}}>
                        <InputLabel id="building-label" sx={{ fontFamily: 'Inter' }}>Building *</InputLabel>
                        <Select
                            labelId="building-label"
                            value={reportedBuilding}
                            label="Building"
                            onChange={(e) => {
                                setReportedRoom(null);
                                setReportedPcID(null);
                                setReportedBuilding(e.target.value);
                                getRoomsByBuilding(e.target.value, setTargetedRooms, permissionType)
                            }}
                            sx={{ fontFamily: 'Inter' }}
                        >
                            <MenuItem value="MB" sx={{ fontFamily: 'Inter' }}>Main Building</MenuItem>
                            <MenuItem value="ANB" sx={{ fontFamily: 'Inter' }}>Annex Building</MenuItem>
                            <MenuItem value="MND" sx={{ fontFamily: 'Inter' }}>Mendiola Building</MenuItem>
                        </Select>
                    </FormControl>

                    {/* ROOM FIELD */}
                    <Autocomplete
                        options={targetedRooms}
                        value={reportedRoom}
                        sx={{mb:2}}
                        onChange={(event, newRoom) => {
                            setReportedPcID(null);
                            setReportedRoom(newRoom);
                            getComputersByRoom(newRoom, setTargetedComputerIDs, reportedBuilding, permissionType, setReportedRoom)
                        }}
                        disablePortal
                        renderInput={params => 
                            <TextField
                                {...params}
                                label="Room *"
                                sx={{ fontFamily: 'Inter' }}
                            />
                        }
                    />

                    {/* COMPUTERS */}
                    <Autocomplete
                        options={targetedComputerIDs}
                        value={reportedPcID}
                        onChange={(event, newComputerId) => {

                            setReportedPcID(newComputerId)
                        }}
                        disablePortal
                        sx={{mb:2}}
                        renderInput={params => 
                            <TextField
                                {...params}
                                label={`Computer ID * \t\t    The Computer ID can be found on the top of the system unit`}
                                sx={{ fontFamily: 'Inter' }}
                                placeholder='The Computer ID can be found on the top of the system unit'
                            />
                        }
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Comment *"
                        placeholder={`Input your comment (optional). If you reported ${'"Others"'}, please write out a comment to explain the problem`}
                        multiline
                        fullWidth
                        rows={4}
                        value={commentValue}
                        onChange={handleCommentChange}
                    />
                </DialogContent>
                <DialogActions sx={{mx:4}}>
                    <Countdown
                        date={timer.date + timer.delay}
                        onComplete={()=>{
                            // IF THE TIMER EXPIRED, remove the timer
                            if(getLocalStorageValue("end_date") != null){
                                localStorage.removeItem("end_date")
                            }
                        }}
                        renderer={({hours, minutes, seconds, completed, total})=> <>
                            <Button 
                                disabled={!completed}
                                onClick={()=> {
                                    settoDownload(false)
                                    setopenConfirmModal(true)
                                }}
                                color="primary" 
                                variant='contained' 
                                sx={{ 
                                    fontFamily: 'Inter',
                                    ...smallButtonStyle
                                }} 
                                startIcon={completed ? <SendIcon/> : null}
                            >
                                
                                {completed ? 'Submit Report' : `${hours} : ${minutes} : ${seconds}`}
                            </Button>
                        </>}
                    />

                    <Button 
                        disabled={!(reportedBuilding && reportedPcID && reportedRoom && (permissionType === "admin" ? true : studentId))}
                        sx={{ 
                            padding: '6px 16px',
                            fontFamily: 'Inter',
                            ...smallButtonStyle,
                            color:palette.badFont,
                            border:'1px solid '+palette.badFont
                        }} 
                        startIcon={<PictureAsPdfIcon sx={{color:palette.badFont}}/>}
                        onClick={async () => {
                            settoDownload(true)
                            await submitReport(true)
                        }}
                    >
                        Submit Report & Download PDF
                    </Button>
                    {isClosable 
                        ? ( 
                            <Button onClick={() => isClosable ? setOpen(false) : null} color="default" variant='outlined' 
                                sx={{ 
                                    borderColor: '#5F5F5F',
                                    color: '#4F4F4F',
                                    textTransform: 'none',
                                    '&:hover': {
                                        borderColor: '#3C3C3C',
                                        backgroundColor: '#F5F5F5',
                                    },
                                    fontWeight:'600'
                                }}
                            >
                                Close
                            </Button>
                        )
                        : (
                            <NavLink to={'/'}>
                            <Button
                            variant="outlined"
                            sx={{
                                borderColor: '#5F5F5F',
                                color: '#4F4F4F',
                                textTransform: 'none',
                                padding: '6px 16px',
                                '&:hover': {
                                    borderColor: '#3C3C3C',
                                    backgroundColor: '#F5F5F5',
                                },
                                fontWeight:'600'
                            }}
                            >
                            Cancel
                            </Button>
                            </NavLink>
                        )
                    }
                </DialogActions>
            </Dialog>
            <Modal
                open={openConfirmModal}
                onClose={()=>setopenConfirmModal(false)}
            >
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
                        <InterTypography variant='h6' fontWeight={'400'} mb={4} alignContent={'center'} sx={{textAlign:'center', mt:2}}> Are you sure you want to submit? </InterTypography>
                        <Button
                        onClick={async () => {
                            if (isClosable){
                                setOpen(false)
                            }
                            if (!(reportedBuilding && reportedPcID && reportedBuilding && (studentId? studentId : true))){
                                alert("You must fill out all the forms")
                                setopenConfirmModal(false)
                            } else {
                                await submitReport()
                            
                                setReportedBuilding('')
                                setReportedRoom('')
                                setReportedPcID('')
                                setCommentValue('')
                                setStudentId('')
                                setPartsStatuses({
                                    systemunit: { background: 'transparent', color: palette.txtStrong, condition: '', key:'System Unit',},
                                    monitor: { background: 'transparent', color: palette.txtStrong, condition: '', key:'Monitor',},
                                    software: { background: 'transparent', color: palette.txtStrong, condition: '', key:'Software',},
                                    internet: { background: 'transparent', color: palette.txtStrong, condition: '', key:'Internet',},
                                    keyboard: { background: 'transparent', color: palette.txtStrong, condition: '', key:'Keyboard',},
                                    mouse: { background: 'transparent', color: palette.txtStrong, condition: '', key:'Mouse',},
                                    other: { background: 'transparent', color: palette.txtStrong, condition: '', key:'Others',},
                                })
                            }

                        }} 
                        
                        >Submit</Button>
                    </Stack>
                </Box>
            </Modal>
            <SnackbarProvider maxSnack={2} autoHideDuration={2000}/>
        </div>
    );
};

export default ReportModal;
