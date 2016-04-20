import React, { Component, PropTypes } from 'react';

export default class LoadingIndicator extends Component {

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    children: PropTypes.any
  };

  static defaultProps = {
    loading: false
  };

  render() {
    if (this.props.loading) {
      return (
        <div className='spinner'>
          <div className='double-bounce1'></div>
          <div className='double-bounce2'></div>
          Loading
        </div>
      );
    }

    return this.props.children ?
      <div>{this.props.children}</div> : null;
  }
}
