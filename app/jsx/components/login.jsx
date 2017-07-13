var translate = require('counterpart');

export default class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='panel'>
        <div className='panel-heading'>
          <p>{translate('app.login.login_view')}</p>
        </div>
        <div className='panel-body'>
          <div className='btn btn-primary'>{translate('app.login.login_view')}</div>
        </div>
      </div>
    );
  }
}
