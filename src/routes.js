import React from 'react';

import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";

import AuthComponent from './components/auth';
import AppNavigation from './components/app';


const AuthStack = createStackNavigator({
    Auth: AuthComponent
}, {
    headerMode: "none",
    initialRouteName: 'Auth'
});


export const RootNavigator = () => {
    return createAppContainer(createSwitchNavigator({
        App: AppNavigation,
        Auth: AuthStack
    }, {
        initialRouteName: 'Auth'
    }))
};

