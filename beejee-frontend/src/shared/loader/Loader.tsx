import React from "react";
import { LoaderWrapper } from "./styled-components";

type Props = {
    isLoading: boolean;
}

const Loader: React.FC<Props> = ({isLoading, children}) => {
    return isLoading ? <LoaderWrapper>
        <img id={'loader'} alt={'loader'} src={'spinner.gif'} />
    </LoaderWrapper> : <>{children}</>
}

export default Loader;