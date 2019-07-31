import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  LoggerComponent: PropTypes.Component,
  props: PropTypes.object
};

const defaultProps = {
  props: {}
};

function Logger(LoggerComponent, props) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        message: 'Hello from'
      };
    }

    render() {
      console.log(this.state.message, props);
      return (
        <div>
          <LoggerComponent {...this.props} />
        </div>
      );
    }
  };
}

Logger.propTypes = propTypes;
Logger.defaultProps = defaultProps;

export default Logger;
