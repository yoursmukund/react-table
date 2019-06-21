import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Rows from './Rows';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      defaultColor: 'white',
      columns: [{fname: 'First Name', lname: 'Last Name'}],
      rows: [
      {fname:'Mukund',lname:'Sharma'}, 
      {fname:'Prakrity',lname:'Dadhich'},
      {fname:'Ila',lname:'Sharma'},
      {fname:'Shekhar',lname:'Sharma'},
      {fname:'Meenakshi',lname:'Sharma'}]
    }
    this.sortCallback = this.sortCallback.bind(this);
  }

  sortCallback(columnName, ascOrder) {
    this.setState({
      rows: this.state.rows.sort((obj1, obj2) => {
        if(ascOrder){
          if(obj1[columnName] < obj2[columnName]){
            return -1;
          } else{
            return 1;
          }
        } else {
          if(obj1[columnName] > obj2[columnName]){
            return -1;
          } else{
            return 1;
          }
        }
        }),
    });
  }

  render() {
    return (
      <div className="App">
        <div className="table">
          <div>
              <Rows columns={this.state.columns} callback={(columnName, ascSortOrder) => {this.sortCallback(columnName, ascSortOrder)}}/>
          </div>
          <div>
            <Rows rows={this.state.rows} callback={(columnName, ascSortOrder) => { this.sortCallback(columnName, ascSortOrder) }}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
