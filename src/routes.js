import React from 'react';

import {createAppContainer, createSwitchNavigator} from "react-navigation";

import AuthNavigation from './components/auth';
import AppNavigation from './components/app';


export const RootNavigator = () => {
    return createAppContainer(createSwitchNavigator({
        App: AppNavigation,
        Auth: AuthNavigation
    }, {
        initialRouteName: 'Auth'
    }))
};

