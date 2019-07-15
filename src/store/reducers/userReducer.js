import {SIGN_UP, SIGN_IN, AUTO_SIGN_IN, GET_USER_INFO, APPLY_TO_JOB, UPDATE_FAVORITES} from '../types';



export default function (state={}, action) {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                auth:{
                    uid: action.payload.localId || false,
                    token: action.payload.idToken || false,
                    refreshToken: action.payload.refreshToken || false,
                }
            };

        case SIGN_UP:
            return {
                ...state,
                auth:{
                    uid: action.payload.localId || false,
                    token: action.payload.idToken || false,
                    refreshToken: action.payload.refreshToken || false,
                }
            };

        case AUTO_SIGN_IN:
            return {
                ...state,
                auth:{
                    uid: action.payload.user_id || false,
                    token: action.payload.id_token || false,
                    refreshToken: action.payload.refresh_token || false,
                }
            };

        case GET_USER_INFO:
            return {
                ...state,
                info: {
                    favorites: action.payload.favorites || [],
                    sent: action.payload.sent || [],
                }
            };

        case UPDATE_FAVORITES:
            return {
                ...state,
                info: {
                    ...state.info,
                    favorites: action.payload || []
                }
            };

        case APPLY_TO_JOB:
            return {
                ...state,
                info: {
                    ...state.info,
                    sent: action.payload || []
                }
            };

        default:
            return state;
    }
}
