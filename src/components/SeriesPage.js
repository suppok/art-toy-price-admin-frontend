import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Schema, Table, IconButton } from 'rsuite';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PlusIcon from '@rsuite/icons/legacy/Plus';
import {
  showSuccessNotification,
  showErrorNotification,
} from '../utils/Toaster';
import DateCell from './DateCell';
import DeleteCell from './DeleteCell';

const { Column, HeaderCell, Cell } = Table;
const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('This field is required.'),
});

const SeriesPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [collections, setCollections] = useState([]);
  const [formValue, setFormValue] = useState({
    name: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/series/${id}`
        );
        setFormValue(response.data);
        const response2 = await axios.get(
          `http://localhost:8080/api/v1/series/${id}/collections`
        );

        //TODO get artist name

        setCollections(response2.data);
        setIsLoading(false);
      } catch (error) {
        showErrorNotification('Failed to fetch data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    // Handle form submission to update data
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/series/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValue),
        }
      );
      if (response.ok) {
        showSuccessNotification('Data updated successfully');
      } else {
        showErrorNotification('Failed to update data');
      }
    } catch (error) {
      showErrorNotification('Failed to update data');
    }
  };

  const handleRowClick = (rowData) => {
    navigate(`/collections/${rowData.id}`);
  };

  const handleAddCollectionClick = () => {
    navigate(`/create-collection`, { state: { series: id } });
  };

  const handleDeleteSeriesClick = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/series/${id}`
      );
      if (response.status == 200) {
        showSuccessNotification('Deleted successfully');
        navigate(`/series`);
      } else {
        showErrorNotification('Failed to delete');
      }
    } catch (error) {
      showErrorNotification('Failed to delete');
    }
  };

  const handleDeleteCollectionClick = async (deletedId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/collections/${deletedId}`
      );
      if (response.status == 200) {
        const newCollectionData = collections.filter((item) => item.id !== deletedId);
        setCollections(newCollectionData);
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
      <h2 className="spacing-20px">Update Series</h2>
      <div>
        <Form
          fluid
          model={model}
          formValue={formValue}
          onChange={setFormValue}
          onSubmit={handleSubmit}
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
          onRowClick={handleRowClick}
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

export default SeriesPage;
