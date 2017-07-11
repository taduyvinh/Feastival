import ReactDOM from 'react-dom';
import App from './app';

$(document).on('ready page:load', function() {
  ReactDOM.render(<App/>, document.getElementById('root'));
});
