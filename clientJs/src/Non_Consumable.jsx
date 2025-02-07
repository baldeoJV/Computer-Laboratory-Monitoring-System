/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { Alert, Button, FormControl, Grid2, InputLabel, MenuItem, Modal, Select, Stack, TextField } from '@mui/material';
import DrawerMenu from './components/DrawerMenu';
import NavSetting from './components/NavSetting';
import { Accordion, AccordionDetails,CardContent,Paper,Typography, Box, Menu, Chip, ListItemIcon } from '@mui/material';
import '@fontsource/inter/700.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import ITableV2 from './components/ITableV2';
import { createTheme, ThemeProvider, alpha, getContrastRatio, styled } from '@mui/material/styles';
import { getChipTheme_condition, handleErrorFetch} from './customMethods';
import {MRT_ActionMenuItem,} from 'material-react-table';
import ReportModal from './components/ReportModal';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import palette from './assets/palette';
import { AnimatePresence, motion } from 'motion/react';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import { useForm } from 'react-hook-form';
import CircleIcon from '@mui/icons-material/Circle';
function createData(component_id, reference_id, location, specs, flagged){
    return {component_id, reference_id, location, specs, flagged}
}
function Forms_Create_NonConsumable({createComponentOpen, setcreateComponentOpen, handleSnackBarClick, setNonConsumData}) {
    const {register, handleSubmit, formState: {errors}, reset} = useForm()
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
                    reset()
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
function Forms_Update_NonConsumable({updateComponentOpen, setupdateComponentOpen, handleSnackBarClick, register, handleSubmit, errors, reset, fetchNonConsumableComponents}) {
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
            open={updateComponentOpen}
            onClose={()=>setupdateComponentOpen(false)}
        >
            <form noValidate onSubmit={handleSubmit((dta)=> {
                // console.log("dta",dta)
                axios.post('/api/update/non_consum_comp', {
                    old_component_id: dta.old_component_id, 
                    new_component_id: dta.component_id, 
                    location: dta.location,
                    specs: dta.specs,
                }).then(res=> {
                    fetchNonConsumableComponents()
                    handleSnackBarClick('success', "Successfully Added Component")
                    setupdateComponentOpen(false)
                    reset()
                }).catch(err => {
                    console.error("CONSOLE ERROR ", err)
                    handleSnackBarClick('error', err.response.data || err.response.data.message)
                    
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
                            label={'Old Component ID'}
                            {...register("old_component_id", {
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
                            {errors.old_component_id?.type === 'required' && (<ModalMotion alertComponent={<Alert severity="error" sx={{ p: 0.3, px: 1, m: 0 }}>Enter the old Component ID</Alert>} />)}
                        </AnimatePresence>
                        <TextField
                            required
                            label={'New Component ID'}
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
                            {errors.component_id?.type === 'required' && (<ModalMotion alertComponent={<Alert severity="error" sx={{ p: 0.3, px: 1, m: 0 }}>Enter the Component ID</Alert>} />)}
                        </AnimatePresence>
                        <TextField
                            required
                            label="location"
                            {...register("location", {
                                required: true,
                            })}

                            sx={{
                                mt:2,
                            }}
                        />
                        <AnimatePresence>
                            {errors.specs?.type === 'required' && (<ModalMotion alertComponent={<Alert severity="error" sx={{ p: 0.3, px: 1, m: 0 }}>Please select a location</Alert>} />)}
                        </AnimatePresence>
                        <TextField
                            required
                            label={'Specs'}
                            {...register("specs", {
                                    required: true,
                            })}
                            placeholder='e.g INTEL / AMD 3.5hz DDR6 32gb'
                            fullWidth
                            sx={{
                                my:1, 
                                mt:2,
                            }}
                        />
                        <AnimatePresence>
                            {errors.specs?.type === 'required' && (<ModalMotion alertComponent={<Alert severity="error" sx={{ p: 0.3, px: 1, m: 0 }}>Enter the Specification</Alert>} />)}
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


function Non_Consumable() {
    const [nonConsumData, setNonConsumData] = useState([]);

    // FORMS AND MODAL FOR CREATE COMPONENT
    const [createComponentOpen, setcreateComponentOpen] = useState(false);
    const [deleteComponentOpen, setdeleteComponentOpen] = useState(false);

    // Update
    const [updateComponentOpen, setupdateComponentOpen] = useState(false);
    const {register, handleSubmit, formState: {errors}, reset} = useForm()
    
    const [selectedComponents, setselectedComponents] = useState({});
    const [selectedSingleComponent, setselectedSingleComponent] = useState('');
    // FORMS SNACK BAR
    const handleSnackBarClick = (variant, err_msg) => {
        enqueueSnackbar(err_msg, {variant: variant, anchorOrigin:{ vertical: 'bottom', horizontal: 'center' }})
    } 
    const navigate = useNavigate()
    const fetchNonConsumableComponents = useCallback(()=> {
        axios.get('/api/non_consum_comp').then(res => {
            const data = res.data;
            const rows = data.map((ncd) => createData(
                ncd.component_id,
                ncd.component_name,
                ncd.location,
                ncd.specs,
                ncd.flagged
            ));
            setNonConsumData(rows);

        }).catch(err => handleErrorFetch(err, navigate));
    }, [navigate])
    useEffect(()=> {
        fetchNonConsumableComponents();
    }, [])
    const deleteNonConsumableComponent = ()=>{
        const selectedList= Object.keys(selectedComponents)
        let tobeDeletedComponents = (selectedList.length > 0) ? selectedList : [selectedSingleComponent];
        console.log(tobeDeletedComponents);
        
        axios.post("/api/delete/non_consum_comp", {
            component_id: tobeDeletedComponents,
        }).then(res => {
            fetchNonConsumableComponents()
            handleSnackBarClick("success", "Component Successfully Deleted")
            setdeleteComponentOpen(false)
            setselectedSingleComponent('')
            setselectedComponents([])
        }).catch(err => {
            console.error("ERROR: ", err);
            handleSnackBarClick("error", err.response.data);
        })
    }
    const headCellsV2 = useMemo(() => [
        {
            accessorKey: "component_id",
            header: "Component ID",
            size:10,

        },
        {
            accessorKey: "reference_id",
            header: "Type",
            size:10,
        },
        {
            accessorKey: "location",
            header: "Location",
            size:10,
        },
        {
            accessorKey: "specs",
            header: "Specs",
            grow: true,
            size:200,
        },
        {
            accessorKey: "flagged",
            header: "Flag",
            Cell: ({cell}) => {
                const value = cell.getValue()
                return <CircleIcon sx={{color: (value === 0) ? "gray": "green"}}/>
            }
        },
    ], []);

    return <div style={{display: 'flex', height:'100vh'}}>
    <DrawerMenu menuType={'inventory'}/>
    <Stack width={'100vw'}>
        <NavSetting/>
        <div className='mx-4'>
            <Stack direction={'row'} justifyContent={'space-between'} marginTop={2}>
                <div className="label">
                    <div className="text-wrapper">Inventory</div>
                </div>
                <Stack direction={'row'}>
                <Button 
                    variant='contained'
                    color='error'
                    disabled={Object.entries(selectedComponents).length===0}
                    style={{
                        marginLeft:12, 
                        borderRadius:'24px',
                        fontSize:'14px', 
                        textTransform: 'inherit', 
                    }}  
                    onClick={()=> setdeleteComponentOpen(true)}
                >
                    Delete Selected Components
                </Button>
                <Button variant='outlined' style={{marginLeft:12, borderRadius:'24px',fontSize:'14px', textTransform: 'inherit', borderColor:palette.darkBlueFont, backgroundColor:palette.darkBlueFont, color:"white"}}  
                    onClick={()=> setcreateComponentOpen(true)}
                >
                    Add Monitor / System Unit
                </Button>

                </Stack>
            </Stack>

            {/* <ITable headCells={headCells} rows={nonConsumData} type='non_consumableTable'/> */}
            <ITableV2 
                    columns={headCellsV2} 
                    data={nonConsumData} 
                    type={'non_consumableTable'} 
                    extraActionsTable={{
                        
                        initialState: { density: 'comfortable' },
                        enableRowSelection: true,
                        enableRowActions: true, 
                        onRowSelectionChange: setselectedComponents,
                        state: {rowSelection: selectedComponents},
                        getRowId: (originalRow)=>originalRow.component_id,
                        positionActionsColumn:'last',
                        muiTableContainerProps: { sx: { maxHeight: '600px', minHeight:'600px' } },
                        renderRowActionMenuItems:({row, table})=>{
                            const menuRow = row.original
                            return [
                                // TODO
                            <MRT_ActionMenuItem
                                key={"Delete"}
                                label='Delete'
                                table={table}
                                onClick={() => {
                                    setselectedSingleComponent(menuRow.component_id)
                                    setdeleteComponentOpen(true)
                                    // console.log(Object.entries(row), row.getValue)
                                }}
                            />,
                            <MRT_ActionMenuItem
                                key={"edit"}
                                label='Edit'
                                table={table}
                                onClick={() => {
                                    reset({old_component_id: menuRow.component_id, location: menuRow.location, specs: menuRow.specs})
                                    setupdateComponentOpen(true)
                                }}
                            />,
                            <MRT_ActionMenuItem
                                key={"flag"}
                                label='Flag'
                                table={table}
                                onClick={() => {
                                    // console.log(Object.entries(row), row.getValue)
                                    const toSubmit = {component_id: [menuRow.component_id], flag: 1}
                                    console.log(toSubmit)
                                    axios.post('/api/update/non_consum_comp_flag', toSubmit)
                                    .then(res => {
                                        fetchNonConsumableComponents()
                                        handleSnackBarClick("success", "Component successfully flagged")
                                        
                                    }).catch( err => {
                                        handleSnackBarClick("error", err.response.data || err)
                                        console.error(err.response.data || err)
                                    })
                                }}
                            />,
                            <MRT_ActionMenuItem
                                key={"unflag"}
                                label='Unflag'
                                table={table}
                                onClick={() => {
                                    // console.log(Object.entries(row), row.getValue)
                                    axios.post('/api/update/non_consum_comp_flag', {component_id: [menuRow.component_id], flag: 0})
                                    .then(res => {
                                        fetchNonConsumableComponents()
                                        handleSnackBarClick("success", "Component successfully unflagged")
                                        
                                    }).catch( err => {
                                        handleSnackBarClick("error", err.response.data || err)
                                        console.error(err.response.data || err)
                                    })
                                }}
                            />
                            
                        ]}
                    }}
                />
        </div>
    </Stack>
    <Forms_Create_NonConsumable
        createComponentOpen = {createComponentOpen} 
        setcreateComponentOpen = {setcreateComponentOpen}
        handleSnackBarClick = {handleSnackBarClick}
        setNonConsumData = {setNonConsumData}
    />
    <Forms_Update_NonConsumable
        updateComponentOpen= {updateComponentOpen} 
        setupdateComponentOpen = {setupdateComponentOpen}
        handleSnackBarClick = {handleSnackBarClick}
        fetchNonConsumableComponents = {fetchNonConsumableComponents}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        reset={reset}
    />
    <Modal
        open={deleteComponentOpen}
        onClose={()=> {
            setselectedSingleComponent('')
            setdeleteComponentOpen(false)
        }}
    >
        <Box 
            sx={{
                alignContent:'center',
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
            <Typography sx={{mb:2, fontFamily:'Inter'}} variant='h6'>{Object.entries(selectedComponents).length === 0 ? "Do you want to delete this component?": "Delete selected components?"}</Typography>
            <Stack
                direction={'row'}
                sx={{width:'100%', justifyContent:'end'}}    
            >
                <Button onClick={deleteNonConsumableComponent}>Delete</Button>
                <Button onClick={()=>{
                    setdeleteComponentOpen(false)
                    setselectedSingleComponent('')
                }}>Cancel</Button>
            </Stack>
        </Box>
    </Modal>

</div>;
}

export default Non_Consumable;