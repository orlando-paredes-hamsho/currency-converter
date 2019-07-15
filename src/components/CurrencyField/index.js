import React, {Component} from 'react';
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import CurrencyDropDown from "../CurrencyDropDown";
import './index.css';

const CurrencyField = observer(
  class CurrencyField extends Component {
    handleChange = (e) => {
      if (this.props.callback) this.props.callback(e.currentTarget.value);
    }
    render() {
      return (
        <fieldset>
          <CurrencyDropDown
            callback={this.props.dropdown_callback}
            currencies={this.props.currencies}
            currency={this.props.currency}
          />
          <input
            id={this.props.id}
            type="text"
            className="currency_field"
            onChange={this.handleChange}
            value={this.props.value}
          />
        </fieldset>
      );
    }
  }
);

CurrencyField.propTypes = {
  id: PropTypes.string,
  callback: PropTypes.func,
  currencies: PropTypes.arrayOf(PropTypes.object),
  currency: PropTypes.object,
  dropdown_callback: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default CurrencyField;
