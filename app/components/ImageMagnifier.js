"use client"

import Image from 'next/image';
import { useRef, useState } from 'react';

const ImageMagnifier = ({ src, width, height, zoomLevel = 2 }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [backgroundPosition, setBackgroundPosition] = useState('0% 0%');
    const imageRef = useRef();

    const handleMouseMove = (e) => {
        const { left, top, width, height } =
            imageRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setBackgroundPosition(`${x}% ${y}%`);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                cursor: 'zoom-in',
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={imageRef}
        >
            <Image
                src={src}
                alt="Zoomable"
                width={width} // Use the dynamic width from props
                height={height} // Use the dynamic height from props
                onError={() => console.error('Image failed to load')}
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    transition: 'opacity 0.3s ease',
                    opacity: 1, // Keep opacity always visible
                }}
                className="object-cover w-full h-full"
            />
            {isHovered && (
                <div
                    style={{
                        backgroundImage: `url("${src}")`,
                        backgroundPosition: backgroundPosition,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: `${zoomLevel * 100}% ${
                            zoomLevel * 100
                        }%`, // Set to zoom level for both dimensions
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none',
                        zIndex: 99999,
                    }}
                ></div>
            )}
        </div>
    );
};

export default ImageMagnifier;
