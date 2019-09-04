import { createAction, createReducer } from 'redux-act';
import {
    generateWallet,
    successGenerateWallet
} from '../actions';

const initialState = {
  walletName: '',
  generate_address: '',
  generate_privateKey: '',
};

const wallet = createReducer({
  [generateWallet]: (state, action) => {
      const newState = Object.assign({}, state, action);
      return newState;
  },
  [successGenerateWallet]: (state, action) => {
      const newState = Object.assign({}, state, action);
      return newState;
  }
}, initialState);

export default wallet;
