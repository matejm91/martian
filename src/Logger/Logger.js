import React from 'react';

export default function Logger(LoggerComponent, props) {
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
