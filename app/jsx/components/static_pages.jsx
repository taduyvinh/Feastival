let translate = require('counterpart');

import Jumbotron from './jumbotron';
import OurStory from './our_story';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron/>
        <OurStory/>
      </div>
    );
  }
}
