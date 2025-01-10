/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import PropTypes from 'prop-types'
import palette from '../assets/palette.js'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Checkbox, Chip, Collapse, IconButton, Menu, MenuItem, Stack, Tab, TablePagination, TableSortLabel, Tabs, Typography } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { useEffect, useMemo, useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import useStore from '../useStore.js';
import '@fontsource/inter/700.css'; 
import '@fontsource/inter/600.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React from "react"; 
import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import '@fontsource/inter'; 
import { createTheme, ThemeProvider, alpha, getContrastRatio } from '@mui/material/styles';
import FlagIcon from '@mui/icons-material/Flag';
import { green, red } from '@mui/material/colors';
import ReportModal from './ReportModal.jsx';
import { getComputersByRoom, getRoomsByBuilding } from '../customMethods.js';

// compares the rows value, lower or higher value gets placed first or last depending on orderBy
const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

// idk wtf this function do ...
// check if ascn or desc, also a and b came from [...rows].sort()
const getComparator = (order, orderBy) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}


function ITableHead({numSelected, onRequestSort, onSelectAllClick, order, orderBy, rowCount, headCells, type}) {
    const createSortHandler = (p) => (e) => {
        onRequestSort(e, p)
    }

    return(
        <TableHead >
            <TableRow>
                {type !== "archivedTable" &&
                <TableCell padding='checkbox'>
                    <Checkbox
                        sx={{
                            '&.Mui-checked': {
                                color: palette.selected,
                            },
                            '&.MuiCheckbox-indeterminate': {
                                color: palette.selected,
                            },
                        }}
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all computers',
                        }}
                    />
                </TableCell>
                }
                {headCells.map((hc,i) => {
                    const collapsibleHead = () => (type === "reportTable" || type ==="archivedTable") && i === 0
                        ? <TableCell 
                            key={hc.id + " - collapsible"}
                            //{hc.disablePadding ? 'none' : 'normal'}
                            sx={{fontSize:'small', fontWeight:'600', p:0, pl:1, pr:2}}
                        >
                            Details
                        </TableCell>
                        : null
                    


                    return <React.Fragment key={'Fragment' + i}>
                    {collapsibleHead()}
                    <TableCell 
                            key={hc.id}
                            //{hc.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === hc.id ? order : false}
                            sx={{fontSize:'small', fontWeight:'600', p:1}}
                        >
                            <TableSortLabel
                                active={orderBy === hc.id}
                                direction={orderBy === hc.id ? order : 'asc'}
                                onClick={createSortHandler(hc.id)}
                            >
                                {hc.label}
                                {orderBy === hc.id ? <Box
                                    component={'span'}
                                    sx={visuallyHidden}
                                >
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box> : null}
                            </TableSortLabel>
                        </TableCell>
                    </React.Fragment>

                    })}
                {(type !== "archivedTable" && type!=='consumableTable')?
                <TableCell>
                    Action
                </TableCell> : type!=="archivedTable" && type==='consumableTable' ? <TableCell sx={{textAlign:'center'}}>
                    Action 
                </TableCell>: null
                }

            </TableRow>
        </TableHead>
    )
}


function ComputerRow ({isItemSelected, labelId, r, handleMenuClick, handleCheckClick}) {
    const getChipTheme = (condition) => {
        const baseColor = condition === 0 ? palette.goodBg :
                          condition === 1 ? palette.minorBg :
                          condition === 2 ? palette.majorBg :
                          condition === 3 ? palette.badBg : palette.darkBlue;
        const fontColor = condition === 0 ? palette.goodFont :
                            condition === 1 ? palette.minorFont :
                            condition === 2 ? palette.majorFont :
                            condition === 3 ? palette.badFont : "#333333";
        // console.log("Condition: " +condition)
        return createTheme({
            palette: {
                custom: {
                    main: baseColor,
                    contrastText: getContrastRatio(baseColor, '#fff') > 4.5 ? '#fff' : '#111',
                    fontColor: fontColor,
                },
            },
        });
    };
                    
    return <TableRow 
        key={`computer-row-${r.computer_id}`}
        hover
        // TODO, database
        onClick={(e) => handleCheckClick(e, r.computer_id)}
        role="checkbox"
        aria-checked={isItemSelected}
        sx={{cursor: 'pointer'}}
    >
        <TableCell padding='checkbox' sx={{fontSize:'small'}}>
        <Checkbox
            sx={{
                '&.Mui-checked': {
                    color: palette.selected, 
                }
            }}
            checked={isItemSelected}
            inputProps={{"aria-labelledby":labelId}}
        />
        </TableCell>

        <TableCell component={"th"} id={labelId} scope='row'>
            {r.computer_id}
        </TableCell>

        <TableCell padding='none'>
            {r.room}
        </TableCell>

        <TableCell padding='none'>
            {r.system_unit}
        </TableCell>

        <TableCell padding='none'>
            {r.monitor}
        </TableCell>
        <TableCell padding='none'>
        {(() => {
            const theme = getChipTheme(r.condition)
            return  <ThemeProvider theme={theme}>
            <Chip
                variant='filled'
                sx={{
                    m: 0.5,
                    p: 0.5,
                    backgroundColor: theme.palette.custom.main,
                    color: theme.palette.custom.fontColor,
                    fontWeight:'600'
                }}
                label={
                    (r.condition === 0) ? "Good" : 
                    (r.condition === 1) ? "Minor Issue" : 
                    (r.condition === 2) ? "Major Issue" : 
                    (r.condition === 3) ? "Bad" : "Unlisted"
                }            
            />
            </ThemeProvider> 

        }) ()}
        
        </TableCell>
        <TableCell padding='none' sx={{paddingLeft:'4px'}}>
            <Chip
                variant='outlined'
                sx={{fontWeight:'600', borderWidth:'2px', borderRadius:'6px', borderColor:`${(r.status === 0) ? '#686D76 !important' : 'primary'}`}}
                label={
                    (r.status === 0) ? "Inactive" : "Active" 

                }
                color={
                    (r.status === 0) ? "default" : "primary" 
                }
            />
        </TableCell>
        <TableCell align='left' padding='none' sx={{paddingLeft:'4%'}}>
            {r.pending_reports}
        </TableCell>
        <TableCell>
            <IconButton
                onClick={(e) => handleMenuClick(e, r)}
                aria-haspopup="true"
                aria-controls='row-menu'
                sx={{
                    "&:focus": {
                        outline:'none'
                    }
                }}
            >
                <MoreHorizIcon/>
            </IconButton>
        </TableCell>

    </TableRow>
}

const reports_condition_indication = ["Good", "Minor issue", "Major issue", "Bad"]
// const baseColor = condition === 0 || condition.includes("good") ? palette.goodBg :
// condition === 1 || condition.includes("minor") ? palette.minorBg :
// condition === 2 || condition.includes("major") ? palette.majorBg :
// condition === 3 || condition.includes("bad") ? palette.badBg : palette.darkBlue;
// const fontColor = condition === 0 || condition.includes("good") ? palette.goodFont :
//   condition === 1 || condition.includes("minor") ? palette.minorFont :
//   condition === 2 || condition.includes("major") ? palette.majorFont :
//   condition === 3 || condition.includes("bad") ? palette.badFont : "#333333";
function ReportRow ({isItemSelected, labelId, r, handleMenuClick, handleCheckClick}) {
    const [collapseOpen, setCollapseOpen] = useState(false);

    const getChipTheme = (condition) => {
        const baseColor = condition === 0 ? palette.goodBg :
                          condition === 1 ? palette.minorBg :
                          condition === 2 ? palette.majorBg :
                          condition === 3 ? palette.badBg : palette.darkBlue;
        const fontColor = condition === 0 ? palette.goodFont :
                            condition === 1 ? palette.minorFont :
                            condition === 2 ? palette.majorFont :
                            condition === 3 ? palette.badFont : "#333333";
        return createTheme({
            palette: {
                custom: {
                    main: baseColor,
                    contrastText: getContrastRatio(baseColor, '#fff') > 4.5 ? '#fff' : '#111',
                    fontColor: fontColor,
                },
            },
        });
    };

    return <>
    <TableRow
        key={`report-row-${r.report_id}`}
        hover
        onClick={(e) => handleCheckClick(e, r.report_id)}
        aria-checked={isItemSelected}
        sx={{cursor: 'pointer'}}
        role="checkbox"
    >
        <TableCell padding='checkbox' sx={{fontSize:'small'}}>
            <Checkbox
                sx={{
                    '&.Mui-checked': {
                        color: palette.selected, 
                    }
                }}
                checked={isItemSelected}
                inputProps={{"aria-labelledby":labelId}}
            />
        </TableCell>
        <TableCell padding='checkbox'>
            <IconButton
                size='small'
                onClick={(e, r) => {
                    e.stopPropagation()
                    setCollapseOpen(!collapseOpen)
                }}
            >
                {collapseOpen ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>} 
            </IconButton>
        </TableCell>

        <TableCell component={"th"} id={labelId} scope='row'>
            {r.report_id}
        </TableCell>

        <TableCell>
            {r.computer_id}
        </TableCell>

        <TableCell>
            {r.room + " - " + r.building}
        </TableCell>

        <TableCell padding='none' sx={{paddingRight:4}}>
            {(() => {
                const filtered = Object.entries(r.components)
                                    .filter(([k, v])=> v)
                const mapped = filtered.map(([k, v], i) => {
                    console.log("VVV: " ,v)
                    const theme = getChipTheme(v);
                    {/* + ": " +v.charAt(0).toUpperCase()+v.split(" ")[0].slice(1) */}
                    return (
                        <ThemeProvider theme={theme} key={'chip - '+i}>
                            <Chip
                                variant='filled'
                                sx={{
                                    m: 0.5,
                                    p: 0.5,
                                    backgroundColor: theme.palette.custom.main,
                                    color: theme.palette.custom.fontColor,
                                    fontWeight:'600'
                                }}
                                label={k.charAt(0).toUpperCase() + k.replace("_", " ").slice(1) + ": " + reports_condition_indication[v]}
                            />
                        </ThemeProvider>
                    );
                });
                return <>{mapped}</>
            }) ()}
        </TableCell>
        <TableCell sx={{paddingLeft:'4px'}}>
            {r.date_submitted}
        </TableCell>
        <TableCell padding='none' sx={{paddingLeft:'4px'}}>
            {r.submittee}
        </TableCell>
        <TableCell>
            <IconButton
                onClick={(e) => handleMenuClick(e, r)}
                aria-haspopup="true"
                aria-controls='row-menu'
                sx={{
                    "&:focus": {
                        outline:'none'
                    }
                }}
            >
                <MoreHorizIcon/>
            </IconButton>
        </TableCell>
    </TableRow>
    <TableRow
        key={'collapse-row'+r.report_id}
    >
        <TableCell sx={{paddingBottom:0, paddingTop:0, border: collapseOpen ? '2px dashed '+palette.selected : 'none', width:'100%'}} colSpan={12}>
            <Collapse in={collapseOpen} timeout='auto' unmountOnExit>
                <Box sx={{margin:1}}>
                    <Typography variant='h6' gutterBottom component='div' sx={{ fontFamily: 'Inter, sans-serif' }}>
                        Report Details
                    </Typography>
                    <Stack direction={'row'} sx={{height:'100%'}}>
                        <Table size='small' aria-label='conditions' sx={{height:'100%'}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{fontWeight:700}}>Component</TableCell>
                                    <TableCell sx={{fontWeight:700}}>Condition</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.entries(r.components).map( ([k, v], i)=> v 
                                    ? <TableRow direction='row' key={`collapse-component-${r.report_id}-${i}`}>
                                       <TableCell>{k}</TableCell>
                                       <TableCell>{reports_condition_indication[v]}</TableCell>
                                    </TableRow>
                                    : null
                                )}
                            </TableBody>
                        </Table>

                        <Stack sx={{width:'100%', maxHeight:'23vh',minHeight:'15vh' , border:'1px solid '+palette.strokeMain, p:1.5, borderRadius:'8px', ml:3}}>
                            <Typography mb={1} fontSize={'20px'} sx={{ fontFamily: 'Inter, sans-serif' }}>
                                Comment
                            </Typography>
                            <Typography 
                                variant='caption'
                                fontSize={'14px'}
                                sx={{ 
                                    fontFamily: 'Inter, sans-serif', 
                                    backgroundColor: '#f9f9f9',
                                    border:'1px solid'+palette.strokeMain,
                                    padding:'4px',
                                    px:'8px',
                                    textAlign:'justify',
                                    color: '#333', 
                                    borderRadius:'8px', 
                                    height:'100%', 
                                    overflowY:'auto',
                                    wordBreak:'break-word',
                                    '&::-webkit-scrollbar': {
                                        width: '4px', // scrollbar width
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        backgroundColor: '#888',
                                        borderRadius: '4px', 
                                    },
                                    '&::-webkit-scrollbar-thumb:hover': {
                                        backgroundColor: '#555', 
                                    },
                                    '&::-webkit-scrollbar-track': {
                                        backgroundColor: '#f1f1f1', 
                                    },
                                }}
                            >
                                {r.comment}
                            </Typography>
                        </Stack>
                    </Stack>
                </Box>
            </Collapse>
        </TableCell>
    </TableRow>
</>
}

function ArchivedRow ({labelId, r}){
    // collapsible for full details
    const [collapseOpen, setCollapseOpen] = useState(false);
    // status chip color
    const getChipTheme = (s) => {
        const baseColor = s === 1 ? palette.goodBg :palette.badBg;
        const fontColor = s === 1 ? palette.goodFont : palette.badFont;
        return createTheme({
            palette: {
                custom: {
                    main: baseColor,
                    contrastText: getContrastRatio(baseColor, '#fff') > 4.5 ? '#fff' : '#111',
                    fontColor: fontColor,
                },
            },
        });
    };
    // const getCondition = 
    return <>
        <TableRow
            key={`archived-row-${r.report_id}`}
            hover
            role="checkbox"
        >
            <TableCell padding='checkbox'>
                <IconButton
                    size='small'
                    onClick={(e, r) => {
                        e.stopPropagation()
                        setCollapseOpen(!collapseOpen)
                    }}
                >
                    {collapseOpen ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>} 
                </IconButton>
            </TableCell>

            <TableCell id={labelId} padding='none'>
                {r.report_id}
            </TableCell>

            <TableCell>
                {r.computer_id}
            </TableCell>
            {/* status chip */}
            <TableCell padding='none' sx={{paddingRight:4}}>
                {(() => {

                        const theme = getChipTheme(r.status);
                        return (
                            <ThemeProvider theme={theme}>
                                <Chip
                                    variant='filled'
                                    sx={{
                                        m: 0.5,
                                        p:0,
                                        backgroundColor: theme.palette.custom.main,
                                        color: theme.palette.custom.fontColor,
                                    }}
                                    label={r.status === 1 ? "Resolved" : "Rejected"}
                                />
                            </ThemeProvider>
                        );
                }) ()}
            </TableCell>

            <TableCell padding='none'>
                {r.room + " - " + r.building}
            </TableCell>
            <TableCell padding='none' >
            {(() => {
                    const filtered = Object.entries(r.components)
                                        .filter(([k, v])=> v)
                    const mapped = filtered.map(([k, v], i) => {
                        const theme = getChipTheme(v);
                        return (
                            <ThemeProvider theme={theme} key={'chip - '+i}>
                                <Chip
                                    
                                    sx={{
                                        m: 0.5,
                                        p: 0.5,
                                    }}
                                    label={k.charAt(0).toUpperCase() + 
                                        k.replace("_", " ").slice(1)
                                    }
                                />
                            </ThemeProvider>
                        );
                    });
                    return <>{mapped}</>
                }) ()}
            </TableCell>
            <TableCell padding='none' sx={{paddingLeft:'4px'}}>
                {r.date_submitted}
            </TableCell>
            <TableCell padding='none' sx={{paddingLeft:'4px'}}>
                {r.date_archived}
            </TableCell>
            <TableCell padding='none' sx={{paddingLeft:'4px'}}>
                {r.submittee}
            </TableCell>
        </TableRow>
        <TableRow
            key={'collapse-row'+r.report_id}
        >
            <TableCell sx={{paddingBottom:0, paddingTop:0, border: collapseOpen ? '2px dashed '+palette.selected : 'none', width:'100%'}} colSpan={12}>
                <Collapse in={collapseOpen} timeout='auto' unmountOnExit>
                    <Box sx={{margin:1}}>
                        <Typography variant='h6' gutterBottom component='div' sx={{ fontFamily: 'Inter, sans-serif' }}>
                            Report Details
                        </Typography>
                        <Stack direction={'row'} sx={{height:'100%'}}>
                            <Table size='small' aria-label='conditions' sx={{height:'100%'}}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{fontWeight:700}}>Component</TableCell>
                                        <TableCell sx={{fontWeight:700}}>Condition</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Object.entries(r.components).map( ([k, v], i)=> v 
                                        ? <TableRow direction='row' key={`collapse-component-${r.report_id}-${i}`}>
                                        <TableCell>{k}</TableCell>
                                        <TableCell>{v}</TableCell>
                                        </TableRow>
                                        : null
                                    )}
                                </TableBody>
                            </Table>

                            <Stack sx={{width:'100%', maxHeight:'23vh',minHeight:'15vh' , border:'1px solid '+palette.strokeMain, p:1.5, borderRadius:'8px', ml:3}}>
                                <Typography mb={1} fontSize={'20px'} sx={{ fontFamily: 'Inter, sans-serif' }}>
                                    Comment
                                </Typography>
                                <Typography 
                                    variant='caption'
                                    fontSize={'14px'}
                                    sx={{ 
                                        fontFamily: 'Inter, sans-serif', 
                                        backgroundColor: '#f9f9f9',
                                        border:'1px solid'+palette.strokeMain,
                                        padding:'4px',
                                        px:'8px',
                                        textAlign:'justify',
                                        color: '#333', 
                                        borderRadius:'8px', 
                                        height:'100%', 
                                        overflowY:'auto',
                                        wordBreak:'break-word',
                                        '&::-webkit-scrollbar': {
                                            width: '4px', // scrollbar width
                                        },
                                        '&::-webkit-scrollbar-thumb': {
                                            backgroundColor: '#888',
                                            borderRadius: '4px', 
                                        },
                                        '&::-webkit-scrollbar-thumb:hover': {
                                            backgroundColor: '#555', 
                                        },
                                        '&::-webkit-scrollbar-track': {
                                            backgroundColor: '#f1f1f1', 
                                        },
                                    }}
                                >
                                    {r.comment}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    </>

}

function Non_ConsumableRow({isItemSelected, labelId, r, handleMenuClick, handleCheckClick}) {
    // const getTypeText = (type) => {
    //     switch(type) {
    //         case 1: return "System Unit";
    //         case 2: return "Monitor";
    //         case 3: return "Mouse";
    //         case 4: return "Keyboard";
    //         case 5: return "Product Key";
    //         default: return "Unknown";
    //     }
    // };

    return (
        <TableRow 
            key={`non_consumable-row-${r.component_id}`}
            hover
            onClick={(e) => handleCheckClick(e, r.component_id)}
            role="checkbox"
            aria-checked={isItemSelected}
            sx={{cursor: 'pointer'}}
        >
            <TableCell padding='checkbox' sx={{fontSize:'small'}}>
                <Checkbox
                    sx={{
                        '&.Mui-checked': {
                            color: palette.selected, 
                        }
                    }}
                    checked={isItemSelected}
                    inputProps={{"aria-labelledby":labelId}}
                />
            </TableCell>
            <TableCell component={"th"} id={labelId} scope='row'>
                {r.component_id}
            </TableCell>
            <TableCell padding='none'>
                {r.reference_id}
            </TableCell>
            <TableCell padding='normal'>
                {r.location}
            </TableCell>
            <TableCell padding='none'>
                {r.specs}
            </TableCell>
            <TableCell padding='checkbox'>
                <FlagIcon sx={{ color: r.flagged ? palette.strokeWeak : palette.badFont }} />
            </TableCell>
            <TableCell>
                <IconButton
                    onClick={(e) => handleMenuClick(e, r)}
                    aria-haspopup="true"
                    aria-controls='row-menu'
                    sx={{
                        "&:focus": {
                            outline:'none'
                        }
                    }}
                >
                    <MoreHorizIcon/>
                </IconButton>
            </TableCell>
        </TableRow>
    );
}

function ConsumableRow({isItemSelected, labelId, r, handleMenuClick, handleCheckClick}) {
    return (
        <TableRow 
            key={`consumable-row-${r.type}`}
            hover
            onClick={(e) => handleCheckClick(e, r.reference_id)}
            role="checkbox"
            aria-checked={isItemSelected}
            sx={{cursor: 'pointer'}}
        >
            <TableCell padding='checkbox' sx={{fontSize:'small'}}>
                <Checkbox
                    sx={{
                        '&.Mui-checked': {
                            color: palette.selected, 
                        }
                    }}
                    checked={isItemSelected}
                    inputProps={{"aria-labelledby":labelId}}
                />
            </TableCell>
            <TableCell component={"th"} id={labelId} scope='row'>
                {r.reference_id}
            </TableCell>
            <TableCell padding='none'>
                {r.stock_count}
            </TableCell>
            <TableCell sx={{textAlign:'center'}}>
                <IconButton
                    onClick={(e) => handleMenuClick(e, r)}
                    aria-haspopup="true"
                    aria-controls='row-menu'
                    sx={{
                        "&:focus": {
                            outline:'none'
                        }
                    }}
                >
                    <MoreHorizIcon/>
                </IconButton>
            </TableCell>
        </TableRow>
    );
}

function ITable({headCells, rows, type}) {
    const [tabValue, setTabValue] = useState(type === "reportTable" || type==="non_consumableTable" ? 0 : 1);
    const [computerTable_addReportModalOpen, setComputerTable_AddReportModalOpen] = useState(false);
    const navigate = useNavigate();
    const {
        order, setOrder,
        orderBy, setOrderBy,
        selected, setSelected,
        page, setPage,
        rowsPerPage, setRowsPerPage,
        anchorEl, setAnchorEl,
        menuRow, setMenuRow,
        tableType, setTableType,
        reportedRoom, setReportedRoom,
        reportedBuilding, setReportedBuilding,
        reportedPcID, setReportedPcID,
        targetedRooms, setTargetedRooms,
        targetedComputerIDs, setTargetedComputerIDs
    } = useStore()
    useEffect(() =>{
        setTableType(type)

        // TODO
        if (type === 'computerTable') setOrderBy('room')
        else if (type === 'reportTable') setOrderBy('date_submitted')
        else if (type === 'archivedTable') setOrderBy('date_submitted')
        else if (type === 'non_consumableTable') setOrderBy('location')

    }, [type, setOrderBy, setTableType])

    const handleMenuClick = (e, row) => {
        e.stopPropagation(); 
        setAnchorEl(e.currentTarget); 
        setMenuRow(row); 
      };
    
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleMenuAction = (action) => {
        console.log(`Action: ${action} for row: ${menuRow}`);
        handleCloseMenu(); // Close the menu after an action
    };
    
    const handleRequestSort = (e, p) => {
        const isAsc = orderBy === p && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(p)
    }
    
    const handleSelectAllClick = (e) => {
        if (e.target.checked) {
            // select all
            const newSelected = rows.map((n) => 
                type === "computerTable" ? n.computer_id:
                type === 'reportTable' ? n.report_id:
                type === 'archivedTable'? n.report_id:
                type === 'non_consumableTable' ? n.component_id:
                type === 'consumableTable' ? n.reference_id : null
            )
            setSelected(newSelected)
        } else {
            // unselect all
            setSelected([])
        }
    }

    const handleCheckClick = (e, id) => {
        const selectedIndex = selected.indexOf(id)
        let newSelected = []

        /* 
        if -1, means the row is not yet selected, so select it
        if 0, means the row is selected and in first row, so unselect it by slicing at the start in the selected
        if n-1, means the row is selected and in last row, so unselect it by slicing at the end in the selected
        if > 0, means the row is selected and somewhere in the middle, so get first the prefix and the suffix and then unselect it
        */
       
        if (selectedIndex === -1)
            newSelected = newSelected.concat(selected, id)
        else if (selectedIndex === 0)
            newSelected = newSelected.concat(selected.slice(1))
        else if (selectedIndex === selected.length - 1)
            newSelected = newSelected.concat(selected.slice(0, -1))
        else if (selectedIndex > 0)
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            )
        setSelected(newSelected)
    }

    // turn to new or previous page
    const handleChangePage = (e, newPage) => {
        setPage(newPage)
    }

    // change the how many rows per page
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

    // checks emoty rows for the last page
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

    // chop the rows perpage each page, higher order function
    const visibleRows = useMemo(
        () =>
          [...rows]
            .sort(getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage, rows],
    );
    // tabs ui  presented in the /report or /archived
    const tabLabel = (type === 'reportTable' || type === 'archivedTable')
        ? ['Pending Reports', 'Archived Reports'].map((l, i) => 
            <Tab label={l} key={'tablabel - '+i}/>
        ) : (type === 'non_consumableTable' || type === 'consumableTable')
        ? ['System Unit / Monitor', 'Consumables'].map((l, i) => 
            <Tab label={l} key={'tablabel - '+i}/>
        ) : null

    const handleTabChange = (e, newValue) => {
        setTabValue(newValue);
        if (newValue === 0) {
            navigate((type === 'reportTable' || type === 'archivedTable') ? '/report' : '/inventory');
        } else if (newValue === 1) {
            navigate((type === 'reportTable' || type === 'archivedTable') ? '/archived' : '/consum');
        }
    };

    const computerTable_reportMenuOptions = () => {

        return         <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        sx={{}}
    >
            <MenuItem onClick={() => {
                setReportedBuilding(String(menuRow.building_code))
                getRoomsByBuilding(String(menuRow.building_code), setTargetedRooms)

                setReportedRoom(String(menuRow.room))
                getComputersByRoom(String(menuRow.room), setTargetedComputerIDs, String(menuRow.building_code))

                setReportedPcID(String(menuRow.computer_id))
                
                handleCloseMenu()
                setComputerTable_AddReportModalOpen(true)}}>Report this computer</MenuItem>
        </Menu>
    }

    return <Box sx={{border:'1px solid #DADADA'}}>

        {(type==='reportTable' || type==='archivedTable' || type==='non_consumableTable' || type==='consumableTable') && <Box>
            <Tabs value={tabValue} onChange={handleTabChange}>
                {tabLabel}
            </Tabs>
        </Box>
        }

        <TableContainer sx={{backgroundColor: 'white', width:'100%',maxheight:'800px', minHeight:'700px', height:'500px',
            fontFamily: 'Inter, sans-serif',
            '& .MuiTableCell-root': { fontFamily: 'Inter, sans-serif' },}}>
            <Table stickyHeader>

                <ITableHead 
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                    headCells={headCells}
                    type={type}
                />
                <TableBody>

                {type==="computerTable"?visibleRows.map((r, i)=> {
                    const isItemSelected = selected.includes(r.computer_id)
                    const labelId = `Itable-checkbox-${i}`

                    return <ComputerRow
                            key={'reportRow - '+i}
                            isItemSelected={isItemSelected}
                            labelId={labelId}
                            r={r}
                            handleMenuClick={handleMenuClick}
                            handleCheckClick={handleCheckClick}
                    />  
                }) : type === "reportTable" ? visibleRows.map((r,i) => {
                    
                    const isItemSelected = selected.includes(r.report_id)
                    const labelId = `Itable-checkbox-${i}`

                    return <ReportRow 
                        key={'reportRow - '+i}
                        isItemSelected={isItemSelected}
                        labelId={labelId}
                        r={r}
                        handleMenuClick={handleMenuClick}
                        handleCheckClick={handleCheckClick}
                    />

                }) : type === "archivedTable" ? visibleRows.map((r,i) => {

                    const labelId = `Itable-checkbox-${i}`

                    return <ArchivedRow
                        key={'archivedRow - '+i}
                        labelId={labelId}
                        r={r}
                    />

                }) :  type === "non_consumableTable" ? visibleRows.map((r,i) => {

                    const isItemSelected = selected.includes(r.component_id)
                    const labelId = `Itable-checkbox-${i}`

                    return <Non_ConsumableRow
                        key={'non_consumableRow '+ i}
                        isItemSelected={isItemSelected}
                        labelId={labelId}
                        r={r}
                        handleMenuClick={handleMenuClick}
                        handleCheckClick={handleCheckClick}
                    />
                }) : type === "consumableTable" ? visibleRows.map((r,i) => {

                    const isItemSelected = selected.includes(r.reference_id)
                    const labelId = `Itable-checkbox-${i}`

                    return <ConsumableRow
                        key={'consumableRow '+ i}
                        isItemSelected={isItemSelected}
                        labelId={labelId}
                        r={r}
                        handleMenuClick={handleMenuClick}
                        handleCheckClick={handleCheckClick}
                    />
                }) : null
                }
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            sx={{
                backgroundColor: 'white',
                '.MuiInputBase-root':{
                    marginRight:'1em'
                },
                '.MuiTablePagination-displayedRows': {
                    marginTop: '1em', 
                },
                '.MuiTablePagination-selectLabel': {
                    marginTop: '1em', 
                }
            }}
                rowsPerPageOptions={[5,10,20,30]}
                component={'div'}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
        />

        {type === "computerTable" ? computerTable_reportMenuOptions() : null}

        <ReportModal
            open={computerTable_addReportModalOpen}
            setOpen={setComputerTable_AddReportModalOpen}
            anchor={anchorEl}
        />
        
    </Box>;
}

ITable.propTypes = {
    headCells: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired

}
export default ITable;


