import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles'
import Router from 'next/router';

import {
    fetchNemFile
} from '../src/stores/actions';

const styles = {
    body: {
        textAlign: 'center',
        margin: '0',
        width: '100%',
        position: 'absolute'
    },
    hero: {
        width: '100%',
        color: '#333'
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
    description: {
        textAlign: 'center'
    },
    input_address: {
        paddingBottom: '20px'
    },
    input_area: {
        width: '500px',
        height: '30px',
        fontSize: '20px'
    },
    input_key: {
        paddingBottom: '20px'
    },
    fetch_button: {
        width: '80px',
        height: '30px',
        fontSize: '20px'
    },
    metaData_output_area: {
        textAlign: 'left'
    },
    image: {
        paddingTop: '30px'
    }
}

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
        const { file, classes } = this.props;

        let metaData_list = [];
        for(let i in file.metaData){
            metaData_list.push(<p>{ file.metaData[i] }</p>);
        }

        return (
            <div>
                {/* <Head title="Get File" /> */}
                <div className={classes.body}>
                    <div className={classes.hero}>
                        <h1 className={classes.title}>NEMファイル共有システム</h1>
                    </div>
                    <div className={classes.input_address}>
                        <input type="text" className={classes.input_area} placeholder="Please NEM Address." a value={address} />
                    </div>
                    <div className={classes.input_key}>
                        <div>
                            <input type="checkbox" onChange={this.changeIsEncrypted.bind(this)} value={isEncrypted} id="encrypt" />
                            <label>File enctypted?</label>
                        </div>
                        <input type="text" className={classes.input_area} placeholder="Please private key." onChange={this.changePrivateKey.bind(this)} value={privateKey} />
                    </div>
                    <div>
                        <button className={classes.fetch_button} onClick={this.onClick.bind(this)}>Fetch</button>
                    </div>
                    <div>
                        <p>取得データ数：{ file.metaData.length } , トランザクション数：{ file.transactions.length }</p>
                        { metaData_list }
                    </div>
                    <div className={classes.image}>
                        <img src={file.base64} />
                    </div>
                    <div>
                        Click <span onClick={() => Router.push('/sendFile')}>Input File</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default compose(
    withStyles(styles),
    connect(datas => datas)
)(GetFile)
