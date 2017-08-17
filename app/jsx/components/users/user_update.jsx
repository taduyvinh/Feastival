let translate = require('counterpart');
import update from 'react-addons-update';
import * as constant from  '../../constant'
import axios from 'axios';
import AlertContainer from 'react-alert';

export default class UserUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'email': '',
      'profile': {
        'id': 1,
        'user_id': 1,
        'name': '',
        'birthday': '',
        'phonenumber': '',
        'gender': 0,
        'job': '',
        'avatar': '',
        'description': '',
      },
      change_pass: {
        current_pass: '',
        new_pass: '',
        repeat_pass: ''
      },
      avatar: ''
    }
  }

  showAlert(text) {
    this.msg.show(text, {
      time: 3000,
      type: 'success',
      icon: <img src='/assets/warning.png'/>
    });
  }

  getUserInfoById(id) {
    axios.get(constant.API_USER_UPDATE_URL + id, constant.headers)
      .then(response => {
        this.checkNullInfo(response.data.user_info.profile);
        let avatar = {url: ''};
        if (response.data.user_info.profile.avatar.url == null)
          avatar.url = constant.DEFAULT_AVATAR;
        else
          avatar = response.data.user_info.profile.avatar;
        this.setState({
          email: response.data.user_info.email,
          profile: response.data.user_info.profile,
          avatar: avatar
        })
      })
      .catch(error => {
        this.showAlert(translate('app.error.error'));
      });
  }

  updateUserInfo() {
    let formData = new FormData();
    formData.append('user[profile_attributes][name]', this.state.profile.name);
    formData.append('user[profile_attributes][description]', this.state.profile.description);
    formData.append('user[profile_attributes][phonenumber]', this.state.profile.phonenumber);
    formData.append('user[profile_attributes][birthday]', this.state.profile.birthday);
    formData.append('user[profile_attributes][job]', this.state.profile.job);
    formData.append('user[profile_attributes][avatar]', this.state.avatar);

    axios.patch(constant.API_USER_UPDATE_URL +
      JSON.parse(localStorage.feastival_user).user_id,
      formData, constant.headers)
      .then(response => {
        let feastival_user = JSON.parse(localStorage.feastival_user);
        feastival_user.avatar = this.state.avatar.url || this.state.avatar;
        localStorage.setItem('feastival_user', JSON.stringify(feastival_user));
        this.showAlert(translate('app.error.success'));
      })
      .catch(error => {
        this.showAlert(translate('app.error.error_validate'));
      });
  }

  componentWillMount() {
    this.getUserInfoById(JSON.parse(localStorage.feastival_user).user_id);
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
    profile.description = profile.description || '';
  }

  handleImageChange(event) {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        avatar: reader.result,
        image: file
      });
    }
    reader.readAsDataURL(file);
  }

  render() {
    return (
      <section className='user-info'>
        <AlertContainer ref={a => this.msg = a} {...constant.ALERT_OPTIONS} />
        <div className='row wrapper-user-info'>
          <div className='pmd-card pmd-z-depth-1 col-md-offset-3 col-md-6 user-info-body'>
            <div data-provides='fileinput'
              className='fileinput fileinput-new col-md-2 col-md-offset-1 avatar'>
              <div data-trigger='fileinput' id='avatar'
                className='fileinput-preview thumbnail img-responsive'>
                <img src={this.state.avatar.url || this.state.avatar}/>
              </div>
              <div className='action-button'>
                <span className='btn btn-default btn-raised btn-file ripple-effect'>
                  <span className='fileinput-new'>
                    <i className='material-icons md-light pmd-xs'>add</i>
                  </span>
                  <span className='fileinput-exists'>
                    <i className='material-icons md-light pmd-xs'>mode_edit</i>
                  </span>
                  <input className='form-control' type='file' name='image'
                    onChange={e => this.handleImageChange(e)}/>
	              </span>
                <a data-dismiss='fileinput'
                   className='btn btn-default btn-raised btn-file ripple-effect fileinput-exists'
                   href='javascript:void(0);'>
                  <i className='material-icons md-light pmd-xs'>close</i>
                </a>
              </div>
            </div>
            <div className='col-md-8'>
              <div className='form-horizontal'>
                <fieldset>
                  <legend>{translate('app.user_info.user_info')}</legend>
                  <div className='form-group'>
                    <label className='col-sm-3 control-label' htmlFor='textinput'>
                      {translate('app.user_info.email')}</label>
                    <div className='col-sm-9'>
                      <p className='form-control-static'><strong>{this.state.email}</strong></p>
                    </div>
                  </div>

                  <div className='form-group pmd-textfield'>
                    <label className='col-sm-3 control-label' htmlFor='textinput'>
                      {translate('app.user_info.name')}</label>
                    <div className='col-sm-9'>
                      <input type='text' placeholder={translate('app.user_info.name')}
                        className='form-control empty'
                        value={this.state.profile.name}
                        onChange={this.handleChangeInfo.bind(this, 'name')}/>
                    </div>
                  </div>

                  <div className='form-group pmd-textfield'>
                    <label className='col-sm-3 control-label' htmlFor='textinput'>
                      {translate('app.user_info.phonenumber')}</label>
                    <div className='col-sm-9'>
                      <input type='number' placeholder={translate('app.user_info.phonenumber')}
                        className='form-control empty'
                        value={this.state.profile.phonenumber}
                        onChange={this.handleChangeInfo.bind(this, 'phonenumber')}/>
                    </div>
                  </div>

                  <div className='form-group pmd-textfield'>
                    <label className='col-sm-3 control-label' htmlFor='textinput'>
                      {translate('app.user_info.job')}</label>
                    <div className='col-sm-9'>
                      <input type='text' placeholder={translate('app.user_info.job')}
                        className='form-control empty'
                        value={this.state.profile.job}
                        onChange={this.handleChangeInfo.bind(this, 'job')}/>
                    </div>
                  </div>

                  <div className='form-group pmd-textfield'>
                    <label className='col-sm-3 control-label' htmlFor='textinput'>
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
                    <label className='col-sm-3 control-label' htmlFor='textinput'>
                      {translate('app.user_info.name')}</label>
                    <div className='col-sm-9'>
                      <input type='password' placeholder={translate('app.user_info.current_pass')}
                        className='form-control empty'
                        value={this.state.change_pass.current_pass}
                        onChange={this.handleChangePassword.bind(this, 'current_pass')}/>
                    </div>
                  </div>

                  <div className='form-group pmd-textfield'>
                    <label className='col-sm-3 control-label' htmlFor='textinput'>
                      {translate('app.user_info.new_pass')}</label>
                    <div className='col-sm-9'>
                      <input type='password' placeholder={translate('app.user_info.new_pass')}
                        className='form-control empty'
                        value={this.state.change_pass.new_pass}
                        onChange={this.handleChangePassword.bind(this, 'new_pass')}/>
                    </div>
                  </div>

                  <div className='form-group pmd-textfield'>
                    <label className='col-sm-3 control-label' htmlFor='textinput'>
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
