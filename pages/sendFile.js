import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles'

import Router from 'next/router';
import {
    convertFile,
    createWallet
} from '../src/stores/actions';

const styles = {
    parent: {
        position: 'relative'
    },
    body: {
        textAlign: 'center',
        margin: '0',
        width: '100%',
        position: 'absolute'
    },
    title: {
        margin: '0',
        width: '100%',
        paddingTop: '80px',
        paddingBottom: '20px',
        lineHeight: '1.15',
        fontSize: '48px',
        textAlign: 'center'
    },
    text: {
        fontSize: '21px'
    },
    generate_wallet: {
        paddingBottom: '20px'
    },
    generate_button: {
        width: '180px',
        height: '30px',
        fontSize: '20px'
    },
    input_address: {
        paddingBottom: '20px'
    },
    input_privateKey: {
        paddingBottom: '20px'
    },
    input_area: {
        width: '500px',
        height: '30px',
        fontSize: '20px'
    },
    input_file: {
        height: '30px',
        paddingBottom: '20px'
    },
    convert_button: {
        width: '120px',
        height: '30px',
        fontSize: '20px',
        fontWeight: 'bold'
    }
}

class SendFile extends Component {
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
        const { wallet, file, classes } = this.props;
        return (
            <div className={classes.parent}>
                {/* <Head title="Input File" /> */}
                <div className={classes.body}>
                    <h1 className={classes.title}>NEMファイル共有システム</h1>
                    <div className={classes.generate_wallet}>
                        <p className={classes.text}>アドレス生成</p>
                        { wallet.address && <p>Address：{ wallet.address }</p> }
                        { wallet.privateKey && <p>PrivateKey：{ wallet.privateKey }</p> }
                        <button className={classes.generate_button} onClick={this.onCreateWallet.bind(this)}>Generate Wallet</button>
                    </div>
                    <div className={classes.input_address}>
                        <input type="text" className={classes.input_area} placeholder="Please NEM Address." onChange={this.changeAddress.bind(this)} />
                    </div>
                    <div className={classes.input_privateKey}>
                        <input type="text" className={classes.input_area} placeholder="Please PrivateKey." onChange={this.changePrivateKey.bind(this)} />
                    </div>
                    <div className={classes.input_file}>
                        {/* <div id="preview" /> */}
                        <input type="file" id="file" size="30" onChange={this.changeFile.bind(this)} />
                    </div>
                    <button className={classes.convert_button} onClick={this.onClick.bind(this)}>Convert</button>
                    <div>
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
                        Click <span onClick={() => Router.push('/getFile')}>Get File</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default compose(
    withStyles(styles),
    connect(datas => datas)
)(SendFile)
