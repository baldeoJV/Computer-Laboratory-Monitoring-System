/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react';
import NavSetting from './components/NavSetting';
import DrawerMenu from './components/DrawerMenu';
import '@fontsource/inter/700.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { useState, useEffect } from 'react';
import palette from './assets/palette';
import { AnimatePresence, motion } from 'motion/react';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Alert, Button, FormControl, Grid2, InputLabel, Modal, Select, Stack, TextField } from '@mui/material';
import { Accordion, AccordionDetails, CardContent, Paper, Typography, Box, Chip, ListItemIcon } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';

function DesignBox() {
    return <div className="box">
        <div className="rectangle" />
    </div>
}
const ModalMotion = ({ alertComponent }) => <motion.div
    key={"modal"}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0 }}
    >
    {alertComponent}
</motion.div>
function AccountPasswordField({handleSnackBarClick, navigate}) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [openAdminRePassword, setopenAdminRePassword] = useState(false);

    return (
        <form 
            noValidate
            onSubmit={handleSubmit((data) => {
                console.log("Submitted Password Data:", data);
                // Handle password update logic here
                if(confirm("Are you sure you want to change password?")){
                    axios.post('/api/change/password', {
                    old_password: data.old_password,
                    new_password: data.new_password,
                }).then(res => {
                    handleSnackBarClick("success", "Successful, you will be automatically logged out")
                    reset()
                    axios.post('/api/logout').then(()=>navigate('/')).catch(err => console.error('Error: ', err))
                }).catch( err => {
                    console.error("ERROR: ", err.response.data)
                    handleSnackBarClick("error", err.response.data)
                })
                }
            })}
        >
            <Grid2 container spacing={4}>
                {/* OLD PASSWORD */}
                <Grid2 xs={12} md={12} lg={3}>
                    <TextField
                        disabled={!openAdminRePassword}
                        required
                        type="password"
                        label="Old password"
                        {...register("old_password", { required: true })}
                        fullWidth
                        sx={{ my: 1, mt: 2 }}
                    />
                    <AnimatePresence>
                        {errors.old_password?.type === "required" && (
                            <ModalMotion alertComponent={<Alert severity="error" sx={{ p: 0.3, px: 1, m: 0 }}>Enter the old password</Alert>} />
                        )}
                    </AnimatePresence>
                </Grid2>

                {/* NEW PASSWORD */}
                <Grid2 xs={12} md={12} lg={3}>
                    <TextField
                        disabled={!openAdminRePassword}
                        required
                        type="password"
                        label="New password"
                        {...register("new_password", { required: true })}
                        fullWidth
                        sx={{ my: 1, mt: 2 }}
                    />
                    <AnimatePresence>
                        {errors.new_password?.type === "required" && (
                            <ModalMotion alertComponent={<Alert severity="error" sx={{ p: 0.3, px: 1, m: 0 }}>Enter the new password</Alert>} />
                        )}
                    </AnimatePresence>
                </Grid2>

                {/* TOGGLE ENABLE/DISABLE BUTTON */}
                <Grid2 xs={12} md={6} lg={3}>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            reset()
                            setopenAdminRePassword(!openAdminRePassword)
                        }}
                        sx={{
                            textTransform: "none",
                            fontFamily: "Inter",
                            minWidth: "100%",
                            p: 2,
                            mt: 2,
                            borderRadius: "24px",
                        }}
                    >
                        {openAdminRePassword ? "Disable Editing" : "Enable Editing"}
                    </Button>
                </Grid2>

                {/* FORM SUBMIT BUTTON */}
                {openAdminRePassword && (
                    <Grid2 xs={12} md={6} lg={3}>
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{
                                textTransform: "none",
                                fontFamily: "Inter",
                                minWidth: "100%",
                                p: 2,
                                mt: 2,
                                borderRadius: "24px",
                            }}
                        >
                            Save Password
                        </Button>
                    </Grid2>
                )}
            </Grid2>
        </form>
    );
}


function AccountNameField({handleSnackBarClick, navigate}) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [openAdminConfig, setopenAdminConfig] = useState(false);

    return (
        <>
            <form 
                noValidate 
                className="mb-4"
                onSubmit={handleSubmit((data) => {
                    console.log("Submitted Name Data:", data);
                    // Handle password update logic here
                    if(confirm("Are you sure you want to change admin name?")){
                        axios.post('/api/change/name', {
                            first_name: data.first_name,
                            last_name: data.last_name,
                        }).then(res => {
                            handleSnackBarClick("success", "Successful username change, you will be automatically logged out")
                            reset()
                            axios.post('/api/logout').then(()=>navigate('/')).catch(err => console.error('Error: ', err))
                        }).catch( err => {
                            console.error("ERROR: ", err.response.data)
                            handleSnackBarClick("error", err.response.data)
                        })
                    }
                })}
            >
                <Grid2 container spacing={4}>
                    {/* FIRST NAME */}
                    <Grid2 xs={12} md={12} lg={3}>
                        <TextField
                            disabled={!openAdminConfig}
                            required
                            label="Admin First Name"
                            {...register("first_name", { required: true })}
                            fullWidth
                            sx={{ my: 1, mt: 2 }}
                        />
                        <AnimatePresence>
                            {errors.first_name?.type === "required" && (
                                <ModalMotion alertComponent={<Alert severity="error" sx={{ p: 0.3, px: 1, m: 0 }}>Enter the Admin First Name</Alert>} />
                            )}
                        </AnimatePresence>
                    </Grid2>

                    {/* LAST NAME */}
                    <Grid2 xs={12} md={12} lg={3}>
                        <TextField
                            disabled={!openAdminConfig}
                            required
                            label="Admin Last Name"
                            {...register("last_name", { required: true })}
                            fullWidth
                            sx={{ my: 1, mt: 2 }}
                        />
                        <AnimatePresence>
                            {errors.last_name?.type === "required" && (
                                <ModalMotion alertComponent={<Alert severity="error" sx={{ p: 0.3, px: 1, m: 0 }}>Enter the Admin Last Name</Alert>} />
                            )}
                        </AnimatePresence>
                    </Grid2>

                    {/* TOGGLE ENABLE/DISABLE BUTTON */}
                    <Grid2 xs={12} md={6} lg={3}>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                reset()  
                                setopenAdminConfig(!openAdminConfig)
                            }}
                            sx={{
                                textTransform: "none",
                                fontFamily: "Inter",
                                minWidth: "100%",
                                p: 2,
                                mt: 2,
                                borderRadius: "24px",
                            }}
                        >
                            {openAdminConfig ? "Disable Editing" : "Enable Editing"}
                        </Button>
                    </Grid2>

                    {/* FORM SUBMIT BUTTON */}
                    {openAdminConfig && (
                        <Grid2 xs={12} md={6} lg={3}>
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{
                                    textTransform: "none",
                                    fontFamily: "Inter",
                                    minWidth: "100%",
                                    p: 2,
                                    mt: 2,
                                    borderRadius: "24px",
                                }}
                            >
                                Save Changes
                            </Button>
                        </Grid2>
                    )}
                </Grid2>
            </form>
        </>
    );
}


function DatabaseSettings() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [openDbConfig, setOpenDbConfig] = useState(false);
    const handleSnackBarClick = (variant, err_msg) => {
        enqueueSnackbar(err_msg, {variant: variant, anchorOrigin:{ vertical: 'bottom', horizontal: 'center' }})
    } 
    return (
        <div className="p-4">
            <div className="label mb-4">
                <div className="text-wrapper">Database Settings</div>
            </div>
            
            <form 
                noValidate 
                className="mb-4"
                onSubmit={handleSubmit((data) => {
                    console.log("Submitted Database Data:", data);
                    // Handle database settings submission
                })}
            >
                <Typography variant="h6" gutterBottom>Database Information:</Typography>
                <Grid2 container spacing={4}>
                    {/* DATABASE NAME */}
                    <Grid2 xs={12} md={6} lg={3}>
                        <TextField
                            disabled={!openDbConfig}
                            required
                            label="Database Name"
                            {...register("database_name", { required: true })}
                            fullWidth
                            sx={{ my: 1, mt: 2 }}
                        />
                        <AnimatePresence>
                            {errors.database_name?.type === "required" && (
                                <ModalMotion alertComponent={<Alert severity="error" sx={{ p: 0.3, px: 1, m: 0 }}>Enter the Database Name</Alert>} />
                            )}
                        </AnimatePresence>
                    </Grid2>
                </Grid2>

                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Database Credentials:</Typography>
                <Grid2 container spacing={4}>
                    {/* DATABASE USERNAME */}
                    <Grid2 xs={12} md={6} lg={3}>
                        <TextField
                            disabled={!openDbConfig}
                            required
                            label="Database Username"
                            {...register("database_username", { required: true })}
                            fullWidth
                            sx={{ my: 1, mt: 2 }}
                        />
                        <AnimatePresence>
                            {errors.database_username?.type === "required" && (
                                <ModalMotion alertComponent={<Alert severity="error" sx={{ p: 0.3, px: 1, m: 0 }}>Enter the Database Username</Alert>} />
                            )}
                        </AnimatePresence>
                    </Grid2>

                    {/* DATABASE PASSWORD */}
                    <Grid2 xs={12} md={6} lg={3}>
                        <TextField
                            disabled={!openDbConfig}
                            required
                            type="password"
                            label="Database Password"
                            {...register("database_password", { required: true })}
                            fullWidth
                            sx={{ my: 1, mt: 2 }}
                        />
                        <AnimatePresence>
                            {errors.database_password?.type === "required" && (
                                <ModalMotion alertComponent={<Alert severity="error" sx={{ p: 0.3, px: 1, m: 0 }}>Enter the Database Password</Alert>} />
                            )}
                        </AnimatePresence>
                    </Grid2>

                    {/* DATABASE PATH */}
                    <Grid2 xs={12} md={12} lg={6}>
                        <TextField
                            disabled={!openDbConfig}
                            required
                            label="Database Path"
                            {...register("database_path", { required: true })}
                            fullWidth
                            sx={{ my: 1, mt: 2 }}
                        />
                        <AnimatePresence>
                            {errors.database_path?.type === "required" && (
                                <ModalMotion alertComponent={<Alert severity="error" sx={{ p: 0.3, px: 1, m: 0 }}>Enter the Database Path</Alert>} />
                            )}
                        </AnimatePresence>
                    </Grid2>
                </Grid2>

                {/* TOGGLE ENABLE/DISABLE BUTTON */}
                <Grid2 xs={12} md={6} lg={3}>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            reset()
                            setOpenDbConfig(!openDbConfig)
                        }}
                        sx={{
                            textTransform: "none",
                            fontFamily: "Inter",
                            maxWidth:'40%',
                            width:'400px',
                            minWidth:'100px',
                            p: 2,
                            mt: 2,
                            borderRadius: "24px",
                        }}
                    >
                        {openDbConfig ? "Disable Editing" : "Enable Editing"}
                    </Button>
                </Grid2>

                {/* FORM SUBMIT BUTTON */}
                {openDbConfig && (
                    <Grid2 xs={12} md={6} lg={3}>
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{
                                textTransform: "none",
                                fontFamily: "Inter",
                                maxWidth:'40%',
                                width:'400px',
                                minWidth:'100px',
                                p: 2,
                                mt: 2,
                                borderRadius: "24px",
                            }}
                        >
                            Save Changes
                        </Button>
                    </Grid2>
                )}
            </form>
        </div>
    );
}



function Settings() {
    const navigate = useNavigate()
    const [isAccountClicked, setisAccountClicked] = useState(true);

    const handleSnackBarClick = (variant, err_msg) => {
        enqueueSnackbar(err_msg, {variant: variant, anchorOrigin:{ vertical: 'bottom', horizontal: 'center' }})
    } 
    return <div style={{ display: 'flex', height: '100vh' }}>
        <DrawerMenu menuType={'settings'} />
        <Stack width={'100vw'} overflow={'auto'} direction={'row'}>
            <div style={{ display: 'fixed', height: '100vh', alignItems: 'center' }}>
                <Sidebar className="sidebr"
                    style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    backgroundColor='white'>
                    <Menu
                        style={{
                            marginTop: '20%'
                        }}
                        menuItemStyles={{
                            root: {
                                marginLeft: '4px',
                            }
                        }}
                    >
                        <MenuItem className='menuItem py-2' style={{ width: '100%',color:'black' }} onClick={() => setisAccountClicked(true)}>{isAccountClicked && <DesignBox />} Account Settings </MenuItem>
                        <MenuItem className='menuItem py-2' style={{color:'black'}} onClick={() => setisAccountClicked(false)}> {!isAccountClicked && <DesignBox />} Database Settings </MenuItem>

                        <MenuItem className='menuItem py-2'>
                            <Button color='primary' variant='contained' sx={{ height: '100%', width: '100%', textTransform:'none' }}
                            
                            onClick={() => {
                                axios.post('/api/logout').then(navigate('/')).catch(err => console.error('Error: ', err))
                            }}
                            >
                                Sign Out
                            </Button>
                        </MenuItem>
                    </Menu>
                </Sidebar>
            </div>
            <Stack sx={{ width: '100%', overflow:'auto' }}>
                <NavSetting />
                {isAccountClicked ? (
                    <div className='p-4'>
                        <div className="label mb-4">
                            <div className="text-wrapper">
                                Account Settings
                            </div>
                        </div>
                        <Stack>
                            <AccountNameField handleSnackBarClick={handleSnackBarClick} navigate={navigate}/>
                            <AccountPasswordField handleSnackBarClick={handleSnackBarClick} navigate={navigate}/>
                        </Stack>
                    </div>
                ) : (
                    <DatabaseSettings />
                )}
            </Stack>
        </Stack>
        <SnackbarProvider maxSnack={2} autoHideDuration={2000}/>
        
    </div>
};

export default Settings;
