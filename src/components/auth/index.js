import React, {Component} from 'react';
import {View, ScrollView, ActivityIndicator} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Logo from '../../utils/misc/logo';
import {getTokens, setTokens} from "../../utils/misc/misc";

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import {autoSignIn, signIn, signUp, getUserInfo} from '../../store/actions/userActionCreators';

import Login from "./login";
import Register from "./register";




class AuthComponent extends Component {

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
                    if(!this.props.User.auth.token){
                        this.setState({loading:false})
                    }else{
                        setTokens(this.props.User.auth,()=>{
                            const user = this.props.User;
                            this.props.getUserInfo(user.auth.uid).then(() => {
                                const userWithInfo = this.props.User;
                                this.props.navigation.navigate('App', {user: userWithInfo});
                            })
                        })
                    }
                })
            }
        })
    }


    goToRegister = () => this.setState({screen: 'register'});
    goToLogin = () => this.setState({screen: 'login'});
    goToHome = (param = {}) => this.props.navigation.navigate('App', param);



    render() {

        if (this.state.loading){
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
                <ScrollView contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'space-between'
                }}>
                    <LinearGradient style={{ flex: 1, padding: 50}}
                                    colors={['#0C3C35', '#5C7C78']}>

                        <View style={{alignItems: 'center', paddingBottom: 50}}>
                            <Logo style={{
                                width: 112,
                                height: 112,
                            }}/>
                        </View>

                        <AuthScreen screen={this.state.screen}
                                    goToRegister={this.goToRegister}
                                    goToLogin={this.goToLogin}
                                    goToHome={this.goToHome}
                                    signIn={this.props.signIn}
                                    signUp={this.props.signUp}
                                    getUserInfo={this.props.getUserInfo}
                                    User={this.props.User}
                        />

                    </LinearGradient>
                </ScrollView>
            );
        }
    }
}


const AuthScreen = (props) => props.screen === "login" ? (<Login {...props}/>) : (<Register {...props}/>);


const mapDispatchToProps = (dispatch) => bindActionCreators({autoSignIn, signIn, signUp, getUserInfo}, dispatch);


export default connect((state) => ({User: state.User}), mapDispatchToProps)(AuthComponent);
