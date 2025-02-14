/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Box, Link, Stack, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types'
import '@fontsource/inter/700.css';
import palette from "../assets/palette";
import * as React from 'react';
import {ResponsiveBar} from '@nivo/bar'
import { IoIosArrowForward } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import useStore from '../useStore';
function StatBox({head, sx = {height :'70%'}, data, type, keys}) {
    const theme = useTheme();
    const {mode} = useStore()
    const conditionColors = [palette.good, '#FBD148', palette.major, '#FF6363']; // Colors for good, minor, major, bad
    const statusColors = ['#FF6363', '#0079FF']; // Colors for active, inactive
    // console.log(data);
    // just get the total sum
    const total_count = data.reduce((sum, cur) => sum + keys.reduce((keysum, key)=> keysum + (cur[key] || 0), 0), 0)

    // get either the good or active of the data
    const targetKey = type === 'condition' ? 'good' : 'active';
    const target_count = data.reduce((sum, cur) => sum + (cur[targetKey] || 0), 0)
    
    

    // percentage, toFixed for only two decimal places
    const percentage = total_count ? ((target_count/total_count)*100).toFixed(2) : 0
    // console.log(`${type} `, data)
    // console.log(`${type} total_count: `, total_count);
    // console.log(`${type}target_count: `, target_count);
    // console.log(`${type}percentage: `, percentage);
    // console.log('\n')

    
    return (
        <Box sx={{
            ...sx, 
            borderRadius: '16px', 
            border: mode === 'light' ? `0.5px solid ${palette.strokeMain}` : '1px solid rgba(255, 255, 255, 0.12)',
            color: mode === 'dark' ? '#D9D9D9' : '#1C1C1C',
            backgroundColor: 'transparent',
            width: '100%',
            padding: '16px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}>
            <Stack direction={'row'} >
            <span style={{width:'75%', display:'flex'}}>
            <Typography variant="h6" sx={{fontWeight: 700}} alignContent={'center'}>
                {head} 
            </Typography>
            <Typography variant='caption' sx={{ml:2, fontWeight:'600'}} alignContent={'center'} color={type === 'condition' ? 'success' : 'primary'}>
            {`(${percentage}%) ${type === 'condition' ? 'Good' : 'Active'}`}
            </Typography>
            </span>


            <NavLink to={'/laboratory'}>
                <Link component={'button'} variant='body2'>
                    Go to laboratory <IoIosArrowForward />
                </Link>
            </NavLink>

            </Stack>
            <div style={{padding:'16px', width:'100%', height:'100%'}}>
                <ResponsiveBar
                    data={data}
                    keys={keys}
                    layout='horizontal'
                    indexBy="building"
                    margin={{right: 130, bottom: 50, left: 60 }}
                    padding={0.3}
                    valueScale={{ type: 'linear' }}
                    indexScale={{ type: 'band', round: true }}
                    colors={type === 'condition' ? conditionColors : statusColors}
                    borderColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                1.6
                            ]
                        ]
                    }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickRotation: 0,
                        legend: 'Count',
                        legendPosition: 'middle',
                        legendOffset: 32,
                        truncateTickAt: 0,
                        tickValues:4,
                    }}
                    axisLeft={{
                        tickSize: 5 ,
                        tickRotation: 0,
                        legend: 'Building',
                        legendPosition: 'middle',
                        legendOffset: -40,
                        truncateTickAt: 0,
                        
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                1.6
                            ]
                        ]
                    }}
                    theme={{
                        axis: {
                            ticks: {
                                text: {
                                    fill: theme.palette.text.primary,
                                },
                            },
                        },
                        legends: {
                            text: {
                                fill: theme.palette.text.primary,
                            },
                        },
                        labels: {
                            text: {
                                fill: theme.palette.text.primary,
                            },
                        },
                    }}
                    legends={[
                        {
                            dataFrom: 'keys',
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 120,
                            translateY: 0,
                            itemsSpacing: 2,
                            itemWidth: 80,
                            itemHeight: 20,
                            itemDirection: 'left-to-right',
                            itemOpacity: 0.85,
                            symbolSize: 10,
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                    role="application"
                    ariaLabel="Nivo bar chart demo"
                    barAriaLabel={e => e.id + ": " + e.formattedValue + " in building: " + e.indexValue}
                />
            </div>
        </Box>
    );
}

StatBox.propTypes = {
    head: PropTypes.string,
    sx: PropTypes.object,
    keys: PropTypes.array.isRequired,
    type: PropTypes.string
}

export default StatBox;