import { createAction, createReducer } from 'redux-act';
import {
    fetchNemFile
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
        return state;
    }
}, initialState);

export default file;

