/**
 * state を変更するためのメッセージ
 */
import { createAction } from 'redux-act';

export const FETCH_NEM_FILE = 'FETCH_NEM_FILE';
export const fetchNemFile = createAction(FETCH_NEM_FILE);

export const CONVERT_FILE = 'CONVERT_FILE';
export const convertFile = createAction(CONVERT_FILE);

export const CREATE_WALLET = 'CREATE_WALLET';
export const createWallet = createAction(CREATE_WALLET);

export const SUCCESS_CONVERT_FILE = 'SUCCESS_CONVERT_FILE';
export const successConvertFile = createAction(SUCCESS_CONVERT_FILE);

export const SUCCESS_FETCH_NEM_FILE = 'SUCCESS_FETCH_NEM_FILE';
export const successFetchNemFile = createAction(SUCCESS_FETCH_NEM_FILE);

export const SUCCESS_CREATE_WALLET = 'SUCCESS_CREATE_WALLET';
export const successCreateWallet = createAction(SUCCESS_CREATE_WALLET);
