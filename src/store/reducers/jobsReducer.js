import {GET_JOBS} from "../types";

export default function (state={}, action) {
    switch (action.type) {
        case GET_JOBS:
            return {...state, offers: action.payload}
        default:
            return state;
    }
}
