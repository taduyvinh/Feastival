var translate = require('counterpart');

export default class Footer extends React.Component{
  render() {
    return (
      <footer>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-0 col-md-2'>
              <div className='app-logo'>
                <i className='fa fa-rocket' aria-hidden='true'></i>
              </div>
            </div>
            <div className='col-xs-10'>
              <div className='container'>
                <div className='row'>
                  <div className='col-xs-5 col-md-3'>
                    <div className='information'>
                      <div className='footer-title'>
                        {translate('app.static-pages.address.title')}
                      </div>
                      <div className='footer-content'>
                        {translate('app.static-pages.address.content_1')}
                      </div>
                      <div className='footer-content'>
                        {translate('app.static-pages.address.content_2')}
                      </div>
                    </div>
                  </div>
                  <div className='col-xs-5 col-md-2'>
                    <div className='information'>
                      <div className='footer-title'>
                        {translate('app.static-pages.open_hour.title')}
                      </div>
                      <div className='footer-content'>
                        {translate('app.static-pages.open_hour.content_1')}
                      </div>
                      <div className='footer-content'>
                        {translate('app.static-pages.open_hour.content_2')}
                      </div>
                    </div>
                  </div>
                  <div className='col-xs-5 col-md-2'>
                    <div className='information'>
                      <div className='footer-title'>
                        {translate('app.static-pages.contact.title')}
                      </div>
                      <div className='footer-content'>
                        {translate('app.static-pages.contact.content_1')}
                      </div>
                      <div className='footer-content'>
                        {translate('app.static-pages.contact.content_2')}
                      </div>
                    </div>
                  </div>
                  <div className='col-xs-5 col-md-2'>
                    <div className='information'>
                      <div className='footer-title'>
                        {translate('app.static-pages.follow')}
                      </div>
                      <div className='icon-list'>
                        <i className='fa fa-facebook' aria-hidden='true'></i>
                        <i className='fa fa-instagram' aria-hidden='true'></i>
                        <i className='fa fa-twitter' aria-hidden='true'></i>
                        <i className='fa fa-pinterest' aria-hidden='true'></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='copyright'>
                    {translate('app.static-pages.copyright')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
