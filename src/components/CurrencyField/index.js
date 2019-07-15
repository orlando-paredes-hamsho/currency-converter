import React, {Component} from 'react';
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import './index.css';

const CurrencyField = observer(
  class CurrencyField extends Component {
    handleChange = (e) => {
      if (this.props.callback) this.props.callback(e.currentTarget.value);
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default CurrencyField;
