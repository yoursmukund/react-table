import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Rows from './Rows';
import TableOptions from './TableOptions/TableOptions';
import data from './data/data';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 600,
      defaultColor: 'white',
      columns: data.columns,
      rows: data.rows,
      expanded: false
    }
    this.sortCallback = this.sortCallback.bind(this);
    this.searchCallBack = this.searchCallBack.bind(this);
    this.fullScreenCallback = this.fullScreenCallback.bind(this);
  }

  sortCallback(columnName, ascOrder) {
    this.setState({
      rows: this.state.rows.sort((obj1, obj2) => {
        if (ascOrder) {
          if (obj1[columnName] < obj2[columnName]) {
            return -1;
          } else {
            return 1;
          }
        } else {
          if (obj1[columnName] > obj2[columnName]) {
            return -1;
          } else {
            return 1;
          }
        }
      }),
    });
  }

  searchCallBack(searchString){
    let rows = data.rows;
    let filteredRows = rows.filter((row) => {
      for(let index in row){
        if(row[index].indexOf(searchString)!==-1){
          return row;
        }
      }
    });
    this.setState({rows: filteredRows});
  }

  fullScreenCallback(){
    if(this.state.expanded){
      this.setState({width: 600, expanded: false});
    } else {
      this.setState({width: document.body.offsetWidth-10, expanded: true});
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="table-header" style={{ width: this.state.width-2 }}>
          <div className="table-name"></div>
          <div className="table-name"><b>Employee Table</b></div>
          <TableOptions options={{ fullScreen: true, filter: true, search: true, searchCallback: this.searchCallBack, fullScreenCallback: this.fullScreenCallback }}/>
        </div>
        <table className="table" style={{ width: this.state.width }}>
          <thead>
            <Rows columns={this.state.columns} callback={(columnName, ascSortOrder) => { this.sortCallback(columnName, ascSortOrder) }} />
          </thead>
          <tbody>
            <Rows rows={this.state.rows} />
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
