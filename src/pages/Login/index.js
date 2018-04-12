import React from "react";
import { Actions } from "react-native-router-flux";
import { View, Text, Image, Dimensions, TouchableOpacity, AsyncStorage } from "react-native";
import TULogo from "../../Images/Logo.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import Bg from "../../Images/bg.jpg";


const { width } = Dimensions.get("window");

// Wi Login an
class Login extends React.Component {
  state = {
    userid: "",
    password: ""
  };


 

  login() {
    alert('http://172.25.79.95:8000/api/chk-first-login/' + this.state.userid)
    fetch('http://172.25.79.95:8000/api/chk-first-login/' + this.state.userid)
      .then((response) => {
        if (response.ok) {
          alert("Not First Login");
          Actions.Home({ userid: this.state.userid });


        } else {
          alert("First Login");
          Actions.Category({ userid: this.state.userid });
        }
      })
      .catch((error) => {
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
                this.setState({ userid: text });
              }}
              value={this.state.userid}
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
                // alert(this.state.userid)
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
