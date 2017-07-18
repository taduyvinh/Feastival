var translate = require('counterpart');

export default class Navbar extends React.Component{
  render() {
    return (
      <nav className='navbar'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <button type='button' className='navbar-toggle collapsed' 
              data-toggle='collapse' data-target='#bs-example-navbar-collapse-1' 
              aria-expanded='false'>
              <span className='sr-only'>Toggle navigation</span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
            </button>
            <a className='navbar-brand' href='#'>{translate('app.static-pages.app_name')}</a>
          </div>
          <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
            <ul className='nav navbar-nav'>
              <li className='active'>
                <a href='#'>{translate('app.static-pages.home')} 
                  <span className='sr-only'>(current)</span>
                </a>
              </li>
              <li><a href='#'>{translate('app.static-pages.about')}</a></li>
              <li><a href='#'>{translate('app.static-pages.menu')}</a></li>
            </ul>
            <ul className='nav navbar-nav navbar-right'>
              <li className='dropdown'>
                <a href='#' className='dropdown-toggle' data-toggle='dropdown' 
                  role='button' aria-haspopup='true' aria-expanded='false'>
                    {translate('app.static-pages.user')} <span className='caret'></span>
                </a>
                <ul className='dropdown-menu'>
                  <li><a href='#'>{translate('app.static-pages.setting')}</a></li>
                  <li role='separator' className='divider'></li>
                  <li><a href='#'>{translate('app.static-pages.log_out')}</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
