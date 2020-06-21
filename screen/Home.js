import React from 'react';

import {StatusBar, Dimensions} from 'react-native';

import {LinearGradient} from 'expo-linear-gradient';

import styled from 'styled-components/native';


import Header from '../components/Header';
import Hero from '../components/Hero';
import Movies from '../components/Movies';
import AppContext from '../Context';


const api = (context) => {
  return {
    allMovies: context.allMovies,
    userMovies: context.userMovies[context.currentUser.name]
  }
};

const Container = styled.ScrollView`
  flex: 1;
  background-color: #000;
`;

const Poster = styled.ImageBackground`
  width: 100%;
  height: ${(Dimensions.get('window').height * 81) / 100}px;
`;

const Gradient = styled(LinearGradient)`
  height: 100%;
`;

const isInternational = (context, countryCodes) => {
  console.log(countryCodes, context.countryCode)
  return !countryCodes.includes(context.countryCode);
} 

const Home = () => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <AppContext.Consumer>
        {context => (
          <Container>
            <Poster source={{ uri: api(context).allMovies[Math.floor(Math.random() * api(context).allMovies.length)].Poster }}>
              <Gradient
                locations={[0, 0.2, 0.6, 0.93]}
                colors={[
                  'rgba(0,0,0,0.5)',
                  'rgba(0,0,0,0.0)',
                  'rgba(0,0,0,0.0)',
                  'rgba(0,0,0,1)',
                ]}>
                <Header />
                <Hero />
              </Gradient>
            </Poster>
            <Movies label="Minha lista" item={api(context).userMovies} />
            <Movies label="Nacionais" item={api(context).allMovies.filter(m => !isInternational(context, m.CountryCodes))} />
            <Movies label="Internacionais" item={api(context).allMovies.filter(m => isInternational(context, m.CountryCodes))} />
          </Container>)
          }
      </AppContext.Consumer>
    </>
  );
};

export default Home;
