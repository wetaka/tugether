import React from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, TextInput, ScrollView, FlatList, AsyncStorage } from 'react-native';
import imgposter1 from '../../Images/poster1.jpg'
import imgposter2 from '../../Images/poster2.jpg'
import location from '../../Images/location.png'
import line from '../../Images/line.png'
import Buttonbar from '../../Images/bar.jpg';
import HomeIcon from '../../Images/homeicon.png';
import NotiIcon from '../../Images/notiicon.png';
import ProfileIcon from '../../Images/profileicon.png';
import FindIcon from '../../Images/findicon.png';
import { Actions } from "react-native-router-flux";
import Footer from "../../components/Footer";


// import posterframe from '../../Images/posterframe.jpg'
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



class Home extends React.Component {

  getUserByID() {
    return new Promise((resolve, reject) => {
      return fetch('http://172.25.79.95:8000/api/user/' + this.props.userid)
        .then((response) => response.json())
        .then((data) => {
          console.log("fixbug getUserByID then 1")
          // this.setState({ category: this.setCategoriesWithSelect(data) });
          return AsyncStorage.setItem('CURRENT_USER', JSON.stringify(data));
          // console.log(this.props.userid)                      
        })
        .then(() => {
          console.log("fixbug getUserByID then 2")
          
          resolve();
        })
        .catch((error) => {
           console.log("fixbug getUserByID catch",error)
          reject()
        });
    })
  }
  componentWillMount() {
    console.log("fixbug ComponentWillMount jaaaaa")
    if(this.isFromLoginPage()){
      this.getUserByID();
      console.log("fixbug ComponentWillMount if", this.props.userid)
    }
    else{
      this.getCurrentUser();
      console.log("fixbug ComponentWillMount else")
    }
  }

  getCurrentUser(){
    return AsyncStorage.getItem('CURRENT_USER')
    .then(value  => {
      if (value !== null){
        // We have data!!
        console.log(value);
        ////////////////////WIP////////////////

      }
      else{
        Actions.Login();
      }
    })
  }

  isFromLoginPage(){
    return !!this.props.userid
  }


  componentDidMount() {
    // this.getUser();
    

  }



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
        <FlatList
          data={posters}
          renderItem={({ item }) => this.renderPost(item)}
          numColumns={2}
        />
        <View style={{ flexDirection: 'column', height: 55 }}>

          <Image source={Buttonbar}
            style={{ position: 'absolute', width: '100%', height: 55, resizeMode: 'stretch' }}
          />

          {/* <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ height: 55, flex: 1, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderColor: 'grey', flexDirection: 'row' }} onPress={() => { Actions.Home({ userid: this.props.userid }) }}>
              <Image source={HomeIcon} style={{ width: '20%', height: '50%' }}
              />

             


            </TouchableOpacity>


            <TouchableOpacity style={{ height: 55, flex: 1, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderColor: 'grey', flexDirection: 'row' }}>
              <Image source={NotiIcon} style={{ width: '20%', height: '50%' }} />
             
            </TouchableOpacity>

            <TouchableOpacity style={{ height: 55, flex: 1, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderColor: 'grey', flexDirection: 'row' }} onPress={() => { Actions.Main() }
            }>
              <Image source={ProfileIcon} style={{ width: '20%', height: '50%' }} />
             
            </TouchableOpacity>
          </View> */}

          <View>
            <Footer 
              pm={this.props.userid}
            />
            </View>
        </View>
      </View>
    )
  }
}

export default Home;
