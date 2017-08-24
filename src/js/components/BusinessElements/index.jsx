import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BusinessElementsServices from 'services/api/businessElements';
import Section from 'components/Section';

export class BusinessElements extends PureComponent {

  static propTypes = {
    data: PropTypes.object,
    currentStep: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    const { data } = this.props;
    console.log(data);
    BusinessElementsServices.getData().then((response) => {
      this.setState({ loaded: true });
      console.log(response);
    });
  }

  componentWillUnmount() {
    
  }

  render() {
    const { currentStep } = this.props;
    return (
      <Section currentStep={ currentStep } sectionNumber={ 4 } title='Business Elements'>
        <div className='index-graph'>
          { this.state.loaded ? 'Loaded' : 'Not loaded' }
        </div>
      </Section>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.app.get('data'),
});

const mapDispatchToProps = (dispatch) => {
  return {
    checkDevice: () => dispatch(),
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessElements);
