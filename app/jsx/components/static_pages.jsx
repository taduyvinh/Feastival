var translate = require('counterpart');

import Navbar from './navbar';
import Jumbotron from './jumbotron';
import OurStory from './our_story';
import Footer from './footer';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Jumbotron/>
        <OurStory/>
        <Footer/>
      </div>
    );
  }
}
