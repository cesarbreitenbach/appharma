import styled from 'styled-components/native'

export default styled.Image`
   width:${props=>props.width || '35px'};
   height:${props=>props.height || '35px'};
   margin:5px 10px;
`;