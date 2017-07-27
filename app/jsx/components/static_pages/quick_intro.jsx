let translate = require('counterpart');

export default class QuickIntro extends React.Component{
  render() {
    return (
      <div className='quick-intro'>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-12 col-md-4 intro'>
              <div className='intro-content'>
                <p></p>
                <div className='quick-intro-title'>
                  {translate('app.static-pages.quick_intro.title_1')}
                </div>
                <div className='quick-intro-content'>
                  {translate('app.static-pages.quick_intro.content_1')}  
                </div>
              </div>
            </div>
            <div className='col-sm-12 col-md-4 intro'>
              <div className='intro-content'>
                <p></p>
                <div className='quick-intro-title'>
                  {translate('app.static-pages.quick_intro.title_2')}
                </div>
                <div className='quick-intro-content'>
                  {translate('app.static-pages.quick_intro.content_2')}  
                </div>
              </div>
            </div>
            <div className='col-sm-12 col-md-4 intro'>
              <div className='intro-content'>
                <p></p>
                <div className='quick-intro-title'>
                  {translate('app.static-pages.quick_intro.title_3')}
                </div>
                <div className='quick-intro-content'>
                  {translate('app.static-pages.quick_intro.content_3')}  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
