import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../src/stores/store';

export default class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;
        return (
            <Container>
                <Provider store={configureStore()}>
                    <Component {...pageProps}/>
                </Provider>
            </Container>
        )
    }
}

