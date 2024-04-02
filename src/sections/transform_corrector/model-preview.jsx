import 'aframe';
import PropTypes from 'prop-types';
import 'mind-ar/dist/mindar-image-aframe.prod';
import { useRef, useState, useEffect } from 'react';

// import { Box } from '@mui/material';

import { FILES_URL } from 'src/constants';

import Loading from 'src/components/loading';

// ----------------------------------------------------------------------

export default function ModelPreview({ selectedTarget, mindFile, targetIndex, position, rotation, scale }) {
    const sceneRef = useRef(null);

    const [stream, setStream] = useState(null);
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [isFirstCamera, setIsFirstCamera] = useState(true);

    const getUrl = (filePath) => `${FILES_URL}/${filePath}`

    useEffect(() => {
        if (!selectedTarget) {
            return;
        }

        const imageUrl = getUrl(selectedTarget?.target?.targetImage);
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = imageUrl;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 1200;
            canvas.height = 1200;

            const ctx = canvas.getContext('2d');

            const scaleFactor = Math.min((canvas.width / img.width), (canvas.height / img.height)) / 4;
            const imgWidth = img.width * scaleFactor;
            const imgHeight = img.height * scaleFactor;

            // calculate the position to center the image
            const x = (canvas.width - imgWidth) / 2;
            const y = (canvas.height - imgHeight) / 2;

            ctx.drawImage(img, x, y, imgWidth, imgHeight);

            setStream(canvas.captureStream());
        };
    }, [selectedTarget]);

    useEffect(() => {

        const sceneEl = sceneRef.current;
        const arSystem = sceneEl.systems["mindar-image-system"];

        sceneEl.addEventListener("renderstart", () => {
            arSystem.start(); // start AR

            setTimeout(async () => {
                setIsFirstRender(false);
            }, 1000);
        });

        // eslint-disable-next-line consistent-return
        return () => {
            arSystem.stop(); // stop AR
        };
    }, []);

    useEffect(() => {
        const changeStream = () => {
            if (!stream) return;

            setTimeout(() => {
                const allVideos = document.querySelectorAll("video");

                allVideos.forEach(async (video) => {
                    video.srcObject = stream;
                    video.muted = true;
                    await video.play();
                });
                setIsFirstCamera(false);
            }, isFirstCamera ? 1000 : 0);
        };

        if (isFirstRender) return;
        changeStream();
    }, [isFirstRender, stream, isFirstCamera]);

    return (
        <div
            style={{
                margin: "auto",
                position: "relative",
                height: "100vh",
                width: "100%",
                overflow: "hidden",
                zIndex: 10,
                backgroundColor: "black",
            }}
        >
            {!selectedTarget ? (
                <Loading />
            ) :
                <a-scene
                    ref={sceneRef}
                    mindar-image={`imageTargetSrc: ${getUrl(mindFile)}; autoStart: false; filterMinCF:0.0001; filterBeta: 0.01; maxTrack:2; uiLoading:no; uiScanning:no;`}
                    color-space="sRGB"
                    embedded
                    vr-mode-ui="enabled: false"
                    device-orientation-permission-ui="enabled: false"
                >
                    <a-assets><a-asset-item
                        id="content"
                        src={`${FILES_URL}/${selectedTarget.content.contentFile}`}
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
    selectedTarget: PropTypes.object,
    mindFile: PropTypes.string,
    targetIndex: PropTypes.number,
    position: PropTypes.object,
    rotation: PropTypes.object,
    scale: PropTypes.number,
};
