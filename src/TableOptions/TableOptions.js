import React, { Component } from 'react';

class TableOptions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openSearchBox: false
        }
        this.openSearchBox.bind(this);
    }

    openSearchBox() {
        this.setState({ openSearchBox: !this.state.openSearchBox });
    }

    render() {
        let { fullScreen, fullScreenCallback, filter, search, searchCallback } = this.props.options;
        return (
            <div className="table-options-wrapper">
                {(search && !this.state.openSearchBox) ?
                    <div
                        className="option-block"
                        onClick={() => { this.openSearchBox() }}
                    >
                        <i className="fas fa-search"></i>
                    </div> : ''}
                {this.state.openSearchBox ?
                    <div>
                        <input 
                        className="search-box" 
                        onBlur={() => { this.openSearchBox() }} 
                        autoFocus 
                        placeholder="Search" 
                        onChange={(e) => {searchCallback(e.target.value)}}/>
                    </div> : ''}
                {fullScreen ? 
                    <div 
                        className="option-block"
                        onClick={() => {fullScreenCallback()}}
                    >
                        <i className="fas fa-expand"></i>
                    </div> : ''}
                {filter ? 
                    <div className="option-block">
                        <i className="fas fa-filter"></i>
                    </div> : ''}
            </div>
        )
    }
}

export default TableOptions;