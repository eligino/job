import AsyncStorage from '@react-native-community/async-storage';

export const FIREBASE_URL = "https://jobs-x.firebaseio.com";
export const API_KEY = "AIzaSyBGbRknuqs5HQGm2HtC-tfcRwNTrKTIAZ8";
export const SIGN_UP_URL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`;
export const SIGN_IN_URL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`;
export const REFRESH_URL = `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`;

export const getTokens = (cb) => {

    AsyncStorage.multiGet([
        '@jobs@token',
        '@jobs@refreshToken',
        '@jobs@expireToken',
        '@jobs@uid'
    ]).then( value => {

        cb(value);
    });

};

export const setTokens = (values, cb) => {
    const dateNow = new Date();
    const expiration = dateNow.getTime() + (3600 * 1000 * 24);

    AsyncStorage.multiSet([
        ['@jobs@token', values.token],
        ['@jobs@refreshToken', values.refreshToken],
        ['@jobs@expireToken', expiration.toString()],
        ['@jobs@uid', values.uid]
    ]).then( response => {
        cb();
    });
};


export const convertFirebase = (data) => {
    const newData = [];

    for(let key in data){
        newData.push({
            ...data[key],
            id: key
        })
    }
    return newData;
};


export const findEnterpriseData = (itemId, enterprises) => {
    return enterprises.find((enterprise) => enterprise.id === itemId);
};
