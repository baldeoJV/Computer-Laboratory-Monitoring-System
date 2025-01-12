/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import PropTypes from 'prop-types'
import palette from '../assets/palette.js'
import { Box, Button, Checkbox, Chip, Collapse, IconButton, ListItemIcon, Menu, MenuItem, Stack, Tab, TablePagination, TableSortLabel, Tabs, Typography } from '@mui/material';
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
import { createTheme, ThemeProvider, alpha, getContrastRatio,styled } from '@mui/material/styles';
import FlagIcon from '@mui/icons-material/Flag';
import { green, red } from '@mui/material/colors';
import ReportModal from './ReportModal.jsx';
import { getComputersByRoom, getRoomsByBuilding, handleExportRows } from '../customMethods.js';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

// EXPERIMENTAL
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {MaterialReactTable, useMaterialReactTable} from 'material-react-table';
const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    top:'-10px',
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color: 'rgb(55, 65, 81)',
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
      ...theme.applyStyles('dark', {
        color: theme.palette.grey[300],
      }),
    },
  }));
const FILENAME_LIST = {
    'reportTable' : "Pending Reports List",
    'archivedTable': "Archived Reports List",
    'consumableTable': "Monitors and System Units List",
    'non_consumableTable': 'Component Stocks List',
    'computerTable': 'Computers List'
}
const reports_condition_indication = ["Good", "Minor issue", "Major issue", "Bad"]
// datas are roows
export default function ITableV2({columns, data, type, extraActionsTable}) {
    const [anchorEl_DownloadMenu, setAnchorEl_DownloadMenu] = useState(null);
    const open = Boolean(anchorEl_DownloadMenu);
    const [downloadType, setDownloadType] = useState();
    const [downloadTargetTableMode, setDownloadTargetTableMode] = useState()
    const handleClick_DownloadMenu = (event, tMode) => {
        setAnchorEl_DownloadMenu(event.currentTarget);
        setDownloadTargetTableMode(tMode)
    };
    const handleExecute_DownloadMenu = (dtype) => {
        try {
            const optionalIndication = (type === "reportTable" || type === "archivedTable") ? reports_condition_indication : null
            handleExportRows(downloadTargetTableMode, columns, FILENAME_LIST[type], dtype, optionalIndication)
        } catch (error) {
            console.error("Error exporting rows: ", error);
        }
        setAnchorEl_DownloadMenu(null);
    };
    const handleClose_DownloadMenu = () => {
        setAnchorEl_DownloadMenu(null);
    };
    const [tabValue, setTabValue] = useState(type === "reportTable" || type==="non_consumableTable" ? 0 : 1);
    const navigate = useNavigate();
    const handleTabChange = (e, newValue) => {
        setTabValue(newValue);
        if (newValue === 0) {
            navigate((type === 'reportTable' || type === 'archivedTable') ? '/report' : '/inventory');
        } else if (newValue === 1) {
            navigate((type === 'reportTable' || type === 'archivedTable') ? '/archived' : '/consum');
        }
    };
    const tabLabel = (type === 'reportTable' || type === 'archivedTable')
        ? ['Pending Reports', 'Archived Reports'].map((l, i) => 
            <Tab label={l} key={'tablabel - '+i}/>
        ) : (type === 'non_consumableTable' || type === 'consumableTable')
        ? ['System Unit / Monitor', 'Consumables'].map((l, i) => 
            <Tab label={l} key={'tablabel - '+i}/>
        ) : null
    
    const table = useMaterialReactTable({
        columns: columns, 
        data:data,
        enableBatchRowSelection: true,
        columnFilterDisplayMode: 'popover',
        paginationDisplayMode: 'pages',
        positionToolbarAlertBanner: 'bottom',
        defaultColumn: {
            minSize: 20, //allow columns to get smaller than default
          },
        renderTopToolbarCustomActions: ({ table }) => (
            <Box
              sx={{
                display: 'flex',
                gap: '16px',
                padding: '8px',
                flexWrap: 'wrap',
              }}
            >
              <Button
                disabled={table.getPrePaginationRowModel().rows.length === 0}
                onClick={(e) => handleClick_DownloadMenu(e, table.getPrePaginationRowModel().rows)}
                startIcon={<FileDownloadIcon />}
              >
                Export All Rows          
              </Button>
              <Button
                disabled={table.getRowModel().rows.length === 0}
                onClick={(e) => handleClick_DownloadMenu(e, table.getRowModel().rows)}
                startIcon={<FileDownloadIcon />}
              >
                Export Page Rows
              </Button>
              <Button
                disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
                onClick={(e) => handleClick_DownloadMenu(e, table.getSelectedRowModel().rows)}
                startIcon={<FileDownloadIcon />}
              >
                Export Selected Rows
              </Button>
              {type === "reportTable" && <>
                <Button
                  color='error'
                  sx={{border:'1px solid '+palette.bad}}
                >
                  Submit a report
                </Button>
              </>}
            </Box>
          ),
        ...extraActionsTable // Add this line to include extra actions
    })

    return (
    <Box sx={{border:'1px solid #DADADA'}}>
        {(type==='reportTable' || type==='archivedTable' || type==='non_consumableTable' || type==='consumableTable') && <Box>
            <Tabs value={tabValue} onChange={handleTabChange}>
                {tabLabel}
            </Tabs>
        </Box>
        }
        <MaterialReactTable table={table}/>
        <StyledMenu
        open={open}
        onClose={handleClose_DownloadMenu}
        anchorEl={anchorEl_DownloadMenu}
    >
        <Stack sx={{borderBottom:'1px solid rgba(0, 17, 102, 0.1)'}} >
          <span className='mt-1 mx-2 px-2 pt-1 mb-2' style={{fontFamily: 'Inter, sans-serif', fontSize:'14px', color:palette.txtStrong, fontWeight:'600'}}>Select download options</span>
        </Stack>
        <MenuItem onClick={()=>handleExecute_DownloadMenu('csv')}>
          <div className='py-1' style={{fontSize:'14px'}}>
            <FileDownloadIcon/>
            Download CSV
          </div>
        </MenuItem>
        <MenuItem onClick={()=>handleExecute_DownloadMenu('pdf')}>
          <div className='py-1' style={{fontSize:'14px'}}>
          <FileDownloadIcon/>
          Download PDF
          </div>
        </MenuItem>
    </StyledMenu>

    </Box>)
}