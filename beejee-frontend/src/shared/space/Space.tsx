import React from "react";
import { SpaceWrapper } from "./styled-components";

const Space: React.FC<{width?: string; height?: string}> = ({width, height}) => {
    return <SpaceWrapper width={width} height={height} />
}

export default Space