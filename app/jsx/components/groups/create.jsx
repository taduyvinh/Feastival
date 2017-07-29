let translate = require('counterpart');
import Map from 'google-maps-react';
import axios from 'axios';
import MapGroupCreate from './map';
import * as constant from '../../constant';

export default class GroupCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [], size: 2, creator_id: '',
      category_id: 3, title: '', address: '', description: '',
      latitude: '', longitude: ''
    };
  }

  componentDidMount() {
    axios.get(constant.API_NEW_GROUP_URL, constant.headers)
      .then(response => {
        this.setState({
          creator_id: JSON.parse(localStorage.feastival_user).USER_TOKEN.id,
          categories: response.data.categories,
          restaurants: response.data.restaurants
        })
      })
      .catch(function(error) {
        alert(error);
      });
    }

  handleLatLngChange(latitude, longitude) {
    this.setState({
      latitude: latitude,
      longitude: longitude
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

  handleSubmit() {
    let formData = new FormData();
    formData.append('group[creator_id]', this.state.creator_id);
    formData.append('group[category_id]', this.state.category_id);
    formData.append('group[title]', this.state.title);
    formData.append('group[time]', this.state.time);
    formData.append('group[address]', this.state.address);
    formData.append('group[latitude]', this.state.latitude);
    formData.append('group[longitude]', this.state.longitude);
    formData.append('group[description]', this.state.description);
    formData.append('group[size]', this.state.size);

    axios.post(constant.API_GROUPS_URL, formData, constant.headers)
      .then((response) => {
        window.location = constant.BASE_URL;
      })
      .catch(function (error) {
        alert(error)
      });
  }

  render() {
    return (
      <div className  ='container'>
        <div className='page-header'></div>
        <div className='container'>
          <div className='row'>

            <div className='col-md-6'>
              <div className='well well-sm'>
                <div className='form-horizontal'>
                  <fieldset>

                     <div className='form-group'>
                      <div className='col-md-10 col-md-offset-1'>
                        <input type='text' className='form-control'
                          value={this.state.title}
                          name='title'
                          onChange={this.handleInputChange.bind(this)}
                          placeholder={translate('app.groups.create.title')}
                         />
                      </div>
                    </div>

                    <div className='form-group'>
                      <div className='col-md-10 col-md-offset-1'>
                        <select className='form-control'
                          name='category_id'
                          value={this.state.category_id}
                          onChange={this.handleInputChange.bind(this)}>
                          {this.state.categories.map(category => (
                            <option value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                     <div className='form-group'>
                      <div className='col-md-10 col-md-offset-1'>
                        <input type='text' className='form-control'
                          value={this.state.address}
                          name='address'
                          onChange={this.handleInputChange.bind(this)}
                          placeholder={translate('app.groups.create.address')}
                         />
                      </div>
                    </div>

                    <div className='form-group'>
                      <div className='col-md-10 col-md-offset-1'>
                        <input type='datetime-local' className='form-control'
                          value={this.state.time}
                          name='time'
                          onChange={this.handleInputChange.bind(this)}
                          placeholder={translate('app.groups.create.time')}
                         />
                      </div>
                    </div>



                    <div className='form-group'>
                      <div className='col-md-10 col-md-offset-1'>
                        <input type='text' className='form-control'
                          value={this.state.description}
                          name='description'
                          onChange={this.handleInputChange.bind(this)}
                          placeholder={translate('app.groups.create.description')}
                         />
                      </div>
                    </div>

                    <div className='form-group'>
                      <div className='col-md-10 col-md-offset-1'>
                        <input type='number' className='form-control'
                          value={this.state.size}
                          name='size'
                          onChange={this.handleInputChange.bind(this)}
                          placeholder={translate('app.groups.create.size')}
                         />
                      </div>
                    </div>

                    <div className='form-group'>
                      <div className='col-md-10 col-md-offset-1'>
                        <input type='hidden' className='form-control'
                          value={this.state.latitude}
                          name='latitude'
                          onChange={this.handleInputChange.bind(this)}
                         />
                      </div>
                    </div>


                    <div className='form-group'>
                      <div className='col-md-10 col-md-offset-1'>
                        <input type='hidden' className='form-control'
                          value={this.state.longitude}
                          name='longitude'
                          onChange={this.handleInputChange.bind(this)}
                         />
                      </div>
                    </div>

                    <div className='form-group'>
                      <div className='col-md-12 text-center'>
                        <button type='submit' className='btn btn-primary btn-lg'
                          onClick={this.handleSubmit.bind(this)}>
                          {translate("app.groups.create.submit")}
                        </button>
                      </div>
                    </div>

                  </fieldset>
                </div>
              </div>
            </div>

            <div className='col-md-6'>
              <div>
                <div className='panel panel-default'>
                  <div className='text-center header'></div>
                  <div className='panel-body text-center'>
                    <MapGroupCreate LatLng={this.handleLatLngChange.bind(this)}
                      restaurants = {this.state.restaurants} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
