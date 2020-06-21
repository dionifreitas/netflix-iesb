import React from 'react';
import styled from 'styled-components/native';
import Avatar from '../components/Avatar';
import {View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

import AppContext from '../Context';

const Screen = styled.View`
  flex: 1;
  background-color: #000;
  flex-direction: column;
  padding: 10px;
  justify-content: center;
`;

const AvantarsContainer = styled.View`
  height: 150px;
`;

const Row = styled.View`
  flex: 1;
  background-color: #000;
  padding: 10px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const NetflixButton = styled.TouchableOpacity`
  flex-direction: row;
  margin: 10px;
  justify-content: center;
  align-items: center;
`;

const ButtonLabel = styled.Text`
  margin: 10px;
  color: gray;
`;

const selectProfile = (navigation, item, context) => {
  context.setCurrentUser(item);
  navigation.navigate('Home', {name: item.name});
};

const editProfile = (navigation, context) => {
  navigation.navigate('ProfileToEdit', {context});
};

const More = (props) => {
 
  return (
    <AppContext.Consumer>
        {context => (
          <Screen>
            <AvantarsContainer>
              <Row horizontal>
                {context.profilesAvailable.map((item) => {
                  return (
                    <Avatar
                      key={item.name}
                      image={item.icon}
                      uri={item.uri}
                      name={item.name}
                      onPress={() => selectProfile(props.navigation, item, context)}
                    />
                  );
                })}
              </Row>
            </AvantarsContainer>
            <NetflixButton
              onPress={() => editProfile(props.navigation, context)}>
              <MaterialIcons name="edit" size={24} color="gray" />
              <ButtonLabel>Gerenciar perfis</ButtonLabel>
            </NetflixButton>
          </Screen>
          )
        }
    </AppContext.Consumer>
  );
};

export default More;
