/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import { Paper } from "@mui/material";
import PropTypes from 'prop-types'
import '@fontsource/inter/700.css';
import palette from "../assets/palette";
import * as React from 'react';
// import { BarChart } from '@mui/x-charts/BarChart';
// import { Typography } from '@mui/material';
import {ResponsiveBar} from '@nivo/bar'

function StatBox({head, sx = {height :'38%'}, data, type, keys}) {
    const conditionColors = [palette.good, '#FBD148', palette.major, '#FF6363']; // Colors for good, minor, major, bad
    const statusColors = ['#0079FF', '#FF0060']; // Colors for active, inactive


    return <ResponsiveBar
        data={data}
        keys={keys}
        indexBy="building" // Ensure this matches the data structure
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
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
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendPosition: 'middle',
            legendOffset: 32,
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'buildings',
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
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
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
        ariaLabel={`${head} Graph`}
    />
}
StatBox.propTypes = {
    head: PropTypes.string,
    sx: PropTypes.object,
    bd: PropTypes.array,
    datasets: PropTypes.array,
    type: PropTypes.string
}

export default StatBox;