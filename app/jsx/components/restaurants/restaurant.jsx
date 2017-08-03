let translate = require('counterpart');

export default class Restaurant extends React.Component {
  render() {
    return (
      <div className='col-md-3'>
        <div className='restaurant'>
          <div className='banner'><img src='/assets/banner.jpg'/></div>
          <div className='title'>
            {this.props.restaurant.title}
          </div>
          <div className='address'>
            {this.props.restaurant.address}
          </div>
          <button onClick={this.props.onButtonClick}>
            {translate('app.restaurant_info.info')}
          </button>
        </div>
      </div>
    )
  }
}
