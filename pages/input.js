import React, { Component } from 'react';
import { connect } from 'react-redux';

import Router from 'next/router';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null
        };
    }

    onClick() {
        console.log(this.state);
    }

    changeFile(e) {
        this.setState({file: e.target.value});
    }

    render() {
        const {file} = this.state;
        return (
            <div className="parent">
                {/* <Head title="Input File" /> */}
                <div className="body">
                    <h1 className="title">NEMファイル共有システム</h1>
                    <div className="input_file">
                        <input type="file" name="file" size="30" onChange={this.changeFile.bind(this)} value={file} />
                    </div>
                    <button className="convert_button" onClick={this.onClick.bind(this)}>Convert</button>
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

export default connect(datas => datas)(Input);
