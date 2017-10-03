import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Section from 'components/Sections/SectionContainer';
import UserEntry from './UserEntry';

import './desktop.scss';

export default class UserManagement extends PureComponent {
  static propTypes = {
    currentStep: PropTypes.number,
  };

  constructor() {
    super();

    this.state = {
      currentUser: {

      },
      users: [
        {
  
        },
      ],
      selected: 0,
    };

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(user) {
    this.setState({ selected: user });
  }

  render() {
    const { currentStep } = this.props;
    const { users, currentUser, selected } = this.state;
    const otherUsers = users.map((user, index) => {
      return <UserEntry data={ user } selected={ index === selected } onSelect={ () => this.onSelect(index) } />;
    });
    const selectedUser = users[selected];
    return (
      <Section currentStep={ currentStep } sectionNumber={ 2 } title='User settings' loading={ false } unNumbered={ true }>
        <div className='user-management'>
          <h2 className='user-management__title bluetab-subtitle--centered'>Select the index of which you want to see the evolution or the subindices that form it</h2>
          <div className='user-management__wrapper'>
            <div className='user-management__list-wrapper'>
              <ul className='user-management__actual'>
                <UserEntry data={ currentUser } selected={ selected === -1 } onSelect={ () => this.onSelect(-1) } />
              </ul>
              <ul className='user-management__other-users'>
                { otherUsers }
              </ul>
            </div>
            <div className='user-management__selected'>
            </div>
          </div>
        </div>
      </Section>
    );
  }
}
