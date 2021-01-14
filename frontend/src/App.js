import * as React from "react";
import {BrowserRouter, Route, Switch } from "react-router-dom";
import axios from 'axios';


import './App.css';

import {Layout } from 'antd';

import Home from './home/home';
import Sample from './sample/sample';
import AppMenu from "./menu";
import AppHeader from "./header";

const {Header, Content } = Layout;

axios.defaults.baseURL = 'http://localhost:5000/api/';

class App extends React.Component {
	render() {
		return (
      <BrowserRouter>
        <Layout style={{minHeight: '100vh'}}>
          <AppMenu/>
          <Layout>
            <Header style={{background: '#fff', padding: 0}}>
              <AppHeader/>
            </Header>
            <Content style={{margin: '0 16px'}}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/list" component={Sample} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </BrowserRouter>
		);
	}
}

export default App;
