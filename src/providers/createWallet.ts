
import { NemProvider } from './nem';

export class CreateWallet {
  private walletName: string = '';
  private nem: NemProvider = new NemProvider();

  constructor(walletName: string){
    this.walletName = walletName;
  }

  createSimpleWallet() {
    console.log('calles generateWallet');
    const { simpleWallet, password }: any = this.nem.createSimpleWallet(this.walletName);
    const address:string = simpleWallet.address.value;
    const privateKey:string = simpleWallet.unlockPrivateKey(password);
    return { address, privateKey } 
  }
}
