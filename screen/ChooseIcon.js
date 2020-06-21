import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {View} from 'react-native';
import Avatar from '../components/Avatar';
import AppContext from '../Context';
const Screen = styled.View`
  flex: 1;
  background-color: #000;
  padding: 10px;
  align-content: center;
`;

const Row = styled.ScrollView`
  height: 80px;
`;

const Label = styled.Text`
  color: white;
  padding: 10px;
`;

const Button = styled.Button`
  margin: 10px;
  background-color: white;
`;

let iconsAvailables = [
  require('../assets/avatars/avatar6.png'),
  require('../assets/avatars/avatar5.png'),
  require('../assets/avatars/avatar4.png'),
  require('../assets/avatars/avatar3.png'),
  require('../assets/avatars/avatar2.png'),
  require('../assets/avatars/avatar1.png'),
];

const ChooseIcon = (props) => {
  useEffect(() => {
    props.navigation.setOptions({
      title: 'Choose your Avatar',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 16,
      },
      headerStyle: {
        backgroundColor: 'black',
        borderBottomColor: '#ffffff',
      },
      headerTintColor: 'white',
    });
  }, []);

  return (
    <AppContext.Consumer>
        {context => 
          (<Screen>
            <Label>Classic</Label>
            <View style={{height: 80}}>
              <Row horizontal>
                {iconsAvailables.map((icon, index) => (
                  <Avatar
                    key={index}
                    image={icon}
                    onPress={() => {
                      const current = props.route.params.item; 
                      const newUser = {
                        icon: icon,
                        name: current.name
                      };   
                      context.setUser(newUser);                
                      props.navigation.navigate('More');
                    }}
                  />
                ))}
              </Row>
            </View>
            <Label>Create your avatar</Label>
            
            <Button
              color="#1a1718"
              title="CAMERA"
              onPress={() => {
                props.navigation.navigate('Camera', {
                  item: props?.route?.params?.item,
                });
              }}
            />
          </Screen>)
      }
    </AppContext.Consumer>
  );
};

export default ChooseIcon;
