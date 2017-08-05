var translate = require('counterpart');
import axios from 'axios';
import * as constant from '../../constant';
import AlertContainer from 'react-alert';

export default class VoucherCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: '',
      image: '',
      description:'',
      from: null,
      to: null,
    };
  }

  showAlert(text) {
    this.msg.show(text, {
      time: 3000,
      type: 'success',
      icon: <img src='/assets/warning.png' />
    });
  }

  handleSubmit(event) {
    let formData = new FormData();
    formData.append('voucher[image]', this.state.image);
    formData.append('voucher[from]', this.state.from);
    formData.append('voucher[to]', this.state.to);
    formData.append('voucher[description]', this.state.description);
    event.preventDefault();
    axios.post(constant.API_RESTAURANTS_URL + this.props.params.restaurant_id +
      constant.API_VOUCHERS_URL,formData, constant.headers)
      .then(response => {
        window.location = constant.RESTAURANTS_URL +
          this.props.params.restaurant_id
      })
      .catch(error => {
        this.showAlert(translate('app.error.error'));
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

  handleImageChange(event) {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
        image: file
      });
    }
    reader.readAsDataURL(file)
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let imagePreview = null;
    if (imagePreviewUrl) {
      imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      imagePreview = (<div>{translate('app.vouchers.upload')}</div>);
    }

    return (
      <div className='container'>
        <AlertContainer ref={a => this.msg = a} {...constant.ALERT_OPTIONS} />
        <div className='imgPreview'>
          {imagePreview}
        </div>

        <form onSubmit={e => this.handleSubmit(e)}>
          <div className='form-group'>
            <div className='col-md-10 col-md-offset-1'>
              <label class='control-label' htmlFor='from'>
                {translate('app.vouchers.description')}
              </label>
              <input
                type='form-contol'
                name='description'
                onChange={this.handleInputChange.bind(this)}
                />
            </div>
          </div>

          <div className='form-group'>
            <div className='col-md-10 col-md-offset-1'>
              <label class='control-label' htmlFor='Image'>
                {translate('app.vouchers.image')}
              </label>
              <input className='form-control'
                type='file'
                name='image'
                onChange={e => this.handleImageChange(e)}
              />
            </div>
          </div>

          <div className='row'>
            <div className='col-sm-6'>
              <div className='form-group pmd-textfield'>
                <label class='control-label' htmlFor='from'>
                  {translate('app.vouchers.from')}
                </label>
                <input type='datetime-local' name='from' className='form-control'
                  onChange={this.handleInputChange.bind(this)}
                  id='datepicker-start'>
                </input>
              </div>
            </div>

            <div className='col-sm-6'>
              <div className='form-group pmd-textfield'>
                <label className='control-label' htmlFor='to'>
                  {translate('app.vouchers.to')}
                </label>
                <input type='datetime-local' name='to' className='form-control'
                  onChange={this.handleInputChange.bind(this)}
                  id='datepicker-end'></input>
              </div>
            </div>

          </div>
          <button className='btn btn-primary'
            type='submit'
            onClick={e => this.handleSubmit(e)}>
            {translate('app.vouchers.submit')}
          </button>
        </form>
      </div>
    )
  }
}
