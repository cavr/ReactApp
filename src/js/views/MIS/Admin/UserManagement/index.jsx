import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Section from 'components/Sections/SectionContainer';
import UserEntry from './UserEntry';

import jefe from '../../../../../assets/img/dev/jorge.png';
import user1 from '../../../../../assets/img/dev/user-placeholder.jpg';
import user2 from '../../../../../assets/img/dev/user-placeholder-2.jpg';

import './desktop.scss';

export default class UserManagement extends PureComponent {
  static propTypes = {
    currentStep: PropTypes.number,
  };

  constructor() {
    super();

    this.state = {
      currentUser: {
        name: 'Jorge Najera',
        role: 'Managing Director',
        image: jefe,
        internalRole: 'Administrator',
      },
      users: [
        {
          name: 'Ricardo Domínguez',
          role: 'Front-end developer',
          image: user1,
          internalRole: 'Administrator',
        },
        {
          name: 'Cristina Calavia',
          role: 'Lead Artist',
          image: user2,
          internalRole: 'User',
        },
      ],
      selected: -1,
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
      return <UserEntry key={ `user-entry-${ index }` } data={ user } selected={ index === selected } onSelect={ () => this.onSelect(index) } />;
    });
    const selectedUser = selected === -1 ? currentUser : users[selected];
    return (
      <Section currentStep={ currentStep } sectionNumber={ 2 } title='User settings' loading={ false } unNumbered={ true }>
        <div className='user-management'>
          <h2 className='user-management__title bluetab-subtitle--centered'>Select the index of which you want to see the evolution or the subindices that form it</h2>
          <div className='user-management__wrapper'>
            <div className='user-management__list-wrapper'>
              <div className='user-management__list__title'>Actual user</div>
              <ul className='user-management__actual'>
                <UserEntry data={ currentUser } selected={ selected === -1 } onSelect={ () => this.onSelect(-1) } />
              </ul>
              <div className='user-management__list__title'>Other users</div>
              <ul className='user-management__other-users'>
                { otherUsers }
              </ul>
            </div>
            <div className='user-management__selected'>
              <img className='selected-user__image' src={ selectedUser.image } />
              <div className='selected-user__info-wrapper'>
                <div className='selected-user__name'>{ selectedUser.name }</div>
                <div className='selected-user__role'>{ selectedUser.role }</div>
              </div>
              <div className='selected-user__menu-placeholder'>
                <div className='selected-user__menu-placeholder-background'>Under development</div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    );
  }
}
