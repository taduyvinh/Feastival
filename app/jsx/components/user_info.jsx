var translate = require('counterpart');
import update from 'react-addons-update';

export default class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        avatar: 'https://i.ytimg.com/vi/nMGUVPQC1Vo/maxresdefault.jpg',
        name: 'Tuan Anh',
        birthday: '10/08/1995',
        phonenumber: '0975700717',
        id: '1',
        job: 'sinh vien',
        email: 'quangduybk95@gmail.com',
        description: 'asdasdadad'
      },
      change_pass: {
        current_pass: '',
        new_pass: '',
        repeat_pass: ''
      }
    }
  }

  handle_updateInfo() {

  }

  handle_updatePassword() {

  }

  handleChangeInfo(key, event) {
    let newUser = update(this.state.user, {
      [key]: {$set: event.target.value}
    });
    this.setState({user: newUser});
  }

  handleChangePassword(key, event) {
    let newChangePass = update(this.state.change_pass, {
      [key]: {$set: event.target.value}
    });
    this.setState({change_pass: newChangePass});
  }

  render() {
    return (
      <section className='user-info'>
        <div className='row wrapper-user-info'>
          <div className='pmd-card pmd-z-depth-1 col-md-offset-3 col-md-6 user-info-body'>
            <div className='fileinput fileinput-new col-md-2 col-md-offset-1 avatar'>
              <div className='fileinput-preview thumbnail img-circle img-responsive'>
                <img src={this.state.user.avatar} height='200'/>
              </div>
            </div>

            <div className='col-md-8'>
              <form className='form-horizontal' role='form'>
                <fieldset>

                  <legend>{translate('app.user_info.user_info')}</legend>

                  <div className='form-group'>
                    <label className='col-sm-3 control-label' for='textinput'>
                      {translate('app.user_info.email')}</label>
                    <div className='col-sm-9'>
                      <p className='form-control-static'><strong>{this.state.user.email}</strong></p>
                    </div>
                  </div>

                  <div className='form-group pmd-textfield'>
                    <label className='col-sm-3 control-label' for='textinput'>
                      {translate('app.user_info.name')}</label>
                    <div className='col-sm-9'>
                      <input type='text' placeholder={translate('app.user_info.name')} className='form-control empty'
                        value={this.state.user.name}
                        onChange={this.handleChangeInfo.bind(this, 'name')}/>
                    </div>
                  </div>

                  <div className='form-group pmd-textfield'>
                    <label className='col-sm-3 control-label' for='textinput'>
                      {translate('app.user_info.phonenumber')}</label>
                    <div className='col-sm-9'>
                      <input type='number' placeholder={translate('app.user_info.phonenumber')} className='form-control empty'
                        value={this.state.user.phonenumber}
                        onChange={this.handleChangeInfo.bind(this, 'phonenumber')}/>
                    </div>
                  </div>

                  <div className='form-group pmd-textfield'>
                    <label className='col-sm-3 control-label' for='textinput'>
                      {translate('app.user_info.job')}</label>
                    <div className='col-sm-9'>
                      <input type='text' placeholder={translate('app.user_info.job')} className='form-control empty'
                        value={this.state.user.job}
                        onChange={this.handleChangeInfo.bind(this, 'job')}/>
                    </div>
                  </div>

                  <div className='form-group pmd-textfield'>
                    <label className='col-sm-3 control-label' for='textinput'>
                      {translate('app.user_info.description')}</label>
                    <div className='col-sm-9'>
                      <input type='text' placeholder={translate('app.user_info.description')} className='form-control empty'
                        value={this.state.user.description}
                        onChange={this.handleChangeInfo.bind(this, 'description')}/>
                    </div>
                  </div>

                  <div className='form-group'>
                    <div className='col-sm-offset-3 col-sm-3'>
                      <button className='btn btn-primary'
                        onClick={this.handle_updateInfo.bind(this)}>{translate('app.user_info.update')}</button>
                    </div>
                  </div>

                </fieldset>
              </form>
              <form className='form-horizontal' role='form'>
                <fieldset>

                  <legend>{translate('app.user_info.change_pass')}</legend>

                  <div className='form-group pmd-textfield'>
                    <label className='col-sm-3 control-label' for='textinput'>
                      {translate('app.user_info.name')}</label>
                    <div className='col-sm-9'>
                      <input type='password' placeholder={translate('app.user_info.current_pass')}
                        className='form-control empty'
                        value={this.state.change_pass.current_pass}
                        onChange={this.handleChangePassword.bind(this, 'current_pass')}/>
                    </div>
                  </div>

                  <div className='form-group pmd-textfield'>
                    <label className='col-sm-3 control-label' for='textinput'>
                      {translate('app.user_info.new_pass')}</label>
                    <div className='col-sm-9'>
                      <input type='password' placeholder={translate('app.user_info.new_pass')}
                        className='form-control empty'
                        value={this.state.change_pass.new_pass}
                        onChange={this.handleChangePassword.bind(this, 'new_pass')}/>
                    </div>
                  </div>

                  <div className='form-group pmd-textfield'>
                    <label className='col-sm-3 control-label' for='textinput'>
                      {translate('app.user_info.repeat_pass')}</label>
                    <div className='col-sm-9'>
                      <input type='password' placeholder={translate('app.user_info.repeat_pass')}
                        className='form-control empty'
                        value={this.state.change_pass.repeat_pass}
                        onChange={this.handleChangePassword.bind(this, 'repeat_pass')}/>
                    </div>
                  </div>

                  <div className='form-group'>
                    <div className='col-sm-offset-3 col-sm-3'>
                      <button className='btn btn-primary' onClick={this.handle_updatePassword.bind(this)}>
                        {translate('app.user_info.update')}</button>
                    </div>
                  </div>

                </fieldset>
              </form>
            </div>

          </div>
        </div>
      </section>
    );
  }
}
