import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { Router, Stack, Scene } from 'react-native-router-flux';
import Login from './src/pages/Login'
import Category from './src/pages/Category'
import Description from './src/pages/Description'
import Joined from './src/pages/Joined'
import CreateEvent from './src/pages/CreateEvent'
import Home from './src/pages/Home'
import Main from './src/pages/Main'
import MasonryPage from './src/pages/MasonryPage'
import { FluidNavigator, Transition } from 'react-navigation-fluid-transitions';
import UserSetting from './src/pages/UserSetting';
import Notificate from './src/pages/Notificate';
import UpdateEvent from './src/pages/UpdateEvent';



const Navigator = FluidNavigator({
   UserSetting: { screen: UserSetting },
   Main: { screen: Main },
 
  UpdateEvent: { screen: UpdateEvent },
  CreateEvent: { screen: CreateEvent },
  


  Home: { screen: Home },

  Notificate: { screen: Notificate },
  Description: { screen: Description },

  Login: { screen: Login },
  Category: { screen: Category },
  Joined: { screen: Joined },
  // CreateEvent: { screen: CreateEvent },
  // Main: { screen: Main },
  MasonryPage: { screen: MasonryPage },

  // Notificate: { screen: Notificate }
})
// export default class App extends React.Component {
//   render() {
//     return (
//       <Router>

//         <Stack key='root'>
//           <Scene key='Login' hideNavBar component={Login} />
//           <Scene key='Category' hideNavBar component={Category}   />
//           <Scene key='Description' hideNavBar component={Description}   />
//           <Scene key='Joined' hideNavBar component={Joined}   />
//           <Scene key='CreateEvent'hideNavBar component={CreateEvent}  initial={true} />
//           <Scene key='Home' hideNavBar component={Home} initial={true}/>
//           <Scene key='Main' hideNavBar component={Main}  />
//           {/* <Scene key='Notificate' hideNavBar component={Notificate}  /> */}

//         </Stack>

//       </Router>
//     );
//   }
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

export default () => (
  <Navigator />
);

// this.props.navigation.navigate('key',{
//   name: value
// })


// const { eventid } = this.props.navigation.state.params;
// params.eventid