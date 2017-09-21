import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';
import Popup from 'react-popup';

import MetricsServices from 'services/api/metrics';
import { informationPopup, warningAndChoicePopup } from 'services/popups.js';

import Button from 'components/Inputs/Button';
import Evolution from 'components/Charts/Evolution';
import Loading from 'components/Loading';
import AlertPopup from 'components/Popups/AlertPopup';
import WarningPopup from 'components/Popups/WarningPopup';


import './desktop.scss';
import './mobile.scss';

export default class BusinessElementTarget extends PureComponent {

  static propTypes = {
    data: PropTypes.object,
    metric: PropTypes.string,
    loading: PropTypes.bool,
    evolutionData: PropTypes.object,
    selector: PropTypes.object,
    loadEvolution: PropTypes.func,
    setSelectorValue: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      showEvolution: false,
      alert: false,
    };
    this.handleEvolution = this.handleEvolution.bind(this);
  }
  handleEvolution() {
    const { data, metric, selector, evolutionData, loadEvolution } = this.props;
    const { showEvolution } = this.state;
    if (showEvolution && evolutionData !== null) {
      this.setState({ showEvolution: false });
    } else {
      this.setState({ showEvolution: true });
      loadEvolution(metric, selector.id, data.value);
    }
  }
  render() {
    const { data, loading, evolutionData, selector, setSelectorValue } = this.props;
    const state = data.state;
    const { showEvolution, alert } = this.state;
    const showingEvolution = showEvolution && (loading || evolutionData !== null);
    const warningDescription = 'You are about to clear and rewrite your current search with the following business element. Do you wish to continue?';
    return (
      <li className='business-element-metric'>
        <div className={ `business-element-metric__content ${ showingEvolution ? 'business-element-metric__content--evolution' : '' }` }>
          <div className='business-element-metric__title'>{ data.label }</div>
          <ul className='business-element-metric__semaphores'>
            <li className={ `business-element-metric__semaphore business-element-metric__semaphore--red ${ state === 0 ? 'business-element-metric__semaphore--active' : '' }` } />
            <li className={ `business-element-metric__semaphore business-element-metric__semaphore--yellow ${ state === 1 ? 'business-element-metric__semaphore--active' : '' }` } />
            <li className={ `business-element-metric__semaphore business-element-metric__semaphore--green ${ state === 2 ? 'business-element-metric__semaphore--active' : '' }` } />
          </ul>
          <div className='business-element-metric__button-wrapper'>
            <Button title={ 'Evolution' } icon={ 'graph' } selected={ showingEvolution } onClick={ this.handleEvolution } light={ true } />
            <Button
              title={ 'Rewrite' }
              icon={ 'update' }
              onClick={ () => Popup.queue(warningAndChoicePopup('Warning', <WarningPopup description={ warningDescription } />, () => setSelectorValue({ value: data.value, label: data.label }, selector.id))) }
              light={ true }
            />
            { /* <div className={ `business-element-metric__alert icon ${ alert ? 'icon__bell--red' : 'icon__bell' }` } onClick={ () => this.setState({ alert: !alert }) } /> */ }
            <div className={ `business-element-metric__alert icon ${ alert ? 'icon__bell--red' : 'icon__bell' }` } onClick={ () => Popup.queue(informationPopup('Create alarm', <AlertPopup />)) } />
          </div>
        </div>
        <Collapse isOpened={ showingEvolution }>
          <div className='main-graph__details-wrapper'>
            {
              loading === false ? <Evolution label={ evolutionData.label } variation={ evolutionData.variation } points={ evolutionData.points } maxValue={ 100 } /> :
              <Loading small={ true } />
            }
          </div>
        </Collapse>
      </li>
    );
  }
}
