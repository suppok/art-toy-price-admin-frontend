import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Schema, Table, IconButton } from 'rsuite';
import { useParams } from 'react-router-dom';
import PlusIcon from '@rsuite/icons/legacy/Plus';
import {
  showSuccessNotification,
  showErrorNotification,
} from '../utils/Toaster';
import DateCell from '../components/DateCell';
import DeleteCell from '../components/DeleteCell';
import { fetchArtist, updateArtist, deleteArtist } from '../services/ArtistService';
import { deleteSeries, fetchSeriesByArtist } from '../services/SeriesService';

const { Column, HeaderCell, Cell } = Table;
const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('This field is required.'),
});

const ArtistDetail = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [series, setSeries] = useState([]);
  const [artistFormValue, setArtistFormValue] = useState({
    name: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artistResponse = await fetchArtist(id);
        setArtistFormValue(artistResponse.data);
        const seriesResponse = await fetchSeriesByArtist(id);
        setSeries(seriesResponse.data);
        setIsLoading(false);
      } catch (error) {
        showErrorNotification(`Failed to fetch artist: ${error}`);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFormSubmit = async () => {
    try {
      const response = await updateArtist(id, artistFormValue);
      if (response.ok) {
        showSuccessNotification('Data updated successfully');
      } else {
        showErrorNotification('Failed to update data');
      }
    } catch (error) {
      showErrorNotification(`Failed to update data: ${error}`);
    }
  };

  const handleSeriesRowClick = (rowData) => {
    navigate(`/series/${rowData.id}`);
  };

  const handleAddSeriesClick = () => {
    navigate(`/create-series`, { state: { artistId: id } });
  };

  const handleDeleteArtistClick = async () => {
    try {
      const response = await deleteArtist(id);
      if (response.status === 200) {
        showSuccessNotification('Deleted successfully');
        navigate(`/artist`);
      } else {
        showErrorNotification('Failed to delete');
      }
    } catch (error) {
      showErrorNotification(`Failed to delete: ${error}`);
    }
  };

  const handleDeleteSeriesClick = async (deletedId) => {
    try {
      const response = await deleteSeries(deletedId);
      if (response.status === 200) {
        const newSeriesData = series.filter((item) => item.id !== deletedId);
        setSeries(newSeriesData);
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
      <h2 className="spacing-20px">Update Artist</h2>
      <div>
        <Form
          fluid
          model={model}
          formValue={artistFormValue}
          onChange={setArtistFormValue}
          onSubmit={handleFormSubmit}
          layout="horizontal"
          className="spacing-20px"
        >
          <Form.Group>
            <Form.ControlLabel>Name</Form.ControlLabel>
            <Form.Control name="name" />
          </Form.Group>
          <div class="row">
            <Form.Group>
              <Button
                appearance="primary"
                type="submit"
                className="right-space purple-button"
              >
                Update
              </Button>
              <Button
                onClick={handleDeleteArtistClick}
                appearance="primary"
                color="red"
                className="right-space"
              >
                Delete
              </Button>
            </Form.Group>
          </div>
        </Form>
        <h3 className="spacing-20px">Series</h3>
        <div className="spacing-20px">
          <IconButton
            className="purple-button"
            appearance="primary"
            onClick={handleAddSeriesClick}
            icon={<PlusIcon className="purple-button" />}
          >
            Add
          </IconButton>
        </div>
        <Table
          data={series}
          width={1500}
          rowKey="id"
          autoHeight
          affixHeader
          affixHorizontalScrollbar
          loading={isLoading}
          onRowClick={handleSeriesRowClick}
          rowClassName="clickable-row"
          className="spacing-20px"
        >
          <Column width={300}>
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
          <Column width={200}>
            <HeaderCell>Actions</HeaderCell>
            <DeleteCell dataKey="id" onDelete={handleDeleteSeriesClick} />
          </Column>
        </Table>
      </div>
    </div>
  );
};

export default ArtistDetail;
