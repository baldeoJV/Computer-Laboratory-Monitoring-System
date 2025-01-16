/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 24,
      textAlign: 'center',
      fontFamily: 'Times-Roman'
    },
    author: {
      fontSize: 12,
      textAlign: 'center',
      marginBottom: 40,
    },
    subtitle: {
      fontSize: 18,
      margin: 12,
      fontFamily: 'Times-Roman'
    },
    text: {
      margin: 12,
      fontSize: 16,
      textAlign: 'justify',
      fontFamily: 'Times-Roman',
    },
    text2: {
        marginLeft:12,
        marginRight:12,
        marginTop:4,
        fontSize: 15,
        textAlign: 'justify',
        fontFamily: 'Times-Roman',
      },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: 'left',
      color: 'grey',
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    },
    bold: {
        fontWeight:'600'
    }
  });
export default function ReportDocument({reportedBuilding, reportedRoom, reportedPcID, comment, submittee, reportId = "12000", partsCondition}){
    return   <Document>
    <Page size="A4" style={styles.body}>
        <Text style={styles.header}>Report ID: {reportId}</Text>
        <Text style={styles.title}>National University - ITSO</Text>
        <Text style={styles.author}>Computer Laboratory Management System</Text>
        <Text style={styles.subtitle}>Submittee ID: {submittee}</Text>
        <Text style={styles.subtitle}>Location</Text>
        <Text style={styles.text2}>Building: {reportedBuilding}</Text>
        <Text style={styles.text2}>Room: {reportedRoom}</Text>
        <Text style={styles.text2}>Computer ID: {reportedPcID}</Text>
        <Text style={styles.subtitle}>Reported Components: </Text>
        {partsCondition.filter(pc => pc.condition).map((pc, i) => {
            return <Text key={`${pc.key} - ${i}`} style={styles.text2}>
                {`${pc.key}: `}
                <Text style={styles.bold}>{pc.condition}</Text>
            </Text>
        })}
        <Text style={styles.subtitle}>Comment and Feedback:</Text>
        <Text style={styles.text2}>{comment}</Text>
        

    </Page>
  </Document>
}