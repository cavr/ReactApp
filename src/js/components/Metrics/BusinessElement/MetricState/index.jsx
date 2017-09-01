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
    };
  }

  render() {
    const { data, selector, setSelectorValue } = this.props;
    const state = data.state;
    const showEvolution = this.state.showEvolution;
    return (
      <li className='business-element-metric'>
        <div className={ `business-element-metric__content ${ showEvolution ? 'business-element-metric__content--evolution' : '' }` }>
          <Button title={ data.label } selected={ showEvolution } onClick={ () => this.setState({ showEvolution: !showEvolution }) } />
          <ul className='business-element-metric__semaphores'>
            <li className={ `business-element-metric__semaphore business-element-metric__semaphore--red ${ state === 0 ? 'business-element-metric__semaphore--active' : '' }` } />
            <li className={ `business-element-metric__semaphore business-element-metric__semaphore--yellow ${ state === 1 ? 'business-element-metric__semaphore--active' : '' }` } />
            <li className={ `business-element-metric__semaphore business-element-metric__semaphore--green ${ state === 2 ? 'business-element-metric__semaphore--active' : '' }` } />
          </ul>
          <div className='business-element-metric__evolution' onClick={ () => setSelectorValue({ value: data.value, label: data.label }, selector.id) }>
            Rewrite
          </div>
          <div className='business-element-metric__evolution'>
            Evolution
          </div>
          <div className='business-element-metric__evolution'>
            Alert
          </div>
        </div>
        <Collapse isOpened={ true }>
          {
            showEvolution &&
            <div className='business-element-metric-evolution'>
              <Evolution />
            </div>
          }
        </Collapse>
      </li>
    );
  }
}
