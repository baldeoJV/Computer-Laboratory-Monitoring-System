/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import NUArtworkItsoBlue2 from "./assets/images/NU_ARTWORK_ITSO_BLUE2.svg";
import { Button, Divider, FormControl, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Stack, TextField } from '@mui/material';
import palette from './assets/palette';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [adminId, setAdminId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const handleAdminIdChange = (event) => {
        setAdminId(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
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
            <NavLink to={'/reportguest'}>
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
            </NavLink>

            <Divider sx={{m:0,mt:2, width: '100%'}} variant="middle">or</Divider>
            <form >
                <Stack>
                    {/* admin id */}
                    <TextField
                        label={'Admin Id'}
                        name='admin_id'
                        fullWidth
                        value={adminId}
                        onChange={handleAdminIdChange}
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
                            value={password}
                            onChange={handlePasswordChange}
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
                    <Button
                        onClick={()=>{
                            axios.post('/api/login', {
                                adminId, 
                                password,
                            }).then(dt => {
                                navigate('/dashboard')
                            }).catch(err => console.error("CONSOLE ERROR ", err))

                        }}
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
            </form>
            <Link sx={{cursor:'pointer', fontSize:'small'}}>
                Request admin account here
            </Link>
        </div>
    </div>;
}

export default Login;