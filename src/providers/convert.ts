import { NemProvider } from './nem';
import { Util } from '../util/util';
import { MetaData, Binary } from '../models/file';

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

  private cAddress: string = '';
  private privateKey: string = '';
  private cMetaData!: MetaData;
  private metaData_json: any = '';
  private transactions: string[] = [];
  // privateKey: string = '';
  private binaries: Binary[] = [];
  //private sumFee: number = 0;// 今後使う予定
  private fileToUpload: any = null;
  private nem: NemProvider = new NemProvider();

  constructor(address: string, privateKey: string, file: FileList) {
    this.cAddress = address;
    this.privateKey = privateKey;
    this.fileToUpload = file.item(0);
    console.log(this.fileToUpload);
  }

  getFile(file: any): any {
    return file;
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    return this.fileToUpload;
  }

  initConvert() {
     // this.cMetaData = null;
    this.binaries = [];
    //this.sumFee = 0;
  }

  createBase64(): void {
    if(!this.fileToUpload){
      throw new Error('ファイルがありません');
    }
    console.log('called createBase64');
    const fr = new FileReader();
    fr.onload = async (e: any) => {
      // console.log(e.target.result);
      const base64Array = await Util.splitByLength(e.target.result, 1000);
      //console.log(base64Array);
      // メタデータの登録
      this.metaData_json = {
        v: '0.0.1',
        name: this.fileToUpload.name,
        type: this.fileToUpload.type,
        length: base64Array.length,
        size: this.fileToUpload.size,
        lastModified: this.fileToUpload.lastModified
      }
      this.cMetaData = new MetaData(this.metaData_json);
      //console.log(this.metaData);

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

  createTransaction(): void {
    console.log('called createTransaction');
    let transaction:any;

    transaction = this.nem.createTransactions(JSON.stringify(this.metaData_json), this.cAddress);
    //this.nem.sendTransaction(transaction, this.privateKey); // メタデータを送信
    console.log(transaction);
    this.transactions[0] = JSON.stringify(transaction);

    // ファイルデータを送信
    let count = 1;
    for (let binary of this.binaries) {
        const b = JSON.stringify(binary);
        console.log(b);
        console.log(b.length);
        transaction = this.nem.createTransactions(b, this.cAddress);
        this.transactions[count] = JSON.stringify(transaction);
        count++;
        console.log(typeof transaction);
        //this.nem.sendTransaction(transaction, this.privateKey);
    }
  }

  getTransactions():string[] {
    return this.transactions;
  }
}