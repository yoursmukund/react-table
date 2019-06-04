import React, { Component } from 'react';

export default class Rows extends Component{
    constructor(props){
        super(props);
        this.highlight.bind(this);
        this.setHighlight.bind(this);
        this.removeHighlight.bind(this);
        this.cell.bind(this);
        this.sort.bind(this);
        this.state = {
            position: null,
            columnWidth: '100%',
        }
    }

    highlight(e, index){
        if(this.state.position !== index){
            this.setState({position: index});
        } else {
            this.setState({position: null});
        }
    }

    setHighlight(index){
        if(index === this.state.position){
            return '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)';
        } else {
            return '';
        }
    }

    removeHighlight(){
        this.setState({position: null});
    }

    cell(key, row, header){
        return(
            <div 
                key={Math.random()} 
                className="cell" 
                style={{width: this.state.columnWidth}}>
                <b>{row[key]}</b>
                {header ? <i className="fas fa-angle-down" onClick={() => {this.sort(key)}}></i> : ''}
            </div>
        );
    }

    sort(key){
        this.props.callback(key);
    }

    render(){
        return(
            <div className="row-wrapper">
                {this.props.rows? this.props.rows.map((row, index) => {
                let tds = [];
                for(let key in row){
                    tds.push(this.cell(key, row));
                }
                return <div key={index} className="row" style={{boxShadow: this.setHighlight(index)}} onMouseEnter={(e) => {this.highlight(e, index)}} onMouseLeave={()=>{this.removeHighlight()} }>{tds}</div>;
                }) : this.props.columns.map((row, index) => {
                let tds = [];
                for(let key in row){
                    tds.push(this.cell(key, row, true));
                }
                return <div className="row header" key={Math.random()}>{tds}</div>;
                })}
            </div>
        )
    }
  }