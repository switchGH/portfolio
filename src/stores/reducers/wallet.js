import { createAction, createReducer } from 'redux-act';
import {
    createWallet,
    successCreateWallet
} from '../actions';

const initialState = {
  walletName: '',
  address: '',
  privateKey: '',
};

const wallet = createReducer({
  [createWallet]: (state, action) => {
      const newState = Object.assign({}, state, action);
      return newState;
  },
  [successCreateWallet]: (state, action) => {
      const newState = Object.assign({}, state, action);
      return newState;
  }
}, initialState);

export default wallet;
