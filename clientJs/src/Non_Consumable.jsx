/* eslint-disable no-unused-vars */

import { Grid2, Stack } from '@mui/material';
import Non_Consumable_data from './assets/Non_Consumable_data.json'
import ITable from './components/ITable';
import DrawerMenu from './components/DrawerMenu';
import NavSetting from './components/NavSetting';
function Non_Consumable() {
    function createData(component_id, reference_id, location, specs, flagged){
        return {component_id, reference_id, location, specs, flagged}
    }

    const rows = Non_Consumable_data.rows.map((ncd) => createData( 
        ncd.component_id,
        ncd.reference_id,
        ncd.location,
        ncd.specs,
        ncd.flagged,
    ))
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
    <DrawerMenu/>
    <Stack width={'100vw'}>
        <NavSetting/>
        <div className='mx-4'>
            <div className="label">
                <div className="text-wrapper">Inventory</div>
            </div>
            <ITable headCells={headCells} rows={rows} type='non_consumableTable'/>
        </div>
    </Stack>

</div>;
}

export default Non_Consumable;