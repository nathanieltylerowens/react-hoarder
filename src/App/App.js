import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

import firebaseApp from '../helpers/data/connection';

import Navbar from '../components/pages/Navbar/Navbar';
import './App.scss';
import Home from '../components/pages/Home/Home';
import MyStuff from '../components/pages/MyStuff/MyStuff';
import SingleStuff from '../components/pages/SingleStuff/SingleStuff';
import EditStuff from '../components/pages/EditStuff/EditStuff';
import NewStuff from '../components/pages/NewStuff/NewStuff';
import Auth from '../components/pages/Auth/Auth';

firebaseApp();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};
class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <Router>
          <React.Fragment>
            <Navbar authed={authed}/>
            <div className="container">
              <Switch>
                <PrivateRoute path="/stuff" component={MyStuff} authed={authed}/>
                <PrivateRoute path="/new" component={NewStuff} authed={authed}/>
                <PrivateRoute path="/edit/:itemId" component={EditStuff} authed={authed}/>
                <PrivateRoute path="/stuff/:itemId" component={SingleStuff} authed={authed}/>
                <PrivateRoute path="/home" component={Home} authed={authed}/>
                <PublicRoute path="/auth" component={Auth} authed={authed}/>
                <Redirect from="*" to="/home" />
              </Switch>
            </div>
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
