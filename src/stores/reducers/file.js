import { createAction, createReducer } from 'redux-act';
import {
    fetchNemFile,
    successFetchNemFile,
    convertFile
} from '../actions';
import { ConfirmedTransactionListener } from 'nem-library';

const initialState = {
    console: [],
    href: '#',
    base64: '',
    metaData: null,
    fetching: false,
    fetched: false,
    imageBase64: '',
    audioBase64: '',
    transation: '',
    address: ''
};

const file = createReducer({
    [fetchNemFile]: (state, action) => {
        const newState = Object.assign({}, state);
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
    // [successConvertFile]: (state, action) => {
    //     const newState = Object.assign({}, state);
    //     console.log('below is action');
    //     console.log(action);
    //     newState.transation = action;
    //     return newState;
    // }
}, initialState);

export default file;