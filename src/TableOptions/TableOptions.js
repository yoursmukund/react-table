import React, { Component } from 'react';
import data from '../data/data';

class TableOptions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openSearchBox: false,
            openFilter: false,
            unchecked: [],
        }
        this.openSearchBox.bind(this);
        this.openFilter.bind(this);
        this.FilterList.bind(this);
        this.FilterItem.bind(this);
        this.checkboxHandler = this.checkboxHandler.bind(this);
    }

    checkboxHandler(key, bool) {
        let unchecked = this.state.unchecked;
        if (bool) {
            unchecked.splice(unchecked.indexOf(key), 1);
        } else {
            unchecked.push(key);
        }
        this.setState({ unchecked: unchecked }, () => {
            let { filterCallback } = this.props.options;
            filterCallback(this.state.unchecked);
        });
    }

    FilterList() {
        return (
            <div className="columnList">
                {this.FilterItem()}
            </div>
        );
    }

    FilterItem() {
        let items = [];
        for (let columnName in data.columns[0]) {
            let value = data.columns[0][columnName];
            items.push(
                <div className="filter-item-wrapper" key={value}>
                    <input
                        type="checkbox"
                        id={value}
                        className="filter-checkbox"
                        value={value}
                        checked={this.state.unchecked.indexOf(value) !== -1 ? false : true}
                        onChange={(e) => { this.checkboxHandler(columnName, e.target.checked) }}
                    />
                    <label
                        className="filter-item-name"
                        htmlFor={value}>
                        {value}
                    </label>
                </div>
            );
        }
        return items;
    }

    openSearchBox() {
        this.setState({ openSearchBox: !this.state.openSearchBox });
    }

    openFilter() {
        this.setState({ openFilter: !this.state.openFilter });
    }

    render() {
        let { fullScreen, fullScreenCallback, filter, filterCallback, search, searchCallback } = this.props.options;
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
                            onChange={(e) => { searchCallback(e.target.value) }} />
                    </div> : ''}
                {fullScreen ?
                    <div
                        className="option-block"
                        onClick={() => { fullScreenCallback() }}
                    >
                        <i className="fas fa-expand"></i>
                    </div> : ''}
                {filter ?
                    <div className="option-block"
                        onClick={() => { this.openFilter(); }}
                    >
                        <i className="fas fa-filter"></i>
                    </div> : ''}

                {this.state.openFilter ?
                    <div
                        className="filter-box"
                    // onMouseLeave={() => { this.openFilter() }}
                    >
                        {this.FilterList()}
                    </div> : ''}
            </div>
        )
    }
}

export default TableOptions;