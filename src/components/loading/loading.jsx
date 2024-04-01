import React from 'react'

import { Box, CircularProgress } from '@mui/material'

const Loading = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress color='inherit' size={50} />
    </Box>
)

export default Loading