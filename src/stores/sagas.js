/**
 * ミドルウェア的なやつ
 */
import { fork, take, call, put, join, select } from 'redux-saga/effects';
import { NemProvider } from '../providers/nem';
const nem = new NemProvider();
import { Convert } from '../providers/convert';
const convert = new Convert();
import {
    fetchNemFile,
    successFetchNemFile,
    convertFile,
    generateWallet,
    successGenerateWallet
} from './actions';

function* fetchFileFlow() {
    while(true) {
        const { payload } = yield take(fetchNemFile); // Actionを待つ、イベントの発生を待つ
        const { address } = payload;
        const transactions = yield call(nem.getAllTransactions, address); // Promiseの完了を待つ
        console.log('below is transaction');
        console.log(transactions);
        const metaData = yield call(nem.getMetaData, transactions, undefined);
        if(!metaData){
            throw new Error('metaDataがありません');
        }
        console.log('meta data and base64 is below!');
        console.log(metaData);
        const base64 = yield call(nem.mergeBinaryToBase64, transactions, metaData, '');
        console.log('base64 is below!');
        console.log(base64);
        if(metaData && base64) {
            console.log('active!');
            yield put(successFetchNemFile({metaData, base64})); // Actionをdispatchする
        } else {
            console.log('FAILED FETCH NEM FILE');
            //TODO: impl
        }
    }
}

function* convertFileFlow() {
    while(true) {
        const { payload } = yield take(convertFile);
        const { address, file } = payload;

        convert.setAddress(address);
        convert.setFile(file);

        convert.createBase64();
        //convert.createTransaction();
        // const base64 = method();
        // const transactions = method();
        
        // if(base64 && transactions){
        //     yield put(successConertFile({base64, transactions}));
        // } else {
        //     console.log('FAILED CONVERT FILE');
        // }
    }
}

function* generateWalletFlow() {
    while(true) {
        const { payload } = yield take(generateWallet);
        const { walletName } = payload;

        convert.generateWallet(walletName);
        const generate_address = convert.getAddress();
        const generate_privateKey = convert.getPrivateKey();

        if(generate_address && generate_privateKey) {
            yield put(successGenerateWallet({generate_address, generate_privateKey}));
        }else {
            console.log('FAILED GENERATE WALLET');
        }
    }
}

export default function* rootSaga() {
    yield fork(fetchFileFlow);
    yield fork(convertFileFlow);
    yield fork(generateWalletFlow);
}