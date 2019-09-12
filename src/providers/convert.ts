import { NemProvider } from './nem';
import { Util } from '../util/util';
import { MetaData, Binary } from '../models/file';
import { TransferTransaction, Transaction } from 'nem-library';

export class Convert {
  // testmode: boolean = false;
  // console: string[] = [];
  // mode: boolean = true; // true: fetch, false: convert;
  // address: string = '';
  // href: string = '#';
  // encrypted: boolean = false;
  // decryptPrivKey: string = '';
  // base64: string = '';
  // fetched: number = 0; // 0:idle , 1:fetched , 3:complete
  // metaData: MetaData;
  // imageBase64: string = '';
  // audioBase64: string = '';

  walletName: string = '';
  cAddress: string = '';
  privateKey: string = '';
  /**
   * すべてのプロパティをコンストラクタで初期化する
   * 必要がある厳密なクラスチェックが含まれているので回避
   */
  cMetaData!: MetaData;
  // privateKey: string = '';
  binaries: Binary[] = [];
  convertProgress: string[] = [];
  sumFee: number = 0;
  fileToUpload: any = null;
  nem: NemProvider = new NemProvider();

  constructor() {
  }

  setAddress(address: string) {
    this.cAddress = address;
  }

  setPrivateKey(privateKey: string) {
    this.privateKey = privateKey;
  }

  setFile(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  getFile(file: any) {
    return file;
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    return this.fileToUpload;
  }

  initConvert() {
     // this.cMetaData = null;
    this.convertProgress = [];
    this.binaries = [];
    this.sumFee = 0;
  }

  createBase64() {
    if(!this.fileToUpload){
      throw new Error('ファイルがありません');
    }
    console.log('called createBase64');
    const fr = new FileReader();
    fr.onload = async (e: any) => {
      // console.log(e.target.result);
      const base64Array = await Util.splitByLength(e.target.result, 950);
      // console.log(base64Array);
      // メタデータの登録
      this.cMetaData = new MetaData({
        v: '0.0.1',
        name: this.fileToUpload.name,
        type: this.fileToUpload.type,
        length: this.fileToUpload.length,
        size: this.fileToUpload.size,
        lastModified: this.fileToUpload.lastModified
      });
      // console.log(this.cMetaData);

      for(let i = 0;i < base64Array.length; i++) {
        const base64 = base64Array[i];
        // console.log(base64);
        const binary = new Binary({
          id: i,
          binary: base64
        })
        this.binaries.push(binary);
        // const transaction = this.nem.createTransactions(base64);
        //console.log(transaction);
      }
      // console.log(this.binaries);
      this.createTransaction();
    };
    fr.readAsDataURL(this.fileToUpload);
  }

  createTransaction() {
    // this.nem = new NemProvider();
    console.log('called createTransaction');
    let array = [];
    let count = 0;
    for (let binary of this.binaries) {
      if(count == 0){
        const b = JSON.stringify(binary);
        console.log(b);
        let transaction = this.nem.createTransactions(b, this.cAddress);
        array.push(transaction);
        console.log(transaction);
        this.nem.sendTransaction(transaction, this.privateKey);// クロスドメインエラー発生
      }else{
        break;
      }
      count++;
    }
    // return array;
  }

  generateWallet(walletName: string) {
    console.log('called generateWallet');
    this.walletName = walletName;
    this.nem = new NemProvider();
    const wallet: any = this.nem.createSimpleWallet(this.walletName);
    //console.log('below is wallet');
    //console.log(wallet.address.value);
    this.cAddress = wallet.address.value;
    this.privateKey = this.nem.getPrivateKey(wallet);
  }

  getAddress() {
    return this.cAddress;
  }

  getPrivateKey() {
    return this.privateKey;
  }
}