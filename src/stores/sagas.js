/**
 * ミドルウェア的なやつ
 */
import { fork, take, call, put, join, select } from 'redux-saga/effects';
import { NemProvider } from '../providers/nem';
const nem = new NemProvider();
import { Convert } from '../providers/convert';
import { CreateWallet } from '../providers/createWallet';
import {
    fetchNemFile,
    successFetchNemFile,
    convertFile,
    successConvertFile,
    createWallet,
    successCreateWallet
} from './actions';

function* fetchFileFlow() {
    while(true) {
        const { payload } = yield take(fetchNemFile); // Actionを待つ、イベントの発生を待つ
        const { address, privateKey } = payload;
        // 全てのトランザクションを取得
        const transactions = yield call(nem.getAllTransactions, address); // Promiseの完了を待つ
        // MetaDataを取得
        const metaData = yield call(nem.getMetaData, transactions, privateKey);
        // UNIX時間を用いて最新のファイルデータを取得
        const base64 = yield call(nem.getBase64, transactions, privateKey);
        // console.log('below is base64');
        // console.log(base64);

        // if(!metaData){
        //     throw new Error('metaDataがありません');
        // }
        // console.log('below is binaries');
        // console.log(metaData);
        // const base64 = yield call(nem.mergeBinaryToBase64, transactions, metaData, privateKey);
        if(metaData && base64 && transactions) {
            console.log('active!');
            yield put(successFetchNemFile({metaData, base64, transactions})); // Actionをdispatchする
        } else {
            console.log('FAILED FETCH NEM FILE');
            //TODO: impl
        }
    }
}

function* convertFileFlow() {
    while(true) {
        const { payload } = yield take(convertFile);
        const { address, privateKey, file } = payload;

        const convert = new Convert(address, privateKey, file);
        // ファイルをBase64に変換し、トランザクションを作成する
        convert.createBase64();
        const transactions = convert.getTransactions();

        if(transactions){
            yield put(successConvertFile({transactions}));
        }else {
            console.log('FAILED CONVERT NEM FILE');
        }
    }
}

function* createWalletFlow() {
    while(true) {
        const { payload } = yield take(createWallet);
        const { walletName } = payload;
        const wallet = new CreateWallet(walletName);
        // ウォレットを作成する
        const { address, privateKey } = wallet.createSimpleWallet();

        if(address && privateKey) {
            yield put(successCreateWallet({address, privateKey}));
        }else {
            console.log('FAILED GENERATE WALLET');
        }
    }
}

export default function* rootSaga() {
    yield fork(fetchFileFlow);
    yield fork(convertFileFlow);
    yield fork(createWalletFlow);
}