import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify';

import { Box, Container } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import useApi from 'src/hooks/useApi'

import Loading from 'src/components/loading';
import Iconify from 'src/components/iconify';

import ModelPreview from '../model-preview';
import ChangeTranformationForm from '../change-tranfromation-form';

export default function ChangeTranformationsView() {
    const router = useRouter();

    const { getSceneById, updateSceneTransformations } = useApi()
    const { sceneId } = useParams()

    const [sceneData, setSceneData] = useState(null);
    const [selectedTarget, setSelectedTarget] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
    const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
    const [scale, setScale] = useState(0.3);

    useEffect(() => {
        const fetchScene = async () => {
            try {
                const res = await getSceneById(sceneId)
                setSelectedTarget(res.data.targetsAndContents[0]);
                setSceneData(res.data);
            } catch (error) {
                console.error('error', error);
                setSceneData(null);
            }
        }

        fetchScene()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sceneId])

    // update the scene
    const updateScene = () => {
        const updatedScene = sceneData;
        const updatedSelectedScene = selectedTarget;

        updatedSelectedScene.position = position;
        updatedSelectedScene.rotation = rotation;
        updatedSelectedScene.scale = scale;

        updatedScene.targetsAndContents[selectedIndex] = updatedSelectedScene;

        updateSceneTransformations(sceneId, { position, rotation, scale, selectedIndex })
            .then(() => {
                toast.success('Scene updated successfully');
                router.replace(`/transformations`);
            })
            .catch((error) => {
                console.error('error', error);
                toast.error('Error updating scene');
            });
    }

    useEffect(() => {
        if (selectedTarget?.position) {
            setPosition(selectedTarget.position);
        }
        if (selectedTarget?.rotation) {
            setRotation(selectedTarget.rotation);
        }
        if (selectedTarget?.scale) {
            setScale(selectedTarget.scale);
        }

        // get the index of the selected scene
        if (!sceneData) return;
        const index = sceneData.targetsAndContents.findIndex((target) => target._id === selectedTarget._id);
        setSelectedIndex(index);
    }, [sceneData, selectedTarget])
    return (
        <>
            {!sceneData ? (
                <Loading />
            ) : (
                <Container maxWidth>
                    <ToastContainer />
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3 }}>
                        <Box width="20vw" sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            padding: 2,

                        }}>
                            {
                                sceneData.targetsAndContents.map((target, index) => (
                                    <Box
                                        key={target._id}
                                        sx={{
                                            cursor: 'pointer',
                                            padding: 1,
                                            border: '1px solid',
                                            borderColor: selectedIndex === index ? 'primary.main' : 'transparent',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                        onClick={() => {
                                            setSelectedTarget(target);
                                        }}
                                    >
                                        {target.target.targetName}
                                        {target.isTransformed && <Iconify icon="bitcoin-icons:verify-filled" width={40} sx={{color: "green"}} />}
                                    </Box>
                                ))
                            }
                        </Box>

                        <Box width="20vw">
                            <ChangeTranformationForm
                                position={position}
                                setPosition={setPosition}
                                rotation={rotation}
                                setRotation={setRotation}
                                scale={scale}
                                setScale={setScale}
                                handleSubmit={updateScene}
                            />
                        </Box>

                        <Box width="50vw">
                            <ModelPreview
                                selectedTarget={selectedTarget}
                                mindFile={sceneData.mindFile}
                                targetIndex={selectedIndex}
                                position={position}
                                rotation={rotation}
                                scale={scale}
                            />
                        </Box>
                    </Box>
                </Container>
            )}
        </>
    );
}

