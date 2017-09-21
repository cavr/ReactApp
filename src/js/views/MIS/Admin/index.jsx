import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Section from 'components/Sections/SectionContainer';
import Button from 'components/Inputs/Button';
import { browserHistory } from 'react-router';
import { routeCodes } from 'routes';

import './desktop.scss';

export class MISAdmin extends PureComponent {
  static propTypes = {
    path: PropTypes.string,
  };

  constructor() {
    super();

    this.handleNavLink = this.handleNavLink.bind(this);
  }

  handleNavLink(route) {
    const { currentRoute } = this.props;
    if(currentRoute !== route) browserHistory.push(route);
  }

  render() {
    const currentStep = this.props.currentStep;
    return (
      <div className='bluetab-sns-mis__wrapper'>
        <Section currentStep={ 6 } sectionNumber={ 6 } title='Admin screen: Set targets' loading={ false } unNumbered={ true }>
          <div className='bluetab-admin-menu'>
            <div className='bluetab-admin-menu__create'>
              <Button title={ 'Create metric' } selected={ currentStep > 2 } onClick={ () => this.handleNavLink(routeCodes.MIS_ADMIN_CREATE_METRIC) } />
              <Button title={ 'Create subindex' } selected={ currentStep > 2 } onClick={ () => this.handleNavLink(routeCodes.MIS_ADMIN_CREATE_SUBINDEX) } />
            </div>
            <Button title={ 'Assign target' } selected={ currentStep > 2 } onClick={ () => this.handleNavLink(routeCodes.MIS_ADMIN_ASSIGN) } />
          </div>
        </Section>
        { this.props.children }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentStep: state.app.get('currentStep'),
});

export default connect(
  mapStateToProps,
  null
)(MISAdmin);
