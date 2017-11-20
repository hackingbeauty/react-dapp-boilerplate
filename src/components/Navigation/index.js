import React, { Component } from 'react';
import { withRouter }       from 'react-router-dom';
import { Tabs, Tab }        from 'material-ui';
import HomeIcon             from 'material-ui/svg-icons/action/home';
import ListenIcon           from 'material-ui/svg-icons/action/list';

/* component styles */
import { styles } from './styles.scss';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRoute: ''
    }
  }

  componentDidMount() {
    const { pathname } = this.props.location;
    let path

    pathname === '/' ? path = '/home' : path = pathname
    this.handleChange(path, false);
  }

  handleChange=(path, updateURL) => {
    this.setState({
      currentRoute: path
    });

    if(updateURL !== false) { this.pushRoute(path) }
  }

  pushRoute(path){
    const { history } = this.props;

    switch(path) {
    case '/home':
      history.push('/home');
      break;
    case '/list':
      history.push('/list');
      break;
    default:
      break;
    }
  }

  render() {
    const { currentRoute } = this.state

    return(
      <div className={styles}>
        <Tabs
          className="tabs"
          value={currentRoute}
          onChange={this.handleChange}>
          <Tab
            icon={<HomeIcon />}
            label="Home"
            value={'/home'}>
          </Tab>
          <Tab
            icon={<ListenIcon />}
            label="List"
            value={'/list'}>
          </Tab>
        </Tabs>
      </div>
    );
  }

}

export default withRouter(Navigation);