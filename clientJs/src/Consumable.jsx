/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
function Forms_Edit_Consumable({openEditConsumableModal, setopenEditConsumableModal, handleSnackBarClick, fetchConsumable, register, handleSubmit, errors, reset}) {
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
            open={openEditConsumableModal}
            onClose={()=>setopenEditConsumableModal(false)}
        >
            <form noValidate onSubmit={handleSubmit((dta)=> {
                axios.post('/api/update/consum_comp', {
                    component_name: dta.component_name,
                    stock_count: dta.stock_count,
                }).then(res => {
                    fetchConsumable()
                    handleSnackBarClick("success", "Successfully Updated Component")
                    setopenEditConsumableModal(false)
                }).catch( err => {
                    console.error("ERROR: ", err.response.data)
                    handleSnackBarClick("error", err.response.data)
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
                            disabled
                            label={'Component'}
                            {...register("component_name", {
                                    required: true,
                            })}

                            fullWidth
                            sx={{mt:2,}}
                        />
                        <AnimatePresence>
                            {errors.component_name?.type === 'required' && (<ModalMotion alertComponent={<Alert severity="error" sx={{ p: 0.3, px: 1, m: 0 }}>Select Component</Alert>} />)}
                        </AnimatePresence>
                        <TextField
                            required
                            label={'Stock Count'}
                            {...register("stock_count", {
                                    required: true,
                            })}
                            placeholder='e.g 200'
                            fullWidth
                            sx={{
                                my:1, 
                                mt:2,
                            }}
                        />
                        <AnimatePresence>
                            {errors.stock_count?.type === 'required' && (<ModalMotion alertComponent={<Alert severity="error" sx={{ p: 0.3, px: 1, m: 0 }}>Enter a valid stock count</Alert>} />)}
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
                        Update Component
                    </Button>
                </Box>
            </form>
        </Modal>
        <SnackbarProvider maxSnack={2} autoHideDuration={2000}/>
    </>
}
function Consumable() {
    const {register, handleSubmit, formState: {errors}, reset} = useForm()

    const [consumData, setConsumData] = useState([]);
    const navigate = useNavigate()
    const [openEditConsumableModal, setopenEditConsumableModal] = useState(false);
    const [targetedConsumable, settargetedConsumable] = useState('');
    const handleSnackBarClick = (variant, err_msg) => {
        enqueueSnackbar(err_msg, {variant: variant, anchorOrigin:{ vertical: 'bottom', horizontal: 'center' }})
    } 
    const fetchConsumable = useCallback(()=>{
        axios.get('/api/consum_comp').then( res => {
            const data = res.data
            // console.log(data)
            const rows = data.map((cd) => createData( 
                cd.component_name,
                cd.stock_count
            ))
            setConsumData(rows)
            
        }).catch(err => handleErrorFetch(err, navigate))
    }, [navigate])
    
    useEffect(()=> {
        fetchConsumable()
    }, [])
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
                                key={"edit"}
                                label='Edit'
                                table={table}
                                onClick={() => {
                                    reset({component_name: menuRow.reference_id})
                                    setopenEditConsumableModal(true)
                                }}
                            />,
                        ]}
                    }}
                />
        </div>
    </Stack>
    <Forms_Edit_Consumable
        handleSnackBarClick={handleSnackBarClick}
        openEditConsumableModal={openEditConsumableModal}
        setopenEditConsumableModal={setopenEditConsumableModal}
        fetchConsumable={fetchConsumable}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        reset={reset}
    />
</div>;
}

export default Consumable;