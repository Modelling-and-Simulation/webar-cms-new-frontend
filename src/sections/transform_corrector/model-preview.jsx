import 'aframe';
import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';
import 'mind-ar/dist/mindar-image-aframe.prod';

// import { Box } from '@mui/material';

import { FILES_URL } from 'src/constants';

// ----------------------------------------------------------------------

export default function ModelPreview({ selectedScene, mindFile, targetIndex, position, rotation, scale }) {
    const sceneRef = useRef(null);

    const getUrl = (filePath) => `${FILES_URL}/${filePath}`

    useEffect(() => {
        if (!selectedScene) {
            return;
        }

        const sceneEl = sceneRef.current;
        const arSystem = sceneEl.systems["mindar-image-system"];

        console.log('arSystem', arSystem);

        sceneEl.addEventListener("renderstart", () => {
            arSystem.start(); // start AR
        });

        // eslint-disable-next-line consistent-return
        return () => {
            arSystem.stop(); // stop AR
        };

    }, [selectedScene]);

    return (
        <div
            style={{
                margin: "auto",
                position: "relative",
                height: "100vh",
                width: "80vw",
                overflow: "hidden",
                zIndex: 10,
                backgroundColor: "black",
            }}
        >
            {!selectedScene ? (
                <div>Loading...</div>
            ) :
                <a-scene
                    ref={sceneRef}
                    mindar-image={`imageTargetSrc: ${getUrl(mindFile)}; autoStart: false; filterMinCF:0.0001; filterBeta: 0.01; maxTrack:2; uiScanning:no;`}
                    color-space="sRGB"
                    embedded
                    vr-mode-ui="enabled: false"
                    device-orientation-permission-ui="enabled: false"
                >
                    <a-assets><a-asset-item
                        id="content"
                        src={`${FILES_URL}/${selectedScene.content.contentFile}`}
                    /></a-assets>

                    <a-camera
                        position="0 0 0"
                        look-controls="enabled: false"
                        cursor="fuse: false; rayOrigin: mouse;"
                        // eslint-disable-next-line no-template-curly-in-string
                        raycaster="far: ${customFields.libVersion}; objects: .clickable"
                    />

                    {targetIndex !== undefined &&
                        // <a-entity mindar-image-target="targetIndex: 0;">
                        <a-entity mindar-image-target={`targetIndex: ${targetIndex};`}>
                            <a-gltf-model
                                id="model"
                                class="clickable"
                                src="#content"
                                position={`${position.x} ${position.y} ${position.z}`}
                                scale={`${scale} ${scale} ${scale}`}
                                rotation={`${rotation.x} ${rotation.y} ${rotation.z}`}
                                click-node="targetNode: SunRoof"
                            />
                        </a-entity>
                    }

                </a-scene>
            }
        </div>
    );
}

ModelPreview.propTypes = {
    selectedScene: PropTypes.object,
    mindFile: PropTypes.string,
    targetIndex: PropTypes.number,
    position: PropTypes.object,
    rotation: PropTypes.object,
    scale: PropTypes.number,
};
