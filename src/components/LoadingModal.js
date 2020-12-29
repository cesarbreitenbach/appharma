import React from 'react'
import { Modal, ActivityIndicator } from "react-native";
import styled from 'styled-components/native';


const ModalArea = styled.SafeAreaView`
   flex:1;
   background-color: rgba(0, 0, 0, 0.5);
   justify-content:center;
   align-items:center;
`

export const ActivityArea = styled.View`
   align-items:center;
   justify-content:center;
   flex:1;
`


const LoadingModal = ({ visible, visibleAction }) => {


    return (
        <Modal
            visible={visible}
            visiblieAction={visibleAction}
            animationType="fade"
            transparent={true}
        >
            <ModalArea >
                <ActivityArea>
                    <ActivityIndicator size="large" color="#999" />
                </ActivityArea>
            </ModalArea>

        </Modal>
    )

}

export default  LoadingModal;
