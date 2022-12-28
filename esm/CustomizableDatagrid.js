var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from "react";
import isEmpty from 'lodash/isEmpty';
import filter from 'lodash/filter';
import get from 'lodash/get';
import { Datagrid } from 'react-admin';
import ColumnIcon from '@material-ui/icons/ViewColumn';
import Button from '@material-ui/core/Button';
/**
 *
 */
class CustomizableDatagrid extends React.Component {
    constructor(props) {
        super(props);
        this.handleOpen = (event) => {
            this.setState({ modalOpened: true });
        };
        this.handleClose = () => this.setState({ modalOpened: false });
        this.renderChild = (child) => {
            const source = get(child, ['props', 'source']);
            const { selection } = this.state;
            // Show children without source, or children explicitly visible
            if (!source || selection[source]) {
                return React.cloneElement(child, {});
            }
            return null;
        };
        this.updateStorage = () => {
            this.props.storage.set(this.props.resource, this.state.selection);
        };
        this.toggleColumn = (columnName) => {
            const previousSelection = this.state.selection;
            const selection = Object.assign(Object.assign({}, previousSelection), { [columnName]: !previousSelection[columnName] });
            this.setState({ selection }, this.updateStorage);
        };
        this.state = {
            modalOpened: false,
            selection: this.getInitialSelection()
        };
    }
    getInitialSelection() {
        const { defaultColumns, resource, children, storage } = this.props;
        const previousSelection = storage.get(resource);
        // if we have a previously stored value, let's return it
        if (!isEmpty(previousSelection)) {
            return previousSelection;
        }
        // if defaultColumns are set let's return them
        if (!isEmpty(defaultColumns)) {
            return arrayToSelection(defaultColumns);
        }
        // otherwise we fallback on the default behaviour : display all columns
        return arrayToSelection(this.getColumnNames());
    }
    getColumnNames() {
        const { children } = this.props;
        return filter(React.Children.map(children, field => get(field, ['props', 'source'])));
    }
    getColumnLabels() {
        const { children } = this.props;
        return filter(React.Children.map(children, field => field && {
            source: get(field, ['props', 'source']),
            label: get(field, ['props', 'label']),
        }), item => item && item.source);
    }
    render() {
        const _a = this.props, { children, defaultColumns } = _a, rest = __rest(_a, ["children", "defaultColumns"]);
        const { selection, modalOpened } = this.state;
        return (React.createElement("div", null,
            React.createElement("div", { style: { float: 'right', marginRight: '1rem' } },
                React.createElement(Button, { variant: "outlined", "aria-label": "add", size: "small", onClick: (e) => this.handleOpen(e) },
                    React.createElement(ColumnIcon, null))),
            React.createElement(Datagrid, Object.assign({}, rest), React.Children.map(children, this.renderChild))));
    }
}
const arrayToSelection = (values) => values.reduce((selection, columnName) => {
    selection[columnName] = true;
    return selection;
}, {});
export default CustomizableDatagrid;
