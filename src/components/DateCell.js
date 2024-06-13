import React from 'react';
import { Cell } from 'rsuite-table';

const DateCell = ({ rowData, dataKey, ...props }) => {
  const date = new Date(rowData[dataKey]);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: 3,
    hour12: true,
  };
  const readableDate = date.toLocaleString('en-US', options);

  return <Cell {...props}>{readableDate}</Cell>;
};

export default DateCell;
