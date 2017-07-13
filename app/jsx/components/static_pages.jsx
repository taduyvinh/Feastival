var translate = require('counterpart');

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>{translate('app.static-pages.home_page')}</p>
      </div>
    );
  }
}
