import React from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import imgposter1 from '../../Images/poster1.jpg'
import imgposter2 from '../../Images/poster2.jpg'
import location from '../../Images/location.png'
import line from '../../Images/line.png'
import Kaimook from '../../Images/mook.jpg'
import Buttonbar from '../../Images/bar.jpg';
import HomeIcon from '../../Images/homeicon.png';
import NotiIcon from '../../Images/notiicon.png';
import ProfileIcon from '../../Images/profileicon.png';
import FindIcon from '../../Images/findicon.png';


const { width, height } = Dimensions.get('window');

const posters = [
  {
    id: '12345555',
    imgposter: imgposter1,
    name: 'TU Freshynight',
    month: 'NOV',
    date: '16',
    img: location,
    place: 'Gym 5',
  },
  {
    id: '12345556',
    imgposter: imgposter2,
    name: 'Life Dream Journey',
    month: 'AUG',
    date: '1',
    img: location,
    place: 'ศูนย์ประชุม',
  },
  {
    id: '12345557',
    imgposter: imgposter2,
    name: 'Life Dream Journey',
    month: 'AUG',
    date: '1',
    img: location,
    place: 'ศูนย์ประชุม',
  },
  {
    id: '12345557',
    imgposter: imgposter2,
    name: 'Life Dream Journey',
    month: 'AUG',
    date: '1',
    img: location,
    place: 'ศูนย์ประชุม',
  }
]



class Main extends React.Component {
  renderPost(item) {
    console.log('--------- tert')
    console.log('===> ', item)
    console.log(item)
    return (
      <View style={{ borderWidth: 2, borderColor: 'gray', width: '50%' }}>
        <Image source={item.imgposter} style={{ alignSelf: 'flex-start', width: '100%', height: 300 }} />
        <Text style={{ fontSize: 20, alignSelf: 'center' }}>{item.name}</Text>
        <Text style={{ fontSize: 20 }}>___________________</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 15 }}>{item.month}</Text>
            <Text style={{ fontSize: 15 }}>{item.date}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Image source={line} style={{ alignSelf: 'flex-start' }} />
            <View>
              <Image source={item.img} style={{ alignSelf: 'center', width: 30, height: 30 }} />
              <Text style={{ fontSize: 15 }}>{item.place}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }


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
          <View>
            <View style={{ paddingVertical:7, flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'white' }}>
              <View>
                <Text style={{ fontSize: 25,fontWeight:'bold' }}>5709650179</Text>
                <Text style={{ fontSize: 20 }}>พัชต์วรินทรา วงศ์ฉัตรทอง</Text>
              </View>
              <Image source={Kaimook} style={{ alignSelf: 'flex-start', width: 90, height: 90 }} />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={{ backgroundColor: '#ae5945', paddingVertical: 10, flex: 1, alignItems: 'center' }}>
                <Text style={{ color: 'white' }}>
                  My Post
              </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: '#ae5945', paddingVertical: 10, flex: 1, alignItems: 'center' }}>
                <Text style={{ color: 'white' }}>
                  Up Coming
              </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: '#ae5945', paddingVertical: 10, flex: 1, alignItems: 'center' }}>
                <Text style={{ color: 'white' }}>
                  History
              </Text>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={posters}
            renderItem={({ item }) => this.renderPost(item)}
            numColumns={2}
          />
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

export default Main;
