import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Section from 'components/Section';

export class MainGraph extends PureComponent {

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
    MainGraphServices.getData().then((response) => {
      this.setState({ loaded: true });
      console.log(response);
    });
  }

  componentWillUnmount() {
    
  }

  render() {
    const { currentStep } = this.props;
    return (
      <div className='bluetab-sns-main-graph'>
        <Section currentStep={ currentStep } sectionNumber={ 2 } title='Selecciona un índice de una gráfica' >
          { this.state.loaded ? 'Loaded' : 'Not loaded' }
        </Section>
        <div className='main-graph__details'>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.mainGraph.get('data'),
  loading: state.mainGraph.get('loading'),
});

const mapDispatchToProps = (dispatch) => {
  return {
    checkDevice: () => dispatch(),
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainGraph);

