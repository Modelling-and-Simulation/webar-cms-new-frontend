
import { useState } from 'react';
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import useApi from 'src/hooks/useApi';

import Iconify from 'src/components/iconify';



// ----------------------------------------------------------------------

const NewTargetPage = () => {
    const router = useRouter();
    const { createTarget } = useApi();

    const [targetName, setTargetName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
      setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
        const formData = new FormData();

        formData.append('targetName', targetName);
        formData.append('description', description);
        formData.append('targetImage', selectedFile);

        createTarget(formData).then((response) => {
            console.log('Target Added', response);
            toast.success('Target added successfully');
            // setTimeout(2000);
            router.push('/targets');
        }).catch((error) => {
            console.error('Error adding target', error);
            toast.error('Error adding target');
        }).finally(() => {
            // setStatusMsg('');
        })
    };

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">New Target</Typography>

                <Button
                    variant="contained"
                    color="inherit"
                    startIcon={<Iconify icon="typcn:tick" />}
                    onClick={handleSubmit}
                    disabled={selectedFile === '' || targetName === ''}
                >
                    Submit
                </Button>
                <ToastContainer />
            </Stack>

            <Stack pb={3}>
                <TextField
                    name="targetName"
                    label="Enter target name"
                    onChange={(e) => setTargetName(e.target.value)}
                    value={targetName} />
                <Typography variant='caption' pl={1}>(This name is used to access the scene by public users)</Typography>

                <TextField
                    name="description"
                    label="Enter target description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    sx={{ mt: 3 }} />
                
                {/* <label htmlFor="upload-file"> */}
                    <Button component="span" variant="outlined" sx={{ mt: 3 }}>
                        Choose File
                    </Button>
                    <input
                        id="upload-file"
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                {/* </label> */}

            </Stack>


        </Container>
    );
}

export default NewTargetPage;