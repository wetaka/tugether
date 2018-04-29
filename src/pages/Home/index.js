import React from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, TextInput, ScrollView, FlatList, AsyncStorage, StyleSheet } from 'react-native';
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
import SearchHeader from "../../components/SearchHeader";
import SearchBox from "../../components/SearchBox";
import {API_URL} from "../../config/api"; 
import ListCategory from '../../components/ListCategory';

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


  state = {
    user: {
      userid: "",
      firstname: "",
      lastname: ""
    },
    isSelectCategory: 0,
    maxSize: 0,
    event: []
  };


  filterCategory(id){
    //alert(id)
    this.setState(
      { isSelectCategory: id },
      () => { this.searchEvent() }
    )
  }

  getAllEventActive() {
    console.log('get all Event')
    // alert('http://172.25.79.95:8000/api/chk-first-login/' + this.state.userid)
    //192.168.1.4
    fetch(API_URL+'event')
    // fetch('http://172.25.79.95:8000/api/event')
    
      .then((response) => response.json())
      .then((data) => {
        console.log('get eventid', data)
        this.setState({
          event: [...data]

        }, () => { console.log("test state", this.state) });
        //console.log(this.props.eventid)
      })
      .catch((error) => {
        console.error(error);
        alert("Fail");
      });
  }


  getUserByID() {
    return new Promise((resolve, reject) => {
      return fetch(API_URL+'user/' + this.props.userid)
        .then((response) => response.json())
        .then((data) => {
          console.log("fixbug getUserByID then 1")
          // this.setState({ category: this.setCategoriesWithSelect(data) });
          return AsyncStorage.setItem('CURRENT_USER', JSON.stringify(data));
          // console.log(this.props.userid)                      
        })
        .then(() => {
          console.log("fixbug getUserByID then 2")
          this.getAllEventActive();

          resolve();
        })
        .catch((error) => {
          console.log("fixbug getUserByID catch", error)
          reject()
        });
    })
  }

  componentWillMount() {
    console.log("fixbug ComponentWillMount jaaaaa")
    if (this.isFromLoginPage()) {
      this.getUserByID();
      console.log("fixbug ComponentWillMount if", this.props.userid)
    }
    else {
      this.getCurrentUser();
      console.log("fixbug ComponentWillMount else")
    }
  }

  getCurrentUser() {
    return AsyncStorage.getItem('CURRENT_USER')
      .then(value => {
        if (value) {
          // We have data!!
          console.log(value);
          this.getAllEventActive();
          ////////////////////WIP////////////////

        }
        else {
          Actions.Login();
        }
      })
  }

  isFromLoginPage() {
    return !!this.props.userid
  }


  componentDidMount() {
    // this.getUser();


  }


  searchEvent(text) {
    return new Promise((resolve, reject) => {
      return fetch(API_URL+'search-event/' + text +'/'+ this.state.isSelectCategory)
        .then((response) => response.json())
        .then((data) => {
          console.log("fixbug Search then 1")
          console.log(data)

          this.setState({
            event: [...data.data],
            maxSize: data.max_size,
          }, () => {
            console.log("test search", this.state)
            resolve()
          });
          // this.setState({ category: this.setCategoriesWithSelect(data) });
          //return AsyncStorage.setItem('CURRENT_USER', JSON.stringify(data));
          // console.log(this.props.userid)                      
        })
        .catch((error) => {
          console.log("fixbug Search catch", error)
          reject()
        });
    })

  }


  // searchEvent(){
  //   return new Promise((resolve, reject) => {
  //     return fetch('http://172.25.79.95:8000/api/user/' + this.props.placeholder)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log("fixbug getUserByID then 1")
  //         // this.setState({ category: this.setCategoriesWithSelect(data) });
  //         return AsyncStorage.setItem('CURRENT_USER', JSON.stringify(data));
  //         // console.log(this.props.userid)                      
  //       })
  //       .then(() => {
  //         console.log("fixbug getUserByID then 2")

  //         resolve();
  //       })
  //       .catch((error) => {
  //         console.log("fixbug getUserByID catch", error)
  //         reject()
  //       });
  //   })
  // }


  renderPost(item) {
    console.log('--------- tert')
    console.log('===> ', item)
    console.log(item)
    return (
      <View style={styles.posterStyle}>
        <TouchableOpacity
          onPress={() => {

            Actions.Description({ eventid: item.id });
          }}>
          <Image source={imgposter1} 
          style={styles.posterImg } />
          <Text style={ styles.topicStyle}>{item.topic}</Text>
          <Text style={{ fontSize: 20 }}>___________________</Text>
          <View style={ styles.desStyle }>
            <View style={styles.stdStyle}>
              <Text style={{ fontSize: 15 }}>{item.startdate}</Text>
            </View>
            <View style={styles.imgLine}>
              <Image source={line} style={{ alignSelf: 'flex-start' }} />
              <View>
                <Image source={location} style={ styles.imgLocation} />
                <Text style={{ fontSize: 15 }}>{item.location}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>

        {/* search */}

        <View style={styles.searchView}>
          <SearchHeader />
        </View>

        <SearchBox
          ref='search_box'
          onSearch={text => this.searchEvent(text)}
        />

        <ListCategory
          isSelectCategory={this.state.isSelectCategory}
          filterCategory={(id) => { this.filterCategory(id) }}
        />



        <FlatList
          data={this.state.event}
          renderItem={({ item }) => this.renderPost(item)}
          numColumns={2}
        />
        
        
        <View style={styles.buttonView}>

          <Image source={Buttonbar}
            style={styles.buttonBar}
          />

         
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

const styles = StyleSheet.create({
  buttonBar: { position: 'absolute', width: '100%', height: 55, resizeMode: 'stretch' },
  posterImg: { alignSelf: 'flex-start', width: '100%', height: 300 },
  topicStyle: {fontSize: 20, alignSelf: 'center'},
  desStyle:{flexDirection: 'row', alignItems: 'center' },
  stdStyle:{flex: 1, justifyContent: 'center', alignItems: 'center'},
  imgLine:{flex: 1, flexDirection: 'row', alignItems: 'center' },
  imgLocation:{alignSelf: 'center', width: 30, height: 30 },
  posterStyle:{borderWidth: 2, borderColor: 'gray', width: '50%' },
  searchView:{flexDirection: 'column', height: 55, width: '100%' },
  buttonView: {flexDirection: 'column', height: 55 },
})

export default Home;
