/* eslint-disable no-unused-vars */

import { Grid2, Stack } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Consumable_data from './assets/Consumable_data.json'
import ITable from './components/ITable';
import DrawerMenu from './components/DrawerMenu';
import NavSetting from './components/NavSetting';
function Consumable() {
    const [consumData, setConsumData] = useState([]);

    function createData(reference_id, stock_count){
        return {reference_id, stock_count}
    }

    useEffect(()=> {
        axios.get('http://localhost:8080/consum_comp').then( res => {
            const data = res.data
            console.log(data)
            const rows = data.map((cd) => createData( 
                cd.reference_id,
                cd.stock_count
            ))
            setConsumData(rows)
            
        }).catch(err => console.error("Error: ", err))
    }, [])
    const headCells = [
        {
            id: "reference_id",
            numeric: false,
            disablePadding: true,
            label: "Type",
        },
        {
            id: "stock_count",
            numeric: false,
            disablePadding: true,
            label: "Stock Count",
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
            <ITable headCells={headCells} rows={consumData} type='consumableTable'/>
        </div>
    </Stack>
</div>;
}

export default Consumable;