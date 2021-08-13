import React from "react";
import Image, {ImageProps} from "next/image";

const MIN_SIZE = 200;

const BaseImage = (props: ImageProps) => {
    const normalized = {...props};

    if (!props.width) {
        normalized.width = props.height ? props.height : MIN_SIZE;
    }
    if (!props.height) {
        normalized.height = props.width ? props.width : MIN_SIZE;
    }
    return <Image {...normalized} objectFit={'contain'}/>
}

export default BaseImage;