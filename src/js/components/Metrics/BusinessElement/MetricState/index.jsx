import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';
import Button from 'components/Button';
import Evolution from 'components/Evolution';
import MetricsServices from 'services/api/metrics';
import Loading from 'components/Loading';

import './desktop.scss';
import './mobile.scss';

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
      loading: false,
      evolutionData: null,
      alert: false,
    };

    this.handleEvolution = this.handleEvolution.bind(this);
  }

  handleEvolution() {
    const { evolutionData, loading, showEvolution } = this.state;
    if (evolutionData !== null && !loading) {
      this.setState({ showEvolution: !showEvolution });
    } else {
      this.setState({ loading: true, showEvolution: true });
      MetricsServices.getBusinessElementEvolution().then((response) => {
        this.setState({ evolutionData: response, loading: false });
      });
    }
  }

  render() {
    const { data, selector, setSelectorValue } = this.props;
    const state = data.state;
    const { loading, evolutionData, showEvolution, alert } = this.state;
    const showingEvolution = showEvolution && (loading || evolutionData !== null);
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
            <Button title={ 'Rewrite' } icon={ 'update' } onClick={ () => setSelectorValue({ value: data.value, label: data.label }, selector.id) } light={ true } />
            <Button title={ 'Evolution' } icon={ 'graph' } selected={ showingEvolution } onClick={ this.handleEvolution } light={ true } />
            <div className={ `business-element-metric__alert icon ${ alert ? 'icon__bell--red' : 'icon__bell' }` } onClick={ () => this.setState({ alert: !alert }) } />
          </div>
        </div>
        <Collapse isOpened={ showingEvolution }>
          {
            showingEvolution &&
            <div className='main-graph__details-wrapper'>
              {
                loading ? <Loading small={ true } /> :
                <Evolution label={ evolutionData.label } variation={ evolutionData.variation } points={ evolutionData.points } maxValue={ 100 } />
              }
            </div>
          }
        </Collapse>
      </li>
    );
  }
}
