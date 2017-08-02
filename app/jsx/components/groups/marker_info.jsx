import StarRatingComponent from 'react-star-rating-component';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import * as constant from  '../../constant';

let translate = require('counterpart');

const INPUT_STYLE = {
  boxSizing: 'border-box',
  MozBoxSizing: 'border-box',
  border: '1px solid transparent',
  width: '100%',
  height: '40px',
  padding: '0 12px',
  borderRadius: '1px',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
  fontSize: '15px',
  outline: 'none',
  textOverflow: 'ellipses',
};

export default class MarkerInfo extends React.Component {
  constructor(props) {
    super(props);
    let restaurant = props.restaurant;
    this.state = {
      rating: 1,
      isShowingModal: false,
      name: props.name,
      more_btn: '...',
      groups: restaurant ? restaurant.groups : []
    };
  }

  componentWillReceiveProps(nextProps) {
    let restaurant = nextProps.restaurant;
    this.setState({
      name: nextProps.name,
      groups: restaurant ? restaurant.groups : []
    })
  }

  autoComplete() {
    let input = document.getElementById('autocomplete');
    let autocomplete = new google.maps.places.Autocomplete(input, {types: ['address']});
    google.maps.event.addListener(autocomplete, 'place_changed', function () {

    })
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }

  handleClick() {
    this.setState({isShowingModal: true});
  }

  handleClose() {
    this.setState({isShowingModal: false});
  }

  render() {
    return (
      <section>
        <div className='text-center tools'>
          <h1><p></p></h1>
        </div>
        <hr/>
        <div className='text-center'>
          <img src={constant.DEFAULT_AVATAR}
            width='150' height='150'/>
        </div>
        <div className='rates text-center'>
          <StarRatingComponent
            name='rate1'
            starCount={5}
            value={this.state.rating}
            onStarClick={this.onStarClick.bind(this)}
          />
        </div>
        <h1>
          <p className='restaurant-name text-center'>{this.state.name}</p>
        </h1>
        <hr/>
        <div className='text-center'>
          <div className='groups'><p>{translate('app.map.groups')}</p></div>
          <div className='groups-view row'>
            {this.renderGroups()}
          </div>
        </div>
      </section>
    )
  }

  renderGroups() {
    if (this.state.groups.length == 0) return <p>{translate('app.map.no_groups')}</p>;
    let first_three_groups =
      this.state.groups.filter((group, index) => (index < 3))
        .map((group, index) => {
        return (
          <div className='col-md-3 pmd-card pmd-z-depth-1 group-card'
            key={index}
            onClick=handleGroupClick
            >
            <img src={group.creator.profile.avatar}
              className='image'/>
            <OverlayTrigger
              placement='right'
              overlay={
                <Tooltip id='tooltip'>
                  <strong style={{textAlign: 'left'}}>
                    <p>{group.title}</p>
                  </strong>
                </Tooltip>}>
              <p className='max-lines'>{group.title}</p>
            </OverlayTrigger>
          </div>
        )
    })
    if (this.state.groups.length <= 3) return first_three_groups;

    return [
      first_three_groups,
      <div onClick={this.handleClick.bind(this)} className='col-md-1' key={4}>
        <h1>{this.state.more_btn}</h1>
        {
          this.state.isShowingModal &&
          <ModalContainer onClose={this.handleClose.bind(this)}>
            <ModalDialog onClose={this.handleClose.bind(this)}>
              <h1>{translate('app.map.more_groups')}</h1>
              <div className='list-groups'>
                <div className='list-group pmd-z-depth pmd-list pmd-card-list'>
                  {
                    this.state.groups.filter((group, index) => (index >= 3)).
                      map((group, index) => {
                        return (
                          <div key={index} className='row list-group-item group-item'>
                            <div className='col-md-6'>
                              <p className='max-lines'>{group.title}</p>
                            </div>
                          </div>
                        )
                    })
                  }
                </div>
              </div>
            </ModalDialog>
          </ModalContainer>
        }
      </div>
    ]
  }
}
