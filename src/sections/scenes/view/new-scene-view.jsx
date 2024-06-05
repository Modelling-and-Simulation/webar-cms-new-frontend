
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from "react-toastify";
import { Compiler } from "mind-ar/dist/mindar-image.prod";

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box, Dialog, TextField, LinearProgress } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import useApi from 'src/hooks/useApi';
import useAuth from "src/hooks/useAuth";

import formatSceneUrl from 'src/utils/format-scene-url';

import { FILES_URL } from 'src/constants';

import Iconify from 'src/components/iconify';

import NewSceneDialog from '../new-scene-dialog';
import { downloadImages, generateMindFile } from '../utils';


// ----------------------------------------------------------------------

const STATUS_MSG = {
    GENERATE_MIND_FILE: 'Generating mind file...',
    SAVE_SCENE: 'Saving scene...',
}

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

const showStatus = (statusMsg, isLoading, progress) => (
    <Dialog open={isLoading}>
        <Stack direction="column" alignItems="center" justifyContent="center" gap={2} p={5}>
            <Typography variant="h6">{statusMsg}</Typography>
            {statusMsg === STATUS_MSG.GENERATE_MIND_FILE && (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress variant="determinate" color='inherit' value={progress} />
                </Box>
            )}
        </Stack>
    </Dialog>
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
    const [isLoading, setIsLoading] = useState(false);
    const [mindFileProgress, setMindFileProgress] = useState(0);

    useEffect(() => {
        // remove special characters. replace spaces with hyphen
        const url = formatSceneUrl(sceneName);
        if (url) setSceneUrl(url);
        else setSceneUrl('');
    }, [auth?.auth?.username, sceneName]);

    const handleAddScene = (scene) => {
        setScenes([...scenes, scene]);
        setIsDialogOpen(false);
    };

    const handleSubmit = async () => {
        setIsLoading(true);

        // Generate mind file
        setStatusMsg(STATUS_MSG.GENERATE_MIND_FILE);
        
        const imageFiles = await downloadImages(
            scenes.map((scene) => scene.target.targetImage)
        );
        console.log('Image files', imageFiles);
        const mindFile = await generateMindFile(new Compiler(), imageFiles, setMindFileProgress);

        console.log('Mind file', mindFile);

        // Upload mind file
        setStatusMsg(STATUS_MSG.SAVE_SCENE);
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
            setIsLoading(false);
        });
    };

    return (
        <Container>
            <ToastContainer />

            {showStatus(statusMsg, isLoading, mindFileProgress)}

            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">New Scene</Typography>

                <Button
                    variant="contained"
                    color="inherit"
                    startIcon={<Iconify icon="typcn:tick" />}
                    onClick={handleSubmit}
                    disabled={scenes.length === 0 || sceneName === '' || statusMsg !== '' || isLoading}
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