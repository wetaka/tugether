import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Router, Stack, Scene } from 'react-native-router-flux';
import Login from './src/pages/Login'
import Category from './src/pages/Category'
import Description from './src/pages/Description'
import Joined from './src/pages/Joined'
import CreateEvent from './src/pages/CreateEvent'
import Home from './src/pages/Home'
import Main from './src/pages/Main'



export default class App extends React.Component {
  render() {
    return (
      <Router>

        <Stack key='root'>
          <Scene key='Login' hideNavBar component={Login}  initial={true} />
          <Scene key='Category' hideNavBar component={Category}   />
          <Scene key='Description' hideNavBar component={Description} />
          <Scene key='Joined' hideNavBar component={Joined}/>
          <Scene key='CreateEvent'hideNavBar component={CreateEvent}/>
          <Scene key='Home' hideNavBar component={Home}  initial={true}/>
          <Scene key='Main' hideNavBar component={Main}  />
        </Stack>
        
      </Router>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
