import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Schema } from 'rsuite';
import {
  showSuccessNotification,
  showErrorNotification,
} from '../utils/Toaster';

const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('This field is required.'),
});

const CreateArtistPage = () => {
  const [formValue, setFormValue] = useState({
    name: '',
  });
  const navigate = useNavigate();
  const handleSubmit = async () => {
    // Handle form submission to update data
    try {
      const response = await fetch(`http://localhost:8080/api/v1/artists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValue),
      });
      if (response.ok) {
        showSuccessNotification('Created successfully');
        navigate(`/artist`);
      } else {
        showErrorNotification('Failed to create');
      }
    } catch (error) {
      showErrorNotification('Failed to create');
    }
  };

  return (
    <div>
      <h2 className="spacing-20px">Create Artist</h2>
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
            <Button appearance="primary" type="submit">
              Create
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default CreateArtistPage;
