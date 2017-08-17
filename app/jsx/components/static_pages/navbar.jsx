let translate = require('counterpart');
import axios from 'axios';
import * as constant from  '../../constant';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '', user_token: '', is_signed: false, locale: '',
      user_id: ''
    };
  }

  componentWillMount() {
    let locale = localStorage.locale;
    let locale_name = translate('app.static-pages.language.english');

    switch (locale) {
      case 'en':
        locale_name = translate('app.static-pages.language.english');
        break;
      case 'vi':
        locale_name = translate('app.static-pages.language.vietnamese');
        break;
      case 'jp':
        locale_name = translate('app.static-pages.language.japanese');
        break;
      default:
        break;
    }

    if (localStorage.feastival_user != null) {
      let feastival_user = JSON.parse(localStorage.feastival_user);
      this.setState({
        email: feastival_user.email,
        is_signed: true,
        user_id: feastival_user.user_id,
        locale: locale_name
      });
    }
    else {
      this.setState({is_signed: false, locale: locale_name});
    }
  }

  signOut() {
    axios.delete(constant.API_SIGN_OUT_URL, constant.headers)
      .then((response) => {
        localStorage.removeItem('feastival_user');
        window.location = constant.SIGN_IN_URL;
      })
      .catch(function (error) {
        alert(error)
      });
  }

  changeLanguage(locale) {
    localStorage.setItem('locale', locale);
    translate.setLocale(locale);
    window.location.reload();
  }

  settingBtnClick() {
    window.location = constant.CURRENT_USER_INFO_URL;
  }

  homeClick() {
    window.location = constant.BASE_URL;
  }

  restaurantClick() {
    window.location = constant.RESTAURANTS_URL;
  }

  newRestaurantClick() {
    window.location = constant.NEW_RESTAURANT_URL;
  }

  newGroupClick() {
    window.location = constant.NEW_GROUP_URL;
  }

  groupClick() {
    window.location = constant.GROUPS_URL;
  }

  signUpClick() {
    window.location = constant.SIGN_UP_URL;
  }

  signInClick() {
    window.location = constant.SIGN_IN_URL;
  }

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
            <a className='navbar-brand'>{translate('app.static-pages.app_name')}</a>
          </div>
          <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
            <ul className='nav navbar-nav'>
              <li onClick={this.homeClick.bind(this)}>
                <a>{translate('app.static-pages.home')}
                </a>
              </li>

              <li onClick={this.restaurantClick.bind(this)}>
                <a>{translate('app.static-pages.restaurants')}
                </a>
              </li>

              <li onClick={this.newRestaurantClick.bind(this)}>
                <a>{translate('app.static-pages.new_restaurant')}
                </a>
              </li>

              <li onClick={this.groupClick.bind(this)}>
                <a>{translate('app.static-pages.groups')}
                </a>
              </li>

              <li onClick={this.newGroupClick.bind(this)}>
                <a>{translate('app.static-pages.new_group')}
                </a>
              </li>

            </ul>
            <ul className='nav navbar-nav navbar-right'>
              <li className='dropdown'>
                <a className='dropdown-toggle' data-toggle='dropdown'
                  role='button' aria-haspopup='true' aria-expanded='false'>
                  {this.state.locale}
                  <span className='caret'></span>
                </a>
                <ul className='dropdown-menu'>
                  <li onClick={this.changeLanguage.bind(this, 'vi')}>
                    <a>{translate('app.static-pages.language.vietnamese')}</a>
                  </li>
                  <li onClick={this.changeLanguage.bind(this, 'en')}>
                    <a>{translate('app.static-pages.language.english')}</a>
                  </li>
                  <li onClick={this.changeLanguage.bind(this, 'jp')}>
                    <a>{translate('app.static-pages.language.japanese')}</a>
                  </li>
                </ul>
              </li>
              {!this.state.is_signed ?
                ([<li key='0' onClick={this.signUpClick.bind(this)}>
                    <a>{translate('app.login.sign_up')}</a>
                  </li>,
                  <li key='1' onClick={this.signInClick.bind(this)}>
                    <a>{translate('app.login.sign_in')}</a>
                  </li>]) :
                (<li className='dropdown'>
                  <a className='dropdown-toggle' data-toggle='dropdown'
                    role='button' aria-haspopup='true' aria-expanded='false'>
                    {this.state.email}
                    <span className='caret'></span>
                  </a>
                  <ul className='dropdown-menu'>
                    <li onClick={this.settingBtnClick.bind(this)}>
                      <a>{translate('app.static-pages.setting')}</a>
                    </li>
                    <li role='separator' className='divider'></li>
                    <li onClick={this.signOut.bind(this)}>
                      <a>{translate('app.static-pages.log_out')}</a>
                    </li>
                  </ul>
                </li>)}
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
