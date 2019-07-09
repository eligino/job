import React, {Component} from 'react';

import {createBottomTabNavigator, createStackNavigator} from "react-navigation";

import Favorites from "./favorites";
import Applications from "./applications";
import Jobs from "./jobs";
import JobDetails from "./jobs/jobDetails";

import Icon from "react-native-vector-icons/Ionicons";

import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import {getJobs} from "../../store/actions/jobsActionCreators";
import {updateFavorites, applyToJob} from "../../store/actions/userActionCreators";


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
    Jobs: JobsStack,
    Favorites: FavoritesStack,
    Applications: ApplicationsStack
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
    initialRouteName: 'Jobs',
    defaultNavigationOptions: ({navigation}) => ({
        tabBarIcon: ({tintColor}) => {
            const { routeName } = navigation.state;
            let iconName;

            switch (routeName) {
                case 'Jobs':
                    iconName = 'ios-home';
                    break;
                case 'Favorites':
                    iconName = 'ios-heart';
                    break;
                case 'Applications':
                    iconName = 'ios-paper-plane';
                    break;
            }


            return <Icon name={iconName} size={25} color={tintColor}/>
        }
    }),

});



class AppNavigation extends Component {

    state = {jobs: []};


    static router = AppNavigator.router;


    updateFavorite = (id) => {
        let jobsCopy = this.state.jobs;
        let userCopy = this.state.user;
        jobsCopy.offers[id].favorite = !jobsCopy.offers[id].favorite;
        userCopy.info.favorites.includes(id) ? userCopy.info.favorites.splice(userCopy.info.favorites.indexOf(id), 1) : userCopy.info.favorites.push(id);

        this.props.updateFavorites(userCopy.auth.uid, userCopy.info.favorites).then(() => {
            this.setState({jobs: jobsCopy, user: userCopy});
        })
    };


    applyToAJob = (id) => {
        let userCopy = this.state.user;
        userCopy.info.sent.push([id, 'in review']);

        this.props.applyToJob(userCopy.auth.uid, userCopy.info.sent).then(() => {
            this.setState({user: userCopy});
            alert('Application successful');
        })
    };


    componentDidMount() {
        const user = this.props.navigation.getParam("user");
        this.props.getJobs(user.info.favorites).then(() => {
            this.setState({jobs: this.props.Jobs, user: this.props.User});
            // console.log(this.props);
        })

    }


    render() {
        return(<AppNavigator navigation={this.props.navigation}
                             screenProps={{
                                 jobs: this.state.jobs,
                                 user: this.state.user,
                                 updateFavorite: this.updateFavorite,
                                 applyToJob: this.applyToAJob
                             }}
            />
            )
    }
}


const mapDispatchToProps = (dispatch) => bindActionCreators({getJobs, updateFavorites, applyToJob}, dispatch);


export default connect((state) => {
    return {Jobs: state.Jobs, User: state.User}
}, mapDispatchToProps)(AppNavigation);
