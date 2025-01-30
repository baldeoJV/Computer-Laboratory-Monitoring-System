/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Alert, Box, Button, FormControl, Grid2, InputLabel, MenuItem, Modal, Select, Stack, TextField } from '@mui/material';
import DrawerMenu from './components/DrawerMenu';
import NavSetting from './components/NavSetting';
import '@fontsource/inter/700.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import ITableV2 from './components/ITableV2';
import {handleErrorFetch,  } from './customMethods';
import {MRT_ActionMenuItem,} from 'material-react-table';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import palette from './assets/palette';
import { AnimatePresence, motion } from 'motion/react';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import { useForm } from 'react-hook-form';
function createData(reference_id, stock_count){
    return {reference_id, stock_count}
}
function Forms_Create_Consumable({createComponentOpen, setcreateComponentOpen, handleSnackBarClick, setNonConsumData}) {
    const {register, handleSubmit, formState: {errors}} = useForm()
    const ModalMotion = ({alertComponent}) => <motion.div
        key={"modal"} 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
    >
        {alertComponent}
    </motion.div>
    
    return <>
        <Modal
            open={createComponentOpen}
            onClose={()=>setcreateComponentOpen(false)}
        >
            <form noValidate onSubmit={handleSubmit((dta)=> {
                // console.log(dta)
                axios.post('/api/create/non_consum_comp', {
                    component_id: dta.component_id, 
                    reference_id: dta.reference_id,
                    location: dta.location,
                    specs: dta.specs,
                }).then(res=> {
                    const data = res.data
                    const rows = data.map((ncd) => createData( 
                        ncd.component_id,
                        ncd.component_name,
                        ncd.location,
                        ncd.specs,
                        ncd.flagged,
                    ))
                    setNonConsumData(rows)
                    handleSnackBarClick('success', "Successfully Added Component")
                    setcreateComponentOpen(false)
                }).catch(err => {
                    console.error("CONSOLE ERROR ", err)
                    handleSnackBarClick('error', err.response.data)
                    
                })
            })}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Stack>
                        <TextField
                            required
                            label={'Componend ID'}
                            {...register("component_id", {
                                    required: true,
                            })}
                            placeholder='e.g SYU-001 / MON-001'
                            fullWidth
                            sx={{
                                my:1, 
                                mt:2,
                            }}
                        />
                        <AnimatePresence>
                            {errors.component_id?.type === 'required' && (
                                <ModalMotion alertComponent={<Alert severity="error" sx={{ p: 0.3, px: 1, m: 0 }}>Enter the Component ID</Alert>} />
                            )}
                        </AnimatePresence>
                        <FormControl fullWidth sx={{ my: 1, mt: 2 }}>
                            <InputLabel id="reference-id-label">Type</InputLabel>
                            <Select
                                labelId="reference-id-label"
                                label="Type"
                                {...register("reference_id", {
                                    required: true,
                                })}
                                defaultValue={""}
                            >
                                <MenuItem value={2}>Monitor</MenuItem>
                                <MenuItem value={1}>System Unit</MenuItem>
                            </Select>
                        </FormControl>
                        <AnimatePresence>
                            {errors.reference_id?.type === 'required' && (
                                <ModalMotion alertComponent={<Alert severity="error" sx={{ p: 0.3, px: 1, m: 0 }}>Please select a type</Alert>} />
                            )}
                        </AnimatePresence>
                        <FormControl fullWidth sx={{ my: 1, mt: 2 }}>
                            <InputLabel id="reference-id-label">Location</InputLabel>
                            <Select
                                labelId="reference-id-label"
                                label="location"
                                {...register("location", {
                                    required: true,
                                })}
                                defaultValue={""}
                            >
                                <MenuItem value="Location 1">Location 1</MenuItem>
                                <MenuItem value="Location 2">Location 2</MenuItem>
                                <MenuItem value="Storage Room">Storage Room 1</MenuItem>
                            </Select>
                        </FormControl>
                        <AnimatePresence>
                            {errors.location?.type === 'required' && (
                                <ModalMotion alertComponent={<Alert severity="error" sx={{ p: 0.3, px: 1, m: 0 }}>Please select a location</Alert>} />
                            )}
                        </AnimatePresence>
                        <TextField
                            required
                            label={'Specs'}
                            {...register("specs", {
                                    required: true,
                            })}
                            placeholder='e.g SYU-001 / MON-001'
                            fullWidth
                            sx={{
                                my:1, 
                                mt:2,
                            }}
                        />
                        <AnimatePresence>
                            {errors.specs?.type === 'required' && (
                                <ModalMotion alertComponent={<Alert severity="error" sx={{ p: 0.3, px: 1, m: 0 }}>Enter the Specification</Alert>} />
                            )}
                        </AnimatePresence>
                    </Stack>
                    <Button
                        type='submit'
                        sx={{
                            color: 'white',
                            textTransform:'none',
                            fontFamily:'Inter',
                            minWidth:'100%',
                            p:1.3,
                            mt:2.5,
                            bgcolor:'#323e8a',
                        }}
                    >
                        Add Component
                    </Button>
                </Box>
            </form>
        </Modal>
        <SnackbarProvider maxSnack={2} autoHideDuration={2000}/>
    </>
}
function Consumable() {
    const [consumData, setConsumData] = useState([]);
    const navigate = useNavigate()


    useEffect(()=> {
        axios.get('/api/consum_comp').then( res => {
            const data = res.data
            console.log(data)
            const rows = data.map((cd) => createData( 
                cd.component_name,
                cd.stock_count
            ))
            setConsumData(rows)
            
        }).catch(err => handleErrorFetch(err, navigate))
    }, [navigate])
    const headCellsV2 = [
        {
            accessorKey: "reference_id",
            header: "Type",
            size:10,
        },
        {
            accessorKey: "stock_count",
            header: "Stock Count",
            size:10,
        },
    ]


    return <div style={{display: 'flex', height:'100vh'}}>
    <DrawerMenu menuType={'inventory'}/>
    <Stack width={'100vw'}>
        <NavSetting/>
        <div className='mx-4'>
            <div className="label">
                <div className="text-wrapper">Inventory</div>
            </div>
            <ITableV2 
                    columns={headCellsV2} 
                    data={consumData} 
                    type={'consumableTable'} 
                    extraActionsTable={{
                        initialState: { density: 'compact' },
                        enableRowSelection: true,
                        enableRowActions: true, 
                        positionActionsColumn:'last',
                        muiTableContainerProps: { sx: { maxHeight: '600px', minHeight:'600px' } },
                        renderRowActionMenuItems:({row, table})=>{
                            const menuRow = row.original
                            return [
                            <MRT_ActionMenuItem
                                key={"Delete"}
                                label='Delete'
                                table={table}
                                onClick={() => {
                                    // console.log(Object.entries(row), row.getValue)
                                }}
                            />,
                            <MRT_ActionMenuItem
                                key={"edit"}
                                label='Edit'
                                table={table}
                                onClick={() => {
                                    // console.log(Object.entries(row), row.getValue)
                                }}
                            />,
                        ]}
                    }}
                />
        </div>
    </Stack>
</div>;
}

export default Consumable;