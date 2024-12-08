/* eslint-disable no-unused-vars */

import './App.css'
import DrawerMenu from './components/DrawerMenu'
import '@fontsource/inter/700.css';
import '@fontsource/inter/600.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { SideMenu } from './components/SideMenu'
import Laboratory from './Laboratory'
import { IconButton, MenuItem, Stack, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import Menu from '@mui/material/Menu';
import { styled, alpha } from '@mui/material/styles';
import React, { useState } from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import palette from './assets/palette';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import NavSetting from './components/NavSetting';
function App()  {


  return (
    <div style={{display: 'flex', height:'100vh'}}>
      <DrawerMenu/>
      <NavSetting/>
      
    </div>
  )
}

export default App
