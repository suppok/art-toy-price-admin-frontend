import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Schema } from 'rsuite';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table } from 'rsuite';
import {
  showSuccessNotification,
  showErrorNotification,
} from '../utils/Toaster';
import DateCell from './DateCell';

const { Column, HeaderCell, Cell } = Table;
const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('This field is required.'),
});

const ArtistPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [series, setSeries] = useState([]);
  const [formValue, setFormValue] = useState({
    name: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/artists/${id}`
        );
        setFormValue(response.data);
        const response2 = await axios.get(
          `http://localhost:8080/api/v1/artists/${id}/series`
        );
        setSeries(response2.data);
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
        `http://localhost:8080/api/v1/artists/${id}`,
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
    navigate(`/series/${rowData.id}`);
  };

  const handleDeleteArtistClick = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/artists/${id}`
      );
      if (response.status == 200) {
        showSuccessNotification('Deleted successfully');
        navigate(`/artist`);
      } else {
        showErrorNotification('Failed to delete');
      }
    } catch (error) {
      showErrorNotification('Failed to delete');
    }
  };

  return (
    <div>
      <h2 className="spacing-20px">Edit Artist</h2>
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
        <Table
          data={series}
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
            <Cell />
          </Column>
        </Table>
      </div>
    </div>
  );
};

export default ArtistPage;
