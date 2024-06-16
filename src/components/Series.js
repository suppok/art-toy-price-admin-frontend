import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, IconButton } from 'rsuite';
import PlusIcon from '@rsuite/icons/legacy/Plus';
import DateCell from './DateCell';
import DeleteCell from './DeleteCell';
import {
  showSuccessNotification,
  showErrorNotification,
} from '../utils/Toaster';

const { Column, HeaderCell, Cell } = Table;

const Series = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/series');
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRowClick = (rowData) => {
    navigate(`/series/${rowData.id}`);
  };

  const handleCreateSeriesClick = () => {
    navigate(`/create-series`);
  };

  const handleDeleteSeriesClick = async (deletedId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/series/${deletedId}`
      );
      if (response.status == 200) {
        const newData = data.filter((item) => item.id !== deletedId);
        setData(newData);
        showSuccessNotification('Deleted successfully');
      } else {
        showErrorNotification('Failed to delete');
      }
    } catch (error) {
      showErrorNotification('Failed to delete');
    }
  };

  return (
    <div>
      <h2 className="spacing-20px">Series</h2>
      <div className="spacing-20px">
        <IconButton
          className="purple-button"
          appearance="primary"
          onClick={handleCreateSeriesClick}
          icon={<PlusIcon className="purple-button" />}
        >
          New
        </IconButton>
      </div>
      <div>
        <Table
          data={data}
          width={2000}
          rowKey="id"
          autoHeight
          affixHeader
          affixHorizontalScrollbar
          loading={isLoading}
          onRowClick={handleRowClick}
          rowClassName="clickable-row"
        >
          <Column width={300}>
            <HeaderCell>ID</HeaderCell>
            <Cell dataKey="id" />
          </Column>
          <Column width={500}>
            <HeaderCell>Name</HeaderCell>
            <Cell dataKey="name" />
          </Column>
          <Column width={400}>
            <HeaderCell>Artist</HeaderCell>
            <Cell dataKey="artist" />
          </Column>
          <Column width={300}>
            <HeaderCell>Create At</HeaderCell>
            <DateCell dataKey="createAt" />
          </Column>
          <Column width={500}>
            <HeaderCell>Actions</HeaderCell>
            <DeleteCell dataKey="id" onDelete={handleDeleteSeriesClick} />
          </Column>
        </Table>
      </div>
    </div>
  );
};

export default Series;
