/* eslint-disable no-unused-vars */

import { Grid2, Stack } from '@mui/material';
import Consumable_data from './assets/Consumable_data.json'
import ITable from './components/ITable';
import DrawerMenu from './components/DrawerMenu';
import NavSetting from './components/NavSetting';
function Consumable() {
    function createData(reference_id, stock_count){
        return {reference_id, stock_count}
    }

    const rows = Consumable_data.rows.map((cd) => createData( 
        cd.reference_id,
        cd.stock_count
    ))
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
            <ITable headCells={headCells} rows={rows} type='consumableTable'/>
        </div>
    </Stack>
</div>;
}

export default Consumable;