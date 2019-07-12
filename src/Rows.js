import React, { Component } from 'react';

export default class Rows extends Component {
    constructor(props) {
        super(props);
        this.highlight.bind(this);
        this.setHighlight.bind(this);
        this.removeHighlight.bind(this);
        this.cell.bind(this);
        this.sort.bind(this);
        this.showIcon.bind(this);
        this.changeWidth.bind(this);
        this.state = {
            position: null,
            columnWidth: 300,
            ascSortOrder: null,
            widthDelta: 0,
            startX: 0,
            pressed: false
        }
    }

    highlight(e, index) {
        if (this.state.position !== index) {
            this.setState({ position: index });
        } else {
            this.setState({ position: null });
        }
    }

    setHighlight(index) {
        if (index === this.state.position) {
            return '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)';
        } else {
            return '';
        }
    }

    removeHighlight() {
        this.setState({ position: null });
    }

    showIcon(key) {
        if (this.state.ascSortOrder === null) {
            return (null);
        } else if (this.state.ascSortOrder === true) {
            return (<i className="fa fa-angle-down" onClick={() => { this.sort(key) }}></i>);
        } else if (this.state.ascSortOrder === false) {
            return (<i className="fa fa-angle-up" onClick={() => { this.sort(key) }}></i>);
        }
    }

    cell(key, row) {
        return (
            <td
                key={key}
                className="table-cell"
            >
                {row[key]}
            </td>
        );
    }

    changeWidth() {
        if (this.state.pressed) {
            this.setState({ columnWidth: this.state.startX + this.state.widthDelta });
        }
    }

    setHeaderWidth(key) {
        if (key === this.state.pressedColumn) {
            return { width: this.state.columnWidth };
        } else {
            return { width: 'auto' };
        }
    }

    headerCell(key, row) {
        return (
            <th
                onClick={() => { this.sort(key, this.state.ascSortOrder) }}
                onMouseDown={(e) => { this.setState({ startX: e.pageX, pressed: true, pressedColumn: key }) }}
                onMouseMove={(e) => {
                    if (this.state.pressed) {
                        this.setState({ widthDelta: e.pageX - this.state.startX }, () => {
                            this.changeWidth();
                        });
                    }
                }}
                onMouseUp={() => {
                    this.setState({ pressed: false });
                }}
                key={key}
                className="header-cell"
                style={this.setHeaderWidth(key)}
            >
                <b>{row[key]}</b>
                {this.showIcon(key)}
            </th>
        );
    }

    sort(key) {
        let { callback } = this.props;
        let { ascSortOrder } = this.state;
        if (this.state.ascSortOrder === null) {
            this.setState({ ascSortOrder: true }, () => {
                callback(key, ascSortOrder);
            });
        } else if (this.state.ascSortOrder === true) {
            this.setState({ ascSortOrder: false }, () => {
                callback(key, ascSortOrder);
            });
        } else if (this.state.ascSortOrder === false) {
            this.setState({ ascSortOrder: null }, () => {
                callback(key, ascSortOrder);
            });
        }
    }

    render() {
        let columns = this.props.columns[0];
        return (
            this.props.rows ? this.props.rows.map((row, index) => {
                let tds = [];
                for (let key in row) {
                    if(columns.hasOwnProperty(key) === true){
                        tds.push(this.cell(key, row));
                    }
                }
                return <tr
                    key={index}
                    className="row"
                    style={{ boxShadow: this.setHighlight(index) }}
                    onMouseEnter={(e) => { this.highlight(e, index) }}
                    onMouseLeave={() => { this.removeHighlight() }}>
                    {tds}
                </tr>;
            }) : this.props.columns.map((row, index) => {
                let tds = [];
                for (let key in row) {
                    tds.push(this.headerCell(key, row));
                }
                return <tr className="row header" key={Math.random()}>{tds}</tr>;
            })
        );
    }
}