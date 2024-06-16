import React from 'react';
import { Cell } from 'rsuite-table';
import { Button } from 'rsuite';

const DeleteCell = ({ rowData, onDelete, dataKey, ...props }) => {
  const handleDelete = (event) => {
    event.stopPropagation();
    onDelete(rowData[dataKey]);
  };

  return (
    <Cell {...props} style={{ display: 'flex', alignItems: 'center' }}>
      <Button onClick={handleDelete} appearance="primary" size="sm" color="red">
        Delete
      </Button>
    </Cell>
  );
};

export default DeleteCell;
