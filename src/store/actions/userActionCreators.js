import {SIGN_UP, SIGN_IN, AUTO_SIGN_IN, GET_USER_INFO, UPDATE_FAVORITES, APPLY_TO_JOB} from '../types';
import {SIGN_IN_URL, SIGN_UP_URL, REFRESH_URL, FIREBASE_URL} from '../../utils/misc/misc';

import axios from 'axios';


export const signUp = (data) => {

    const promise = new Promise((resolve, reject) => {

        axios({
            method: 'POST',
            url: SIGN_UP_URL,
            data: {
                email: data.email,
                password: data.password,
                returnSecureToken: true
            },
            header: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            const user = response.data;

            axios({
                method: 'PATCH',
                url: `${FIREBASE_URL}/users.json`,
                data: {
                    [user.localId]: {
                        firstName: "",
                        lastName: "",
                        photo: "",
                        sent: [],
                        favorites: []
                    }
                },
            }).then(() => {
                resolve(user)
            })
        }).catch(e => {
            console.log(e);
            reject(false)
        })
    });

    return {
        type: SIGN_UP,
        payload: promise
    };

    //
    // const request = axios({
    //     method:'POST',
    //     url:SIGN_UP_URL,
    //     data:{
    //         email: data.email,
    //         password: data.password,
    //         returnSecureToken: true
    //     },
    //     header:{
    //         "Content-Type": "application/json"
    //     }
    // }).then(response=>{
    //     return response.data;
    // }).catch( e => {
    //     return false;
    // });
    //
    // return {
    //     type: SIGN_UP,
    //     payload: request
    // }

};


export const signIn = (data) => {
    const request = axios({
        method: 'POST',
        url: SIGN_IN_URL,
        data: {
            email: data.email,
            password: data.password,
            returnSecureToken: true
        },
        header: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        return response.data;
    }).catch(() => {
        return false;
    });

    return {
        type: SIGN_IN,
        payload: request
    }
};


export const autoSignIn = (refreshToken) => {
    const request = axios({
        method: 'POST',
        url: REFRESH_URL,
        data: "grant_type=refresh_token&refresh_token=" + refreshToken,
        header: 'Content-Type: application/x-www-form-urlencoded'
    }).then(response => {
        return response.data;
    }).catch(() => {
        return false;
    });

    return {
        type: AUTO_SIGN_IN,
        payload: request
    }
};


export const getUserInfo = (uid) => {
    const request = axios({
        method: 'GET',
        url: `${FIREBASE_URL}/users/${uid}.json`
    }).then(response => {
        return response.data;
    }).catch(() => {
        return false;
    });

    return {
        type: GET_USER_INFO,
        payload: request
    }
};


export const updateFavorites = (user, id) => {

    user.info.favorites.includes(id) ? user.info.favorites.splice(user.info.favorites.indexOf(id), 1) : user.info.favorites.push(id);

    const request = axios({
        method: 'PUT',
        url: `${FIREBASE_URL}/users/${user.auth.uid}/favorites.json`,
        data: user.info.favorites
    }).then(response => {
        return response.data;
    }).catch(() => {
        return false;
    });

    return {
        type: UPDATE_FAVORITES,
        payload: request
    }
};


export const applyToJob = (user, id) => {
    user.info.sent.push([id, 'in review']);

    const request = axios({
        method: 'PUT',
        url: `${FIREBASE_URL}/users/${user.auth.uid}/sent.json`,
        data: user.info.sent
    }).then(response => {
        return response.data;
    }).catch(() => {
        return false;
    });

    return {
        type: APPLY_TO_JOB,
        payload: request
    }
};
