import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Schema, SelectPicker } from 'rsuite';
import {
  showSuccessNotification,
  showErrorNotification,
} from '../utils/Toaster';

const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('This field is required.'),
  artist: StringType().isRequired('This field is required.'),
});

const CreateSeriesPage = () => {
  const [artistData, setData] = useState([]);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [formValue, setFormValue] = useState({
    name: '',
    artist: '',
  });
  const navigate = useNavigate();
  const handleSubmit = async () => {
    // Handle form submission to update data
    try {
      const response = await fetch(`http://localhost:8080/api/v1/series`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValue),
      });
      if (response.ok) {
        showSuccessNotification('Created successfully');
        navigate(`/artist/${formValue.artist}`);
      } else {
        showErrorNotification('Failed to create');
      }
    } catch (error) {
      showErrorNotification('Failed to create');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/v1/artists'
        );
        setData(
          response.data.map((artist) => ({
            label: artist.name,
            value: artist.id,
          }))
        );
        const initialArtistId = location.state?.artistId || '';
        setFormValue((prevValue) => ({
          ...prevValue,
          artist: initialArtistId,
        }));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="spacing-20px">Create Series</h2>
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
            <Form.ControlLabel>Artist</Form.ControlLabel>
            <SelectPicker
              data={artistData}
              searchable={true}
              value={formValue.artist}
              onChange={(value) =>
                setFormValue({ ...formValue, artist: value })
              }
              style={{ width: 300 }}
              multiple
            />
          </Form.Group>
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

export default CreateSeriesPage;
