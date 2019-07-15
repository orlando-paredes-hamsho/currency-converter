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
      return (
        <div className="app">
          <h1>Currency Converter</h1>
          <p>Please select both currencies you wish to convert between and fill in the field you wish to convert from.</p>
          <fieldset>
            <CurrencyDropDown
              callback={this.props.model.setToCurrency}
              currencies={this.props.model.currency_names}
              currency={this.props.model.to_currency}
              update_currencies={this.props.model.updateFromCurrency}
            />
            <CurrencyField
              id="To"
              callback={this.props.model.setTo}
              value={this.props.model.to}
              update_currencies={this.props.model.updateFromCurrency}
            />
          </fieldset>
          <fieldset>
            <CurrencyDropDown
              callback={this.props.model.setFromCurrency}
              currencies={this.props.model.currency_names}
              currency={this.props.model.from_currency}
              update_currencies={this.props.model.updateToCurrency}
            />
            <CurrencyField
              id="From"
              callback={this.props.model.setFrom}
              value={this.props.model.from}
              update_currencies={this.props.model.updateToCurrency}
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
