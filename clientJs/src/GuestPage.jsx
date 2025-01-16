/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './App.css'
import '@fontsource/inter/700.css';
import '@fontsource/inter/600.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReportModal from './components/ReportModal';


export default function GuestPage() {
    

    return <>
        <ReportModal isClosable={false}/>
    </>
}