/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Modal, Box, Typography, Stack, Paper, Container, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useStore from './useStore';

export default function AboutModal({ open, setOpen }) {
  const mode = useStore((state) => state.mode);

  const isDarkMode = mode === 'dark';

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backdropFilter: 'blur(6px)',
          backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.4)',
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={10}
            sx={{
              position: 'relative',
              padding: 5,
              borderRadius: 3,
              textAlign: 'center',
              backgroundColor: isDarkMode ? '#121212' : 'rgba(255, 255, 255, 0.95)',
              boxShadow: isDarkMode
                ? '0px 10px 30px rgba(255, 255, 255, 0.1)'
                : '0px 10px 30px rgba(0,0,0,0.2)',
              color: isDarkMode ? '#f5f5f5' : '#333',
              transition: 'all 0.3s ease-in-out',
            }}
          >
            {/* Close Button */}
            <IconButton
              onClick={() => setOpen(false)}
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                color: isDarkMode ? 'grey.400' : 'grey.700',
              }}
            >
              <CloseIcon />
            </IconButton>

            {/* Modal Content */}
            <Typography
              variant="h4"
              fontWeight={700}
              color={isDarkMode ? 'primary.light' : 'primary'}
              gutterBottom
            >
              NATIONAL UNIVERSITY ITSO CLMS v2.0
            </Typography>

            <Typography variant="h6" fontWeight={600} color="text.secondary" gutterBottom>
              MEMBERS
            </Typography>

            <Stack spacing={1.5} sx={{ mt: 2 }}>
              {[
                'BALDEO, JOHN VERNON B.',
                'BALTAR, NEIL ADRIAN B.',
                'BERMUDEZ, FORTUNE C.',
                'HIPOLITO, CARL ARVIN C.',
                'MONTANIEL, RAINNAND P.',
              ].map((member, index) => (
                <Typography key={index} variant="body1" fontWeight={500}>
                  {member}
                </Typography>
              ))}
            </Stack>
          </Paper>
        </Container>
      </Box>
    </Modal>
  );
}

