import React, { Component } from 'react';
import {View} from 'react-native';

import Input from '../../utils/forms/input';
import Button from "../../utils/forms/button";
import ErrorPopup from '../../utils/forms/errorPopup';
import ValidationRules from '../../utils/forms/validationRules';


import {setTokens} from "../../utils/misc/misc";



class Register extends Component{


    state = {
        hasErrors: false,
        form: {
            email: {
                value: '',
                valid: false,
                type: 'textInput',
                rules:{
                    isRequired: true,
                    isEmail: true
                }
            },
            password: {
                value: '',
                valid: false,
                type: 'textInput',
                rules:{
                    isRequired: true,
                    minLength: 8
                }
            },
            confirmPassword: {
                value: '',
                valid: false,
                type: 'textInput',
                rules:{
                    confirmEntry: 'password'
                }
            }
        }
    };





    updateInput = (name, value) => {
        this.setState({
            hasErrors: false
        });

        let formCopy = this.state.form;
        formCopy[name].value = value;


        // rules
        let rules = formCopy[name].rules;
        let valid = ValidationRules(value, rules, formCopy);


        formCopy[name].valid = valid;

        this.setState({
            form: formCopy
        })
    };


    manageAccess = () => {
        if (!this.props.User.auth.uid){
            this.setState({hasErrors: true})
        }else {
            setTokens(this.props.User.auth, () => {
                this.setState({hasErrors: false});
                const user = this.props.User;
                this.props.getUserInfo(user.auth.uid).then(() => {
                    const userWithInfo = this.props.User;
                    this.props.goToHome({user: userWithInfo});
                    // this.props.navigation.navigate('App', {user: userWithInfo});
                })
            })
        }
    };


    submitUser = () => {
        let isFormValid = true;
        let formToSubmit = {};
        const formCopy = this.state.form;

        for (let key in formCopy){
            isFormValid = isFormValid && formCopy[key].valid;
            formToSubmit[key] = formCopy[key].value;
        }


        if (isFormValid) {
            this.props.signUp(formToSubmit).then(() => {
                this.manageAccess()
            });
        } else {
            this.setState({hasErrors: true})
        }
    };



    render(){
        return (
                <View>
                    <Input type={this.state.form.email.type}
                           placeholder={'Enter your email'}
                           value={this.state.form.email.value}
                           keyboardType={"email-address"}
                           onChangeText={value => this.updateInput("email", value)}
                    />

                    <Input type={this.state.form.password.type}
                           placeholder={'Enter your password'}
                           value={this.state.form.password.value}
                           onChangeText={value => this.updateInput("password", value)}
                           secureTextEntry={true}
                    />

                    <Input type={this.state.form.confirmPassword.type}
                           placeholder={'Confirm your password'}
                           value={this.state.form.confirmPassword.value}
                           onChangeText={value => this.updateInput("confirmPassword", value)}
                           secureTextEntry={true}
                    />


                    <ErrorPopup hasErrors={this.state.hasErrors}/>


                    <Button type={'primary'}
                            onPress={this.submitUser}
                            text={'Register'}/>

                    <Button type={'secondary'}
                            onPress={() => this.props.goToLogin()}
                            text={'I want to login'}/>


                    <Button type={'secondary'}
                            onPress={() => this.props.goToHome()}
                            text={"I'll do it later"}/>
                </View>
        )
    }
}



export default Register;
