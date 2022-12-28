import React, {Component} from "react";
import isEmpty from 'lodash/isEmpty';
import filter from 'lodash/filter';
import get from 'lodash/get';
import {Datagrid} from 'react-admin';
import ColumnIcon from '@material-ui/icons/ViewColumn';
import Button from '@material-ui/core/Button';
import T from 'prop-types';

// import SelectionDialog from './SelectionDialog';
import LocalStorage from './LocalStorage';

interface Props {

}

interface State {
  selection?: any;
  modalOpened?: boolean
}

/**
 *
 */
class CustomizableDatagrid extends React.Component<any, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      modalOpened: false,
      selection: this.getInitialSelection()
    }
  }

  getInitialSelection() {
    const {defaultColumns, resource, children, storage} = this.props;

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
    const {children} = this.props;
    return filter(React.Children.map(children, field => get(field, ['props', 'source'])));
  }

  getColumnLabels() {
    const {children} = this.props;
    return filter(
      React.Children.map(
        children,
        field =>
          field && {
            source: get(field, ['props', 'source']),
            label: get(field, ['props', 'label']),
          },
      ),
      item => item && item.source,
    );
  }

  handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({modalOpened: true})
  };

  handleClose = () => this.setState({modalOpened: false});

  renderChild = (child: any) => {
    const source = get(child, ['props', 'source']);
    const {selection} = this.state;

    // Show children without source, or children explicitly visible
    if (!source || selection[source]) {
      return React.cloneElement(child, {});
    }

    return null;
  };


  updateStorage = () => {
    this.props.storage.set(this.props.resource, this.state.selection);
  };

  toggleColumn = (columnName: any) => {
    const previousSelection = this.state.selection;
    const selection = {
      ...previousSelection,
      [columnName]: !previousSelection[columnName],
    };
    this.setState({selection}, this.updateStorage);
  };

  render() {
    const {children, defaultColumns, ...rest} = this.props;
    const {selection, modalOpened} = this.state;

    return (
      <div>
        <div style={{float: 'right', marginRight: '1rem'}}>
          <Button variant="outlined"
                  aria-label="add"
                  size="small"
                  onClick={(e: any) => this.handleOpen(e)}>
            <ColumnIcon/>
          </Button>
        </div>
        {/*{modalOpened && (*/}
        {/*  <SelectionDialog*/}
        {/*    selection={selection}*/}
        {/*    columns={this.getColumnLabels()}*/}
        {/*    onColumnClicked={this.toggleColumn}*/}
        {/*    onClose={this.handleClose}*/}
        {/*  />*/}
        {/*)}*/}
        <Datagrid {...rest}>{React.Children.map(children, this.renderChild)}</Datagrid>
      </div>
    );
  }

}

const arrayToSelection = (values: any[]) =>
  values.reduce((selection, columnName) => {
    selection[columnName] = true;
    return selection;
  }, {});

export default CustomizableDatagrid;
