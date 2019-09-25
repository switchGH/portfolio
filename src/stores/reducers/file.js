import { createAction, createReducer } from 'redux-act';
import {
    fetchNemFile,
    successFetchNemFile,
    convertFile,
    successConvertFile
} from '../actions';

const initialState = {
    console: [],
    href: '#',
    base64: '',
    metaData: [],
    fetching: false,
    // fetched: false,
    // imageBase64: '',
    // audioBase64: '',
    transactions: [],
    address: '',
    privateKey: ''
};

const file = createReducer({
    [fetchNemFile]: (state, action) => {
        const newState = Object.assign({}, state, action);
        newState.fetching = true;
        return newState;
    },
    [successFetchNemFile]: (state, action) => {
        const newState = Object.assign({}, state, action);
        // console.log(action);
        return newState;
    },
    [convertFile]: (state, action) => {
        const newState = Object.assign({}, state, action);
        return newState;
    },
    [successConvertFile]: (state, action) => {
        const newState = Object.assign({}, state, action);
        return newState;
    }
}, initialState);

export default file;