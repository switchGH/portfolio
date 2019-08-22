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

  // walletName: string = '';
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
  
  constructor(
    public nem: NemProvider
  ) {
  }

  setAddress(address: string) {
    this.cAddress = address;
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
    console.log('called createBase64');
    const fr = new FileReader();
    fr.onload = (e: any) => {
      // console.log(e.target.result);
      const base64Array = Util.splitByLength(e.target.result, 950);
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
        // console.log(transaction);
      }
      // console.log(this.binaries);
    };
    fr.readAsDataURL(this.fileToUpload);
    this.createTransaction();
  }

  createTransaction() {
    console.log('called createTransaction');
    console.log(this.cAddress);
    console.log(this.binaries);

    for (let binary of this.binaries) {
      console.log(binary);
    }
    // for (var i = 0; i < this.binaries.length; i++) {
    //   var item = this.binaries[i];
    //   console.log(item);
    // }
    // if (this.cAddress == '') {
    //   return;
    // }
    // for (const binary of this.binaries) {
    //   const b = JSON.stringify(binary);
    //   console.log(b);
    //   const transaction = this.nem.createTransactions(b, this.cAddress);
    //   console.log('transaction');
    //   console.log(transaction);
    //   this.nem.sendTransaction(transaction, this.privateKey);
    //   Util.sleep(500);
    //   console.log(binary.id);
    // }
  }
}