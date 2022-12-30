"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_admin_1 = require("react-admin");
const DialogTitle_1 = __importDefault(require("@material-ui/core/DialogTitle"));
const DialogContent_1 = __importDefault(require("@material-ui/core/DialogContent"));
const DialogActions_1 = __importDefault(require("@material-ui/core/DialogActions"));
const Dialog_1 = __importDefault(require("@material-ui/core/Dialog"));
const FormControlLabel_1 = __importDefault(require("@material-ui/core/FormControlLabel"));
const FormGroup_1 = __importDefault(require("@material-ui/core/FormGroup"));
const Checkbox_1 = __importDefault(require("@material-ui/core/Checkbox"));
const Close_1 = __importDefault(require("@material-ui/icons/Close"));
const Button_1 = __importDefault(require("@material-ui/core/Button"));
/**
 *
 */
class SelectionDialog extends react_1.default.Component {
    constructor(props) {
        super(props);
        // @ts-ignore
        this.onColumnClicked = ({ target: { value: columnName } }) => {
            this.props.onColumnClicked(columnName);
        };
    }
    render() {
        const { columns, selection, onClose, resource } = this.props;
        // @ts-ignore
        return (react_1.default.createElement(Dialog_1.default, { maxWidth: "xs", "aria-labelledby": "ra-columns-dialog-title", onClose: onClose, open: true },
            react_1.default.createElement(DialogTitle_1.default, { id: "ra-columns-dialog-title" }, "Configuration"),
            react_1.default.createElement(DialogContent_1.default, null,
                react_1.default.createElement(FormGroup_1.default, null, columns.map(({ source, label }) => (react_1.default.createElement(FormControlLabel_1.default, { key: source, control: react_1.default.createElement(Checkbox_1.default, { checked: !!selection[source], onChange: this.onColumnClicked, value: source }), label: react_1.default.createElement(react_admin_1.FieldTitle, { label: label, source: source, resource: resource }) }))))),
            react_1.default.createElement(DialogActions_1.default, null,
                react_1.default.createElement(Button_1.default, { onClick: this.props.onClose, color: "primary" },
                    react_1.default.createElement(Close_1.default, null)))));
    }
}
SelectionDialog.defaultProps = {
    columns: [],
};
exports.default = SelectionDialog;
