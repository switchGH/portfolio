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

NEMLibrary.bootstrap(NetworkTypes.TEST_NET);

export class NemProvider {
  constructor() {
      this.getAllTransactions = this.getAllTransactions.bind(this);
      this.allTransactions = this.allTransactions.bind(this);
      this.createTransactions = this.createTransactions.bind(this);
      this.sendTransaction = this.sendTransaction.bind(this);
      this.createSimpleWallet = this.createSimpleWallet.bind(this);
      // this.getPrivateKey = this.getPrivateKey.bind(this);
      this.getBase64 = this.getBase64.bind(this);
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
          protocol: 'http',
          //domain: 'nistest.opening-line.jp',
          domain: 'nistest.opening-line.jp',

          port: 7890
          //domain: 'nis.mosin.jp',
          //port: '443'
      }]);
    return accountHttp.allTransactions(new Address(address), {hash: hash, pageSize: 100});
  }

  createTransactions(message:string = '', address:string = '') {
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
    const transactionHttp = new TransactionHttp([{
      protocol: 'http',
      domain: 'nistest.opening-line.jp',
      port: 7890
    }]);
    console.log(transferTransaction.fee);
    const account = Account.createWithPrivateKey(privateKey);
    console.log(account.address);
    const signedTransaction = account.signTransaction(transferTransaction);
    // console.log('transactionHttp');
    // console.log(transactionHttp);
    transactionHttp.announceTransaction(signedTransaction).subscribe(x => console.log(x.transactionHash));
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
        return {simpleWallet, password};
      }
    }
  }

  // getPrivateKey(wallet:SimpleWallet) {
  //   // const password = new Password('password');
  //   //return wallet.encryptedPrivateKey.decrypt(password);
  //   return wallet.encryptedPrivat1eKey.encryptedKey;
  // }

  /**
   * MetaDataを取得する
   * @param transaction 
   * @param privateKey 
   */
  getMetaData(transaction:TransferTransaction[], privateKey:string):string[] {
    let msg:string, json:any;
    let metaData_list:string[] = [];
    try {
      for(const t of transaction) {
        msg = this.decodeMessage(t, privateKey);
        if(msg !== '' && Util.isJson(msg)) {
          json = JSON.parse(msg);
          const metaData = new MetaData(json);
          if(metaData.valid()){
            //console.log(metaData);
            metaData_list.push(JSON.stringify(json));
          }
        }
      }
    }catch(e) {
      console.log(e);
    }
    return metaData_list;
  }

  // クソコード　修正必要
  getBase64(transactions:TransferTransaction[], privateKey: string = '') {
    console.log('getMetaData');
    let binaries: Binary[] = [];
    const base64: string[] = new Array(2);
    let msg:any, json:any;
    for(const t of transactions) {
      msg = this.decodeMessage(t, privateKey);
      console.log(msg);
      if(msg !== '' && Util.isJson(msg)) {
        json = JSON.parse(msg);
        //console.log(json);
        const binary = new Binary(json);
        if(binary.valid()) {
          //console.log(binary);
          binaries.push(binary);

          if(0 <= binary.id) {
            base64[binary.id] = binary.binary;
            //console.log(base64[binary.id]);
          }
        }
      }
    }
    console.log(base64);
    return base64.join('');
  }

  mergeBinaryToBase64(transaction:TransferTransaction[], meta:string, privKey: string = ''): string {
    console.log('called mergeBinaryToBase64');
    let binaries: Binary[] = [];
    const base64: string[] = new Array(meta.length);
    let result_list:any[] = [];
    try {
      let cnt = 0;
      for (const t of transaction) {
        const msg:any = this.decodeMessage(t, privKey);
        //console.log(msg);
        if (msg !== '' && Util.isJson(msg)) {
          const obj = JSON.parse(msg);
          result_list.push(obj);
          const binary = new Binary(obj);
          if (binary.valid()) {
            binaries.push(binary);
            if (0 <= binary.id && binary.id < meta.length) {
              if (!base64[binary.id]) {
                base64[binary.id] = binary.binary;
                //console.log('below is base64[binary.id]');
                //console.log(base64[binary.id]);
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
    return base64.join('');
  }

  decodeMessage(transaction: TransferTransaction, privKey: string = ''):string {
    console.log('called decodeMessage');
    let result: string = '';
    if (transaction.message.isPlain()) {
      const plainMessage = transaction.message as PlainMessage;
      result = plainMessage.plain();
    } else if (transaction.message.isEncrypted()) {
      const password = new Password('password');
      const wallet = SimpleWallet.createWithPrivateKey('simple wallet', password, privKey);
      const account = wallet.open(password);
      const msg = account.decryptMessage(transaction.message, transaction.signer!).payload;
      result = msg;
    }
    return result;
  }
}