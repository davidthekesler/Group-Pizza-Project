import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Menu from '../views/menuView';
import Checkout from '../views/checkoutView';
import Admin from '../views/adminView'

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Prime Pizza</h1>
        </header>
        <br/>
        <p>Pizza is great.</p>
      
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/menu">Menu</Link>
              </li>
              <li>
                <Link to="/checkout">Checkout</Link>
              </li>
              {/* <li>
                <Link to="/admin">Test</Link>
                go to  http://localhost:3000/admin to view admin page  
              </li> */}
              
            </ul>
          </nav>
          <hr />
          <Route exact path="/menu" component={Menu}/>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/admin" component={Admin}/>
        </div>  
      </Router>
      </div>
    );
  }
}

export default App;
