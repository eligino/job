import React from 'react';

import {createBottomTabNavigator, createStackNavigator} from "react-navigation";

import Favorites from "./favorites";
import Applications from "./applications";
import Jobs from "./jobs";
import JobDetails from "./jobs/jobDetails";

import Icon from "react-native-vector-icons/Ionicons";


const stackHeaderConfig = (name) => ({
    headerStyle: {
        backgroundColor: "#0C3C35",
    },
    headerTintColor: "#fff",
    headerTitle: name,
});



const hideBottomTabNavigationOnChildElements = (navigation) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible,
    };
};


const JobsStack = createStackNavigator({
    Jobs: Jobs,
    JobDetails: JobDetails
}, {
    headerLayoutPreset: "center",
    defaultNavigationOptions: stackHeaderConfig("Home"),
    navigationOptions: ({ navigation }) => hideBottomTabNavigationOnChildElements(navigation)
});


const FavoritesStack = createStackNavigator({
    Favorites: Favorites,
    FavoriteDetails: JobDetails
}, {
    headerLayoutPreset: "center",
    defaultNavigationOptions: stackHeaderConfig("Favorites"),
    navigationOptions: ({ navigation }) => hideBottomTabNavigationOnChildElements(navigation)
});


const ApplicationsStack = createStackNavigator({
    Applications: Applications,
    AppliedJobDetails: JobDetails
}, {
    headerLayoutPreset: "center",
    defaultNavigationOptions: stackHeaderConfig("Applications"),
    navigationOptions: ({ navigation }) => hideBottomTabNavigationOnChildElements(navigation)
});



const AppNavigator = createBottomTabNavigator({
    JobsStack: JobsStack,
    FavoritesStack: FavoritesStack,
    ApplicationsStack: ApplicationsStack
}, {
    tabBarOptions: {
        activeTintColor: '#fff',
        showLabel: false,
        activeBackgroundColor: '#5C7C78',
        inactiveBackgroundColor: '#0C3C35',
        style: {
            backgroundColor: '#0C3C35'
        }
    },
    initialRouteName: 'JobsStack',
    defaultNavigationOptions: ({navigation}) => ({
        tabBarIcon: ({tintColor}) => {
            const { routeName } = navigation.state;
            let iconName;

            switch (routeName) {
                case 'JobsStack':
                    iconName = 'ios-home';
                    break;
                case 'FavoritesStack':
                    iconName = 'ios-heart';
                    break;
                case 'ApplicationsStack':
                    iconName = 'ios-paper-plane';
                    break;
            }


            return <Icon name={iconName} size={25} color={tintColor}/>
        }
    }),

});


export default AppNavigator;
