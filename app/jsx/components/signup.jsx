let translate = require('counterpart');
import axios from 'axios';
import * as constant from  '../constant';
import {Route, Link} from 'react-router';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: '', password_confirmation: ''};
  }

  handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData();
    formData.append('user[email]', this.state.email);
    formData.append('user[password]', this.state.password);
    formData.append('user[password_confirmation]', this.state.password);
    let email = this.state.email;

    axios.post(constant.API_SIGN_UP_URL, formData)
      .then(response =>  {
        let feastival_user = {
          email: email,
          user_id: response.data.user.id,
          USER_TOKEN: response.data.user.authentication_token
        }
        localStorage.setItem('feastival_user', JSON.stringify(feastival_user));
        window.location = constant.CURRENT_USER_INFO_URL;
      })
      .catch(error => {
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

  signInClick() {
    this.preventDefault;
    window.location = constant.SIGN_IN_URL
  }

  render() {
    return (
      <section className='body-custom'>
        <div className='login-card'>
          <div className='pmd-card card-default pmd-z-depth'>
            <div className='login-card'>
              <form onSubmit={this.handleSubmit.bind(this)} method='post'>
                <div className='pmd-card-title card-header-border text-center'>
                  <h3><strong>{translate('app.signup.register')}</strong></h3>
                </div>

                <div className='pmd-card-body'>
                  <div className='alert alert-success report' role='alert'>
                    {translate('app.signup.error')}</div>
                  <div className='form-group pmd-textfield pmd-textfield-floating-label'>
                    <div className='input-group'>
                      <div className='input-group-addon'>
                        <i className='material-icons md-dark pmd-sm'>perm_identity</i>
                      </div>
                      <input type='text' className='form-control'
                        value={this.state.email}
                        name='email'
                        onChange={this.handleInputChange.bind(this)}
                        placeholder={translate('app.signup.email')}
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
                        placeholder={translate('app.signup.password')}
                      />
                    </div>
                  </div>

                  <div className='form-group pmd-textfield pmd-textfield-floating-label'>
                    <div className='input-group'>
                      <div className='input-group-addon'>
                        <i className='material-icons md-dark pmd-sm'>lock_outline</i>
                      </div>
                      <input type='password' className='form-control'
                        value={this.state.password_confirmation}
                        name='password_confirmation'
                        onChange={this.handleInputChange.bind(this)}
                        placeholder={translate('app.signup.password_confirm')}
                      />
                    </div>
                  </div>

                </div>
                <div className='pmd-card-footer card-footer-no-border card-footer-p16 text-center'>

                  <button className='btn btn-primary btn-block' type='submit'>
                    {translate('app.signup.submit')}</button>

                  <p className='redirection-link'>
                    {translate('app.signup.got_account')}
                    <Link to='/login'>{translate('app.signup.login')}</Link>
                  </p>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>
    );
  }
}
