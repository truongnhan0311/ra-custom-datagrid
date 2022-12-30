import React, {Component, PropsWithChildren} from 'react';
import T from 'prop-types';

import {FieldTitle} from 'react-admin';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import IconClose from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import LocalStorage from "./LocalStorage";

interface Props extends PropsWithChildren<any> {
  columns: [
    {
      label: any
      source: any
    }
  ],
  selection: any,
}

/**
 *
 */
class SelectionDialog extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }

  public static defaultProps = {
    columns: [],
  };


  // @ts-ignore
  onColumnClicked = ({target: {value: columnName}}) => {
    this.props.onColumnClicked(columnName);
  };

  render() {
    const {columns, selection, onClose, resource} = this.props;

    // @ts-ignore
    return (
      <Dialog maxWidth="xs" aria-labelledby="ra-columns-dialog-title" onClose={onClose} open>
        <DialogTitle id="ra-columns-dialog-title">Configuration</DialogTitle>
        <DialogContent>
          <FormGroup>
            {columns.map(({source, label}) => (
              <FormControlLabel
                key={source}
                control={
                  <Checkbox
                    checked={!!selection[source]}
                    onChange={this.onColumnClicked}
                    value={source}
                  />
                }
                label={<FieldTitle label={label} source={source} resource={resource}/>}
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color="primary">
            <IconClose/>
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

}

export default SelectionDialog;
