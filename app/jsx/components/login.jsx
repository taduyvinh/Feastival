let translate = require('counterpart');
import axios from 'axios';
import * as constant from  '../constant';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: '', remember_me: true};
  }

  componentWillMount() {
    if (localStorage.festival_user != null) {
      window.location = constant.BASE_URL;
    }
  }

  handleSubmit() {
    let formData = new FormData();
    formData.append('sign_in[email]', this.state.email);
    formData.append('sign_in[password]', this.state.password);
    let email = this.state.email;
    axios.post(constant.API_SIGN_IN_URL, formData)
      .then((response) =>  {
        let festival_user = {
          email: email,
          user_id: response.data.user_session.id,
          USER_TOKEN: response.data.user_session.user_token
        }
        localStorage.setItem('festival_user', JSON.stringify(festival_user));
        window.location = constant.BASE_URL;
      })
      .catch(function (error) {
        alert(error);
      });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <section className='body-custom'>
        <div className='login-card'>
          <div className='pmd-card card-default pmd-z-depth'>
            <div className='login-card'>
              <div>
                <div className='pmd-card-title card-header-border text-center'>
                  <h3><strong>{translate('app.login.sign_in')}</strong></h3>
                </div>

                <div className='pmd-card-body'>
                  <div className='alert alert-success report' role='alert'>
                    {translate('app.login.error')}</div>
                  <div className='form-group pmd-textfield pmd-textfield-floating-label'>
                    <div className='input-group'>
                      <div className='input-group-addon'>
                        <i className='material-icons md-dark pmd-sm'>perm_identity</i>
                      </div>
                      <input type='text' className='form-control'
                        value={this.state.email}
                        name='email'
                        onChange={this.handleInputChange.bind(this)}
                        placeholder={translate('app.login.email')}
                      />
                    </div>
                  </div>

                  <div className='form-group pmd-textfield pmd-textfield-floating-label'>
                    <div className='input-group'>
                      <div className='input-group-addon'>
                        <i className='material-icons md-dark pmd-sm'>lock_outline</i>
                      </div>
                      <input type='password' className='form-control'
                        value={this.state.password}
                        name='password'
                        onChange={this.handleInputChange.bind(this)}
                        placeholder={translate('app.login.password')}
                      />
                    </div>
                  </div>
                </div>
                <div className='pmd-card-footer card-footer-no-border card-footer-p16 text-center'>
                  <div className='form-group'>
                    <div className='checkbox pull-left'>
                      <label class='pmd-checkbox box-another'>
                        <input type='checkbox' value={this.state.remember_me}
                          onChange={this.handleInputChange.bind(this)}/>
                        <span className='pmd-checkbox'>{translate('app.login.remember')}</span>
                      </label>
                    </div>
                    <span className='pull-right forgot-password box-another'>
                      <a>
                        {translate('app.login.forgot_pass')}
                      </a>
                    </span>
                  </div>
                  <button className='btn btn-primary btn-block'
                    onClick={this.handleSubmit.bind(this)}>
                    {translate('app.login.login_view')}</button>

                  <p className='redirection-link'>{translate('app.login.not_user')}
                    <a className='login-register'> {translate('app.login.sign_up')}</a>.
                  </p>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    );
  }
}
