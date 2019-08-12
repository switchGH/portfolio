/**
 * ミドルウェア的なやつ
 */
import { fork, take, call, put, join, select } from 'redux-saga/effects';
import { NemProvider } from '../providers/nem';
const nem = new NemProvider();
import {
    fetchNemFile,
    successFetchNemFile
} from './actions';

function* fetchFileFlow() {
    while(true) {
        const { payload } = yield take(fetchNemFile);
        const { address } = payload;
        const transactions = yield call(nem.getAllTransactions, address);
        console.log(transactions);
        const metaData = yield call(nem.getMetaData, transactions, undefined);
        const base64 = yield call(nem.mergeBinaryToBase64, transactions, metaData, '');
        //console.log('meta data and base64 is below!');
        //console.log(metaData);
        console.log('base64 is below!');
        console.log(base64);
        if(metaData && base64) {
            yield put(successFetchNemFile({metaData, base64}));
        } else {
            console.log('FAILED FETCH NEM FILE');
            //TODO: impl
        }
    }
}

export default function* rootSaga() {
    yield fork(fetchFileFlow);
}