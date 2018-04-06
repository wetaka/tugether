import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Router, Stack, Scene } from 'react-native-router-flux';
import Login from './src/pages/Login'
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
          <Scene key='login' hideNavBar component={Login} />
          <Scene key='Description' hideNavBar component={Description} />
          <Scene key='Joined' hideNavBar component={Joined}/>
          <Scene key='CreateEvent'hideNavBar component={CreateEvent} initial={true} />
          <Scene key='Home' hideNavBar component={Home}/>
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
