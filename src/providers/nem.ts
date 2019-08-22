import {
  PlainMessage,
  TimeWindow,
  TransferTransaction,
  Account,
  TransactionHttp,
  Transaction,
  TransactionInfo,
  EmptyMessage,
  TransactionTypes,
  AccountHttp,
  Address,
  Password,
  SimpleWallet,
  NEMLibrary,
  NetworkTypes,
  XEM,
} from 'nem-library';
import { MetaData, Binary } from '../models/file';
import { Util } from '../util/util';

export class NemProvider {
  constructor() {
      if(false) {
          NEMLibrary.bootstrap(NetworkTypes.TEST_NET);
      } else {
          NEMLibrary.bootstrap(NetworkTypes.MAIN_NET);
      }
      this.getAllTransactions = this.getAllTransactions.bind(this);
      this.allTransactions = this.allTransactions.bind(this);
      this.createTransactions = this.createTransactions.bind(this);
      this.sendTransaction = this.sendTransaction.bind(this);
      this.createSimpleWallet = this.createSimpleWallet.bind(this);
      this.getPrivateKey = this.getPrivateKey.bind(this);
      this.getMetaData = this.getMetaData.bind(this);
      this.mergeBinaryToBase64 = this.mergeBinaryToBase64.bind(this);
      this.decodeMessage = this.decodeMessage.bind(this);
  }

  /**
   * 
   * @param address 
   */
  async getAllTransactions(address:string) {
      let transactions: Transaction[] = [];
    try {
      //let transactions:TransactionInfo[] = [];
      let loop:boolean = true;
      while(loop) {
        let hash:string = '';
        if(transactions.length > 0){
          //hash = transactions[transactions.length - 1].hash.data;
          hash = transactions[transactions.length - 1].getTransactionInfo().hash.data;
        }
        const res = await this.allTransactions(address, hash).toPromise();
        if(res && res.length > 0){
          transactions = transactions.concat(res); // 結合対象の文字列の最後に結合
        } else {
          loop = false;
        }
      }
      transactions = <TransferTransaction[]>transactions.filter(x => x.type == TransactionTypes.TRANSFER);
      return transactions.reverse(); // 配列の要素を反転させる
    } catch(e) {
        console.log('an error has occured');
        console.log(e);
        return transactions.reverse();
    }
  }

  private allTransactions(address:string, hash:string = '') {
      const accountHttp = new AccountHttp([{
          protocol: 'https',
          //domain: 'nistest.opening-line.jp',
          domain: 'nismain01.opening-line.jp',

          port: 7891
          //domain: 'nis.mosin.jp',
          //port: '443'
      }]);
    return accountHttp.allTransactions(new Address(address), {hash: hash, pageSize: 100});
  }

  createTransactions(message:string = '', address:string = '') {
    console.log('called createTransaction');
    if(address == ''){
      const wallet:any = this.createSimpleWallet();
      address = wallet.address.value;
    }
    const transferTransaction: TransferTransaction = TransferTransaction.create(
      TimeWindow.createWithDeadline(),
      new Address(address),
      new XEM(0),
      PlainMessage.create(message)
    );
    return transferTransaction;
  }

  sendTransaction(transferTransaction:TransferTransaction, privateKey:string) {
    const transactionHttp = new TransactionHttp();
    const account = Account.createWithPrivateKey(privateKey);
    const signedTransaction = account.signTransaction(transferTransaction);
    transactionHttp.announceTransaction(signedTransaction).subscribe(x => console.log(x));
  }

  /**
   * 
   * @param name 
   */
  createSimpleWallet(name:string = ''){
    const password = new Password('password');
    for(let i = 0; i < 10000000; i++){
      const simpleWallet = SimpleWallet.create('simple wallet', password);
      const address:any = simpleWallet.address;
      let a:string = address.value;
      if(name == '' || a.endsWith(name)){
        return simpleWallet;
      }
    }
  }

  getPrivateKey(wallet:SimpleWallet) {
    // const password = new Password('password');
    //return wallet.encryptedPrivateKey.decrypt(password);
    return wallet.encryptedPrivateKey.encryptedKey;
  }

  getMetaData(transaction:TransferTransaction[], privKey: string = '') {
    try {
      for (const t of transaction) {
        const msg:any = this.decodeMessage(t, privKey);
        if (msg !== '' && Util.isJson(msg)) {
          const obj:any = JSON.parse(msg);
          const metaData = new MetaData(obj);
          if (metaData.valid()) {
            return metaData;
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
    return null;
  }

  mergeBinaryToBase64(transaction:TransferTransaction[], meta:string, privKey: string = ''): string {
    let binaries: Binary[] = [];
    const base64: string[] = new Array(meta.length);
    let result_list:any[] = [];
    try {
      let cnt = 0;
      for (const t of transaction) {
        const msg:any = this.decodeMessage(t, privKey);
        // console.log('msg is below');
        // console.log(msg);
        if (msg !== '' && Util.isJson(msg)) {
          const obj = JSON.parse(msg);
          // console.log('obj is below');
          // console.log(obj);
          result_list.push(obj);
          const binary = new Binary(obj);
          if (binary.valid()) {
            binaries.push(binary);
            if (0 <= binary.id && binary.id < meta.length) {
              if (!base64[binary.id]) {
                base64[binary.id] = binary.binary;
                console.log('below is base64[binary.id]');
                console.log(base64[binary.id]);
              }
            }
          }
        }
      }
      //return base64.join('');
      //return result;
    } catch (e) {
      console.log('an error has occured!');
      console.log(e);
    }
    return result_list[0].b;
    //return base64.join('');
  }

  decodeMessage(transaction: TransferTransaction, privKey: string = '') {
    if (transaction.message.isPlain()) {
      const plainMessage = transaction.message as PlainMessage;
      return plainMessage.plain();
    } else if (transaction.message.isEncrypted()) {
      const password = new Password('password');
      const wallet = SimpleWallet.createWithPrivateKey('simple wallet', password, privKey);
      const account = wallet.open(password);
      const msg = account.decryptMessage(transaction.message, transaction.signer!).payload;
      return msg;
    }
  }
}