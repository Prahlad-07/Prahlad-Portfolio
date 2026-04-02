import { useEffect, useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { LinearFilter, MeshBasicMaterial, SRGBColorSpace, VideoTexture } from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const DEFAULT_TEXTURE = '/textures/project/project1.mp4';

const DemoComputer = ({ texture = DEFAULT_TEXTURE, ...props }) => {
    const groupRef = useRef(null);
    const { scene } = useGLTF('/models/computer.glb');
    const model = useMemo(() => scene.clone(true), [scene]);
    const videoElement = useMemo(() => {
        if (typeof document === 'undefined') return null;

        const video = document.createElement('video');
        video.src = texture;
        video.crossOrigin = 'anonymous';
        video.preload = 'metadata';
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.autoplay = true;

        return video;
    }, [texture]);

    useEffect(() => {
        if (!videoElement) return;

        const playback = videoElement.play();
        if (playback?.catch) {
            playback.catch(() => {});
        }

        return () => {
            videoElement.pause();
            videoElement.removeAttribute('src');
            videoElement.load();
        };
    }, [videoElement]);

    const videoTexture = useMemo(() => {
        if (!videoElement) return null;
        return new VideoTexture(videoElement);
    }, [videoElement]);

    useEffect(() => {
        if (!videoTexture) return;

        videoTexture.flipY = false;
        videoTexture.colorSpace = SRGBColorSpace;
        videoTexture.minFilter = LinearFilter;
        videoTexture.magFilter = LinearFilter;
        videoTexture.generateMipmaps = false;
    }, [videoTexture]);

    useEffect(
        () => () => {
            videoTexture?.dispose();
        },
        [videoTexture],
    );

    const monitorMaterial = useMemo(
        () => new MeshBasicMaterial({ map: videoTexture, toneMapped: false }),
        [videoTexture],
    );

    useEffect(
        () => () => {
            monitorMaterial.dispose();
        },
        [monitorMaterial],
    );

    useEffect(() => {
        let monitorMesh = null;

        model.traverse((node) => {
            if (node.isMesh && node.name === 'monitor-screen') {
                monitorMesh = node;
            }
        });

        if (!monitorMesh) return undefined;

        const previousMaterial = monitorMesh.material;
        monitorMesh.material = monitorMaterial;

        return () => {
            monitorMesh.material = previousMaterial;
        };
    }, [model, monitorMaterial]);

    useGSAP(() => {
        if (!groupRef.current) return undefined;

        const tween = gsap.fromTo(
            groupRef.current.rotation,
            { y: Math.PI / 2 },
            { y: 0, duration: 0.75, ease: 'power2.out' },
        );

        return () => {
            tween.kill();
        };
    }, [texture]);

    return <primitive ref={groupRef} object={model} {...props} dispose={null} />;
};

export default DemoComputer;
