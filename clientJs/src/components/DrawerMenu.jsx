/* eslint-disable no-unused-vars */
import {Sidebar, Menu, MenuItem,  } from 'react-pro-sidebar';
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useState } from 'react';
import NUArtworkItsoBlue2 from "../assets/images/NU_ARTWORK_ITSO_BLUE2.svg";
import laboratory_pic from "../assets/images/laboratory_pic.svg";
import reports_pic from "../assets/images/reports_pic.svg";
import inventory_pic from "../assets/images/inventory_pic.svg";
import about_pic from "../assets/images/about_pic.svg";
import settings1_pic from "../assets/images/settings1_pic.svg";
import dashboard_pic from "../assets/images/dashboard_pic.svg"
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import { IconButton } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import { Link } from 'react-router-dom';

function DesignBox(){

    return <div className="box">
        <div className="rectangle" />
    </div>
}


export default function DrawerMenu() {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const handleCollapseChange = () => setIsCollapsed(!isCollapsed)
    return (
        
          <Sidebar className="sidebr" collapsed={isCollapsed}
            width='248px' style={{overflow:'hidden', height:'100%'}}
          >
            <Menu

            >
                {isCollapsed 
                    ? (
                        <MenuItem
                            className='menuHead'
                            style={{color: 'black'}}
                            onClick={handleCollapseChange}
                            icon={ 
                                <IconButton 
                                    onClick={handleCollapseChange}
                                    sx={{'& :focus': {outline:'none'}}}
                                >
                                    <KeyboardDoubleArrowRightOutlinedIcon/> 
                                </IconButton>}                        
                        >
                        
                        </MenuItem>
                    ) : (
                        <MenuItem
                            className='menuHead'
                            style={{color: 'black'}}
                            
                            icon={ 
                                <IconButton 
                                    onClick={handleCollapseChange}
                                    sx={{'&:focus': {outline:'none'}}}
                                >
                                    <KeyboardDoubleArrowLeftOutlinedIcon/> 
                                </IconButton>}
                        >
                        </MenuItem>
                    )
                    
                }
                <div className='pt-3 pb-4 mx-3'>
                <img src={NUArtworkItsoBlue2} alt='nulogo' className='imageNu' style={{visibility: (!isCollapsed) ? 'visible' : 'hidden'}}/>
                </div>
                
            </Menu>
            <Menu
                menuItemStyles={{
                    root: {
                        marginLeft:'4px'
                    }
                }}
            >
                <MenuItem 
                    icon={<img src={dashboard_pic} alt='dashboard_pic' className='imgIcon'/>} 
                    className='menuItem py-2 hello'
                    component={<a href="/dashboard"/>}
                > 
                    <DesignBox/>
                    <span>Dashboard </span>
                </MenuItem>
                <MenuItem 
                    icon={<img src={laboratory_pic} alt='laboratory_pic'/>} 
                    className='menuItem py-2'
                    component={<a href="/laboratory"/>}
                > Laboratory </MenuItem>
                <MenuItem 
                    icon={<img src={reports_pic} alt='reports_pic'/>} 
                    className='menuItem py-2'
                    component={<a href="/report"/>}
                > Reports </MenuItem>
                <MenuItem 
                    icon={<img src={inventory_pic} alt='inventory_pic'/>} 
                    className='menuItem py-2'
                    component={<a href="/inventory"/>}
                > Inventory </MenuItem>
                <MenuItem 
                    icon={<img src={settings1_pic} alt='settings1_pic'/>} 
                    className='menuItem py-2'
                    component={<a href="/reports"/>}
                > ReportModal </MenuItem>
                <MenuItem 
                    icon={<img src={about_pic} alt='about_pic'/>} 
                    className='menuItem py-2'
                    component={<a href="/itable"/>}
                > Itable</MenuItem>
            </Menu>
          </Sidebar>

      );
}