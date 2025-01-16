/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import '@fontsource/inter/700.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Stack, Typography } from '@mui/material';
const style_about = {
    alignContent:'center', 
    justifyContent:'center', 
    fontFamily:'Inter', 
    fontWeight:'600', 
    textAlign:'center', 
    alignItems:'center', 
    top:50, 
    left:50
}
export default function About() {
    

    return <div style={{display: 'flex', height:'100vh', width:'100vw'}}>
    <Stack>
        <Typography variant='h1' sx={style_about}
        >
            NATIONAL UNIVERSITY ITSO CLMS Version 2.0
        </Typography>
        <Typography variant='h2' sx={{...style_about, mb:5}}
        >
            MEMBERS:
        </Typography>
        <Typography variant='h3' sx={{...style_about, fontWeight:'400'}}
        >
            BALDEO, JOHN VERNON B. <br/>
            BALTAR, NEIL ADRIAN B. <br/>
            BERMUDEZ, FORTUNE C. <br/>
            HIPOLITO, CARL ARVIN C. <br/>
            MONTANIEL, RAINNAND P. <br/>
        </Typography>
    </Stack>

    </div>
}