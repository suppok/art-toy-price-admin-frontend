import React from 'react';
import { Cell } from 'rsuite-table';
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';

const BooleanCell = ({ rowData, dataKey, ...props }) => {
  const iconStyle = { fontSize: '24px' };
  return (
    <Cell {...props}>
      {rowData[dataKey] ? (
        <CheckIcon style={iconStyle} color="green" />
      ) : (
        <CloseIcon style={iconStyle} color="red" />
      )}
    </Cell>
  );
};

export default BooleanCell;
