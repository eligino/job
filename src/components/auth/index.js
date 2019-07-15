import React, {Component} from 'react';
import {View, ActivityIndicator, Platform} from 'react-native';

import {getTokens, setTokens} from "../../utils/misc/misc";

import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {autoSignIn, getUserInfo, signIn, signUp} from '../../store/actions/userActionCreators';

import Login from "./login";
import Register from "./register";
import {createStackNavigator} from "react-navigation";


const AuthNavigator = createStackNavigator({
    Login: Login,
    Register: Register
}, {
    headerMode: "none",
    mode: Platform.OS === "ios" ? "modal" : "card",
    initialRouteName: 'Login'
});


class AuthNavigation extends Component {

    static router = AuthNavigator.router;

    state = {
        loading: true,
        screen: 'login'
    };


    componentDidMount() {
        getTokens((value) => {
            if (value[0][1] === null) {
                this.setState({loading: false})
            } else {
                this.props.autoSignIn(value[1][1]).then(() => {
                    if (!this.props.User.auth.token) {
                        this.setState({loading: false})
                    } else {
                        setTokens(this.props.User.auth, () => {
                            this.props.navigation.navigate('App');
                        })
                    }
                })
            }
        })
    }



    render() {

        if (this.state.loading) {
            return (
                <View style={{
                    flex: 1,
                    backgroundColor: '#FFFFFF',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <ActivityIndicator/>
                </View>
            )
        } else {
            return (
                <AuthNavigator navigation={this.props.navigation}
                                   screenProps={{
                                       user: this.props.User,
                                       signIn: this.props.signIn,
                                       signUp: this.props.signUp,
                                       getUserInfo: this.props.getUserInfo
                                   }}
                />);
        }
    }
}


const mapStateToProps = (state) => {
    return {User: state.User}
};


const mapDispatchToProps = (dispatch) => bindActionCreators({autoSignIn, signIn, signUp, getUserInfo}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(AuthNavigation);
