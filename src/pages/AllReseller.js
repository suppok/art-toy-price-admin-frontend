import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, IconButton } from 'rsuite';
import PlusIcon from '@rsuite/icons/legacy/Plus';
import DateCell from '../components/DateCell';
import DeleteCell from '../components/DeleteCell';
import {
  showSuccessNotification,
  showErrorNotification,
} from '../utils/Toaster';
import { deleteReseller, fetchResellers } from '../services/ResellerService';

const { Column, HeaderCell, Cell } = Table;

const AllReseller = () => {
  const [resellerData, setResellerData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchResellers();
        setResellerData(response.data);
        setIsLoading(false);
      } catch (error) {
        showErrorNotification(`Error fetching reseller data: ${error}`);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleResellerRowClick = (rowData) => {
    navigate(`/reseller/${rowData.id}`);
  };

  const handleCreateResellerClick = () => {
    navigate(`/create-reseller`);
  };

  const handleDeleteResellerClick = async (deletedId) => {
    try {
      const response = await deleteReseller(deletedId);
      if (response.status === 200) {
        const newResellerData = resellerData.filter(
          (item) => item.id !== deletedId
        );
        setResellerData(newResellerData);
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
      <h2 className="spacing-20px">Resellers</h2>
      <div className="spacing-20px">
        <IconButton
          className="purple-button"
          appearance="primary"
          onClick={handleCreateResellerClick}
          icon={<PlusIcon className="purple-button" />}
        >
          New
        </IconButton>
      </div>
      <div>
        <Table
          data={resellerData}
          width={2000}
          rowKey="id"
          autoHeight
          affixHeader
          affixHorizontalScrollbar
          loading={isLoading}
          onRowClick={handleResellerRowClick}
          rowClassName="clickable-row"
        >
          <Column width={500}>
            <HeaderCell>ID</HeaderCell>
            <Cell dataKey="id" />
          </Column>
          <Column width={500}>
            <HeaderCell>Name</HeaderCell>
            <Cell dataKey="name" />
          </Column>
          <Column width={500}>
            <HeaderCell>Create At</HeaderCell>
            <DateCell dataKey="createAt" />
          </Column>
          <Column width={500}>
            <HeaderCell>Actions</HeaderCell>
            <DeleteCell dataKey="id" onDelete={handleDeleteResellerClick} />
          </Column>
        </Table>
      </div>
    </div>
  );
};

export default AllReseller;
