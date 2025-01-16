/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react';
import styles from './SettingsBox.module.css';
import NavSetting from './components/NavSetting';
import DrawerMenu from './components/DrawerMenu';
import '@fontsource/inter/700.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Stack } from '@mui/material';
function Settings ()  {
  const onXSquareClick = useCallback(() => {
    // Add your code here
  }, []);

  return <div style={{display: 'flex', height:'100vh'}}>
    
    <DrawerMenu/>
    <Stack width={'100vw'} overflow={'auto'}>
    <NavSetting/>
    <div className={styles.settingsBox}>
      <div className={styles.settingsParent}>
        <div className={styles.settings}>Settings</div>
        <img
          className={styles.xSquareIcon}
          alt=""
          src="X square.svg"
          onClick={onXSquareClick}
        />
      </div>
      <div className={styles.instanceParent}>
        <div
          className={styles.accountWrapper}
          onClick={onXSquareClick}
        >
          <div className={styles.account}>Account</div>
        </div>
        <div
          className={styles.accountContainer}
          onClick={onXSquareClick}
        >
          <div className={styles.account}>Server</div>
        </div>
        <div
          className={styles.accountFrame}
          onClick={onXSquareClick}
        >
          <div className={styles.account2}>Sign out</div>
        </div>
      </div>
      <div className={styles.accountParent}>
        <div className={styles.account3}>Account</div>
        <div className={styles.userId20221004AdminWrapper}>
          <div className={styles.fullName}>User Id: 2022-1004 (Admin)</div>
        </div>
        <div className={styles.frameParent}>
          <div className={styles.userId20221004AdminWrapper}>
            <div className={styles.fullName}>Full name</div>
            <div className={styles.labButtons}>
              <div className={styles.unselect}>Edit</div>
            </div>
          </div>
          <div className={styles.textInputParent}>
            <div className={styles.textInput}>
              <div className={styles.text}>
                <div className={styles.label}>
                  <div className={styles.unselect}>First Name</div>
                  <div className={styles.unselect}>*</div>
                </div>
              </div>
              <div className={styles.field}>
                <div className={styles.state}>
                  <div className={styles.value}>John</div>
                </div>
              </div>
            </div>
            <div className={styles.textInput}>
              <div className={styles.text}>
                <div className={styles.label}>
                  <div className={styles.unselect}>Last Name</div>
                  <div className={styles.unselect}>*</div>
                </div>
              </div>
              <div className={styles.field}>
                <div className={styles.state}>
                  <div className={styles.value}>Doe</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.frameParent}>
          <div className={styles.userId20221004AdminWrapper}>
            <div className={styles.fullName}>Email</div>
            <div className={styles.labButtons}>
              <div className={styles.unselect}>Edit</div>
            </div>
          </div>
          <div className={styles.textInputParent}>
            <div className={styles.textInput}>
              <div className={styles.text}>
                <div className={styles.label}>
                  <div className={styles.unselect}>Email Address</div>
                  <div className={styles.unselect}>*</div>
                </div>
              </div>
              <div className={styles.field}>
                <div className={styles.state}>
                  <div className={styles.value}>JohnDoe@email.com</div>
                </div>
              </div>
            </div>
            <div className={styles.textInput}>
              <div className={styles.text}>
                <div className={styles.label}>
                  <div className={styles.unselect}>Password</div>
                  <div className={styles.unselect}>*</div>
                </div>
              </div>
              <div className={styles.field3}>
                <div className={styles.state}>
                  <div className={styles.value}>●●●●●●●●●</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.buttonReportParent}>
          <div className={styles.buttonReport}>
            <div className={styles.accept}>Save</div>
          </div>
          <div className={styles.buttonReport1}>
            <div className={styles.accept}>Close</div>
          </div>
        </div>
      </div>
    </div>
    </Stack>

    </div>
};

export default Settings;
