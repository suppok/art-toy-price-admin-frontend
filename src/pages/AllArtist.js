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
import { fetchArtists, deleteArtist } from '../services/ArtistService';

const { Column, HeaderCell, Cell } = Table;

const AllArtist = () => {
  const [artistData, setArtistData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchArtists();
        setArtistData(response.data);
        setIsLoading(false);
      } catch (error) {
        showErrorNotification(`Error fetching artist data: ${error}`);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleArtistRowClick = (rowData) => {
    navigate(`/artist/${rowData.id}`);
  };

  const handleCreateArtistClick = () => {
    navigate(`/create-artist`);
  };

  const handleDeleteArtistClick = async (deletedId) => {
    try {
      const response = await deleteArtist(deletedId);
      if (response.status === 200) {
        const newArtistData = artistData.filter((item) => item.id !== deletedId);
        setArtistData(newArtistData);
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
      <h2 className="spacing-20px">Artists</h2>
      <div className="spacing-20px">
        <IconButton
          className="purple-button"
          appearance="primary"
          onClick={handleCreateArtistClick}
          icon={<PlusIcon className="purple-button" />}
        >
          New
        </IconButton>
      </div>
      <div>
        <Table
          data={artistData}
          width={2000}
          rowKey="id"
          autoHeight
          affixHeader
          affixHorizontalScrollbar
          loading={isLoading}
          onRowClick={handleArtistRowClick}
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
            <DeleteCell dataKey="id" onDelete={handleDeleteArtistClick} />
          </Column>
        </Table>
      </div>
    </div>
  );
};

export default AllArtist;
