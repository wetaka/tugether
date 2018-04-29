import React from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, TextInput, ScrollView , StyleSheet} from 'react-native';
import poster from '../../Images/poster1.jpg'
import facebook from '../../Images/facebook.png'
import CustomInput from '../../components/CustomInput';
import Buttonbar from '../../Images/bar.jpg';
import HomeIcon from '../../Images/homeicon.png';
import NotiIcon from '../../Images/notiicon.png';
import ProfileIcon from '../../Images/profileicon.png';
import FindIcon from '../../Images/findicon.png';
import Footer from "../../components/Footer";
const { width, height } = Dimensions.get('window');
import SearchHeader from "../../components/SearchHeader";
import {API_URL} from "../../config/api"; 

class Description extends React.Component {

    state = {
        event: {
            eventid: "",
            topic: "",
            createby: "",
            categoryid: [],
            location: "",
            approve: "",
            description: "",
            facebook: "",
            line: "",
            web: "",
            phone: "",
            hashtag: "",
            bcapprove: "",
            posterpic: "",
            createdate: "",
            updatedate: "",
            startdate: "",
            enddate: "",
            eventstdate: "",
            eventenddate: "",
            active: true,
            limited: 0
        },
    };

    getEvent() {
        // alert('http://172.25.79.95:8000/api/chk-first-login/' + this.state.userid)
        fetch(API_URL+'event/' + this.props.eventid)
            .then((response) => response.json())
            .then((data) => {
                console.log('get eventid', data)
                this.setState({
                    event: {
                        eventid: "" + data.eventid,
                        topic: "" + data.topic,
                        createby: "" + data.createby,
                        categoryid: [...data.categoryid],
                        location: "" + data.location,
                        approve: "" + data.approve,
                        description: "" + data.description,
                        facebook: "" + data.facebook,
                        line: "" + data.line,
                        web: "" + data.web,
                        phone: "" + data.phone,
                        hashtag: "" + data.hashtag,
                        bcapprove: "" + data.bcapprove,
                        posterpic: "" + data.posterpic,
                        createdate: "" + data.createdate,
                        updatedate: "" + data.updatedate,
                        startdate: "" + data.startdate,
                        enddate: "" + data.enddate,
                        eventstdate: "" + data.eventstdate,
                        eventenddate: "" + data.eventenddate,
                        active: data.active,
                        limited: data.limited
                    }

                });
                //console.log(this.props.eventid)
            })
            .catch((error) => {
                console.error(error);
                alert("Fail");
            });
    }


    componentWillMount() {
        this.getEvent();
    }


    render() {

        const { event } = this.state
        return (
            <View style={{ flex: 1 }}>

                <View style={styles.searchStyle}>
                    <SearchHeader
                    // pm={this.props.userid} 
                    />
                </View>

                <ScrollView style={styles.scrollStyle}>
                    <View>

                        <Image source={poster} style={styles.posterStyle} ImageResizeMode="repeat" />
                        <View style={{ padding: 20 }}>
                            <Text style={{ fontSize: 23 }}>{event.topic}</Text>
                            <Text style={{ fontSize: 15 }}>Date    : {event.startdate}</Text>
                            <Text style={{ fontSize: 15 }}>time    : </Text>
                            <Text style={{ fontSize: 15 }}>Place   : {event.location}</Text>
                            <Text style={{ fontSize: 15 }}>Contact : </Text>
                            <View style={styles.iconView}>
                                <Image source={facebook} style={styles.fb} />
                                <Text style={{ fontSize: 15 }}>{event.facebook}</Text>
                            </View>
                            <Text style={{ fontSize: 15 }}>Description : </Text>
                            <Text style={{ fontSize: 15 }}>{event.description}</Text>


                            <View style={styles.txtStyle}>
                                {/* Input */}
                                <TextInput
                                    secureTextEntry={false}
                                    placeholder="Type your Question here to comment!"
                                    keyboardType="default"
                                    style={styles.commentStyle}
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
                        style={styles.buttonBar}
                    />

                    <View >
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

    posterStyle: { width: width, alignSelf: 'center' },
    scrollStyle: { flexDirection: 'column', backgroundColor: "white", flex: 1 },
    searchStyle: { flexDirection: 'column', height: 55, width: '100%' },
    fb: { alignSelf: 'flex-start', width: 50, height: 50 },
    txtStyle: { flexDirection: 'row', alignItems: 'center' },
    commentStyle: { height: 70, borderColor: 'gray', borderWidth: 2, width: '100%', height: 70 },
    buttonBar: { position: 'absolute', width: '100%', height: 55, resizeMode: 'stretch' },
    iconView: { flexDirection: 'row', alignItems: 'center' }
    // scrollStyle: {flexDirection: 'column', backgroundColor: "white", flex: 1},
    // viewChooseImg: {flexDirection: 'row', alignItems: 'center', justifyContent: 'center'},
    // imgStyle: {alignSelf: 'flex-start', width: 200, height: 200 },
    // desStyle: {marginBottom: 16, fontSize: 20},
    // viewBtn: {flexDirection: 'column', height: 55, width: '100%' },
    // topicStyle: { height: 50, borderColor: 'gray', borderWidth: 2, width: 180, height: 40 },
    // setBtnStyle: {backgroundColor: '#ae5945', padding: 15, borderRadius: 15, alignItems: 'center'},
    // setTextStyle: { color: 'white', fontSize: 20 },
    // setTxtIn: { height: 50, borderColor: 'gray', borderWidth: 2, width: 180, height: 40 },
  })


export default Description;