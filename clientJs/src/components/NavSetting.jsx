/* eslint-disable no-unused-vars */
import '../App.css'
import '@fontsource/inter/700.css';
import '@fontsource/inter/600.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Laboratory from '../Laboratory'
import { IconButton, MenuItem, Stack, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import Menu from '@mui/material/Menu';
import { styled, alpha } from '@mui/material/styles';
import React, { useState } from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import palette from '../assets/palette';
import BedtimeIcon from '@mui/icons-material/Bedtime';

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

function NavSetting() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return       <Stack sx={{float:'none',  marginLeft:'32px', marginRight:'32px', fontFamily: 'Inter, sans-serif'}}>
    <Stack sx={{width:'100%', textAlign:'right'}} direction={'row'} alignItems="center">
      <Typography sx={{width:'100%', textAlign:'right'}}>
        John Doe
      </Typography>
      <IconButton
        aria-haspopup="true"
        onClick={handleClick}
        aria-expanded={open ? 'true' : undefined}     
      >
        <SettingsIcon/>
      </IconButton>
      <StyledMenu
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
      >
        <Stack sx={{borderBottom:'1px solid rgba(0, 17, 102, 0.1)'}}>
          <span className='mt-1 mx-2 px-2 pt-1' style={{fontFamily: 'Inter, sans-serif', fontSize:'14px', color:palette.txtStrong, }}>John Doe</span>
          <span className='mb-2 mt-1 mx-2 px-2 pb-2' style={{fontFamily: 'Inter, sans-serif', fontSize:'12px', color:palette.textWeak}}>johnsp@national-u.edu.ph</span>
        </Stack>
        <MenuItem onClick={handleClose}>
          <div className='py-1' style={{fontSize:'14px'}}>
          <AccountCircleOutlinedIcon/>
          Account Settings
          </div>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <div className='py-1' style={{fontSize:'14px'}}>
          <SettingsIcon/>
          Server Settings
          </div>
        </MenuItem>
        <MenuItem>
          <div className='py-1' style={{fontSize:'14px'}}>
          <BedtimeIcon/>
          Night Mode
          </div>
        </MenuItem>

      </StyledMenu>
    </Stack>
  </Stack>;
}

export default NavSetting;