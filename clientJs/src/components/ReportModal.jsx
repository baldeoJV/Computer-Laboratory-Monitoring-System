/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Modal, Box, Button, TextField, MenuItem, Select, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions, Stack, IconButton, Grid2, Chip } from '@mui/material';
import { Typography as InterTypography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
// FAKE DATA
import computers_data from '../assets/computers_data.json'
import rooms_data from '../assets/rooms_data.json'

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

// PDF
import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import ReportDocument from './ReportDocument';

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

const ReportModal = ({open = true, setOpen, isClosable = true, permissionType}) => {
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

    const [commentValue, setCommentValue] = useState('');
    const [studentId, setStudentId] = useState('');
    
    // const [building, setBuilding] = useState('');
    // const [room, setRoom] = useState(null);
    // const [computerId, setComputerId] = useState(null);

    const handleCommentChange = (e) => {
        setCommentValue(e.target.value)
    }

    const handleStudentIdChange = (e) => {
        setStudentId(e.target.value)
    }
    const submitReport = async (toDownload = false) => {
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
            alert(response.status);
            if (toDownload) {
                const partConArray = Object.entries(partsStatuses).filter(([k, v]) => v.condition).map(([k,v]) => v);
                const blob = await pdf(<ReportDocument 
                    reportedBuilding={reportedBuilding}
                    reportedPcID={reportedPcID}
                    reportedRoom={reportedRoom}
                    comment={commentValue}
                    submittee={studentId}
                    partsCondition={partConArray}
                />).toBlob();
                saveAs(blob, `${studentId}-report-form.pdf`);
            }
        } catch (err) {
            console.error("Error on report: ", err);
            alert(err.response.data);
        }
    }
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
                            
                            <InterTypography variant='h5' fontFamily={'Inter'} color={palette.textWeak} mb={3} fontWeight={500}>
                                Choose reporting area
                            </InterTypography>
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
                            getComputersByRoom(newRoom, setTargetedComputerIDs, reportedBuilding, permissionType)
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
                                label="Computer ID *"
                                sx={{ fontFamily: 'Inter' }}
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
                    <Button 
                        onClick={async () => {
                            if (isClosable){
                                setOpen(false)
                            }
                            await submitReport()
                        }} 

                        color="primary" 
                        variant='contained' 
                        sx={{ 
                            fontFamily: 'Inter',
                            ...smallButtonStyle
                        }} 
                        startIcon={<SendIcon/>}
                    >
                        Submit Report
                    </Button>
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
        </div>
    );
};

export default ReportModal;




// {parts.map((part) => (
//     <FormControl fullWidth sx={{ mt: 2 }} key={part}>
//         <InputLabel id={`${part}-condition-label`} sx={{ fontFamily: 'Inter' }}>{`${part} Condition`}</InputLabel>
//         <Select
//             labelId={`${part}-condition-label`}
//             value={conditions[part] || ''}
//             label={`${part} Condition`}
//             onChange={handleConditionChange(part)}
//             sx={{ fontFamily: 'Inter' }}
//         >
//             <MenuItem value="Minor Issue" sx={{ fontFamily: 'Inter' }}>Minor Issue</MenuItem>
//             <MenuItem value="Major Issue" sx={{ fontFamily: 'Inter' }}>Major Issue</MenuItem>
//             <MenuItem value="Critical Issue" sx={{ fontFamily: 'Inter' }}>Critical Issue</MenuItem>
//         </Select>
//     </FormControl>
// ))}