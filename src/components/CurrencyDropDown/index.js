import React, {Component} from 'react';
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import Select from 'react-dropdown-select';
import './index.css';

const CurrencyDropDown = observer(
  class CurrencyDropDown extends Component {
    shouldRender = () => Array.isArray(this.props.currencies) && this.props.currencies.length > 0;
    onChange = (e) => console.log(e);
    render() {
      if (!this.shouldRender()) return null;
      return (
          <Select options={this.props.currencies} values={[]} onChange={this.onChange}/>
      );
    }
  }
);

CurrencyDropDown.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.object)
};

export default CurrencyDropDown;
