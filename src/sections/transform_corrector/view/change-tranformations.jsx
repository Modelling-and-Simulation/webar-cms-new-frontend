import React, { useState, useEffect } from 'react'

import { Box, Container } from '@mui/material';

import useApi from 'src/hooks/useApi'

import ModelPreview from '../model-preview';
import ChangeTranformationForm from '../change-tranfromation-form';

export default function ChangeTranformationsView() {
    const { getSceneById, updateSceneTransformations } = useApi()

    const sceneId = '6608dcff1e2e397198287b40';
    const [sceneData, setSceneData] = useState(null);
    const [selectedScene, setSelectedScene] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
    const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
    const [scale, setScale] = useState(0.3);

    useEffect(() => {
        const fetchScene = async () => {
            try {
                const res = await getSceneById(sceneId)
                setSceneData(res.data);
                setSelectedScene(res.data.targetsAndContents[1]);
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
        const updatedSelectedScene = selectedScene;

        updatedSelectedScene.position = position;
        updatedSelectedScene.rotation = rotation;
        updatedSelectedScene.scale = scale;

        updatedScene.targetsAndContents[selectedIndex] = updatedSelectedScene;

        updateSceneTransformations(sceneId, { position, rotation, scale, selectedIndex })
    }

    useEffect(() => {
        if (selectedScene?.position) {
            setPosition(selectedScene.position);
        }
        if (selectedScene?.rotation) {
            setRotation(selectedScene.rotation);
        }
        if (selectedScene?.scale) {
            setScale(selectedScene.scale);
        }

        // get the index of the selected scene
        if (!sceneData) return;
        const index = sceneData.targetsAndContents.findIndex((scene) => scene._id === selectedScene._id);
        setSelectedIndex(index);
    }, [sceneData, selectedScene])
    return (
        <Container maxWidth>
            {!sceneData ? (
                <div>Loading...</div>
            ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3 }}>
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

                    <ModelPreview
                        selectedScene={selectedScene}
                        mindFile={sceneData.mindFile}
                        targetIndex={selectedIndex}
                        position={position}
                        rotation={rotation}
                        scale={scale}
                    />
                </Box>
            )}
        </Container>
    );
}

