import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Schema, SelectPicker } from 'rsuite';
import {
  showSuccessNotification,
  showErrorNotification,
} from '../utils/Toaster';
import { createSeries } from '../services/SeriesService';
import { fetchArtists } from '../services/ArtistService';

const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('This field is required.'),
  artist: StringType().isRequired('This field is required.'),
});

const CreateSeries = () => {
  const [artistData, setArtistData] = useState([]);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [seriesFormValue, setSeriesFormValue] = useState({
    name: '',
    artist: '',
  });
  const navigate = useNavigate();
  const handleFormSubmit = async () => {
    if (isLoading) {
      return;
    }
    try {
      const response = await createSeries(seriesFormValue);
      if (response.ok) {
        showSuccessNotification('Created successfully');
        navigate(`/artist/${seriesFormValue.artist}`);
      } else {
        showErrorNotification('Failed to create');
      }
    } catch (error) {
      showErrorNotification(`Failed to create: ${error}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchArtists();
        setArtistData(
          response.data.map((artist) => ({
            label: artist.name,
            value: artist.id,
          }))
        );
        const initialArtistId = location.state?.artistId || '';
        setSeriesFormValue((prevValue) => ({
          ...prevValue,
          artist: initialArtistId,
        }));
        setIsLoading(false);
      } catch (error) {
        showErrorNotification(`Error fetching artist data: ${error}`);
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
          formValue={seriesFormValue}
          onChange={setSeriesFormValue}
          onSubmit={handleFormSubmit}
          layout="horizontal"
          className="spacing-20px"
        >
          <Form.Group>
            <Form.ControlLabel>Artist</Form.ControlLabel>
            <SelectPicker
              data={artistData}
              searchable={true}
              value={seriesFormValue.artist}
              onChange={(value) =>
                setSeriesFormValue({ ...seriesFormValue, artist: value })
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

export default CreateSeries;
