import { fork, take, call, put, join, select } from 'redux-saga/effects';
import { NemProvider } from '../providers/nem';
const nem = new NemProvider();
import {
    fetchNemFile
} from './actions';

function* fetchFileFlow() {
    while(true) {
        const { payload } = yield take(fetchNemFile);
        const { address } = payload;
        console.log('fetching', address);
        const transactions = yield call(nem.getAllTransactions, address)
        console.log('transactions fetched');
        console.log(transactions);
    }
}

export default function* rootSaga() {
    yield fork(fetchFileFlow);
}





