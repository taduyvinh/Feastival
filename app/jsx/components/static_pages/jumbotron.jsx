let translate = require('counterpart');

import QuickIntro from './quick_intro';

export default class Jumbotron extends React.Component{
  render() {
    return (
      <div className='jumbotron'>
        <div className='slogan'>{translate('app.static-pages.slogan')}</div>
        <div className='introduce'>{translate('app.static-pages.introduce')}</div>
        <QuickIntro/>
      </div>
    )
  }
}
