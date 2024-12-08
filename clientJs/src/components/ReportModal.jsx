/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Modal, Box, Button, TextField, MenuItem, Select, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions, Stack, IconButton, Grid2, Chip } from '@mui/material';
import { Typography as InterTypography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import computers_data from '../assets/computers_data.json'
import rooms_data from '../assets/rooms_data.json'
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
import {bgcolor, color, display, padding, styled} from '@mui/system'
import palette from '../assets/palette';
import SendIcon from '@mui/icons-material/Send';

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
            const currentStatus = partsStatuses[partKey].background;
            let newBackground = null;
            let newColor = null;

            if (currentStatus === 'transparent') {
                newBackground = palette.minorBg;
                newColor = palette.minorFont;
            } else if (currentStatus === palette.minorBg) {
                newBackground = palette.majorBg;
                newColor = palette.majorFont;
            } else if (currentStatus === palette.majorBg) {
                newBackground = palette.badBg;
                newColor = palette.badFont;
            } else {
                newBackground = 'transparent';
                newColor = palette.txtStrong;
            }

            return {
                ...prevStatuses,
                [partKey]: {
                    background: newBackground,
                    color: newColor,
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
    const partKey = label.toLowerCase().replaceAll(" ", "");
    const partStatus = partsStatuses[partKey].background;

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

const ReportModal = ({open, setOpen, anchor}) => {
    const [partsStatuses, setPartsStatuses] = useState({
        systemunit: { background: 'transparent', color: palette.textStrong },
        monitor: { background: 'transparent', color: palette.textStrong },
        software: { background: 'transparent', color: palette.textStrong },
        internet: { background: 'transparent', color: palette.textStrong },
        keyboard: { background: 'transparent', color: palette.textStrong },
        mouse: { background: 'transparent', color: palette.textStrong },
        other: { background: 'transparent', color: palette.textStrong },
    });
    const [commentValue, setCommentValue] = useState('');
    
    const [building, setBuilding] = useState('');
    const [room, setRoom] = useState(null);
    const [computerId, setComputerId] = useState(null);

    const handleCommentChange = (e) => {
        setCommentValue(e.target.value)
    }

    const getRooms = () => rooms_data
        .filter(room => room.building_code === building)
        .map(room => String(room.room));

    const getComputers = () => computers_data.rows
        .filter(computer => computer.room === Number(room) && computer.building_code === building)
        .map(computer => String(computer.computer_id));

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSubmit = () => handleClose();

    return (
        <div>
            <Dialog
                fullWidth={true}
                maxWidth={'lg'}
                open={open}
                onClose={handleClose}
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
                    <InterTypography variant='h5' fontFamily={'Inter'} color={palette.textWeak} mt={2} fontWeight={500}>
                                Select Location
                    </InterTypography>
                    <FormControl fullWidth sx={{ mt: 2, mb:2}}>
                        <InputLabel id="building-label" sx={{ fontFamily: 'Inter' }}>Building *</InputLabel>
                        <Select
                            labelId="building-label"
                            value={building}
                            label="Building"
                            onChange={(e) => {
                                setRoom(null);
                                setComputerId(null);
                                setBuilding(e.target.value);
                            }}
                            sx={{ fontFamily: 'Inter' }}
                        >
                            <MenuItem value="MB" sx={{ fontFamily: 'Inter' }}>Main Building</MenuItem>
                            <MenuItem value="ANB" sx={{ fontFamily: 'Inter' }}>Annex Building</MenuItem>
                            <MenuItem value="MND" sx={{ fontFamily: 'Inter' }}>Mendiola Building</MenuItem>
                        </Select>
                    </FormControl>
                    <Autocomplete
                        options={getRooms()}
                        value={room}
                        sx={{mb:2}}
                        onChange={(event, newRoom) => {
                            setComputerId(null);
                            setRoom(newRoom);
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
                    <Autocomplete
                        options={getComputers()}
                        value={computerId}
                        onChange={(event, newComputerId) => setComputerId(newComputerId)}
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
                    <Button onClick={handleSubmit} color="primary" variant='contained' sx={{ mt: 2, fontFamily: 'Inter' }} startIcon={<SendIcon/>}>
                        Submit Report
                    </Button>
                    <Button onClick={handleClose} color="default" variant='contained' sx={{ mt: 2, fontFamily: 'Inter' }}>
                        Close
                    </Button>
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