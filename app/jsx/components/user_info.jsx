let translate = require('counterpart');
import update from 'react-addons-update';
import * as constant from  '../constant'
import axios from 'axios';

export default class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'email': 'b@gmail.com',
      'profile': {
        'id': 1,
        'user_id': 1,
        'name': '',
        'birthday': '',
        'phonenumber': '',
        'gender': 0,
        'job': 'null',
        'avatar': 'null',
        'description': 'null',
      },
      change_pass: {
        current_pass: '',
        new_pass: '',
        repeat_pass: ''
      }
    }
  }

  getUserInfoById(id) {
    axios.get(constant.API_USER_INFO_URL + id, constant.headers)
      .then((response) =>  {
        this.checkNullInfo(response.data.user_info.profile)
        this.setState({
          email: response.data.user_info.email,
          profile: response.data.user_info.profile
        })
      })
      .catch(function (error) {
        alert(error);
      });
  }

  updateUserInfo() {
    let formData = new FormData();
    formData.append('user[profile_attributes][name]', this.state.profile.name);
    formData.append('user[profile_attributes][description]', this.state.profile.description);
    formData.append('user[profile_attributes][phonenumber]', this.state.profile.phonenumber);
    formData.append('user[profile_attributes][birthday]', this.state.profile.birthday);
    formData.append('user[profile_attributes][job]', this.state.profile.job);

    axios.patch(constant.API_USER_INFO_URL + JSON.parse(localStorage.festival_user).user_id,
      formData, constant.headers)
      .then((response) =>  {
        window.location.reload();
      })
      .catch(function (error) {
        alert(error);
      });
  }

  componentWillMount() {
    this.getUserInfoById(this.props.params.user_id);
  }

  handleUpdateInfo() {
    this.updateUserInfo();
  }

  handleUpdatePassword() {

  }

  handleChangeInfo(key, event) {
    let newProfile = update(this.state.profile, {
      [key]: {$set: event.target.value}
    });
    this.setState({profile: newProfile});
  }

  handleChangePassword(key, event) {
    let newChangePass = update(this.state.change_pass, {
      [key]: {$set: event.target.value}
    });
    this.setState({change_pass: newChangePass});
  }

  checkNullInfo(profile) {
    profile.name = profile.name || '';
    profile.birthday = profile.birthday || '';
    profile.phonenumber = profile.phonenumber || '';
    profile.job = profile.job || '';
    profile.avatar = profile.avatar || constant.DEFAULT_AVATAR;
    profile.description = profile.description || '';
  }

  render() {
    return (
      <section className='user-info'>
        <div className='row wrapper-user-info'>
          <div className='pmd-card pmd-z-depth-1 col-md-offset-3 col-md-6 user-info-body'>
            <div className='fileinput fileinput-new col-md-2 col-md-offset-1 avatar'>
              <div className='fileinput-preview thumbnail img-circle img-responsive'>
                <img src={this.state.profile.avatar} width='180' height='200'/>
              </div>
            </div>

            <div className='col-md-8'>
              <div className='form-horizontal'>
                <fieldset>

                  <legend>{translate('app.user_info.user_info')}</legend>

                  <div className='form-group'>
                    <label className='col-sm-3 control-label' for='textinput'>
                      {translate('app.user_info.email')}</label>
                    <div className='col-sm-9'>
                      <p className='form-control-static'><strong>{this.state.email}</strong></p>
                    </div>
                  </div>

                  <div className='form-group pmd-textfield'>
                    <label className='col-sm-3 control-label' for='textinput'>
                      {translate('app.user_info.name')}</label>
                    <div className='col-sm-9'>
                      <input type='text' placeholder={translate('app.user_info.name')}
                        className='form-control empty'
                        value={this.state.profile.name}
                        onChange={this.handleChangeInfo.bind(this, 'name')}/>
                    </div>
                  </div>

                  <div className='form-group pmd-textfield'>
                    <label className='col-sm-3 control-label' for='textinput'>
                      {translate('app.user_info.phonenumber')}</label>
                    <div className='col-sm-9'>
                      <input type='number' placeholder={translate('app.user_info.phonenumber')}
                        className='form-control empty'
                        value={this.state.profile.phonenumber}
                        onChange={this.handleChangeInfo.bind(this, 'phonenumber')}/>
                    </div>
                  </div>

                  <div className='form-group pmd-textfield'>
                    <label className='col-sm-3 control-label' for='textinput'>
                      {translate('app.user_info.job')}</label>
                    <div className='col-sm-9'>
                      <input type='text' placeholder={translate('app.user_info.job')}
                        className='form-control empty'
                        value={this.state.profile.job}
                        onChange={this.handleChangeInfo.bind(this, 'job')}/>
                    </div>
                  </div>

                  <div className='form-group pmd-textfield'>
                    <label className='col-sm-3 control-label' for='textinput'>
                      {translate('app.user_info.description')}</label>
                    <div className='col-sm-9'>
                      <input type='text' placeholder={translate('app.user_info.description')}
                        className='form-control empty'
                        value={this.state.profile.description}
                        onChange={this.handleChangeInfo.bind(this, 'description')}/>
                    </div>
                  </div>

                  <div className='form-group'>
                    <div className='col-sm-offset-3 col-sm-3'>
                      <button className='btn btn-primary'
                        onClick={this.handleUpdateInfo.bind(this)}>
                        {translate('app.user_info.update')}</button>
                    </div>
                  </div>

                </fieldset>
              </div>
              <div className='form-horizontal'>
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
                      <button className='btn btn-primary'
                        onClick={this.handleUpdatePassword.bind(this)}>
                        {translate('app.user_info.update')}</button>
                    </div>
                  </div>

                </fieldset>
              </div>
            </div>

          </div>
        </div>
      </section>
    );
  }
}
