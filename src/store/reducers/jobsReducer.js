import {GET_JOBS} from "../types";

export default function (state = {}, action) {
    if (action.type === GET_JOBS) {
        return {...state, offers: action.payload};
    } else {
        return state;
    }
}
