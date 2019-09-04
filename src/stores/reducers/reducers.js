import { combineReducers } from 'redux';
import file from './file';
import wallet from './wallet';

export default combineReducers(
    { file, wallet }
);