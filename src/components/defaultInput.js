import styled from 'styled-components/native'

export default styled.TextInput`
border:1px solid #000
width:${props=>props.width || 'auto'};
height:40px;
padding:4px;
border-radius:10px;
margin-bottom:10px;
`;