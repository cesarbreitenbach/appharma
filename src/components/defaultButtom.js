import styled from 'styled-components/native';

export default styled.TouchableHighlight`
width:${props=>props.width || 'auto'};
height:${props=>props.height || '40px'};
background-color:${props=>props.bgcolor || '#DDD'};
border-radius:100px;
justify-content:center;
align-items:center
margin-bottom:25px;
`