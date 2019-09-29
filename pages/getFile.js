import React, { Component } from 'react';
import { connect } from 'react-redux';
import Head from '../components/head';
import Router from 'next/router';

import {
    fetchNemFile
} from '../src/stores/actions';

class GetFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            privateKey: '',
            isEncrypted: false,
        };
    }

    onClick() {
        const { dispatch } = this.props;
        const { address, privateKey } = this.state;
        dispatch(fetchNemFile({ address, privateKey }));
    }

    changeAddress(e) {
        this.setState({ address: e.target.value });
    }

    changeIsEncrypted(e) {
        const { isEncrypted } = this.state;
        this.setState({ isEncrypted: !isEncrypted });
    }

    changePrivateKey(e) {
        this.setState({ privateKey: e.target.value });
    }

    render() {
        const { address, privateKey, isEncrypted } = this.state;
        const { file } = this.props;

        let metaData_list = [];
        for(let i in file.metaData){
            metaData_list.push(<p>{ file.metaData[i] }</p>);
        }

        return (
            <div class="parent">
                {/* <Head title="Get File" /> */}
                <div className="body">
                    <div className="hero">
                        <h1 className="title">NEMファイル共有システム</h1>
                    </div>
                    <div className="input-address">
                        <input type="text" className="input_area" placeholder="Please NEM Address." onChange={this.changeAddress.bind(this)} value={address} />
                    </div>
                    <div className="input-key">
                        <div>
                            <input type="checkbox" onChange={this.changeIsEncrypted.bind(this)} value={isEncrypted} id="encrypt" />
                            <label>File enctypted?</label>
                        </div>
                        <input type="text" className="input_area" placeholder="Please private key." onChange={this.changePrivateKey.bind(this)} value={privateKey} />
                    </div>
                    <div>
                        <button className="fetch_button" onClick={this.onClick.bind(this)}>Fetch</button>
                    </div>
                    <div className="output-metaData">
                        <p>取得データ数：{ file.metaData.length } , トランザクション数：{ file.transactions.length }</p>
                        { metaData_list }
                    </div>
                    <div className="image">
                        <img src={file.base64} />
                    </div>
                    <div>
                        Click <span onClick={() => Router.push('/convertFile')}>Input File</span>
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
            .hero {
                width: 100%;
                color: #333;
            }
            .title {
                margin: 0;
                width: 100%;
                padding-top: 80px;
                padding-bottom: 20px;
                line-height: 1.15;
                font-size: 48px;
            }
            .title,
            .description {
                text-align: center;
            }
            .input-address {
                padding-bottom: 20px;
            }
            .input_area {
                width: 500px;
                height: 30px;
                font-size: 20px;
            }
            .input-key {
                padding-bottom: 20px;
            }
            .fetch_button {
                width: 80px;
                height: 30px;
                font-size: 20px;
            }
            .output-metaData {
            }
            .metaData_output_area {
                text-align: left;
            }
            .image {
                padding-top: 30px;
            }
        `}</style>
            </div>
        );
    }
}

export default connect(datas => datas)(GetFile);