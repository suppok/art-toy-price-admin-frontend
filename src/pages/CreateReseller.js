import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Schema } from 'rsuite';
import {
  showSuccessNotification,
  showErrorNotification,
} from '../utils/Toaster';
import { createReseller } from '../services/ResellerService';

const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('This field is required.'),
});

const CreateReseller = () => {
  const [formValue, setFormValue] = useState({
    name: '',
  });
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const response = await createReseller(formValue);
      if (response.status === 200) {
        showSuccessNotification('Created successfully');
        navigate(`/reseller`);
      } else {
        showErrorNotification('Failed to create');
      }
    } catch (error) {
      showErrorNotification(`Failed to create: ${error}`);
    }
  };

  return (
    <div>
      <h2 className="spacing-20px">Create Reseller</h2>
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
            <Button
              appearance="primary"
              type="submit"
              className="purple-button"
            >
              Create
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default CreateReseller;
