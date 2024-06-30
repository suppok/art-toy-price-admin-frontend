import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Schema } from 'rsuite';
import { useParams } from 'react-router-dom';
import {
  showSuccessNotification,
  showErrorNotification,
} from '../utils/Toaster';
import {
  deleteReseller,
  fetchReseller,
  updateReseller,
} from '../services/ResellerService';

const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('This field is required.'),
});

const ResellerDetail = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [resellerFormValue, setResellerFormValue] = useState({
    name: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resellerResponse = await fetchReseller(id);
        setResellerFormValue(resellerResponse.data);
        setIsLoading(false);
      } catch (error) {
        showErrorNotification(`Failed to fetch reseller: ${error}`);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFormSubmit = async () => {
    try {
      const response = await updateReseller(id, resellerFormValue);
      if (response.status === 200) {
        showSuccessNotification('Data updated successfully');
      } else {
        showErrorNotification('Failed to update data');
      }
    } catch (error) {
      showErrorNotification(`Failed to update data: ${error}`);
    }
  };

  const handleDeleteResellerClick = async () => {
    try {
      const response = await deleteReseller(id);
      if (response.status === 200) {
        showSuccessNotification('Deleted successfully');
        navigate(`/reseller`);
      } else {
        showErrorNotification('Failed to delete');
      }
    } catch (error) {
      showErrorNotification(`Failed to delete: ${error}`);
    }
  };

  return (
    <div>
      <h2 className="spacing-20px">Reseller Data</h2>
      <div>
        <Form
          fluid
          model={model}
          formValue={resellerFormValue}
          onChange={setResellerFormValue}
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
                onClick={handleDeleteResellerClick}
                appearance="primary"
                color="red"
                className="right-space"
              >
                Delete
              </Button>
            </Form.Group>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ResellerDetail;
