/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Box, Link, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types'
import '@fontsource/inter/700.css';
import palette from "../assets/palette";
import * as React from 'react';
import {ResponsiveBar} from '@nivo/bar'
import { IoIosArrowForward } from "react-icons/io";
import { NavLink } from 'react-router-dom';
function StatBox({head, sx = {height :'38%'}, data, type, keys}) {
    const conditionColors = [palette.good, '#FBD148', palette.major, '#FF6363']; // Colors for good, minor, major, bad
    const statusColors = ['#FF6363', '#0079FF']; // Colors for active, inactive
    return (
        <Box sx={{
            ...sx, 
            borderRadius: '16px', 
            border: `0.5px solid ${palette.strokeMain}`,
            color: '#000626',
            backgroundColor: 'white',
            width: '100%',
            padding: '16px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}>
            <Stack direction={'row'} justifyContent={'space-between'}>
            <Typography variant="h6" sx={{fontWeight: 700 }}>
                {head}
            </Typography>
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
                        tickValues:4
                    }}
                    axisLeft={{
                        tickSize: 5 ,
                        tickRotation: 0,
                        legend: 'Building',
                        legendPosition: 'middle',
                        legendOffset: -40,
                        truncateTickAt: 0
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