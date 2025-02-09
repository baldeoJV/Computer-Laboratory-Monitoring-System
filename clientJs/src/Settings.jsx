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
function AccountPasswordField() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const [openAdminRePassword, setopenAdminRePassword] = useState(false);
    const [openSubmitLabel, setopenSubmitLabel] = useState(false);
    return <form noValidate
        onSubmit={handleSubmit((dta) => {
        })}
    >
        <Grid2 container spacing={4}>
            <Grid2 size={{ xs: 12, md: 12, lg: 3 }}>

                {/* OLD PASSWORD */}
                <TextField
                    disabled={!openAdminRePassword}
                    required
                    type='password'
                    label={'Old password'}
                    {...register("old_password", {
                        required: true,
                    })}
                    fullWidth
                    sx={{
                        my: 1,
                        mt: 2,
                    }}
                />
                <AnimatePresence>
                    {errors.old_password?.type === 'required' && (
                        <ModalMotion alertComponent={<Alert severity="error" sx={{ p: 0.3, px: 1, m: 0 }}>Enter the first name</Alert>} />
                    )}
                </AnimatePresence>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 12, lg: 3 }}>

                {/* NEW PASSWORD */}
                <TextField
                    disabled={!openAdminRePassword}
                    required
                    type='password'
                    label={'New password'}
                    {...register("new_password", {
                        required: true,
                    })}
                    fullWidth
                    sx={{
                        my: 1,
                        mt: 2,
                    }}
                />
                <AnimatePresence>
                    {errors.old_password?.type === 'required' && (
                        <ModalMotion alertComponent={<Alert severity="error" sx={{ p: 0.3, px: 1, m: 0 }}>Enter the first name</Alert>} />
                    )}
                </AnimatePresence>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 12, lg: 3 }}>
                <Button
                    variant='outlined'
                    onClick={() => {
                        setopenSubmitLabel(!openSubmitLabel);
                        setopenAdminRePassword(!openAdminRePassword);
                    }}
                    sx={{
                        textTransform: 'none',
                        fontFamily: 'Inter',
                        minWidth: '100%',
                        p: 2,
                        mt: 2,
                        borderRadius: '24px'
                    }}
                >
                    {openSubmitLabel ? 'Submit' : 'Edit Admin Password'}
                </Button>
            </Grid2>
        </Grid2>
    </form>
}

function AccountNameField (){
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const [openAdminConfig, setopenAdminConfig] = useState(false);
    return <form noValidate className='mb-4'
        onSubmit={handleSubmit((dta) => {
        })}
    >
        <Grid2 container spacing={4}>
            {/* FIRST NAME */}
            <Grid2 size={{xs: 12, md:12, lg:3}}>
                <TextField
                    disabled={!openAdminConfig}
                    required
                    label={'Admin First Name'}
                    {...register("first_name", {
                        required: true,
                    })}
                    fullWidth
                    sx={{
                        my: 1,
                        mt: 2,
                    }}
                />
                <AnimatePresence>
                    {errors.first_name?.type === 'required' && (
                        <ModalMotion alertComponent={<Alert severity="error" sx={{ p: 0.3, px: 1, m: 0 }}>Enter the Admin ID</Alert>} />
                    )}
                </AnimatePresence>
            </Grid2>

            {/* LAST NAME */}
            <Grid2 size={{xs: 12, md:12, lg:3}}>
                <TextField
                    disabled={!openAdminConfig}
                    required
                    label={'Admin Last Name'}
                    {...register("last_name", {
                        required: true,
                    })}
                    fullWidth
                    sx={{
                        my: 1,
                        mt: 2,
                    }}
                />
                <AnimatePresence>
                    {errors.last_name?.type === 'required' && (
                        <ModalMotion alertComponent={<Alert severity="error" sx={{ p: 0.3, px: 1, m: 0 }}>Enter the Admin ID</Alert>} />
                    )}
                </AnimatePresence>
            </Grid2>

            <Grid2 size={{xs: 12, md:12, lg:3}}>
                <Button
                    variant='outlined'
                    type='submit'
                    sx={{

                        textTransform: 'none',
                        fontFamily: 'Inter',
                        minWidth: '100%',
                        p: 2,
                        mt: 2,

                        borderRadius:'24px'
                    }}
                >
                    Edit Admin Name
                </Button>
            </Grid2>
        </Grid2>
    </form>
}
function Settings() {

    const [isAccountClicked, setisAccountClicked] = useState(true);
    const [openAdminRePassword, setopenAdminRePassword] = useState(false);


    return <div style={{ display: 'flex', height: '100vh' }}>
        <DrawerMenu menuType={'settings'} />
        <Stack width={'100vw'} overflow={'auto'} direction={'row'}>
            <div style={{ display: 'fixed', height: '100vh', alignItems: 'center' }}>
                <Sidebar className="sidebr"
                    style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
                        <MenuItem className='menuItem py-2' style={{ width: '100%' }} onClick={() => setisAccountClicked(true)}>{isAccountClicked && <DesignBox />} Account </MenuItem>
                        <MenuItem className='menuItem py-2' onClick={() => setisAccountClicked(false)}> {!isAccountClicked && <DesignBox />} Laboratory </MenuItem>

                        <MenuItem className='menuItem py-2'>
                            <Button color='primary' variant='outlined' sx={{ height: '100%', width: '100%' }}>Sign Out</Button>
                        </MenuItem>
                    </Menu>
                </Sidebar>
            </div>
            <Stack sx={{ width: '100%', overflow:'auto' }}>
                <NavSetting />
                <div className='p-4'>
                    <div className="label mb-4">
                        <div className="text-wrapper">Account Settings</div>
                    </div>
                    <Stack>
                        <AccountNameField/>
                        <AccountPasswordField/>
                    </Stack>
                </div>
            </Stack>
        </Stack>
    </div>
};

export default Settings;
