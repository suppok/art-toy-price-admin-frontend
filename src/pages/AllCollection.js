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
import { deleteCollection, fetchCollections } from '../services/CollectionService';
import { fetchSeriesNames } from '../services/SeriesService';

const { Column, HeaderCell, Cell } = Table;

const AllCollection = () => {
  const [collectionData, setCollectionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCollections();
        const params = new URLSearchParams();
        const seriesIdList = response.data.map((collection) => collection.series);
        seriesIdList.forEach((uuid) => params.append('uuids', uuid));
        const seriesNameResponse = await fetchSeriesNames(params);
        const collectionList = response.data;
        for (let i = 0; i < collectionList.length; i++) {
          collectionList[i].series = seriesNameResponse.data[i].name;
        }
        setCollectionData(collectionList);
        setIsLoading(false);
      } catch (error) {
        showErrorNotification(`Error fetching collections: ${error}`);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCollectionRowClick = (rowData) => {
    navigate(`/collection/${rowData.id}`);
  };

  const handleCreateCollectionClick = () => {
    navigate(`/create-collection`);
  };

  const handleDeleteCollectionClick = async (deletedId) => {
    try {
      const response = await deleteCollection(deletedId);
      if (response.status === 200) {
        const newData = collectionData.filter((item) => item.id !== deletedId);
        setCollectionData(newData);
        showSuccessNotification('Deleted successfully');
      } else {
        showErrorNotification('Failed to delete');
      }
    } catch (error) {
      showErrorNotification(`Failed to delete: ${error}`);
    }
  };

  return (
    <div>
      <h2 className="spacing-20px">Collections</h2>
      <div className="spacing-20px">
        <IconButton
          className="purple-button"
          appearance="primary"
          onClick={handleCreateCollectionClick}
          icon={<PlusIcon className="purple-button" />}
        >
          New
        </IconButton>
      </div>
      <div>
        <Table
          data={collectionData}
          width={2000}
          rowKey="id"
          autoHeight
          affixHeader
          affixHorizontalScrollbar
          loading={isLoading}
          onRowClick={handleCollectionRowClick}
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
            <HeaderCell>Series</HeaderCell>
            <Cell dataKey="series" />
          </Column>
          <Column width={300}>
            <HeaderCell>Create At</HeaderCell>
            <DateCell dataKey="createAt" />
          </Column>
          <Column width={500}>
            <HeaderCell>Actions</HeaderCell>
            <DeleteCell dataKey="id" onDelete={handleDeleteCollectionClick} />
          </Column>
        </Table>
      </div>
    </div>
  );
};

export default AllCollection;
