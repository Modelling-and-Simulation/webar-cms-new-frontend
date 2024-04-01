import 'aframe';
import { Helmet } from 'react-helmet-async';
import 'mind-ar/dist/mindar-image-aframe.prod';
import React, { useRef, useState, useEffect } from "react";

// ----------------------------------------------------------------------

export default function TestPage() {
    const videoRef = useRef(null);
    const camRef = useRef(null);
    const sceneRef = useRef(null);

    const [stream, setStream] = useState(null);

    useEffect(() => {
        console.log('inside useEffect');
        const imageUrl = "http://localhost:8080/public/targetImages/171160535313759818199.webp";
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = imageUrl;
        console.log('img', img);
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 600;
            canvas.height = 600;
            
            const ctx = canvas.getContext('2d');

            console.log('canvas', canvas.width, canvas.height);
            console.log('img', img.width, img.height);

            const scaleFactor = Math.min((canvas.width / img.width), (canvas.height / img.height))/2;
            const imgWidth = img.width * scaleFactor;
            const imgHeight = img.height * scaleFactor;

            console.log('scaleFactor', scaleFactor);
            console.log('imgWidth', imgWidth);
            console.log('imgHeight', imgHeight);

            // calculate the position to center the image
            const x = (canvas.width - imgWidth) / 2;
            const y = (canvas.height - imgHeight) / 2;

            ctx.drawImage(img, x, y, imgWidth, imgHeight);
            console.log('ctx', ctx);

            // const stream = canvas.captureStream();
            setStream(canvas.captureStream());

            // const video = videoRef.current;
            // console.log('video', video);
            // video.srcObject = stream;
            // video.muted = true;
            // video.play();
        };
    }, [videoRef, camRef]);

    useEffect(() => {
        if (!stream) return;

        const sceneEl = sceneRef.current;
        const arSystem = sceneEl.systems["mindar-image-system"];

        sceneEl.addEventListener("renderstart", () => {
            arSystem.start(); // start AR

            // wait for the video to load and then set the stream
            setTimeout(() => {
                const allVideos = document.querySelectorAll("video");

                allVideos.forEach((video) => {
                    console.log('changing video stream', video);
                    video.srcObject = stream;
                    video.muted = true;
                    video.play();
                });
            }, 1000);
        });

        // eslint-disable-next-line consistent-return
        return () => {
            arSystem.stop(); // stop AR
        };
    }, [stream]);

    return (
        <>
            <Helmet>
                <title> Test Page </title>
            </Helmet>
            <div>
                <div
                    style={{
                        margin: "auto",
                        position: "relative",
                        height: "100vh",
                        width: "80vw",
                        overflow: "hidden",
                        zIndex: 100,
                        backgroundColor: "black",
                    }}
                >
                    <a-scene
                        ref={sceneRef}
                        mindar-image="imageTargetSrc: http://localhost:8080/public/mindFiles/1711856895868638586639.mind; autoStart: false; filterMinCF:0.0001; filterBeta: 0.01; maxTrack:2; uiScanning:no;"
                        color-space="sRGB"
                        embedded
                        vr-mode-ui="enabled: false"
                        device-orientation-permission-ui="enabled: false"
                    >
                        <a-assets><a-asset-item
                            id="content"
                            src="http://localhost:8080/public/contentFiles/1711605429399341906794.glb"
                        /></a-assets>

                        <a-camera
                            id="acamera"
                            ref={camRef}
                            position="0 0 0"
                            look-controls="enabled: false"
                            cursor="fuse: false; rayOrigin: mouse;"
                            // eslint-disable-next-line no-template-curly-in-string
                            raycaster="far: ${customFields.libVersion}; objects: .clickable"
                        />

                        <a-entity mindar-image-target="targetIndex: 0;">
                            <a-gltf-model
                                id="model"
                                class="clickable"
                                src="#content"
                                position="0 0 0"
                                scale="0.3 0.3 0.3"
                                rotation="0 0 0"
                                click-node="targetNode: SunRoof"
                            />
                        </a-entity>

                    </a-scene>

                </div>
            </div>
        </>
    );
}
