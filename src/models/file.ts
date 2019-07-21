export class MetaData {
  v?:string;
  name?:string;
  type:string = '';
  size?:string;
  lastModified:number = 0;
  encrypt?:boolean;
  length:number = 0;
  
  constructor(fields: any) {
    Object.assign(this, fields);
  }
  valid() {
    if(
      this.v !== '' &&
      this.name !== '' &&
      this.type !== '' &&
      this.size !== '' &&
      this.lastModified > 0 &&
      this.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  isImage() {
    if (this.type.indexOf('image/') === 0) {
      console.log('image');
      return true;
    } else {
      return false;
    }
  }

  isAudio() {
    if(this.type.indexOf('audio/') === 0) {
      console.log('audio');
      return true;
    } else {
      console.log('not audio');
      return false;
    }
  }
}

export class Binary {
  id:number = 0;
  binary:string = '';

  constructor(fields: any) {
    Object.assign(this, fields);
  }

  valid(){
    if(this.id >= 0 && this.binary !== ''){
      return true;
    } else {
      return false;
    }
  }
}