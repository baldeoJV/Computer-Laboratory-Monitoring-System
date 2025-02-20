/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, Stack } from '@mui/material';
import React, { useState, useEffect, Fragment } from 'react';
import palette from '../assets/palette';
import { Typography as InterTypography } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} {...props}/>;
});
export default function SharedModal({items, open, setOpen}) {
    
    return <div>
        <Dialog
            fullWidth={true}
            maxWidth={'lg'}
            open={open}
            onClose={() => setOpen(false)}
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle 
                sx={{
                    borderBottom:'1px solid '+palette.strokeMain
                }}
            >
                Details
            </DialogTitle>
            <DialogContent
                sx={{
                    borderTopRightRadius:'16px',
                    borderTopLeftRadius:'16px',
                }}
            >
                <Stack>
                    {Object.entries(items).map(([k, v], i) => {


                        return <Fragment key={`Item - ${i}`}>
                            <InterTypography variant='h5' color={palette.textWeak} mt={2} fontWeight={500}>
                                {k}
                            </InterTypography>
                            <InterTypography>
                                {v}
                            </InterTypography>
                        </Fragment>
                    })}
                </Stack>
            </DialogContent>
            <DialogActions sx={{mx:4}}>
                <Button 
                    onClick={() => setOpen(false)} 
                    color="primary" 
                    variant='contained' 
                    sx={{ 
                        fontFamily: 'Inter',
                        textTransform:'none',
                    }} 
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    </div>
}