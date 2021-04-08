import styled from "styled-components";

export const SpaceWrapper = styled.div`
  width: ${({width}: {width?: string; height?: string}) => width || 'auto'};
  height: ${({height}: {width?: string; height?: string}) => height || 'auto'}
`
