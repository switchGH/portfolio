import React, { Component } from 'react';
import { connect } from 'react-redux';

import Router from 'next/router';
import {
    convertFile,
    generateWallet
} from '../src/stores/actions';

class ConvertFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            file: null,
            walletName: ''
        };
    }

    onGenerateWallet() {
        console.log('called onGenerateWallet');
        const { walletName } = this.state;
        const { dispatch } = this.props;
        dispatch(generateWallet({ walletName }));
    }

    onClick() {
        const { address, file } = this.state;
        const { dispatch } = this.props;
        // console.log('this.state in onClick');
        // console.log(this.state);
        dispatch(convertFile({ address, file }));
    }

    changeAddress(e) {
        this.setState({address: e.target.value});
    }

    changeFile(e) {
        this.setState({file: e.target.files});
    }

    render() {
        const { wallet } = this.props;
        return (
            <div className="parent">
                {/* <Head title="Input File" /> */}
                <div className="body">
                    <h1 className="title">NEMファイル共有システム</h1>
                    <div className="generate_wallet">
                        <p>アドレス生成</p>
                        { wallet.generate_address && <p>Address：{ wallet.generate_address }</p> }
                        { wallet.generate_privateKey && <p>PrivateKey：{ wallet.generate_privateKey }</p> }
                        <button className="generate_button" onClick={this.onGenerateWallet.bind(this)}>Generate Wallet</button>
                    </div>
                    <div className="input_address">
                        <input type="text" className="input_area" placeholder="Please NEM Address." onChange={this.changeAddress.bind(this)} />
                    </div>
                    <div className="input_file">
                        <input type="file" id="file" size="30" onChange={this.changeFile.bind(this)} />
                    </div>
                    <button className="convert_button" onClick={this.onClick.bind(this)}>Convert</button>
                    {/* <div>
                        <p>{ transaction }</p>
                    </div> */}

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
                    .generate_wallet {
                        padding-bottom: 20px;
                    }
                    .input_address {
                        padding-bottom: 20px;
                    }
                    .input_area {
                        width: 500px;
                        height: 30px;
                        font-size: 20px;
                    }
                    .input_file {
                        height: 30px;
                    }
                    .convert_button {
                        font-weight: bold;
                    }
                `}</style>
            </div>
        );
    }
}

export default connect(datas => datas)(ConvertFile);
