import React, { Component } from 'react';
import { connect } from 'react-redux';


const mapStateToProps = reduxState => ({
  reduxState,
});

class Menu extends Component {
  state = {
    subtractDisabled: true, 
    count: 0

  }
    componentDidMount() {
        this.props.dispatch(
          {
            type: 'GET_PIZZAS'
        })
    }


    handleAdd = (event) => {

      this.setState({
        subtractDisabled: false,
        count: this.state.count += 1
      })
        console.log('handle add', event.target.value)
        let pizzaToSend = JSON.parse(event.target.value)
        return this.props.dispatch({
          type: 'ADD_PIZZA',
          payload: pizzaToSend
        })
    }
  }



    handleSubtract = (event) => {
      if(this.state.count === 0){
        this.setState({
          subtractDisabled: true,
          count: 0
        })
      } else{
        this.setState({
          count: this.state.count -= 1
        })

        console.log('handle subtract', event.target.value)
        let pizzaToSend = JSON.parse(event.target.value)
        return this.props.dispatch({
          type: 'REMOVE_PIZZA',
          payload: pizzaToSend
        })
      }
    }

    
    render() {

      let pizzaDisplay = this.props.reduxState.pizzaMenu.map((pizza)=> {
      return (<div key = {pizza.id}><p>{pizza.name}</p> 
      <pre>{pizza.description}</pre> 
      <pre>{pizza.cost}</pre>
      <button value={JSON.stringify(pizza)}
       onClick={this.handleAdd} >+</button>
       Pizza
       <button value={JSON.stringify(pizza)} disabled={this.state.subtractDisabled} onClick={this.handleSubtract}>-</button>
       </div>)
      })
      return (

        <div className="App">

          <p>Pizza Menu</p>
          {/* <pre>{JSON.stringify(this.props.reduxState.orderTotal)}</pre> */}
          <div>
            {pizzaDisplay}
          </div>

        </div>
      );
    }
  }
  
  export default connect(mapStateToProps)(Menu);