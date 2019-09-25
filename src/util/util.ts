
declare function escape(s: string): string;
declare function unescape(s: string): string;

export class Util {
  public static splitByLength(str:string, length:number) {
    console.log('base64の文字数');
    console.log(str);
    console.log(str.length);
    var resultArray:string[] = [];
    // 文字列がない場合
    if(!str || !length || length < 1){
      return resultArray;
    }
    let index:number = 0;
    let start:number = index;
    let end:number = start + length;
    while(start < str.length) {
      resultArray[index] = str.substring(start, end);
      console.log(resultArray[index].length);
      index++;
      start = end;
      end = start + length;
    }
    return resultArray;
  }

  public static encodeBase64(base64:string) {
    const encodeBase64 = btoa(unescape(encodeURIComponent(base64)));
    return encodeBase64;
  }

  /**
   * 
   * @param base64 文字列
   * @param mime_type ファイルの種類
   */
  public static toBlob(base64:string, mime_type:string){
    const bin = atob(base64.replace(/^.*,/, '')); // base64の文字列をファイルオブジェクトに変換
    // バイナリデータ化
    const buffer = new Uint8Array(bin.length);
    for(let i = 0; i < bin.length; i++) {
      buffer[i] = bin.charCodeAt(i);
    }

    try {
      const blob = new Blob([buffer.buffer], {
        type: 'image/png'
      });
      return blob;
    } catch(e) {
      return false;
    }
  }

  // public static exexCopy(el) {
  //   document.getSelection().selectAllChildren(el);
  //   document.execCommand('copy');
  // }

  public static isJson(arg:any) {
    arg = typeof arg === 'function' ? arg() : arg;
    if (typeof arg !== 'string') {
      return false;
    }
    try {
      arg = !JSON ? eval('(' + arg + ')') : JSON.parse(arg);
      return true;
    } catch (e) {
      return false;
    }
  }

  public static getQueryVariable(variable:string = '') {
    const query = window.location.search.substring(1);
    const vars = query.split('&');
    for(let i = 0; i < vars.length; i++){
      const pair = vars[i].split('=');
      if( pair[0] === variable){
        return pair[1];
      }
    }
  }

  public static sleep(num:number) {
    let dt1 = new Date().getTime();
    let dt2 = new Date().getTime();
    while(dt2 < dt1 + num){
      dt2 = new Date().getTime();
    }
    return;
  }

}