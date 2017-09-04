import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';
import Button from 'components/Button';
import Evolution from 'components/Evolution';

import './desktop.scss';

export default class MetricState extends PureComponent {

  static propTypes = {
    data: PropTypes.object,
    selector: PropTypes.object,
    setSelectorValue: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      showEvolution: false,
      alert: false,
    };
  }

  render() {
    const { data, selector, setSelectorValue } = this.props;
    const state = data.state;
    const { showEvolution, alert } = this.state;
    return (
      <li className='business-element-metric'>
        <div className={ `business-element-metric__content ${ showEvolution ? 'business-element-metric__content--evolution' : '' }` }>
          <div className='business-element-metric__title'>{ data.label }</div>
          <ul className='business-element-metric__semaphores'>
            <li className={ `business-element-metric__semaphore business-element-metric__semaphore--red ${ state === 0 ? 'business-element-metric__semaphore--active' : '' }` } />
            <li className={ `business-element-metric__semaphore business-element-metric__semaphore--yellow ${ state === 1 ? 'business-element-metric__semaphore--active' : '' }` } />
            <li className={ `business-element-metric__semaphore business-element-metric__semaphore--green ${ state === 2 ? 'business-element-metric__semaphore--active' : '' }` } />
          </ul>
          <div className='business-element-metric__button-wrapper'>
            <Button title={ 'Rewrite' } onClick={ () => setSelectorValue({ value: data.value, label: data.label }, selector.id) } light={ true } />
            <Button title={ 'Evolution' } selected={ showEvolution } onClick={ () => this.setState({ showEvolution: !showEvolution }) } light={ true } />
            <div className={ `business-element-metric__alert icon ${ alert ? 'icon__bell--red' : 'icon__bell' }` } onClick={ () => this.setState({ alert: !alert }) } />
          </div>
        </div>
        <Collapse isOpened={ showEvolution }>
          {
            showEvolution &&
            <Evolution />
          }
        </Collapse>
      </li>
    );
  }
}
