import ReactDOM from 'react-dom';
import Routes from './routes'
import {browserHistory} from 'react-router';
var translate = require('counterpart');
translate.registerTranslations('en', require('./locales/en'));

$(document).on('ready page:load', function () {
  ReactDOM.render(<Routes history={browserHistory}/>, document.getElementById('root'));
});
