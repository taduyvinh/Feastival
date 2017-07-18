var translate = require('counterpart');

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: '', remember_me: true};
  }

  handleSubmit() {
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
              <form>
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
                        value={this.state.username}
                        name='username'
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
                      <input type='text' className='form-control'
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
							        <a href=''>{translate('app.login.forgot_pass')}</a>
						        </span>
                  </div>
                  <a href='' type='button' className='btn btn-primary btn-block'
                    onClick={this.handleSubmit.bind(this)}>
                    {translate('app.login.login_view')}</a>

                  <p className='redirection-link'>{translate('app.login.not_user')}
                    <a href='' className='login-register'> {translate('app.login.sign_up')}</a>.</p>

                </div>

              </form>
            </div>

          </div>
        </div>
      </section>
    );
  }
}
