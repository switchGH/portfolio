import React, { Component } from 'react';
import { connect } from 'react-redux';

import Router from 'next/router';
import {
    convertFile,
    createWallet
} from '../src/stores/actions';

class ConvertFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            privateKey: '',
            file: null,
            walletName: '',
        };
    }

    onCreateWallet() {
        const { walletName } = this.state;
        const { dispatch } = this.props;
        dispatch(createWallet({ walletName }));
    }

    onClick() {
        const { address, privateKey, file } = this.state;
        const { dispatch } = this.props;
        dispatch(convertFile({ address, privateKey, file }));
    }

    changeAddress(e) {
        this.setState({address: e.target.value});
    }

    changePrivateKey(e) {
        this.setState({privateKey: e.target.value});
    }

    changeFile(e) {
        this.setState({file: e.target.files});
    }

    render() {
        const { wallet, file } = this.props;
        return (
            <div className="parent">
                {/* <Head title="Input File" /> */}
                <div className="body">
                    <h1 className="title">NEMファイル共有システム</h1>
                    <div className="generate_wallet">
                        <p className="text">アドレス生成</p>
                        { wallet.address && <p>Address：{ wallet.address }</p> }
                        { wallet.privateKey && <p>PrivateKey：{ wallet.privateKey }</p> }
                        <button className="generate_button" onClick={this.onCreateWallet.bind(this)}>Generate Wallet</button>
                    </div>
                    <div className="input_address">
                        <input type="text" className="input_area" placeholder="Please NEM Address." onChange={this.changeAddress.bind(this)} />
                    </div>
                    <div className="input_privateKey">
                        <input type="text" className="input_area" placeholder="Please PrivateKey." onChange={this.changePrivateKey.bind(this)} />
                    </div>
                    <div className="input_file">
                        {/* <div id="preview" /> */}
                        <input type="file" id="file" size="30" onChange={this.changeFile.bind(this)} />
                    </div>
                    <button className="convert_button" onClick={this.onClick.bind(this)}>Convert</button>
                    <div className="output_transaction">
                        <p>{ file.transactions }</p>
                        {/* {
                            (() => {
                                if(file.transactions != undefined){
                                    return <p>file.transactions</p>;
                                    console.log(transactions[0])
                                    for(let i = 0; i < file.transactions.length; i++){
                                        components += <p>{ file.transactions[i] }</p>
                                    }
                                }
                            })()
                        } */}
                    </div>

                    <div>
                        Click <span onClick={() => Router.push('/')}>Get File</span>
                    </div>
                </div>

                <style jsx>{`
                    .parent {
                        position: relative;
                    }
                    .body {
                        text-align: center;
                        margin: 0;
                        width: 100%;
                        position: absolute;
                    }
                    .title {
                        margin: 0;
                        width: 100%;
                        padding-top: 80px;
                        padding-bottom: 20px;
                        line-height: 1.15;
                        font-size: 48px;
                        text-align: center;
                    }
                    .text {
                        font-size: 21px;
                    }
                    .generate_wallet {
                        padding-bottom: 20px;
                    }
                    .generate_button {
                        width: 180px;
                        height: 30px;
                        font-size: 20px;
                    }
                    .input_address {
                        padding-bottom: 20px;
                    }
                    .input_privateKey {
                        padding-bottom: 20px;
                    }
                    .input_area {
                        width: 500px;
                        height: 30px;
                        font-size: 20px;
                    }
                    .input_file {
                        height: 30px;
                        padding-bottom: 20px;
                    }
                    .convert_button {
                        width: 120px;
                        height: 30px;
                        font-size: 20px;
                        font-weight: bold;
                    }
                `}</style>
            </div>
        );
    }
}

export default connect(datas => datas)(ConvertFile);
