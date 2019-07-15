import React, { Component } from 'react';
import { observer } from "mobx-react";
import CurrencyField from './components/CurrencyField';
import CurrencyDropDown from "./components/CurrencyDropDown";
import PropTypes from "prop-types";
import './App.css';

const App = observer(
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
      console.log(this.props.model)
      return (
        <div className="app">
          <h1>Currency Converter</h1>
          <fieldset>
            <CurrencyDropDown
              callback={this.props.model.setToCurrency}
              currencies={this.props.model.currency_names}
              currency={this.props.model.to_currency}
            />
            <CurrencyField
              id="To"
              callback={this.props.model.setTo}
              value={this.props.model.to}
              update_currencies={this.props.service.transformCurrency}
            />
          </fieldset>
          <fieldset>
            <CurrencyDropDown
              callback={this.props.model.setFromCurrency}
              currencies={this.props.model.currency_names}
              currency={this.props.model.from_currency}
            />
            <CurrencyField
              id="From"
              callback={this.props.model.setFrom}
              value={this.props.model.from}
              update_currencies={this.props.service.transformCurrency}
            />
          </fieldset>
        </div>
      );
    }
  }
);

App.propTypes = {
  service: PropTypes.object,
  model: PropTypes.object
};

export default App;
