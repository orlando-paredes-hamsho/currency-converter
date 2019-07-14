import React, {Component} from 'react';
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import CurrencyDropDown from "../CurrencyDropDown";
import './index.css';

const CurrencyField = observer(
  class CurrencyField extends Component {
    handleChange = (e) => { if (this.props.callback) this.props.callback(e.currentTarget.value); }
    render() {
      return (
        <fieldset>
          <CurrencyDropDown currencies={this.props.currencies} />
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
  currencies: PropTypes.arrayOf(PropTypes.object),
  callback: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default CurrencyField;
