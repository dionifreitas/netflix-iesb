import React  from 'react';
import Tabs from './routes/Tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Camera from './screen/Camera';
import ChooseIcon from './screen/ChooseIcon';
import ProfileToEdit from './screen/ProfileToEdit';

import Geocoder from 'react-native-geocoder';
import Geolocation  from '@react-native-community/geolocation';


const Stack = createStackNavigator();

import AppContext from './Context';

export default class App extends React.Component {
  
  userMovies = require('./assets/MoviesToResume.json');
  allMovies = require('./assets/Movies.json');

  profilesAvailable = [
    {
      icon: require('./assets/avatars/avatar1.png'),
      name: 'José',
      uri: null,
    },
    {
      icon: require('./assets/avatars/avatar2.png'),
      name: 'Luiz',
      uri: null,
    },
    {
      icon: require('./assets/avatars/avatar3.png'),
      name: 'João',
      uri: null,
    },
    {
      icon: require('./assets/avatars/avatar4.png'),
      name: 'Maria',
      uri: null,
    },
    {
      icon: require('./assets/avatars/avatar5.png'),
      name: 'Pedro',
      uri: null,
    },
  ];

  state = {
    currentUser: this.profilesAvailable[0],
    profilesAvailable: this.profilesAvailable,
    countryCode: '',
  }

  setCurrentUser = user => {
    this.setState({
      currentUser: user
    })
  }

  setUser = user => {
    var users = this.state.profilesAvailable.map(u => {      
      if (user.name == u.name){
        return user;
      }
      return u;
    });     
    this.setState({
      profilesAvailable: users
    })  
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(position => {
      Geocoder.geocodePosition({ lat: position.coords.latitude, lng: position.coords.longitude })
        .then(locations => {
          console.log(locations)
          if (locations[0]){
            this.setState({ countryCode: locations[0].countryCode})
          }        
        }).catch(console.error)
    }, console.error)
  }

  render() {
    return (
      <AppContext.Provider value={{
        profilesAvailable: this.state.profilesAvailable, 
        currentUser: this.state.currentUser,   
        allMovies: this.allMovies,
        userMovies: this.userMovies,
        countryCode: this.state.countryCode,
        setCurrentUser: this.setCurrentUser,
        setUser: this.setUser       
      }}>
        <NavigationContainer>
          <Stack.Navigator>

            <Stack.Screen
              name="Tabs"
              component={Tabs}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Camera"
              component={Camera}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ChooseIcon"
              component={ChooseIcon}
              options={{ headerShown: true }}
            />

            <Stack.Screen
              name="ProfileToEdit"
              component={ProfileToEdit}
              options={{ headerShown: true }}
            />

          </Stack.Navigator>
        </NavigationContainer>
      </AppContext.Provider>
    )
  }

}