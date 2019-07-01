import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Rows from './Rows';
import TableOptions from './TableOptions/TableOptions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultColor: 'white',
      columns: [{ fname: 'Email', lname: 'Institute Name' }],
      rows: [
        { fname: 'ornare@accumsansed.edu', lname: 'Aenean InstitutesajdkhkasdhkAHSDKJHASKD' },
        { fname: 'sit@pharetranibhAliq', lname: 'Mus Proin Vel Inc.' },
        { fname: 'eget.venenatis@nonummy.org', lname: 'In Tempus Eu Industries' },
        { fname: 'libero.Proin.sed@magnaetipsum.org', lname: 'Sem Associates' },
        { fname: 'nibh.Aliquam@atpretium.edu', lname: 'Fringilla Institute' }]
    }
    this.sortCallback = this.sortCallback.bind(this);
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

  render() {
    return (
      <div className="wrapper">
        <div className="table-header" style={{ width: 598 }}>
          <div className="table-name"></div>
          <div className="table-name"><b>Employee Table</b></div>
          <TableOptions options={{ fullScreen: true, filter: true, search: true }} />
        </div>
        <table className="table" style={{ width: 600 }}>
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
