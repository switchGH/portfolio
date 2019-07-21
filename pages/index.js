import React from 'react';
import Link from 'next/link';
import Head from '../components/head';
import Nav from '../components/nav';

const Home = () => (
    <div>
        <Head title="Home" />
        <div className="hero">
            <h1 className="title">NEMファイル共有システム</h1>
        </div>
        <div className="input-wrapper">
            <input type="text" placeholder="Please NEM Address." value="{address}"/>
        </div>
        <div class="encrypt-wrapper">
            <div class="form-wrapper">
                <input type="checkbox" class="encrypt" onChange="" id="encrypt" />
                <label for="encrypt">File enctypted?</label>
            </div>
            <input
                type="password"
                placeholder="Please private key."
            ></input>
        </div>
        <div>
            <button onClick="fetch">Fetch</button>
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
);

export default Home;
