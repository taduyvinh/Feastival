let translate = require('counterpart');
import update from 'react-addons-update';
import * as constant from  '../constant'
import axios from 'axios';

export default class UserInfo extends React.Component {
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
      }
    }
  }

  getUserInfoById(id) {
    axios.get(constant.API_USER_INFO_URL + id, constant.headers)
      .then(response =>  {
        this.checkNullInfo(response.data.user_info.profile)
        this.setState({
          email: response.data.user_info.email,
          profile: response.data.user_info.profile
        })
      })
      .catch(error => {
        alert(error);
      });
  }

  componentWillMount() {
    this.getUserInfoById(this.props.params.user_id);
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

                  <div>
                    <label className='col-sm-3 control-label'>
                      {translate('app.user_info.email')}
                    </label>
                    <div className='col-sm-9'>
                      <p className='form-control-static'><strong>{this.state.email}</strong></p>
                    </div>
                  </div>


                  <div>
                    <label className='col-sm-3 control-label'>
                      {translate('app.user_info.name')}
                    </label>
                    <div className='col-sm-9'>
                      <p className='form-control-static'>{this.state.profile.name}</p>
                    </div>
                  </div>

                  <div>
                    <label className='col-sm-3 control-label'>
                      {translate('app.user_info.job')}
                    </label>
                    <div className='col-sm-9'>
                      <p className='form-control-static'>{this.state.profile.job}</p>
                    </div>
                  </div>

                  <div>
                    <label className='col-sm-3 control-label'>
                      {translate('app.user_info.phonenumber')}
                    </label>
                    <div className='col-sm-9'>
                      <p className='form-control-static'>{this.state.profile.phonenumber}</p>
                    </div>
                  </div>

                  <div>
                    <label className='col-sm-3 control-label'>
                      {translate('app.user_info.description')}
                    </label>
                    <div className='col-sm-9'>
                      <p className='form-control-static'>{this.state.profile.description}</p>
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
