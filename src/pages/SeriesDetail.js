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
import { deleteSeries, fetchSeries, updateSeries } from '../services/SeriesService';
import { deleteCollection, fetchCollections } from '../services/CollectionService';

const { Column, HeaderCell, Cell } = Table;
const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('This field is required.'),
});

const SeriesDetail = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [collections, setCollections] = useState([]);
  const [seriesFormValue, setSeriesFormValue] = useState({
    name: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchSeries(id);

        //TODO get artist name

        setSeriesFormValue(response.data);
        const response2 = await fetchCollections();
        setCollections(response2.data);
        setIsLoading(false);
      } catch (error) {
        showErrorNotification(`Failed to fetch data: ${error}`);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFormSubmit = async () => {
    try {
      const response = await updateSeries(id, seriesFormValue);
      if (response.ok) {
        showSuccessNotification('Data updated successfully');
      } else {
        showErrorNotification('Failed to update data');
      }
    } catch (error) {
      showErrorNotification(`Failed to update series: ${error}`);
    }
  };

  const handleCollectionRowClick = (rowData) => {
    navigate(`/collections/${rowData.id}`);
  };

  const handleAddCollectionClick = () => {
    navigate(`/create-collection`, { state: { series: id } });
  };

  const handleDeleteSeriesClick = async () => {
    try {
      const response = await deleteSeries(id);
      if (response.status === 200) {
        showSuccessNotification('Deleted successfully');
        navigate(`/series`);
      } else {
        showErrorNotification('Failed to delete');
      }
    } catch (error) {
      showErrorNotification(`Failed to delete series: ${error}`);
    }
  };

  const handleDeleteCollectionClick = async (deletedId) => {
    try {
      const response = await deleteCollection(deletedId);
      if (response.status === 200) {
        const newCollectionData = collections.filter((item) => item.id !== deletedId);
        setCollections(newCollectionData);
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
      <h2 className="spacing-20px">Update Series</h2>
      <div>
        <Form
          fluid
          model={model}
          formValue={seriesFormValue}
          onChange={setSeriesFormValue}
          onSubmit={handleFormSubmit}
          layout="horizontal"
          className="spacing-20px"
        >
          <Form.Group>
            <Form.ControlLabel>Name</Form.ControlLabel>
            <Form.Control name="name" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Artist</Form.ControlLabel>
            <Form.Control name="artist" />
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
                onClick={handleDeleteSeriesClick}
                appearance="primary"
                color="red"
                className="right-space"
              >
                Delete
              </Button>
            </Form.Group>
          </div>
        </Form>
        <h3 className="spacing-20px">Collections</h3>
        <div className="spacing-20px">
          <IconButton
            className="purple-button"
            appearance="primary"
            onClick={handleAddCollectionClick}
            icon={<PlusIcon className="purple-button" />}
          >
            Add
          </IconButton>
        </div>
        <Table
          data={collections}
          width={1500}
          rowKey="id"
          autoHeight
          affixHeader
          affixHorizontalScrollbar
          loading={isLoading}
          onRowClick={handleCollectionRowClick}
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
            <DeleteCell dataKey="id" onDelete={handleDeleteCollectionClick} />
          </Column>
        </Table>
      </div>
    </div>
  );
};

export default SeriesDetail;
