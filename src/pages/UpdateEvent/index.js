import React from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, CheckBox, TextInput, ScrollView, AsyncStorage, DatePickerAndroid, TimePickerAndroid, StyleSheet } from 'react-native';
import Search from 'react-native-search-box';
import posterFrame from '../../Images/posterframe.jpg';
import ImagePicker from 'react-native-image-picker';
import Buttonbar from '../../Images/bar.jpg';
import HomeIcon from '../../Images/homeicon.png';
import NotiIcon from '../../Images/notiicon.png';
import ProfileIcon from '../../Images/profileicon.png';
import FindIcon from '../../Images/findicon.png';
import { API_URL } from "../../config/api";
import { TextField } from 'react-native-material-textfield';
import { Button, Divider, Icon } from 'react-native-elements';


const { width, height } = Dimensions.get('window');

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

class UpdateEvent extends React.Component {


    state = {
        category: [],
        event: {
            posterpic: posterFrame,
            topic: '',
            eventstdate: new Date(),
            eventenddate: new Date(),
            time: '',
            place: '',
            contact: '..',
            facebook: '',
            line: '',
            web: '',
            phone: '',
            hashtag: '',
            description: '',
            categoryid: [],
            limited:0
        },

        user: {
            userid: "",
            firstname: "",
            lastname: ""
        }

    }


    getCategories() {
        return new Promise((resolve, reject) => {
            return fetch(API_URL + 'category')
                .then((response) => response.json())
                .then((data) => {
                    console.log('get categories', data)
                    this.setState(
                        { category: data },
                        () => {
                            this.getCurrentUser();

                            resolve();
                        }
                    );

                })
                .catch((error) => {
                    console.error(error);
                    alert("Fail");
                    reject();
                });
        });
    }
   
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
        fetch(API_URL + 'event', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                topic: this.state.event.topic,
                join: [
                    this.state.user.userid
                ],
                createby: this.state.user.userid,
                location: this.state.event.place,
                approve: "1",
                description: this.state.event.description,
                facebook: this.state.event.facebook,
                line: this.state.event.line,
                web: this.state.event.web,
                phone: this.state.event.phone,
                hashtag: this.state.event.hashtag,
                eventstdate: this.state.event.eventstdate,
                eventenddate: this.state.event.eventenddate,
                limited: this.state.event.limited,
                categoryid: this.state.event.categoryid

            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('vinaja', responseJson)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    setStartDate = async () => {
        try {
            alert("Start Date")
            const { action, year, month, day } = await DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: this.state.event.eventstdate
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                // Selected year, month (0-11), day
                console.log('Day ', day)
                console.log('Month ', month)
                console.log('Year ', year)
                console.log('Action ', action)
                this.setState({
                    event: {
                        ...this.state.event,
                        eventstdate: new Date(year, month, day, this.state.event.eventstdate.getHours(), this.state.event.eventstdate.getMinutes(), this.state.event.eventstdate.getMilliseconds())
                    }
                })

                console.log(this.state.event.eventstdate)
            }


        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }

    setEndDate = async () => {
        try {
            alert("End Date")
            const { action, year, month, day } = await DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: this.state.event.eventenddate
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                // Selected year, month (0-11), day
                console.log('Day ', day)
                console.log('Month ', month)
                console.log('Year ', year)
                console.log('Action ', action)
                this.setState({
                    event: {
                        ...this.state.event,
                        eventenddate: new Date(year, month, day, this.state.event.eventenddate.getHours(), this.state.event.eventenddate.getMinutes(), this.state.event.eventstdate.getMilliseconds())
                    }
                })

                console.log(this.state.event.eventenddate)
            }


        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }


    setTime = async () => {

        try {

            const dateNow = new Date()
            const { action, hour, minute } = await TimePickerAndroid.open({

                hour: this.state.event.eventstdate.getHours(),
                minute: this.state.event.eventstdate.getMinutes(),
                is24Hour: false, // Will display '2 PM',
            });
            if (action !== TimePickerAndroid.dismissedAction) {
                // Selected hour (0-23), minute (0-59)
                console.log(hour)
                console.log(minute)
                this.setState({
                    event: {
                        ...this.state.event,
                        eventstdate: new Date(this.state.event.eventstdate.getFullYear(), this.state.event.eventstdate.getMonth(), this.state.event.eventstdate.getDate(), hour, minute)
                    }
                })

                console.log(this.state.event.eventstdate)

            }
        } catch ({ code, message }) {
            console.warn('Cannot open time picker', message);
        }
    }


    componentDidMount() {
        this.getCategories()


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
                    event: {
                        ...this.state.event,
                        posterpic: source
                    }
                    // posterpic: source
                });
            }
        });
    }

    checkValue(cid) {
        if (this.state.event.categoryid.find((id) => cid === id)) {
            this.setState({
                event: {
                    ...this.state.event,
                    // userpic: kaimook, //TODO remove ******************************************************      
                    categoryid: this.state.event.categoryid.filter((id) => id !== cid)
                }
            })
        }
        else {
            this.setState({
                event: {
                    ...this.state.event,
                    // userpic: kaimook //TODO remove ******************************************************
                    categoryid: [...this.state.event.categoryid, cid]
                }
            })
        }
    }

    setFormatDate(date,month,year){
        date = "0"+date
        month = "0"+month
        return date.substring(date.length-2,date.length)+"-"+month.substring(month.length-2,month.length)+"-"+year
    }

    setFormatTime(hours,minutes){
        hours = "0"+hours
        minutes = "0"+minutes
        return hours.substring(hours.length-2,hours.length)+":"+minutes.substring(minutes.length-2,minutes.length)
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

                </View>
                <ScrollView style={styles.scrollStyle}>
                    <View style={{ padding: 20 }}>
                        <View style={styles.viewChooseImg}>
                            <TouchableOpacity onPress={() => { this.chooseImage() }}>
                                <Image
                                    source={this.state.event.posterpic}
                                    style={styles.imgStyle}
                                />
                            </TouchableOpacity>
                        </View>
                        {/* <View style={{ flexDirection: 'row' }}> */}

                        <View style={{}}>
                            <TextField
                                label='Topic'
                                value={this.state.event.topic}
                                onChangeText={text => this.setState({
                                    event: {
                                        ...this.state.event,
                                        topic: text
                                    }
                                })}
                            />


                            <TouchableOpacity

                                onPress={() => {
                                    // this.setState({ isSelect: item.id })
                                    // this.props.filterCategory(item.id)
                                    // Actions.Description({ eventid: item.id });
                                    this.setStartDate()
                                }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>
                                        <TextField
                                            label='Start Event Date'
                                            editable={false}
                                            value={this.setFormatDate(this.state.event.eventstdate.getDate(),this.state.event.eventstdate.getMonth() +1,this.state.event.eventstdate.getFullYear())}
                                        
                                        />
                                    </View>
                                    <View style={{ alignSelf: 'flex-end', paddingBottom: 3 }}>
                                        <Icon name='date-range' type='material-icons' size={50} color='green'
                                        />
                                    </View>

                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity

                                onPress={() => {
                                   
                                    this.setEndDate()
                                }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>
                                        <TextField
                                            label='End Event Date'
                                            editable={false}
                                            value={this.setFormatDate(this.state.event.eventenddate.getDate(),this.state.event.eventenddate.getMonth() +1,this.state.event.eventenddate.getFullYear())}                                                                                        
                                        />
                                    </View>
                                    <View style={{ alignSelf: 'flex-end', paddingBottom: 3 }}>
                                        <Icon name='date-range' type='material-icons' size={50} color='green'
                                        />
                                    </View>

                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity

                                onPress={() => {
                                   
                                    this.setTime()
                                }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>
                                        <TextField
                                            label='Start Event Time'
                                            // disabled={true}
                                            editable={false}
                                            value={this.setFormatTime(this.state.event.eventstdate.getHours(),this.state.event.eventstdate.getMinutes())}
                                            
                                        />
                                    </View>
                                    <View style={{ alignSelf: 'flex-end', paddingBottom: 3 }}>
                                        <Icon name='access-time' type='material-icons' size={50} color='green'
                                        />
                                    </View>

                                </View>
                            </TouchableOpacity>

                            <TextField
                                label='Location'
                                value={this.state.event.place}
                                onChangeText={text => this.setState({
                                    event: {
                                        ...this.state.event,
                                        place: text
                                    }
                                })}
                            />

                            <TextField
                                label='Limited'
                                value={this.state.event.limited}
                                onChangeText={text => this.setState({
                                    event: {
                                        ...this.state.event,
                                        limited: text
                                    }
                                })}
                            />
                            <TextField
                                label='Facebook'
                                value={this.state.event.facebook}
                                onChangeText={text => this.setState({
                                    event: {
                                        ...this.state.event,
                                        facebook: text
                                    }
                                })}
                            />

                            <TextField
                                label='Line'
                                value={this.state.event.line}
                                onChangeText={text => this.setState({
                                    event: {
                                        ...this.state.event,
                                        line: text
                                    }
                                })}
                            />
                            <TextField
                                label='Website'
                                value={this.state.event.website}
                                onChangeText={text => this.setState({
                                    event: {
                                        ...this.state.event,
                                        website: text
                                    }
                                })}
                            />

                            <TextField
                                label='Phone number'
                                value={this.state.event.phone}
                                onChangeText={text => this.setState({
                                    event: {
                                        ...this.state.event,
                                        phone: text
                                    }
                                })}
                            />           

                            <TextField
                                label='#Hashtag'
                                value={this.state.event.hashtag}
                                onChangeText={text => this.setState({
                                    event: {
                                        ...this.state.event,
                                        hashtag: text
                                    }
                                })}
                            />    

                            {/* <Button
                                    large
                                    icon={{ name: 'date-range', type: 'material-icons' }}
                                    // title='Edit profile'
                                    // buttonStyle={{}

                                    onPress={() => {
                                        // this.updateUser()
                                    }}

                                /> */}

                            {/* <TouchableOpacity

                                onPress={() => {
                                    // this.setState({ isSelect: item.id })
                                    // this.props.filterCategory(item.id)
                                    // Actions.Description({ eventid: item.id });
                                }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>
                                        <TextField
                                            label='#Hashtag'
                                            // disabled={true}
                                            editable={false}
                                            value={"this.state.event.hashtag"}
                                            onChangeText={text => this.setState({
                                                event: {
                                                    ...this.state.event,
                                                    hashtag: text
                                                }
                                            })}
                                        />
                                    </View>
                                    <View style={{ alignSelf: 'flex-end', paddingBottom: 3 }}>
                                        <Icon name='date-range' type='material-icons' size={50} color='green'
                                        />
                                    </View>

                                </View>
                            </TouchableOpacity> */}


                            <TextField
                                label='Description'
                                value={this.state.event.description}
                                onChangeText={text => this.setState({
                                    event: {
                                        ...this.state.event,
                                        description: text
                                    }
                                })}
                            />


                            <Text style={styles.desStyle}>Category :   </Text>

                            {this.state.category
                                .map((c) => {

                                    return (
                                        <View style={{ flexDirection: 'row' }}>
                                            <CheckBox
                                                value={(this.state.event.categoryid.find((id) => c.id === id)) ? true : false}
                                                onValueChange={() => this.checkValue(c.id)}

                                            />
                                            <Text style={{ marginTop: 5 }}> {c.categoryname} </Text>
                                        </View>
                                    )
                                })}

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
                </ScrollView>
            </View >
        )
    }

}

const styles = StyleSheet.create({
    buttonBar: { position: 'absolute', width: '100%', height: 55, resizeMode: 'stretch' },
    scrollStyle: { flexDirection: 'column', backgroundColor: "white", flex: 1 },
    viewChooseImg: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    imgStyle: { alignSelf: 'flex-start', width: 200, height: 200 },
    desStyle: { marginBottom: 16, fontSize: 20 },
    viewBtn: { flexDirection: 'column', height: 55, width: '100%' },
    topicStyle: { height: 50, borderColor: 'gray', borderWidth: 2, width: 180, height: 40 },
    setBtnStyle: { backgroundColor: '#ae5945', padding: 15, borderRadius: 15, alignItems: 'center' },
    setTextStyle: { color: 'white', fontSize: 20 },
    setTxtIn: { height: 50, borderColor: 'gray', borderWidth: 2, width: 180, height: 40 },
})

export default UpdateEvent;