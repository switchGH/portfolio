import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Head from '../components/head';
import Nav from '../components/nav';
import { 
    fetchNemFile
} from '../src/stores/actions';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            isEncrypted: false,
        }
    }
    onClick() {
        const { dispatch } = this.props;
        const { address, isEncrypted } = this.state;
        dispatch(fetchNemFile({ address }));
    }

    changeAddress(e) {
        this.setState({address: e.target.value});
    }

    changeIsEncrypted(e) {
        const { isEncrypted } = this.state;
        this.setState({isEncrypted: !isEncrypted});
    }

    render() {
        const { address, isEncrypted } = this.state;
        return (
        <div>
            <Head title="Home" />
            <div className="hero">
                <h1 className="title">NEMファイル共有システム</h1>
            </div>
            <div className="input-wrapper">
                <input type="text" placeholder="Please NEM Address." onChange={this.changeAddress.bind(this)} value={address}/>
            </div>
            <div >
                <div >
                    <input type="checkbox" onChange={this.changeIsEncrypted.bind(this)} value={isEncrypted} id="encrypt" />
                    <label>File enctypted?</label>
                </div>
                <input
                    type="password"
                    placeholder="Please private key."
                ></input>
            </div>
            <div>
                <button onClick={this.onClick.bind(this)}>Fetch</button>
            </div>


            <style jsx>{`
          .hero {
            width: 100%;
            color: #333;
          }
          .title {
            margin: 0;
            width: 100%;
            padding-top: 80px;
            line-height: 1.15;
            font-size: 48px;
          }
          .title,
          .description {
            text-align: center;
          }
          .input-wrapper {
            margin: 0;
            width: 100%;
            text-align: center;
          }
          .input {
            width: 300px;
            height: 50px;
          }
          .encrypt-wrapper {
            margin: 0;
            width: 100%;
            text-align: center;
          }
        `}</style>
        </div>
        )
    }
}

export default connect(datas => datas)(Home);
