import React from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import kaimook from '../../Images/mook.jpg'
import wi from '../../Images/wi.jpg'
import Buttonbar from '../../Images/bar.jpg';
import HomeIcon from '../../Images/homeicon.png';
import NotiIcon from '../../Images/notiicon.png';
import ProfileIcon from '../../Images/profileicon.png';
import FindIcon from '../../Images/findicon.png';
import calendar from '../../Images/calendar.png';
import imgposter1 from '../../Images/poster1.jpg';
import imgposter2 from '../../Images/poster2.jpg';
import location from '../../Images/location.png';

const { width, height } = Dimensions.get('window');

const users = [
    {
      id: '  12345555',
      img: imgposter1,
      name: '    TU Freshynight',
      date: '    NOV 16',
      imglo: location,
      imgCa: calendar, 
      place: '    Gym 5',
    },
    {
      id: '  12345556',
      img: imgposter2,
      name: '    Life Dream Journey',
      date: '    AUG 1',
      imglo: location,
      imgCa: calendar,
      place: '    ศูนย์ประชุม',
    },
]

class Notificate extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>

            <View style={{ flexDirection: 'column', height: 55, width: '100%' }}>

                <Image source={Buttonbar}
                    style={{ position: 'absolute', width: '100%', height: 55, resizeMode: 'stretch' }}
                />

                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <View style={{ height: 55, flex: 1, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderColor: 'grey', flexDirection: 'row' }}>
 
                    </View>
                </View>
            </View>
            <ScrollView style={{ flexDirection: 'column', backgroundColor: '#FFF8DC', flex: 1 }}>
                <View style={{ padding: 20 }}>

                    {
                        users.map((user) => {
                            return (
                                <View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center',backgroundColor:'#FFFFF0' }}>
                                        <Image source={user.img} style={{ alignSelf: 'flex-start', width: 120, height: 120 }} />
                                        <View>
                                            <Text style={{ fontSize: 15 }}>{user.name}</Text>
                                            <Image source={user.imgCa} style={{ alignSelf: 'flex-start', width: 10, height: 10 }} />
                                            <Text style={{ fontSize: 15 }}>{user.date} </Text>         
                                           

                                            <Image source={user.imglo} style={{ alignSelf: 'flex-start', width: 10, height: 10 }} />
                                            <Text style={{ fontSize: 15 }}>{user.place}</Text>
                                        </View>
                                    </View>
                                     <Text style={{ fontSize: 5 }}>                              </Text> 
                                </View>
                            );
                        })
                    }
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
</View >
            

        )
    }

}
export default Notificate;