import React from 'react';
import DefaultButtom from '../../components/defaultButtom'
import DefaultInput from '../../components/defaultInput'
import { connect } from 'react-redux'
import {Conteiner, HeaderText, TextButtom} from './styled'



const Page = (props) => {

   let auxCpf = props.cpf;
   
   const nextAction = () =>{
      if(!props.name){
         alert("Você precisa digitar um nome!");
         return
      }
      props.navigation.navigate('StarterDias');
   }

   const handleChangeName = (t) =>{
         props.setName(t);
         props.navigation.setParams({name:t});
   }
   
   return (
      <Conteiner>
         <HeaderText>CPF: {auxCpf} Qual é o seu nome?</HeaderText>
         <DefaultInput width="100%"  onChangeText={handleChangeName} autoFocus={true} autoCapitalize="words" onSubmitEditing={nextAction}/>
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
         )
      },
      headerRightContainerStyle:{
         marginRight:10
      }
      
   }
}

const mapStateToProps = (state) => {
   return {
      name:state.userReducer.name,
      cpf:state.userReducer.cpf,
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      setName:(name)=>dispatch({type:'SET_NAME', payload:{name}})
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);