"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ImageRatio = ({ src, initialWidth, uuid }) => {
    const [height, setHeight] = useState(0)

    useEffect(() => {
        setHeight(initialWidth * (4 / 3));
    }, [initialWidth]);

    return (
        <Link
            href={`/product/${uuid}`}
            className="block product-image rounded-tl-[15px] rounded-tr-[15px] overflow-hidden"
            style={{
                width: initialWidth,
                height: height,
                position: 'relative',
            }}
        >
            <Image
                src={src}
                layout="fill"
                sizes=''
                objectFit="cover"
                alt="Custom Image"
            />
        </Link>
    );
};

export default ImageRatio;
