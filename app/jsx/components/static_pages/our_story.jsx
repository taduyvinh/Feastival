let translate = require('counterpart');

export default class OurStory extends React.Component{
  render() {
    return (
      <div className='our-story'>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-12 col-md-5 col-md-offset-6 content'>
              <p></p>
              <div className='our-story-title'>
                {translate('app.static-pages.our_story.title')}
              </div>
              <div className='our-story-content'>
                {translate('app.static-pages.our_story.content')}  
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
