import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../src/stores/store';

export default class MyApp extends App {
    constructor(props) {
        super(props);
        this.state = {
            store: configureStore()
        };
    }
    render() {
        const { Component, pageProps } = this.props;
        const { store } = this.state;
        return (
            <Container>
                <Provider store={store}>
                    <Component {...pageProps}/>
                </Provider>
            </Container>
        );
    }
}
