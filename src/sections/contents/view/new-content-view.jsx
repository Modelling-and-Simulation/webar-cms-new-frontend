
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

const NewContentPage = () => {
    const router = useRouter();
    const { createContent } = useApi();

    const [contentName, setContentName] = useState('');
    const [description, setDescription] = useState('');
    const [glbFile, setGlbFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const handleGlbFileChange = (e) => {
        setGlbFile(e.target.files[0]);
    };

    const handleImageFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
        const formData = new FormData();

        formData.append('contentName', contentName);
        formData.append('description', description);
        formData.append('contentImage', imageFile);
        formData.append('contentFile', glbFile);

        createContent(formData).then((response) => {
            console.log('Content Added', response);
            toast.success('Content added successfully');
            // setTimeout(2000);
            router.push('/contents');
        }).catch((error) => {
            console.error('Error adding content', error);
            toast.error('Error adding content');
        }).finally(() => {
            // setStatusMsg('');
        })
    };

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">New Content</Typography>

                <Button
                    variant="contained"
                    color="inherit"
                    startIcon={<Iconify icon="typcn:tick" />}
                    onClick={handleSubmit}
                    disabled={glbFile === '' || contentName === '' || imageFile === ''}
                >
                    Submit
                </Button>
                <ToastContainer />
            </Stack>

            <Stack pb={3}>
                <TextField
                    name="contentName"
                    label="Enter content name"
                    onChange={(e) => setContentName(e.target.value)}
                    value={contentName} />
                <Typography variant='caption' pl={1}>(This name is used to access the scene by public users)</Typography>

                <TextField
                    name="description"
                    label="Enter content description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    sx={{ mt: 3 }} />
                
                
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '1.5rem' }}>
                    <Button
                        variant="outlined"
                        sx={{ width: '12vw', marginRight: '1rem' }}
                        onClick={() => document.getElementById('glb-file').click()}
                    >
                        Choose Glb File
                    </Button>
                    {glbFile && <Typography>{glbFile.name}</Typography>}
                </div>
                <input
                    id="glb-file"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleGlbFileChange}
                />

                <div style={{ display: 'flex', alignItems: 'center', marginTop: '1.5rem' }}>
                    <Button
                        variant="outlined"
                        sx={{ width: '12vw', marginRight: '1rem' }}
                        onClick={() => document.getElementById('image-file').click()}
                    >
                        Choose Image File
                    </Button>
                    {imageFile && <Typography>{imageFile.name}</Typography>}
                </div>
                <input
                    id="image-file"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleImageFileChange}
                />

            </Stack>


        </Container>
    );
}

export default NewContentPage;