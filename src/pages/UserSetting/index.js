import React from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, TextInput, ScrollView, StyleSheet, CheckBox, AsyncStorage } from 'react-native';
import kaimook from '../../Images/mook.jpg'
import { API_URL } from "../../config/api";

// import { CheckBox } from 'react-native-elements'

class UserSetting extends React.Component {

    state = {
        category: [],
        user: {},
    };

    componentDidMount() {
        this.getCategories()
        

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
                        user: { ...value }
                    }

                        , () => { this.selectCategory() });
                    console.log("*****************************")
                    console.log(...this.state.user.categoryid)
                    ////////////////////WIP////////////////
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

    findCate(id){
        console.log(id)
        console.log("///////////////////////////")
        if(id === this.state.user.categoryid){
            console.log(id +" hhhhhhhhhhhhhhhh")
            return true;
        }
        else{
            return false;
        }
    }


    selectCategory() {

        let newCate = [...this.state.category];
        // let newCate = this.state.category;
        console.log("+++++++++++++++++++++++ debug si jaaaaa")

        console.log(this.state.category)

        const result = this.state.category.map(e => {
            if (e.id.find(() => { this.findCate(e.id) })) {
                newCate[index] = {
                    ...newCate[index],
                    checked: true
                }
            }
            else{
                newCate[index] = {
                    ...newCate[index],
                    checked: false
                }
            }
        })
        this.setState({
            category: newCate,
        });

        console.log("-------------------------------------------- debug si jaaaaa")
        console.log(this.state.category)

    }

    render() {
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
                                <Text style={styles.desStyle}>Firstname:   </Text>
                                <Text style={styles.desStyle}>Lastname:   </Text>
                                <Text style={styles.desStyle}>Userid:   </Text>
                                {/* <Text style={styles.desStyle}>Place:   </Text> */}
                                {/* <Text style={styles.desStyle}>Contact:   </Text> */}
                                {/* <Text style={styles.desStyle}>Description:   </Text> */}
                            </View>
                        </View>

                        {this.state.category
                            .map((c) => (
                                <View style={{ flexDirection: 'row' }}>
                                    <CheckBox
                                        value={this.state.checked}
                                        onValueChange={() => this.setState({ checked: !this.state.checked })}
                                    />
                                    <Text style={{ marginTop: 5 }}> {c.categoryname} </Text>
                                </View>
                            ))}
                    </View>
                </View>
            </ScrollView >



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

export default UserSetting;