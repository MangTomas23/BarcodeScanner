/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { RNCamera } from "react-native-camera";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class App extends Component {
  state = {
    flash: false
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Camera</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.camera.resumePreview()}>
            <Text>RETRY</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({ flash: !this.state.flash})}>
            <Text>TOGGLE FLASH</Text>
          </TouchableOpacity>

        </View>


        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={{
            flex: 1
          }}
          flashMode={this.state.flash ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
          permissionDialogTitle={"Permission to use camera"}
          permissionDialogMessage={
            "We need your permission to use your camera phone"
          }
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);

            if(barcodes.length > 0) {
              this.camera.pausePreview();
              alert(barcodes[0].data)
            }
          }}
          
          captureAudio={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
