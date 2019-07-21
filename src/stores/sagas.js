import { fork, take, call, put, join, select } from 'redux-saga/effects';
import { NemProvider } from '../providers/nem';
import {
    fetchNemFile
} from './actions';

function* fetchFileFlow() {
    while(true) {
        const { payload } = yield take(fetchNemFile);
        const { address } = payload;
        console.log('fetching address!');
        console.log(address)
    }
}

export default function* rootSaga() {
    yield fork(fetchFileFlow);
}





