import React from "react";
import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import TULogo from "../../Images/Logo.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import Bg from "../../Images/bg.jpg";
const { width } = Dimensions.get("window");

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  login(){
    alert('in login')
    fetch('http://172.19.0.1:8000/api/login',{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userid:this.state.username,
            firstname:this.state.password

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
        alert("Success")
        // this.setState({
        //   isLoading: false,
        //   dataSource: responseJson.movies,
        // });
        
        // alert(this.state.isLoading)

      })
      .catch((error) =>{
        console.error(error);
        alert("Fail")
      });
    }
  render() {
    return (
      <View
        style={{ flexDirection: "column", backgroundColor: "white", flex: 1 }}
      >
        <Image
          source={Bg}
          style={{
            flexDirection: "column",
            position: "absolute",
            width: "100%",
            height: "100%",
            resizeMode: "stretch"
          }}
        />
        <View style={{ padding: 30, paddingTop: 0 }}>
          <Image
            source={TULogo}
            style={{ maxWidth: width - 100, alignSelf: "center" }}
            ImageResizeMode="repeat"
          />
          <View style={{ paddingVertical: 10 }}>
            <CustomInput
              placeholder="Username"
              keyboardType="numeric"
              secureTextEntry={false}
              onChangeText={text => {
                this.setState({ username: text });
              }}
              value={this.state.username}
            />
          </View>

          <View style={{ paddingVertical: 10 }}>
            <CustomInput
              placeholder="Password"
              keyboardType="numeric"
              secureTextEntry={true}
              onChangeText={text => {
                
                this.setState({ password: text });
              }}
              value={this.state.password}
            />
          </View>
          <View style={{ paddingVertical: 10 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#ae5945",
                padding: 15,
                borderRadius: 15,
                alignItems: "center"
              }}
              onPress={() => {
                //   String a = "test1";
                //   String b = "test b";
                //   System.out.print('a is:' + a);
                 this.login()
              }}
            >
              <Text style={{ color: "white", fontSize: 20 }}>
                Login via authen app
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Login;
