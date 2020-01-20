import React from 'react'
import { Image } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import logo from './assets/instagram.png';
import Feed from './pages/feed'

import Header from './components/Header/header'

const Routes = createAppContainer(
    createStackNavigator({
        Feed,
    }, {
        defaultNavigationOptions: {
            headerTitle: <Header/>,
            headerStyle: {
                backgroundColor: '#f6f5f5',
                elevation: 1,
                height: 40
            }
        },
    })
);

export default Routes;