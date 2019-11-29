import './src/fixtimerbug'; 

import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";
import Shops from './src/screens/Shops';
import ShopItem from './src/screens/ShopItem';
import AddItems from './src/screens/AddItems';
//import Orders from './src/screens/Orders';
import Loading from './src/screens/Loading'
import SignUp from './src/screens/SignUp'
import Login from './src/screens/Login'
import Main from './src/screens/Main'


const AppNavigator = createStackNavigator(
  {
    Loading,
    SignUp,
    Login,
    Main,
    Shops,
    ShopItem,
    AddItems,
    //Orders,
  },
  {
    initialRouteName: 'Loading'
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
 
  render() {
    return <AppContainer />;
  }
}