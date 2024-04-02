import 'aframe';
import { useParams } from 'react-router-dom';
import 'mind-ar/dist/mindar-image-aframe.prod';
import { useRef, useState, useEffect } from 'react'

import useApi from 'src/hooks/useApi';

import { FILES_URL } from 'src/constants';

import Loading from 'src/components/loading';

const loadAssets = (sceneData) => {
    const assets = sceneData.targetsAndContents.map((targetAndContent, index) => (
        <a-asset-item
            key={`item${index}`}
            id={`target${index}`}
            src={`${FILES_URL}/${targetAndContent.content.contentFile}`}
        />
    ));

    return assets;
}

const PublicScenePage = () => {
    const sceneRef = useRef(null);
    const { getSceneByUrl } = useApi();
    const { authorName, sceneName } = useParams();

    const [sceneData, setSceneData] = useState(null);

    const getUrl = (filePath) => `${FILES_URL}/${filePath}`

    useEffect(() => {
        const fetchScene = async () => {
            try {
                const res = await getSceneByUrl(`${authorName}/${sceneName}`);
                setSceneData(res.data);
            } catch (error) {
                console.error('error', error);
                setSceneData(null);
            }
        }
        fetchScene();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authorName, sceneName]);

    useEffect(() => {
        if (!sceneData) {
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

    }, [sceneData]);

    return (
        <div
            style={{
                margin: "auto",
                position: "relative",
                height: "98vh",
                width: "98vw",
                overflow: "hidden",
            }}
        >
            {!sceneData ? (
                <Loading />
            ) : (
                <a-scene
                    ref={sceneRef}
                    mindar-image={`imageTargetSrc: ${getUrl(sceneData.mindFile)}; autoStart: false; filterMinCF:0.0001; filterBeta: 0.01; maxTrack:2; uiScanning:no;`}
                    color-space="sRGB"
                    embedded
                    vr-mode-ui="enabled: false"
                    device-orientation-permission-ui="enabled: false"
                >
                    <a-assets>{loadAssets(sceneData)}</a-assets>
                    <a-camera
                        position="0 0 0"
                        look-controls="enabled: false"
                        cursor="fuse: false; rayOrigin: mouse;"
                        // eslint-disable-next-line no-template-curly-in-string
                        raycaster="far: ${customFields.libVersion}; objects: .clickable"
                    />

                    {sceneData.targetsAndContents.map((tc, index) => {
                        const { position, rotation, scale } = tc;
                        return (
                            <a-entity
                                key={index}
                                mindar-image-target={`targetIndex: ${index};`}
                            >
                                <a-gltf-model
                                    id="model"
                                    class="clickable"
                                    src={`#target${index}`}
                                    position={`${position.x} ${position.y} ${position.z}`}
                                    scale={`${scale} ${scale} ${scale}`}
                                    rotation={`${rotation.x} ${rotation.y} ${rotation.z}`}
                                    click-node="targetNode: SunRoof"
                                />
                            </a-entity>
                        )
                    })}
                </a-scene>
            )}
        </div>
    );
}

export default PublicScenePage