import React, {Component} from 'react';


export default class TestPage extends Component {
  render () {
    return (
      <div>
        {this.props.pageName}
      </div>
    );
  }
}
