import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

export default class Content extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
    loadSelectors: PropTypes.func,
  };

  componentDidMount() {
    this.props.loadSelectors();
  }

  render() {
    const { data, loading } = this.props;
    return (
      loading ?
        <div className='bluetab-sns-loading'>Loading</div> :
        <div className='bluetab-sns-selectors'>
          <Select
            className='arko-input__select'
            options={ data }
            onChange={ value => console.log(value) }
          />
        </div>
    );
  }
}
