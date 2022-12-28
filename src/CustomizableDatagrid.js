"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const isEmpty_1 = __importDefault(require("lodash/isEmpty"));
const filter_1 = __importDefault(require("lodash/filter"));
const get_1 = __importDefault(require("lodash/get"));
const react_admin_1 = require("react-admin");
const ViewColumn_1 = __importDefault(require("@material-ui/icons/ViewColumn"));
const Button_1 = __importDefault(require("@material-ui/core/Button"));
// import SelectionDialog from './SelectionDialog';
const LocalStorage_1 = __importDefault(require("./LocalStorage"));
/**
 *
 */
class CustomizableDatagrid extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.handleOpen = (event) => {
            this.setState({ modalOpened: true });
        };
        this.handleClose = () => this.setState({ modalOpened: false });
        this.renderChild = (child) => {
            const source = (0, get_1.default)(child, ['props', 'source']);
            const { selection } = this.state;
            // Show children without source, or children explicitly visible
            if (!source || selection[source]) {
                return react_1.default.cloneElement(child, {});
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
        if (!(0, isEmpty_1.default)(previousSelection)) {
            return previousSelection;
        }
        // if defaultColumns are set let's return them
        if (!(0, isEmpty_1.default)(defaultColumns)) {
            return arrayToSelection(defaultColumns);
        }
        // otherwise we fallback on the default behaviour : display all columns
        return arrayToSelection(this.getColumnNames());
    }
    getColumnNames() {
        const { children } = this.props;
        return (0, filter_1.default)(react_1.default.Children.map(children, field => (0, get_1.default)(field, ['props', 'source'])));
    }
    getColumnLabels() {
        const { children } = this.props;
        return (0, filter_1.default)(react_1.default.Children.map(children, field => field && {
            source: (0, get_1.default)(field, ['props', 'source']),
            label: (0, get_1.default)(field, ['props', 'label']),
        }), item => item && item.source);
    }
    render() {
        const _a = this.props, { children, defaultColumns } = _a, rest = __rest(_a, ["children", "defaultColumns"]);
        const { selection, modalOpened } = this.state;
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("div", { style: { float: 'right', marginRight: '1rem' } },
                react_1.default.createElement(Button_1.default, { variant: "outlined", "aria-label": "add", size: "small", onClick: (e) => this.handleOpen(e) },
                    react_1.default.createElement(ViewColumn_1.default, null))),
            react_1.default.createElement(react_admin_1.Datagrid, Object.assign({}, rest), react_1.default.Children.map(children, this.renderChild))));
    }
}
CustomizableDatagrid.defaultProps = {
    defaultColumns: [],
    storage: LocalStorage_1.default
};
const arrayToSelection = (values) => values.reduce((selection, columnName) => {
    selection[columnName] = true;
    return selection;
}, {});
exports.default = CustomizableDatagrid;
