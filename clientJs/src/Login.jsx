/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import NUArtworkItsoBlue2 from "./assets/images/NU_ARTWORK_ITSO_BLUE2.svg";
import { Button, Divider, FormControl, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Stack, TextField } from '@mui/material';
import palette from './assets/palette';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { NavLink } from 'react-router-dom';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    return <div 
        style={{
            display:'flex', 
            flexDirection:'column', 
            width:'100vw', 
            alignItems:'center',
            justifyContent:'center',
        }}
        >
        <div style={{border:'1px solid '+palette.strokeMain, padding:'32px', textAlign:'center', boxShadow:'rgba(149, 157, 165, 0.2) 0px 8px 24px', backgroundColor:'#f9f9f9'}}>
            <div className='pt-3 pb-4 mx-3' style={{width:'275px'}}>
                <img src={NUArtworkItsoBlue2} alt='nulogo' className='imageNu' />
            </div>
            <Button
                sx={{
                    color: 'white',
                    textTransform:'none',
                    fontFamily:'Inter',
                    minWidth:'250px',
                    p:1.3,
                    mt:2,
                    bgcolor:'#323e8a',
                }}

            >
                Report as guest
            </Button>
            <Divider sx={{m:0,mt:2, width: '100%'}} variant="middle">or</Divider>
            <form >
                <Stack>
                    {/* admin id */}
                    <TextField
                        label={'Admin Id'}
                        name='admin_id'
                        fullWidth
                        sx={{
                            my:1, 
                            mt:2,
                        }}
                    />
                    <FormControl variant='outlined' sx={{my:1, mb:2}}>
                        <InputLabel htmlFor="outlined-adornment-password">
                            Password
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label={
                                    showPassword ? 'hide the password' : 'display the password'
                                }
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                onMouseUp={handleMouseUpPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                </Stack>
                <NavLink to={'/dashboard'}>
                    <Button
                        sx={{
                            color: 'white',
                            textTransform:'none',
                            fontFamily:'Inter',
                            minWidth:'250px',
                            p:1.3,
                            mt:2.5,
                            bgcolor:'#323e8a',
                        }}
                    
                    >
                        Login
                    </Button>
                </NavLink>

            </form>
            <Link sx={{cursor:'pointer', fontSize:'small'}}>
                Request admin account here
            </Link>
        </div>
    </div>;
}

export default Login;