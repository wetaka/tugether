import { Text, View, Image, Dimensions, TouchableOpacity, TextInput, ScrollView, FlatList, AsyncStorage } from 'react-native';
import Buttonbar from '../../Images/bar.jpg';
import FindIcon from '../../Images/findicon.png';
import { Actions } from "react-native-router-flux";
import React, { Component } from 'react';
import { Icon } from 'react-native-elements';

export default class HeaderMain extends Component {
    render() {
        return (

            <View style={{ height: 55, width: '100%', resizeMode: 'stretch', backgroundColor: 'red' }}>


                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <View style={{ height: 55, flex: 1, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderColor: 'grey', flexDirection: 'row' }}>


                        <TouchableOpacity
                            style={{ width: '20%', height: '100%', alignItems: 'flex-end', justifyContent: 'flex-end' }}
                            onPress={() => {
                                // Actions.CreateEvent();
                                this.props.navigate('CreateEvent')
                            }}

                        >
                            <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                <Icon name='plus-circle' type='feather' size={30} color='green'
                                />
                            </View>
                            {/* <Image source={FindIcon} style={{ width: '100%', height: '100%', alignItems: 'flex-end', justifyContent: 'flex-end' }} /> */}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ width: '20%', height: '100%', alignItems: 'flex-end', justifyContent: 'flex-end' }}
                            onPress={() => {
                                // Actions.CreateEvent();
                                this.props.navigate('UserSetting')
                            }}

                        >
                            <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                <Icon name='plus-circle' type='feather' size={30} color='green'
                                />
                            </View>
                            {/* <Image source={FindIcon} style={{ width: '100%', height: '100%', alignItems: 'flex-end', justifyContent: 'flex-end' }} /> */}
                        </TouchableOpacity>



                    </View>
                </View>
            </View>
        );
    }
}



