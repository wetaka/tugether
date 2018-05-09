import React from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, TextInput, ScrollView, StyleSheet, CheckBox, AsyncStorage } from 'react-native';
import kaimook from '../../Images/mook.jpg'
import { API_URL } from "../../config/api";
import { Button } from 'react-native-elements';



// import { CheckBox } from 'react-native-elements'

class UserSetting extends React.Component {

    state = {
        category: [],
        user: {
            categoryid: []
        }
    };

    componentDidMount() {
        this.getCategories()


    }

    getCurrentUser() {
        console.log("getCurrentUser")

        return AsyncStorage.getItem('CURRENT_USER')
            .then(value => {
                value = JSON.parse(value);
                if (value && value.userid) {
                    // this.setState({
                    //     user: { ...value }
                    // }
                    // );
                    this.getUserByID(value.userid)

                }
                else {

                    // Actions.Login();
                    this.props.navigation.navigate('Login')
                }
            })

            .catch(() => { console.log('eiei error') })
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

    updateUser() {

        return fetch(API_URL + 'user/' +this.state.user.userid, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.user),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('vinaja', responseJson)
                // this.getidofuser()
                // this.addfirstcategory()
                return  AsyncStorage.setItem('CURRENT_USER',JSON.stringify(this.state.user))
                
            })
            .then(()=>  alert("Success"))       
            .catch((error) => {
                console.error(error);
                alert("Not Success")
               
            });
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
                    // const { userid } = this.props.navigation.state.params;
                    // console.log(userid)
                })
                .catch((error) => {
                    console.error(error);
                    alert("Fail");
                    reject();
                });
        });
    }


    getUserByID(userid) {
        return new Promise((resolve, reject) => {
            return fetch(API_URL + 'user/' + userid)
                .then((response) => response.json())
                .then((data) => {
                    console.log("fixbug getUserByID then 1")

                    this.setState({ user: data });

                    return AsyncStorage.setItem('CURRENT_USER', JSON.stringify(data));
                    // console.log(this.props.navigation.state.params.userid)                      
                })
                .then(() => {
                    console.log("fixbug getUserByID then 2")
                    //   this.getAllEventActive();

                    resolve();
                })
                .catch((error) => {
                    console.log("fixbug getUserByID catch", error)
                    reject()
                });
        })
    }



    checkValue(cid) {
        if (this.state.user.categoryid.find((id) => cid === id)) {
            this.setState({
                user: {
                    ...this.state.user,
                    categoryid: this.state.user.categoryid.filter((id) => id !== cid)
                }
            })
        }
        else {
            this.setState({
                user: {
                    ...this.state.user,
                    categoryid: [...this.state.user.categoryid, cid]
                }
            })          
        }
    }


    render() {
        if (this.state.user.userid) {
            return (

                <ScrollView style={{ flexDirection: 'column', backgroundColor: "white", flex: 1 }}>
                    <View style={{ padding: 20 }}>
                        <View style={styles.viewChooseImg}>
                            <TouchableOpacity onPress={() => { this.chooseImage() }}>
                                <Image source={kaimook} style={styles.imgUser} />
                            </TouchableOpacity>
                        </View>
                        <View style={{}}>


                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ alignItems: 'flex-start' }}>
                                    <Text style={styles.desStyle}>ID : {this.state.user.userid} </Text>
                                    <Text style={styles.desStyle}>Firstname : {this.state.user.firstname}</Text>
                                    <Text style={styles.desStyle}>Lastname : {this.state.user.lastname} </Text>
                                    <Text style={styles.desStyle}>Category :   </Text>
                                    {/* <Text style={styles.desStyle}>Contact:   </Text> */}
                                    {/* <Text style={styles.desStyle}>Description:   </Text> */}
                                </View>
                            </View>

                            {this.state.category
                                .map((c) => {

                                    return (
                                        <View style={{ flexDirection: 'row' }}>
                                            <CheckBox
                                                value={(this.state.user.categoryid.find((id) => c.id === id)) ? true : false}
                                                onValueChange={() => this.checkValue(c.id)}

                                            />
                                            <Text style={{ marginTop: 5 }}> {c.categoryname} </Text>
                                        </View>
                                    )
                                })}
                        </View>


                        <Button
                            large
                            icon={{ name: 'edit-2', type: 'feather' }}
                            title='Edit profile'
                            buttonStyle={{ borderRadius: 10, marginVertical: 5, backgroundColor: '#8B0000' }}

                            onPress={() => {
                                this.updateUser()
                            }}

                        />

                        <Button
                            large
                            icon={{ name: 'logout', type: 'material-community' }}
                            title='Log Out'
                            buttonStyle={{ borderRadius: 10, marginVertical: 5, backgroundColor: '#4B0082' }}

                            onPress={() => {
                                AsyncStorage.setItem('CURRENT_USER', "").then(() => {

                                    this.props.navigation.navigate('Login')
                                });
                            }}
                        />

                    </View>
                </ScrollView >



            )
        }
        else {
            return null
        }
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

export default UserSetting;