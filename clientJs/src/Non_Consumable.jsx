/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid2, Stack } from '@mui/material';
import Non_Consumable_data from './assets/Non_Consumable_data.json'
import ITable from './components/ITable';
import DrawerMenu from './components/DrawerMenu';
import NavSetting from './components/NavSetting';
function Non_Consumable() {
    const [nonConsumData, setNonConsumData] = useState([]);
    function createData(component_id, reference_id, location, specs, flagged){
        return {component_id, reference_id, location, specs, flagged}
    }
    useEffect(()=> {
        axios.get('http://localhost:8080/non_consum_comp').then( res => {
            const data = res.data
            const rows = data.map((ncd) => createData( 
                ncd.component_id,
                ncd.reference_id,
                ncd.location,
                ncd.specs,
                ncd.flagged,
            ))
            setNonConsumData(rows)
            
        }).catch(err => console.error("Error: ", err))
    }, [])

    const headCells = [
        {
            id: "component_id",
            numeric: false,
            disablePadding: true,
            label: "Component ID",
        },
        {
            id: "reference_id",
            numeric: false,
            disablePadding: true,
            label: "Type",
        },
        {
            id: "location",
            numeric: false,
            disablePadding: true,
            label: "Location",
        },
        {
            id: "specs",
            numeric: false,
            disablePadding: true,
            label: "Specs",
        },
        {
            id: "flagged",
            numeric: false,
            disablePadding: false,
            label: "Flag",
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
            <ITable headCells={headCells} rows={nonConsumData} type='non_consumableTable'/>
        </div>
    </Stack>

</div>;
}

export default Non_Consumable;