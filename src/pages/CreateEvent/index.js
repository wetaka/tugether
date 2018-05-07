import React from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, TextInput, ScrollView, AsyncStorage , DatePickerAndroid ,TimePickerAndroid , StyleSheet} from 'react-native';
import Search from 'react-native-search-box';
import posterFrame from '../../Images/posterframe.jpg';
import ImagePicker from 'react-native-image-picker';
import Buttonbar from '../../Images/bar.jpg';
import HomeIcon from '../../Images/homeicon.png';
import NotiIcon from '../../Images/notiicon.png';
import ProfileIcon from '../../Images/profileicon.png';
import FindIcon from '../../Images/findicon.png';
import Footer from "../../components/Footer";
import { API_URL } from "../../config/api";

const { width, height } = Dimensions.get('window');

// const {action, year, month, day} = await DatePickerAndroid.open({
//     // Use `new Date()` for current date.
//     // May 25 2020. Month 0 is January.
//     date: new Date(2020, 4, 25)
//   });


/////////////////////////////test///////////////////////////////////
const options = {
    title: 'Select Avatar',
    customButtons: [
        { name: 'fb', title: 'Choose Photo from Facebook' },
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }

};

class CreateEvent extends React.Component {


    state = {

        event: {
            avatarSource: posterFrame,
            topic: '..',
            date: '..',
            time: '..',
            place: '..',
            contact: '..',
            description: '..'
        },

        user: {
            userid: "",
            firstname: "",
            lastname: ""
        }

    }


    // try {
    //     const {action, year, month, day} = await DatePickerAndroid.open({
    //       // Use `new Date()` for current date.
    //       // May 25 2020. Month 0 is January.
    //       date: new Date(2020, 4, 25)
    //     });
    //     if (action !== DatePickerAndroid.dismissedAction) {
    //       // Selected year, month (0-11), day
    //     }
    //   } catch ({code, message}) {
    //     console.warn('Cannot open date picker', message);
    //   }

    getCurrentUser() {
        console.log("getCurrentUser")

        return AsyncStorage.getItem('CURRENT_USER')
            .then(value => {
                value = JSON.parse(value);
                console.log('value   ', value);
                if (value) {
                    // We have data!!

                    this.setState({
                        user: {
                            userid: value.userid,
                            firstname: value.firstname,
                            lastname: value.lastname
                        }
                    });
                }
                else {
                    // Actions.Login();
                    this.props.navigation.navigate('Login')
                }
            })
            .catch(() => { console.log('eiei error') })
    }


    saveEvent() {
        fetch(API_URL + 'event' + this.state.user.userid, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userid: "5709650069",
                topic: "last",
                join: [
                    1
                ],
                createby: 1,
                location: "สนามศุภชลาศัยจ้าาาา",
                approve: "2",
                description: "งานฟุตบอลประเพณี ค่าบัตรราคา 100,200,400 บาท ซื้อบัตรได้ที่ศูนย์หนังสือธรรมศาสตร์ มี bnk นะจ้ะงานนี้ ",
                facebook: "CUTU football",
                line: "line",
                web: "web",
                phone: "08527800003",
                hashtag: "#cututraditional#football#ฟุตบอลประเพณี",
                bcapprove: "-",
                posterpic: "l",
                createdate: "2018-03-26T04:03:01.559000Z",
                updatedate: "2018-03-26T04:03:01.559000Z",
                startdate: "2018-03-26T04:03:01.559000Z",
                enddate: "2018-03-26T04:03:01.559000Z",
                eventstdate: "2018-03-26T04:03:01.559000Z",
                eventenddate: "2018-03-26T04:03:01.559000Z",
                active: true,
                limited: 100,

                // topic: this.state.topic,
                // date: this.state.date,
                // time: this.state.time,
                // place: this.state.place,
                // contact: this.state.contact,
                // description: this.state.description

            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                // this.state = {isLoading: false  };
                console.log('vinaja', responseJson)

                // this.setState({
                //   isLoading: false,
                //   dataSource: responseJson.movies,
                // });

                // alert(this.state.isLoading)

            })
            .catch((error) => {
                console.error(error);
            });
    }

    setDate = async () => {
        try {
            alert(555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555)
            const {action, year, month, day} = await DatePickerAndroid.open({
              // Use `new Date()` for current date.
              // May 25 2020. Month 0 is January.
              date: new Date(2020, 4, 25)
            });
            if (action !== DatePickerAndroid.dismissedAction) {
              // Selected year, month (0-11), day
            }
          } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
          }
    }

    setTime = async () => {
        try {
            const {action, hour, minute} = await TimePickerAndroid.open({
              hour: 14,
              minute: 0,
              is24Hour: false, // Will display '2 PM'
            });
            if (action !== TimePickerAndroid.dismissedAction) {
              // Selected hour (0-23), minute (0-59)
            }
          } catch ({code, message}) {
            console.warn('Cannot open time picker', message);
          }
    }


    componentDidMount() {
        // fetch('https://facebook.github.io/react-native/movies.json')
        this.getCurrentUser();

    }

    chooseImage() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                console.log(source);
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source
                });
            }
        });
    }
    
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Search
                    ref="search_box"
                    /**
                     * There many props that can customizable
                    * Please scroll down to Props section

                    */
                    backgroundColor="orange"


                />
                <View style={styles.viewBtn}>

                    <Image source={Buttonbar}
                        style={styles.buttonBar}
                    />

                    {/* <View style={{ flexDirection: 'row', flex: 1 }}>
                        <View style={{ height: 55, flex: 1, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderColor: 'grey', flexDirection: 'row' }}>
                            <TextInput style={{ fontSize: 20, flex: 1 }} placeholder="Search" />
                            <Image source={FindIcon} style={{ width: '20%', height: '100%', alignItems: 'flex-end', justifyContent: 'flex-end' }} />
                        </View>
                    </View> */}
                </View>
                <ScrollView style={styles.scrollStyle}>
                    <View style={{ padding: 20 }}>
                        <View style={styles.viewChooseImg}>
                            <TouchableOpacity onPress={() => { this.chooseImage() }}>
                                <Image
                                    source={this.state.event.avatarSource}
                                    style={styles.imgStyle}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row' }}>


                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={styles.desStyle}>Topic:   </Text>
                                    <Text style={styles.desStyle}>Date:   </Text>
                                    <Text style={styles.desStyle}>Time:   </Text>
                                    <Text style={styles.desStyle}>Place:   </Text>
                                    <Text style={styles.desStyle}>Contact:   </Text>
                                    <Text style={styles.desStyle}>Description:   </Text>
                                </View>

                                <View>
                                    <TextInput
                                        secureTextEntry={false}
                                        keyboardType="default"
                                        style={styles.topicStyle}
                                        onChangeText={text => { this.setState({ topic: text }) }}
                                        value={this.state.event.topic}
                                    />

                                    <TouchableOpacity
                                        style={styles.setBtnStyle}
                                        onPress={() => { this.setDate() }}
                                    >
                                        <Text style={styles.setTextStyle}>
                                            date
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.setBtnStyle}
                                        onPress={() => { this.setTime() }}
                                    >
                                        <Text style={styles.setTextStyle}>
                                            time
                                        </Text>
                                    </TouchableOpacity>

                                    <TextInput
                                        secureTextEntry={false}
                                        keyboardType="default"
                                        style={styles.setTxtIn}
                                        onChangeText={text => { this.setState({ date: text }) }}
                                        value={this.state.event.date}
                                    />
                                    <TextInput
                                        secureTextEntry={false}
                                        keyboardType="default"
                                        style={styles.setTxtIn}
                                        onChangeText={text => { this.setState({ time: text }) }}
                                        value={this.state.event.time}
                                    />
                                    <TextInput
                                        secureTextEntry={false}
                                        keyboardType="default"
                                        style={styles.setTxtIn}
                                        onChangeText={text => { this.setState({ place: text }) }}
                                        value={this.state.event.place}
                                    />
                                    <TextInput
                                        secureTextEntry={false}
                                        keyboardType="default"
                                        style={styles.setTxtIn}
                                        onChangeText={text => { this.setState({ contact: text }) }}
                                        value={this.state.event.contact}
                                    />
                                    <TextInput
                                        secureTextEntry={false}
                                        keyboardType="default"
                                        style={styles.setTxtIn}
                                        onChangeText={text => { this.setState({ description: text }) }}
                                        value={this.state.event.description}
                                    />
                                    {/* <Text style={{ fontSize: 20 }}> ___________________</Text>
                                    <Text style={{ fontSize: 20 }}> ___________________</Text>
                                    <Text style={{ fontSize: 20 }}> ___________________</Text>
                                    <Text style={{ fontSize: 20 }}> ___________________</Text>
                                    <Text style={{ fontSize: 20 }}> ___________________</Text> */}

                                    <View style={{ paddingVertical: 10 }}>
                                        <TouchableOpacity
                                            style={styles.setBtnStyle}
                                            onPress={() => { this.saveEvent() }}
                                        >
                                            <Text style={styles.setTextStyle}>
                                                SAVE
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View >
                    <Footer
                        navigate ={this.props.navigation.navigate}
                        pm={(this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.userid) ? this.props.navigation.state.params.userid : null}
                    />
                </View>
            </View >
        )
    }

}

const styles = StyleSheet.create({
    buttonBar: { position: 'absolute', width: '100%', height: 55, resizeMode: 'stretch' },
    scrollStyle: {flexDirection: 'column', backgroundColor: "white", flex: 1},
    viewChooseImg: {flexDirection: 'row', alignItems: 'center', justifyContent: 'center'},
    imgStyle: {alignSelf: 'flex-start', width: 200, height: 200 },
    desStyle: {marginBottom: 16, fontSize: 20},
    viewBtn: {flexDirection: 'column', height: 55, width: '100%' },
    topicStyle: { height: 50, borderColor: 'gray', borderWidth: 2, width: 180, height: 40 },
    setBtnStyle: {backgroundColor: '#ae5945', padding: 15, borderRadius: 15, alignItems: 'center'},
    setTextStyle: { color: 'white', fontSize: 20 },
    setTxtIn: { height: 50, borderColor: 'gray', borderWidth: 2, width: 180, height: 40 },
  })

export default CreateEvent;