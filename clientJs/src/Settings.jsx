/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react';
import NavSetting from './components/NavSetting';
import DrawerMenu from './components/DrawerMenu';
import '@fontsource/inter/700.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Button, Stack } from '@mui/material';
import {Sidebar, Menu, MenuItem,  } from 'react-pro-sidebar';
import { useState, useEffect } from 'react';
function DesignBox(){

  return <div className="box">
      <div className="rectangle" />
  </div>
}
function Settings ()  {
  const [isAccountClicked, setisAccountClicked] = useState(true);
  return <div style={{display: 'flex', height:'100vh'}}>
    <DrawerMenu menuType={'settings'}/>
    <Stack width={'100vw'} overflow={'auto'} direction={'row'}>
    <div style={{display:'fixed', height:'100vh', alignItems:'center'}}>
      <Sidebar className="sidebr"
              style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Menu
                  style={{
                    marginTop:'20%'
                  }}
                  menuItemStyles={{
                      root: {
                          marginLeft:'4px',
                      }
                  }}
              >
                  <MenuItem className='menuItem py-2' style={{width:'100%'}} onClick={() => setisAccountClicked(true)}>{isAccountClicked && <DesignBox/>} Account </MenuItem>
                  <MenuItem className='menuItem py-2' onClick={() => setisAccountClicked(false)}> {!isAccountClicked && <DesignBox/>} Laboratory </MenuItem>

                  <MenuItem className='menuItem py-2'> 
                      <Button color='primary' variant='outlined' sx={{height:'100%', width:'100%'}}>Sign Out</Button>
                  </MenuItem>
              </Menu>
      </Sidebar>
    </div>
    <Stack sx={{width:'100%'}}>

    <NavSetting/>


    </Stack>


    </Stack>

    </div>
};

export default Settings;
