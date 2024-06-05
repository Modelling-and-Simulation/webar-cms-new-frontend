import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

import formatSceneUrl from 'src/utils/format-scene-url';

import { FILES_URL } from 'src/constants';

import Iconify from 'src/components/iconify';

import LinkDeleteCard from '../link-delete-card';
import NewSceneDialog from '../new-scene-dialog';
import { downloadImages, generateMindFile } from '../utils';


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

const EditScenePage = () => {
    // const auth = useAuth();
    const router = useRouter();
    const auth = useAuth();

    const { editScene, editFullScene } = useApi();
    const { id } = useParams();

    const { getSceneById } = useApi();

    const [sceneName, setSceneName] = useState('');
    const [sceneUrl, setSceneUrl] = useState('');
    const [index, setIndex] = useState(0);
    const [description, setDescription] = useState('');

    const [scenes, setScenes] = useState([]);
    // const [state, setState] = useState([]);
    const [sceneEdit, setSceneEdit] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [statusMsg, setStatusMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [mindFileProgress, setMindFileProgress] = useState(0);

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    useEffect(() => {
        console.log('Mind file progress:', mindFileProgress);
        console.log('Is loading:', isLoading);
    }, [isLoading, mindFileProgress]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getSceneById(id);

            setScenes(response.data.targetsAndContents);
            setSceneName(response.data.sceneName);
            setDescription(response.data.description);
        }

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        const url = formatSceneUrl(sceneName);

        if (url) setSceneUrl(url);
        else setSceneUrl('');
    }, [auth?.auth?.username, sceneName])

    const handleSceneEdit = () => {
        setSceneEdit(true);
    };

    const handleDeleteClick = (i) => {
        setIndex(i);
        setShowDeleteConfirmation(true);
    };

    const handleDelete = () => {
        setShowDeleteConfirmation(false);

        if (index !== -1) {
            scenes.splice(index, 1);
            setScenes(scenes);
            toast.success('Link deleted successfully');
            if (!toast.success) {
                toast.error('Error deleting link');
            }
        }
        console.log('deleted success');
        console.log(scenes);
    }

    const handleAddScene = (scene) => {
        setScenes([...scenes, scene]);
        toast.success('Link added');
        if (!toast.success) {
            toast.error('Error adding link');
        }
    };

    const handleSubmit = () => {
        console.log("Edited: ");
        console.log(id);
        if (sceneEdit === true) {
            handleSceneEditSubmit();
        } else {
            console.log("inside sscene edit");
            editScene(id, { sceneName, description })
                .then(() => {
                    toast.success('Scene updated');
                    router.push('/scenes');
                }).catch((error) => {
                    toast.error('Error editing scene');
                    console.error('Error editing scene:', error);
                });
        }

    };

    const handleSceneEditSubmit = async () => {
        console.log("scene edit...");
        setIsLoading(true);

        // Generate mind file
        setStatusMsg(STATUS_MSG.GENERATE_MIND_FILE);
        console.log('Scenes', scenes);
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
        formData.append('sceneName', sceneName);
        formData.append('description', description);
        formData.append('targetsAndContents', JSON.stringify(scenes.map((scene) => ({
            target: scene.target._id,
            content: scene.content._id,
        }))));

        editFullScene(id, formData)
            .then(() => {
                toast.success('Scene updated');
                router.push('/scenes');
            }).catch((error) => {
                toast.error('Error editing scene');
                console.error('Error editing scene:', error);
            }).finally(() => {
                setStatusMsg('');
                setIsLoading(false);
            });
    }


    return (
        <Container>
            <ToastContainer />
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Edit Scene</Typography>

                <Button
                    variant="contained"
                    color="inherit"
                    startIcon={<Iconify icon="typcn:tick" />}
                    onClick={handleSubmit}
                // disabled={scenes.length === 0 || sceneName === '' || statusMsg !== '' || isLoading}
                >
                    Update
                </Button>
            </Stack>
            {statusMsg && <Typography variant="body1">{statusMsg}</Typography>}
            <NewSceneDialog open={isDialogOpen} setOpen={setIsDialogOpen} addScene={handleAddScene} />
            <Stack pb={3}>
                <TextField
                    name="sceneName"
                    // label={sceneName}
                    onChange={(e) => setSceneName(e.target.value)}
                    value={sceneName}
                />
                {sceneUrl && <Typography variant='caption' pl={1} color="green">URL: {`${auth?.auth?.username}/${sceneUrl}`}</Typography>}
                <Typography variant='caption' pl={1}>(This name will be used in the URL)</Typography>

                <TextField
                    name="description"
                    // label={description}
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    sx={{ mt: 3 }} />
            </Stack>


            <Stack direction="row" justifyContent="space-between">
                <Typography variant='subtitle1'>Please select targets and contents</Typography>
                <Button
                    variant="outlined"
                    color="inherit"
                    startIcon={<Iconify icon="typcn:edit" />}
                    onClick={handleSceneEdit}
                // disabled={scenes.length === 0 || sceneName === '' || statusMsg !== '' || isLoading}
                >
                    Update Scenes
                </Button>
            </Stack>

            <Typography variant='caption' pl={1}>(Maximum 05 scenes can be there in a scene)</Typography>


            {sceneEdit === true && scenes.length < 5 && (
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

            <Stack direction="row" alignItems="center" gap={5}
                flexWrap="wrap" mt={2}>
                {
                    scenes.map((_scene, i) => (
                        <Stack key={i} direction="row" alignItems="center" gap={5}
                            sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 2 }}
                        >
                            <Typography variant="subtitle2">Scene {i + 1}</Typography>
                            {showSelectedImage(_scene?.target?.targetImage)}
                            <Iconify icon="material-symbols:link" sx={{ width: 30, height: 40 }} />
                            {showSelectedImage(_scene?.content?.contentImage)}
                            {console.log("i:", i)}
                            {sceneEdit === true && (
                                <Iconify
                                    icon="akar-icons:trash-can"
                                    index={i}
                                    onClick={() => handleDeleteClick(i)}
                                    sx={{ width: 25, height: 35, color: 'red', cursor: 'pointer' }}
                                />
                            )}
                            {showDeleteConfirmation && (
                                <LinkDeleteCard
                                    onClose={() => setShowDeleteConfirmation(false)}
                                    onDelete={handleDelete}
                                />
                            )}
                        </Stack>

                    ))
                }
            </Stack>



        </Container>
    );
}

export default EditScenePage