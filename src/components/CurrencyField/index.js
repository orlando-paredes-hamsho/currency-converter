import React, {Component} from 'react';
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import './index.css';

const CurrencyField = observer(
  class CurrencyField extends Component {
    constructor(props) {
      super(props);
      this.state = {
          timeout: null
      };
    }
    delayUpdateCurrencies = () => {
        clearTimeout(this.state.timeout);
        this.setState({
          timeout: this.generateUpdateTimeout()
        });
    };
    generateUpdateTimeout = () => setTimeout(this.props.update_currencies, 300);
    handleChange = (e) => {
      if (this.props.callback) this.props.callback(e.currentTarget.value);
      if (this.props.update_currencies) this.delayUpdateCurrencies();
    }
    render() {
      return (
        <input
          id={this.props.id}
          type="text"
          className="currency_field"
          onChange={this.handleChange}
          value={this.props.value}
        />
      );
    }
  }
);

CurrencyField.propTypes = {
  id: PropTypes.string,
  callback: PropTypes.func,
  update_currencies: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default CurrencyField;
