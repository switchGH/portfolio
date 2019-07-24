import { createAction, createReducer } from 'redux-act';
import {
    fetchNemFile,
    successFetchNemFile
} from '../actions';

const initialState = {
    console: [],
    href: '#',
    base64: '',
    metaData: null,
    fetching: false,
    fetched: false,
    imageBase64: '',
    audioBase64: '',
};

const file = createReducer({
    [fetchNemFile]: (state, action) => {
        const newState = Object.assign({}, state);
        newState.fetching = true;
        return newState;
    },
    [successFetchNemFile]: (state, action) => {
        const newState = Object.assign({}, state);
        console.log(action);
        return newState;

    }
}, initialState);

export default file;