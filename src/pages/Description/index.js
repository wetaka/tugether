import React from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import poster from '../../Images/poster1.jpg'
import facebook from '../../Images/facebook.png'
import CustomInput from '../../components/CustomInput';
import Buttonbar from '../../Images/bar.jpg';
import HomeIcon from '../../Images/homeicon.png';
import NotiIcon from '../../Images/notiicon.png';
import ProfileIcon from '../../Images/profileicon.png';
import FindIcon from '../../Images/findicon.png';
const { width, height } = Dimensions.get('window');

class Description extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>

                <View style={{ flexDirection: 'column', height: 55, width: '100%' }}>

                    <Image source={Buttonbar}
                        style={{ position: 'absolute', width: '100%', height: 55, resizeMode: 'stretch' }}
                    />

                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <View style={{ height: 55, flex: 1, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderColor: 'grey', flexDirection: 'row' }}>
                            <TextInput style={{ fontSize: 20, flex: 1 }} placeholder="Search" />
                            <Image source={FindIcon} style={{ width: '20%', height: '100%', alignItems: 'flex-end', justifyContent: 'flex-end' }} />
                        </View>
                    </View>
                </View>

            <ScrollView style={{ flexDirection: 'column', backgroundColor: "white", flex: 1 }}>
                <View>
                   
                    <Image source={poster} style={{ width: width, alignSelf: 'center' }} ImageResizeMode="repeat" />
                    <View style={{ padding: 20 }}>
                        <Text style={{ fontSize: 23 }}>Freshy night 2017</Text>
                        <Text style={{ fontSize: 15 }}>Date    : 16 November</Text>
                        <Text style={{ fontSize: 15 }}>time    : 17.00-23.00</Text>
                        <Text style={{ fontSize: 15 }}>Place   : Gymnasium 5</Text>
                        <Text style={{ fontSize: 15 }}>Contact : </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={facebook} style={{ alignSelf: 'flex-start', width: 50, height: 50 }} />
                            <Text style={{ fontSize: 15 }}>facebook TU Freshy</Text>
                        </View>
                        <Text style={{ fontSize: 15 }}>Description : </Text>
                        <Text style={{ fontSize: 15 }}>Freshynight 2017 (รอบ final)</Text>
                        <Text style={{ fontSize: 15 }}>16 พฤศจิกายน 2017 ตั้งแต่เวลา 17.00 น. เป็นต้นไป</Text>
                        <Text style={{ fontSize: 15 }}>ณ ยิมเนเซี่ยม 5 ธรรมศาตร์ศูนย์รังสิต</Text>


                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {/* Input */}
                            <TextInput
                                secureTextEntry={false}
                                placeholder="Type your Question here to comment!"
                                keyboardType="default"
                                style={{ height: 70, borderColor: 'gray', borderWidth: 2, width: '100%', height: 70 }}
                                onChangeText={() => { }}
                            />

                            {/* Button */}
                            {/* <TouchableOpacity
                                style={{ backgroundColor: 'grey', padding: 15, borderRadius: 1, alignItems: 'center' }}
                            >
                                <Text style={{ color: 'white', fontSize: 30 }}>
                                    OK
                                </Text>
                            </TouchableOpacity> */}
                        </View>
                    </View>
                </View>
            </ScrollView>
               <View style={{ flexDirection: 'column', height: 55 }}>

               <Image source={Buttonbar}
                   style={{ position: 'absolute', width: '100%', height: 55, resizeMode: 'stretch' }}
               />

               <View style={{ flexDirection: 'row' }}>
                   <View style={{ height: 55, flex: 1, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderColor: 'grey', flexDirection: 'row' }}>
                       <Image source={HomeIcon} style={{ width: '20%', height: '50%' }} />
                       {/* <Text style={{ fontSize: 20 }}>  Home </Text> */}
                   </View>

                   <View style={{ height: 55, flex: 1, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderColor: 'grey', flexDirection: 'row' }}>
                       <Image source={NotiIcon} style={{ width: '20%', height: '50%' }} />
                       {/* <Text style={{ fontSize: 20 }}>  Notification </Text> */}
                   </View>

                   <View style={{ height: 55, flex: 1, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderColor: 'grey', flexDirection: 'row' }}>
                       <Image source={ProfileIcon} style={{ width: '20%', height: '50%' }} />
                       {/* <Text style={{ fontSize: 20 }}>  Profile </Text> */}
                   </View>
               </View>
           </View>
       </View>
        )
    }

}

export default Description;