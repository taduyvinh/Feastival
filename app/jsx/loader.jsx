import ReactDOM from 'react-dom';
import Routes from './routes';
import {browserHistory} from 'react-router';
import Footer from './components/static_pages/footer';
import Navbar from './components/static_pages/navbar';

let translate = require('counterpart');
translate.registerTranslations('en', require('./locales/en'));
translate.registerTranslations('vi', require('./locales/vi'));
translate.registerTranslations('jp', require('./locales/jp'));

if (localStorage.locale == null) {
  localStorage.setItem('locale', 'en');
  translate.setLocale('en');
} else {
  translate.setLocale(localStorage.locale);
}

$(document).on('ready page:load', function () {
  ReactDOM.render(<Navbar/>,
    document.getElementById('nav_bar'));
  ReactDOM.render(<Footer/>,
    document.getElementById('footer'));
  ReactDOM.render(<Routes history={browserHistory}/>,
    document.getElementById('root'));
});
