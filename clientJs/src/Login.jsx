/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import NUArtworkItsoBlue2 from "./assets/images/NU_ARTWORK_ITSO_BLUE2.svg";
import { Alert, Button, Divider, FormControl, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Stack, TextField } from '@mui/material';
import palette from './assets/palette';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {SnackbarProvider, enqueueSnackbar} from 'notistack'
import {useForm} from 'react-hook-form'
import { motion, AnimatePresence } from "motion/react"
import useStore from './useStore';
function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [adminId, setAdminId] = useState('');
    const [password, setPassword] = useState('');
    const {adminDetails, setadminDetails, mode} = useStore()

    const navigate = useNavigate()
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const {register, handleSubmit, formState: {errors}} = useForm()
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
    const handleSnackBarClick = (variant, err_msg) => {
        enqueueSnackbar(err_msg, {variant: variant, anchorOrigin:{ vertical: 'bottom', horizontal: 'center' }})
    }

    const handleLoginSubmit = (dta)=>{
        // console.log(dta);
        axios.post('/api/login', {
            adminId: dta.admin_id, 
            password: dta.password,
        }).then(dt => {
            const adminDt = dt.data
            setadminDetails(adminDt)
            navigate('/dashboard')
        }).catch(err => {
            console.error("CONSOLE ERROR ", err)
            handleSnackBarClick('error', err.response.data)
            
        })

    }

    const ModalMotion = ({alertComponent}) => <motion.div
            key={"modal"} 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
        >
            {alertComponent}
        </motion.div>
    useEffect(() => {
        axios.post('/api/logout')
            .then(response => {
                console.log("Session cleared");
            })
            .catch(error => {
                
                console.error("Error clearing session", error);
                // enqueueSnackBar(error)
            });
    }, []);

    return <div 
        style={{
            display:'flex', 
            flexDirection:'column', 
            width:'100vw', 
            alignItems:'center',
            justifyContent:'center',
        }}
    >
        <div
        style={{
            border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.12)' : palette.strokeMain, 
            padding: '32px',
            textAlign: 'center',
            boxShadow: mode === 'dark' 
            ? 'rgba(0, 0, 0, 0.6) 0px 4px 12px' // Dark mode shadow
            : 'rgba(149, 157, 165, 0.2) 0px 8px 24px', // Light mode shadow
            backgroundColor: 'transparent'
        }}
        >
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
            <form noValidate onSubmit={handleSubmit(handleLoginSubmit)}>
                <Stack>
                
                    {/* admin id */}
                    <TextField
                        // inputRef={register}
                        required
                        label={'Admin Id'}
                        {...register("admin_id", {
                                required: true,
                        })}
                        fullWidth
                        // value={adminId}
                        // onChange={handleAdminIdChange}
                        sx={{
                            my:1, 
                            mt:2,
                        }}
                    />
                    <AnimatePresence>
                        {errors.admin_id?.type === 'required' && 
                            <ModalMotion alertComponent={ <Alert severity="error" sx={{p:0.3, px:1, m:0}}>Please indicate Administrator ID</Alert>}/>
                        }
                    </AnimatePresence>
                    <FormControl variant='outlined' sx={{my:2}}>
                        <InputLabel htmlFor="outlined-adornment-password">
                            Password
                        </InputLabel>
                        <OutlinedInput
                            required
                            {...register("password", {
                                required: true,
                            })}
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            // value={password}
                            // onChange={handlePasswordChange}
                            onKeyDown={(e) => {
                                if (e.key === "Enter"){
                                    console.log("enter")
                                    // handleLoginButton()
                                }
                            }}
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
                        
                        {errors.password?.type === 'required' && <ModalMotion alertComponent={ <Alert severity="error" sx={{p:0.3, px:1, mt:1}}>Please enter your password</Alert>}/>}
                    </FormControl>
                </Stack>
                    <Button
                        type='submit'
                        // onClick={handleLoginButton}
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
        <SnackbarProvider maxSnack={2} autoHideDuration={800}/>
    </div>
}

export default Login;