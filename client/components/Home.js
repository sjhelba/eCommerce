import React, {Component} from 'react';
import { connect } from 'react-redux';

//SIGN UP CONTAINER
/*
 *
 * adds a user from the form to the User model
 * redirect to login
 *
*/
export class Home extends Component {

  render () {
    return (
      <div id='homePage'>
        <div id='welcome'>
          <div id='background'/>
          <h1 id="title"><b>Fancy Pants</b></h1>
          <h3><b>{this.props.currentUser.email || ''}</b></h3>
          <h4 id="tagline">shop for everything but pants</h4>
          <h5 id='description'>Fancy Pants is a growing, independent e-commerce shop with tons of fun items for people of all ages to purchase and enjoy<br/><br/>Thanks for supporting our small business!</h5>
      </div>
      </div>
    )
  }
}

const mapState = ({currentUser}) => ({currentUser});

export default connect(mapState, null)(Home);
