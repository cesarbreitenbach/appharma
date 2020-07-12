import React from 'react';
import DefaultButtom from '../../components/defaultButtom'
import { connect } from 'react-redux'
import {Conteiner, TextButtom, DayArea, HeaderText } from './styled'

const Page = (props) => {

   const toggleDay = (d) =>{
      let newVetor = [...props.workOutDays];
      if(props.workOutDays.includes(d)){
         newVetor = newVetor.filter(i=>i!=d);
      } else {
         newVetor.push(d)
      }
      props.setWorkOut(newVetor)
      console.log(newVetor)

   }
   
   
   let firstName = props.name.split(" ")[0];
   return (
      <Conteiner>
         <HeaderText>Ola, {firstName}. Quais dias vc vai treinar?</HeaderText>
        <DayArea>
            <DefaultButtom bgcolor={props.workOutDays.includes(1)?'#2cd4af':false} width="100px"  onPress={() => toggleDay(1)} underlayColor="#9d80ff"><TextButtom>Segunda</TextButtom></DefaultButtom>
            <DefaultButtom bgcolor={props.workOutDays.includes(2)?'#2cd4af':false} width="100px"  onPress={() => toggleDay(2)} underlayColor="#9d80ff"><TextButtom>Terça</TextButtom></DefaultButtom>
            <DefaultButtom bgcolor={props.workOutDays.includes(3)?'#2cd4af':false} width="100px"  onPress={() => toggleDay(3)} underlayColor="#9d80ff"><TextButtom>Quarta</TextButtom></DefaultButtom>
            <DefaultButtom bgcolor={props.workOutDays.includes(4)?'#2cd4af':false} width="100px"  onPress={() => toggleDay(4)} underlayColor="#9d80ff"><TextButtom>Quinta</TextButtom></DefaultButtom>
            <DefaultButtom bgcolor={props.workOutDays.includes(5)?'#2cd4af':false} width="100px"  onPress={() => toggleDay(5)} underlayColor="#9d80ff"><TextButtom>Sexta</TextButtom></DefaultButtom>
            <DefaultButtom bgcolor={props.workOutDays.includes(6)?'#2cd4af':false} width="100px"  onPress={() => toggleDay(6)} underlayColor="#9d80ff"><TextButtom>Sabado</TextButtom></DefaultButtom>
            <DefaultButtom bgcolor={props.workOutDays.includes(0)?'#2cd4af':false} width="100px"  onPress={() => toggleDay(0)} underlayColor="#9d80ff"><TextButtom>Domingo</TextButtom></DefaultButtom>
        </DayArea>
      </Conteiner>
     
   );
}

Page.navigationOptions =({navigation}) => {

   const nextAction = () =>{
      if(!navigation.state.params || !navigation.state.params.name){
         alert("Você precisa de um nome");
         return;
      }
      navigation.navigate('StarterDias');
   }

   return {
      title:'',
      headerRight:() => {
         return (         
                  <DefaultButtom  height="30px" width="60px" bgcolor="#7159c1" onPress={nextAction} underlayColor="#9d80ff" style={{marginTop:25}}> 
                   <TextButtom> Poximo </TextButtom>  
               </DefaultButtom>
         )}
      ,
      headerRightContainerStyle:{
         marginRight:10
      }
      
   }
}

const mapStateToProps = (state) => {
   return {
      name:state.userReducer.name,
      workOutDays:state.userReducer.workOutDays,
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      setName:(name)=>dispatch({type:'SET_NAME', payload:{name}}),
      setWorkOut:(workOutDays)=>dispatch({type:'SET_WORKOUT', payload:{workOutDays}})
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);