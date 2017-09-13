import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadCurrentAlerts } from 'actions/mis/alertPopup';
import Loading from 'components/Loading';
import TaggedInput from 'components/Inputs/TaggedInput';
import Selector from 'components/Inputs/Selector';
import Button from 'components/Inputs/Button';
import Alert from './Alert';


import './desktop.scss';
import './mobile.scss';

export class AlertPopup extends PureComponent {
  static propTypes = {
    metric: PropTypes.string,
    selector: PropTypes.string,
    businessElement: PropTypes.string,
    alertData: PropTypes.array,
    loading: PropTypes.bool,
    loadCurrentAlerts: PropTypes.func,
  };
  constructor() {
    super();
    this.state = { tags: [] };
    this.options = [
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' },
    ];
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    document.documentElement.classList.add('fullscreen');
    this.props.loadCurrentAlerts();
  }

  componentWillUnmount() {
    document.documentElement.classList.remove('fullscreen');
  }

  handleChange(tags) {
    this.setState({ tags });
  }

  render() {
    const { businessElement, selector, metric, alertData, loading } = this.props;
    const alerts = alertData && alertData.map((element) => {
      return <Alert email={ element.email } state={ element.state } />;
    });
    return (
      <div className='alert-popup'>
        <h2 className='bluetab-subtitle--centered'>Texto de ayuda </h2>
        <div className='alert-popup__title'>{ businessElement }</div>
        <div className='alert-popup__inputs_wrapper'>
          <TaggedInput title='Write destination' placeholder={ 'Write destination' } values={ this.state.tags } onChange={ this.handleChange } />
          <Selector
            className='business-element__selector'
            title={ 'Select circunstances' }
            values={ this.options }
            onChange={ (option) => this.setState({ selectedBusinessElement: option.value }) }
          />
          <Button title={ 'Create' } onClick={ () => console.log('boom') } />
        </div>
        {
          loading === false && alertData ? (<div className='business-element__alerts'>{ alerts }</div>) :
          <Loading small={ true } />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.alertPopup.get('loading'),
  alertData: state.alertPopup.get('alertData'),
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadCurrentAlerts: (metric, selector, value) => dispatch(loadCurrentAlerts(metric, selector, value)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlertPopup);
