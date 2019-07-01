import React, { Component } from 'react';

class TableOptions extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        let { fullScreen, filter, search } = this.props.options;
        return (
            <div className="table-options-wrapper">
                {search ? <div className="option-block">
                    <i className="fas fa-search"></i>
                </div> : ''}
                {fullScreen ? <div className="option-block">
                    <i className="fas fa-expand"></i>
                </div> : ''}
                {filter ? <div className="option-block">
                    <i className="fas fa-filter"></i>
                </div> : ''}
            </div>
        )
    }
}

export default TableOptions;