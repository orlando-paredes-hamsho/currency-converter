import React, {Component} from 'react';
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import isObject from '../../utils/is-object';
import Select from 'react-dropdown-select';
import './index.css';

const CurrencyDropDown = observer(
  class CurrencyDropDown extends Component {
    shouldRender = () => Array.isArray(this.props.currencies) && this.props.currencies.length > 0 && isObject(this.props.currency);
    handleChange = (e) => {
      if (this.props.callback) this.props.callback(e[0]);
      if (this.props.update_currencies) this.props.update_currencies();
    };
    render() {
      if (!this.shouldRender()) return null;
      return (
          <Select
            options={this.props.currencies}
            values={[this.props.currency]}
            onChange={this.handleChange}
            clearable
            placeholder='Choose a type of Currency...'
          />
      );
    }
  }
);

CurrencyDropDown.propTypes = {
  callback: PropTypes.func,
  currencies: PropTypes.arrayOf(PropTypes.object),
  currency: PropTypes.object,
  update_currencies: PropTypes.func
};

export default CurrencyDropDown;
