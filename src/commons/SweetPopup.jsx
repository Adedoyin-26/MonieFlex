import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Backdrop, Box, Fade, Modal } from "@mui/material";

function SweetPopup({ open = true, handleClose, loaderElement, width = 400 }) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: width,
        bgcolor: 'background.paper',
        borderRadius: '24px',
        boxShadow: 24,
        p: 3,
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <div style={{ textAlign: 'center' }}>
                        {loaderElement ? (
                            loaderElement
                        ) : (
                            <CircularProgress size="70px" style={{ color: '#082567' }} />
                        )}
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
}

export default SweetPopup;
