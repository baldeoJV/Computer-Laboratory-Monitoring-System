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
import '@fontsource/inter/700.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
const ModalMotion = ({alertComponent}) => <motion.div
        key={"modal"} 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
    >
        {alertComponent}
    </motion.div>
export default function RegisterAdmin(){
    const {mode} = useStore()
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    
    const {register, handleSubmit, formState: {errors}} = useForm()
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };
    const handleSnackBarClick = (variant, err_msg) => {
        enqueueSnackbar(err_msg, {variant: variant, anchorOrigin:{ vertical: 'bottom', horizontal: 'center' }})
    }
    const handleRegisterSubmit = (dta)=>{
        // console.log(dta);
        axios.post('/api/register', {
            adminId: dta.admin_id, 
            password: dta.password,
            activation_code: dta.activation_code,
        }).then(dt => {
            alert('Successfully registered, please proceed to the login page')
            navigate('/')
        }).catch(err => {
            console.error("CONSOLE ERROR ", err)
            handleSnackBarClick('error', err.response.data)
            
        })

    }
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
            <form noValidate onSubmit={handleSubmit(handleRegisterSubmit)}>
                <Stack>
                    {/* admin id */}
                    <TextField
                        // inputRef={register}
                        required
                        label={'Activation Code'}
                        {...register("activation_code", {
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
                        {errors.activation_code?.type === 'required' && 
                            <ModalMotion alertComponent={ <Alert severity="error" sx={{p:0.3, px:1, m:0}}>Please indicate the activation code</Alert>}/>
                        }
                    </AnimatePresence>
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
                        Register
                    </Button>
            </form>
            <Link sx={{cursor:'pointer', fontSize:'small'}} onClick={()=> navigate('/')}>
                Login instead
            </Link>
        </div>
        <SnackbarProvider maxSnack={2} autoHideDuration={800}/>
        
    </div>
}