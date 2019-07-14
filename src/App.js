import React, { Component } from 'react';
import CurrencyField from './components/CurrencyField';
import PropTypes from "prop-types";
import './App.css';

class App extends Component {
  componentDidMount() {
    if (!this.shouldRender()) return;
    this.getCurrencies();
  }
  shouldRender = () => this.props.service && this.props.model;
  getCurrencies = async () => {
    const response = await this.props.service.getCurrencies();
    switch (response.status) {
      case 200:
        this.props.model.setCurrencies(response.data.results);
        break;
      default:
        console.log(response);
        break;
    }
  }
  render() {
    if (!this.shouldRender()) return null;
    return (
      <div className="app">
        <h1>Currency Converter</h1>
        <CurrencyField id="From" />
        <CurrencyField id="To" />
      </div>
    );
  }
}

App.propTypes = {
  service: PropTypes.object,
  model: PropTypes.object
};

export default App;
