
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from "react-toastify";
import { Compiler } from "mind-ar/dist/mindar-image.prod";

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Box, TextField } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import useApi from 'src/hooks/useApi';
import useAuth from "src/hooks/useAuth";

import { FILES_URL } from 'src/constants';

import Iconify from 'src/components/iconify';

import NewSceneDialog from '../new-scene-dialog';
import { downloadImages, generateMindFile } from '../utils';


// ----------------------------------------------------------------------

const showSelectedImage = (selectedImage) => (
    <Box
        component="img"
        alt="scene"
        src={`${FILES_URL}/${selectedImage}`}
        sx={{
            width: 100,
            height: 100,
            objectFit: 'cover',
            borderRadius: 1,
        }}
    />
);

const NewScenePage = () => {
    const router = useRouter();
    const auth = useAuth();
    const { createScene } = useApi();

    const [sceneName, setSceneName] = useState('');
    const [sceneUrl, setSceneUrl] = useState('');
    const [description, setDescription] = useState('');

    const [scenes, setScenes] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [statusMsg, setStatusMsg] = useState('');

    useEffect(() => {
        // remove special characters. replace spaces with hyphen
        const url = sceneName.trim().replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '-').toLowerCase();
        if (url) setSceneUrl(url);
        else setSceneUrl('');
    }, [auth?.auth?.username, sceneName]);

    const handleAddScene = (scene) => {
        setScenes([...scenes, scene]);
        setIsDialogOpen(false);
    };

    const handleSubmit = async () => {
        // Generate mind file
        setStatusMsg('Generating .mind file...');
        console.log('Scenes', scenes);
        const imageFiles = await downloadImages(
            scenes.map((scene) => scene.target.targetImage)
        );
        console.log('Image files', imageFiles);
        const mindFile = await generateMindFile(new Compiler(), imageFiles);

        console.log('Mind file', mindFile);

        // Upload mind file
        setStatusMsg('Uploading scene...');
        const formData = new FormData();
        formData.append('mindFile', mindFile);
        formData.append('sceneName', sceneUrl);
        formData.append('description', description);
        formData.append('targetsAndContents', JSON.stringify(scenes.map((scene) => ({
            target: scene.target._id,
            content: scene.content._id,
        }))));

        createScene(formData).then((response) => {
            console.log('Scene created', response);
            toast.success('Scene created successfully');
            router.push('/scenes');
        }).catch((error) => {
            console.error('Error creating scene', error);
            toast.error('Error creating scene');
        }).finally(() => {
            setStatusMsg('');
        })
    };

    return (
        <Container>
            <ToastContainer />
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">New Scene</Typography>

                <Button
                    variant="contained"
                    color="inherit"
                    startIcon={<Iconify icon="typcn:tick" />}
                    onClick={handleSubmit}
                    disabled={scenes.length === 0 || sceneName === '' || statusMsg !== ''}
                >
                    Submit
                </Button>
            </Stack>
            {statusMsg && <Typography variant="body1">{statusMsg}</Typography>}
            <NewSceneDialog open={isDialogOpen} setOpen={setIsDialogOpen} addScene={handleAddScene} />
            <Stack pb={3}>
                <TextField
                    name="sceneName"
                    label="Enter scene name"
                    onChange={(e) => setSceneName(e.target.value)}
                    value={sceneName} />
                {sceneUrl && <Typography variant='caption' pl={1} color="green">URL: {`${auth?.auth?.username}/${sceneUrl}`}</Typography>}
                <Typography variant='caption' pl={1}>(This name will be used in the URL)</Typography>

                <TextField
                    name="description"
                    label="Enter scene description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    sx={{ mt: 3 }} />
            </Stack>

            <Typography variant='subtitle1'>Please select targets and contents</Typography>

            <Stack direction="row" alignItems="center" gap={1}>
                {scenes.length < 5 && (
                    <Button
                        variant="outlined"
                        color="inherit"
                        startIcon={<Iconify icon="typcn:plus" />}
                        onClick={() => setIsDialogOpen(true)}
                        sx={{ mt: 1, ml: 2 }}
                    >
                        Add
                    </Button>
                )}
                <Typography variant='caption' pl={1}>(Maximum 05 scenes can be added)</Typography>
            </Stack>

            <Stack direction="row" alignItems="center" gap={5}
                flexWrap="wrap" mt={2}>
                {
                    scenes.map((_scene, index) => (
                        <Stack key={index} direction="row" alignItems="center" gap={5}
                            sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 2 }}
                        >
                            <Typography variant="subtitle2">Scene {index + 1}</Typography>
                            {showSelectedImage(_scene?.target?.targetImage)}
                            <Iconify icon="material-symbols:link" sx={{ width: 40, height: 40 }} />
                            {showSelectedImage(_scene?.content?.contentImage)}
                        </Stack>
                    ))
                }
            </Stack>

        </Container>
    );
}

export default NewScenePage;