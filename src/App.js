import React, { Component } from 'react';
//import logo from './logo.svg';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';
import Data from './data/data.json';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: ''
    }
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(users => { this.setState({ monsters: users })},
        (error) => { this.setState({ monsters: Data, error : console.log('api call failed', error) })}
      )
  };

  handleChange = (e) => {
    this.setState({searchField: e.target.value})
  }

  render(){
    const {monsters, searchField} = this.state;
    const filteredMonsters = monsters.filter(monster => 
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className="App">
        <h1>Monsters Coolodex</h1>
        <SearchBox 
          placeholder="Search Monsters"
          handleChange={this.handleChange} 
        />
        <CardList monsters={filteredMonsters} />
      </div>
    )
  }
}

export default App;
