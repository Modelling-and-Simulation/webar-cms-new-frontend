import 'aframe';
import PropTypes from 'prop-types';
import 'mind-ar/dist/mindar-image-aframe.prod';
import { useRef, useState, useEffect } from 'react';

// import { Box } from '@mui/material';

import { FILES_URL } from 'src/constants';

import Loading from 'src/components/loading';

// ----------------------------------------------------------------------

export default function ModelPreview({ sceneData, mindFile, targetIndex, position, rotation, scale }) {
    const sceneRef = useRef(null);

    const [stream, setStream] = useState(null);
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [isFirstCamera, setIsFirstCamera] = useState(true);

    const getUrl = (filePath) => `${FILES_URL}/${filePath}`

    useEffect(() => {
        if (!sceneData) return;
        const imageUrl = getUrl(sceneData?.targetsAndContents[targetIndex]?.target?.targetImage);
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
    }, [sceneData, targetIndex]);

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

                // filter videos that don't have id
                const videos = Array.from(allVideos).filter((video) => !video.id);

                videos.forEach(async (video) => {
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
            {!sceneData ? (
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
                    <a-assets>
                        {sceneData?.targetsAndContents?.map((target, index) => (
                            <>
                                {(target.content.contentType === "model/gltf-binary" ||
                                    target.content.contentType === "application/octet-stream") && (
                                        <a-asset-item
                                            key={index}
                                            id={`content${index}`}
                                            src={getUrl(target.content.contentFile)}
                                        />
                                    )}
                                {target.content.contentType.startsWith("image/") && (
                                    <img
                                        key={index}
                                        id={`content${index}`}
                                        src={getUrl(target.content.contentFile)}
                                        style={{ display: "none" }}
                                        alt='content'

                                    />
                                )}
                                {target.content.contentType.startsWith("video/") && (
                                    // eslint-disable-next-line jsx-a11y/media-has-caption
                                    <video
                                        key={index}
                                        id={`content${index}`}
                                        src={getUrl(target.content.contentFile)}
                                        autoPlay
                                        loop
                                    />
                                )}
                            </>
                        ))}
                    </a-assets>
                    <a-entity light="color: #fff; intensity: 1.5" position="0 0 1" />
                    <a-camera
                        position="0 0 0"
                        look-controls="enabled: false"
                        cursor="fuse: false; rayOrigin: mouse;"
                        // eslint-disable-next-line no-template-curly-in-string
                        raycaster="far: ${customFields.libVersion}; objects: .clickable"
                    />

                    {
                        sceneData?.targetsAndContents?.map((target, index) => (
                            <a-entity mindar-image-target={`targetIndex: ${index};`}>
                                {(target.content.contentType === "model/gltf-binary" ||
                                    target.content.contentType === "application/octet-stream") && (
                                        <a-gltf-model
                                            id="model"
                                            src={`#${`content${index}`}`}
                                            position={`${position.x} ${position.y} ${position.z}`}
                                            scale={`${scale} ${scale} ${scale}`}
                                            rotation={`${rotation.x} ${rotation.y} ${rotation.z}`}
                                        />
                                    )}
                                {target.content.contentType.startsWith("image/") && (
                                    <a-image
                                        id="model"
                                        src={`#${`content${index}`}`}
                                        position={`${position.x} ${position.y} ${position.z}`}
                                        scale={`${scale} ${scale} ${scale}`}
                                        rotation={`${rotation.x} ${rotation.y} ${rotation.z}`}
                                    />
                                )}
                                {target.content.contentType.startsWith("video/") && (
                                    <a-video
                                        id="model"
                                        src={`#${`content${index}`}`}
                                        position={`${position.x} ${position.y} ${position.z}`}
                                        scale={`${scale} ${scale} ${scale}`}
                                        rotation={`${rotation.x} ${rotation.y} ${rotation.z}`}
                                    />
                                )}
                            </a-entity>
                        ))
                    }

                </a-scene>
            }
        </div>
    );
}

ModelPreview.propTypes = {
    sceneData: PropTypes.object,
    mindFile: PropTypes.string,
    targetIndex: PropTypes.number,
    position: PropTypes.object,
    rotation: PropTypes.object,
    scale: PropTypes.number,
};
