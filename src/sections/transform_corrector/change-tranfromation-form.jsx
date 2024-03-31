import React from 'react'
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

const FormInput = ({ label, value, onChange, ...props }) => (
    <TextField
        label={label}
        type='number'
        size='small'
        value={value}
        onChange={onChange}
        InputLabelProps={{
            shrink: true,
        }}
        {...props}
    />
)

export default function ChangeTranformationForm({
    position,
    setPosition,
    rotation,
    setRotation,
    scale,
    setScale,
    handleSubmit,
}) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h4">Change Transformation</Typography>
            <Box>
                <Typography variant="subtitle1" mb={1}>Position</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <FormInput
                        label="X"
                        value={position.x}
                        onChange={(e) => setPosition({ ...position, x: e.target.value })}
                        inputProps={{ step: 0.1 }}
                    />
                    <FormInput
                        label="Y"
                        value={position.y}
                        onChange={(e) => setPosition({ ...position, y: e.target.value })}
                        inputProps={{ step: 0.1 }}
                    />
                    <FormInput
                        label="Z"
                        value={position.z}
                        onChange={(e) => setPosition({ ...position, z: e.target.value })}
                        inputProps={{ step: 0.1 }}
                    />
                </Box>
            </Box>

            <Box>
                <Typography variant="subtitle1" mb={1}>Rotation</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <FormInput
                        label="X"
                        value={rotation.x}
                        onChange={(e) => setRotation({ ...rotation, x: e.target.value })}
                    />
                    <FormInput
                        label="Y"
                        value={rotation.y}
                        onChange={(e) => setRotation({ ...rotation, y: e.target.value })}
                    />
                    <FormInput
                        label="Z"
                        value={rotation.z}
                        onChange={(e) => setRotation({ ...rotation, z: e.target.value })}
                    />
                </Box>
            </Box>

            <Box>
                <Typography variant="subtitle1" mb={1}>Scale</Typography>
                <FormInput
                    label="Scale"
                    value={scale}
                    onChange={(e) => setScale(e.target.value)}
                    inputProps={{ step: 0.1 }}
                />
            </Box>

            <Button
                variant="outlined"
                color="inherit"
                startIcon={<Iconify icon="typcn:tick" />}
                onClick={handleSubmit}
                sx={{ mt: 1, ml: 2 }}
            >
                Update
            </Button>

        </Box>
    )
}

ChangeTranformationForm.propTypes = {
    position: PropTypes.object,
    setPosition: PropTypes.func,
    rotation: PropTypes.object,
    setRotation: PropTypes.func,
    scale: PropTypes.number,
    setScale: PropTypes.func,
    handleSubmit: PropTypes.func,
}

FormInput.propTypes = {
    label: PropTypes.string,
    value: PropTypes.number,
    onChange: PropTypes.func,
}