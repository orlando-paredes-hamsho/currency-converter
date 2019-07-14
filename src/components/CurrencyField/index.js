import React, {Component} from 'react';
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import CurrencyDropDown from "../CurrencyDropDown";
import './index.css';

const CurrencyField = observer(
  class CurrencyField extends Component {
    render() {
      return (
        <fieldset>
          <CurrencyDropDown currencies={this.props.currencies} />
          <input id={this.props.id} type="number" className="currency_field"/>
        </fieldset>
      );
    }
  }
);

CurrencyField.propTypes = {
  id: PropTypes.string,
  currencies: PropTypes.arrayOf(PropTypes.object)
};

export default CurrencyField;
