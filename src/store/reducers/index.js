import {combineReducers} from 'redux';
import User from './userReducer';
import Jobs from './jobsReducer';

const rootReducer = combineReducers({
    User, Jobs
});

export default rootReducer;
