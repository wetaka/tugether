import React, { Component } from 'react';
import { AppRegistry, TextInput } from 'react-native';

export default class CustomInput extends Component {
  render() {
    return (
      <TextInput
        secureTextEntry={this.props.secureTextEntry}
        keyboardType={this.props.keyboardType}
        style={{height: 40, borderColor: 'gray', borderWidth: 1, flex: (this.props.isFull) ? 1 : 0 }}
        onChangeText={() => {}}
        placeholder={this.props.placeholder}
        value={null}
      />
    );
  }
}


