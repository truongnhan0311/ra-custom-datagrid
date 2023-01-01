import * as React from 'react';
import { memo, FC, ElementType } from 'react';
import get from 'lodash/get';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import { useRecordContext } from 'ra-core';

import sanitizeFieldRestProps from 'ra-ui-materialui/lib/field/sanitizeFieldRestProps';
import { PublicFieldProps, InjectedFieldProps, fieldPropTypes } from 'ra-ui-materialui/lib/field/types';

const EditTextField: FC<EditTextField> = memo(props => {
    const { className, source, emptyText, ...rest } = props;
    const record = useRecordContext(props);
    const value = get(record, source);

    return (
        <Typography
            component="span"
            variant="body2"
            className={className}
            {...sanitizeFieldRestProps(rest)}
        >
            {value != null && typeof value !== 'string'
                ? JSON.stringify(value)
                : value || emptyText}
        </Typography>
    );
});

EditTextField.displayName = 'EditTextField';

EditTextField.defaultProps = {
    addLabel: true,
};

EditTextField.propTypes = {
    // @ts-ignore
    ...Typography.propTypes,
    ...fieldPropTypes,
};

export interface EditTextField
    extends PublicFieldProps,
        InjectedFieldProps,
        TypographyProps {
    component?: ElementType<any>;
}

export default EditTextField;
