import React from 'react';
import { View, Text, Image, Dimensions,TouchableOpacity } from 'react-native';
import TULogo from '../../Images/Logo.png'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import Bg from '../../Images/bg.jpg'
const { width } = Dimensions.get('window');


class Login extends React.Component {
    render() {
        return (
            <View style={{ flexDirection: 'column', backgroundColor: "white", flex: 1 }}>
                <Image source={Bg}
                    style={{ flexDirection: 'column', position: 'absolute', width: '100%', height: '100%', resizeMode: 'stretch' }}
                >
                </Image>
                <View style={{ padding: 30, paddingTop: 0 }}>
                    <Image source={TULogo} style={{ maxWidth: width - 100, alignSelf: 'center' }} ImageResizeMode="repeat" />
                    <View style={{ paddingVertical: 10 }}>
                        <CustomInput placeholder="Username" keyboardType="numeric" secureTextEntry={false} />
                    </View>
                    <View style={{ paddingVertical: 10 }}>
                        <CustomInput placeholder="Password" keyboardType="numeric" secureTextEntry={true} />
                    </View>
                    <View style={{ paddingVertical: 10 }}>
                        <TouchableOpacity
                            style={{ backgroundColor: '#ae5945', padding: 15, borderRadius: 15, alignItems: 'center' }}
                            onPress={() => { alert('login') }}
                        >
                            <Text style={{ color: 'white', fontSize: 20 }}>
                                Login via authen app
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

export default Login;
