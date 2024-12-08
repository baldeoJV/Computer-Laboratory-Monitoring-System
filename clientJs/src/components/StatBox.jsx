import { Paper } from "@mui/material";
import PropTypes from 'prop-types'
import '@fontsource/inter/700.css';
import palette from "../assets/palette";
function StatBox({head, sx = {height :'38%'}}) {
    return <div style={{
            ...sx, 
            borderRadius:'16px', 
            border:`1px solid ${palette.strokeMain}`,
            padding:'16px',
            fontWeight:'700',
            fontSize:'20px',
            color:'#000626'
        }}>
        {head}
    </div>;
}
StatBox.propTypes = {
    head: PropTypes.string,
    sx: PropTypes.object,
}


export default StatBox;