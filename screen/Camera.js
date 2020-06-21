'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import AppContext from '../Context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default class Camera extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permissão para usar a câmera',
            message: 'Nós precisamos de permissão para acessar a câmera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancelar',
          }}        
         
        />
        <AppContext.Consumer>
        {context => (
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity onPress={this.takePicture.bind(this, context, this.props.route.params.item)} style={styles.capture}>
              <Text style={{ fontSize: 14 }}> Capturar </Text>
            </TouchableOpacity>
          </View>
          )}
        </AppContext.Consumer>
      </View>
    );
  }

  takePicture = async (context, user) => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      context.setUser({ name: user.name, uri: data.uri });
      this.props.navigation.navigate('More');
    }
  };
  
}
