import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Schema, SelectPicker } from 'rsuite';
import {
  showSuccessNotification,
  showErrorNotification,
} from '../utils/Toaster';
import { fetchSeries, fetchSeriesByArtist } from '../services/SeriesService';
import { fetchArtists } from '../services/ArtistService';
import { createCollection } from '../services/CollectionService';

const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('This field is required.'),
  artist: StringType().isRequired('This field is required.'),
  series: StringType().isRequired('This field is required.'),
});

const CreateCollection = () => {
  const [artistData, setArtistData] = useState([]);
  const [seriesData, setSeriesData] = useState([]);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [collectionFormValue, setCollectionFormValue] = useState({
    name: '',
    artist: '',
    series: '',
  });
  const navigate = useNavigate();

  const handleChange = (value) => {
    setCollectionFormValue(value);
  };

  const selectArtistSelectPicker = async (artistId) => {
    const seriesResponse = await fetchSeriesByArtist(artistId);
    setSeriesData(
      seriesResponse.data.map((series) => ({
        label: series.name,
        value: series.id,
      }))
    );
    setCollectionFormValue((prevValue) => ({
      ...prevValue,
      artist: artistId,
      series: '',
    }));
  };

  const selectSeriesSelectPicker = async (seriesId) => {
    setCollectionFormValue((prevValue) => ({
      ...prevValue,
      series: seriesId,
    }));
  };

  const handleFormSubmit = async () => {
    if (isLoading) {
      return;
    }
    try {
      const response = await createCollection(collectionFormValue);
      if (response.status === 200) {
        showSuccessNotification('Created successfully');
        navigate(`/series/${collectionFormValue.series}`);
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
        const initialSeriesId = location.state?.seriesId || '';
        if (initialSeriesId === '') {
          const artistResponse = await fetchArtists();
          setArtistData(
            artistResponse.data.map((artist) => ({
              label: artist.name,
              value: artist.id,
            }))
          );
        } else {
          const currentSeriesResponse = await fetchSeries(initialSeriesId);
          const artistResponse = await fetchArtists();
          setArtistData(
            artistResponse.data.map((artist) => ({
              label: artist.name,
              value: artist.id,
            }))
          );
          const seriesResponse = await fetchSeriesByArtist(
            currentSeriesResponse.data.artist
          );
          setSeriesData(
            seriesResponse.data.map((series) => ({
              label: series.name,
              value: series.id,
            }))
          );
          setCollectionFormValue((prevValue) => ({
            ...prevValue,
            artist: currentSeriesResponse.data.artist,
            series: initialSeriesId,
          }));
        }
        setIsLoading(false);
      } catch (error) {
        showErrorNotification(`Error fetching data: ${error}`);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="spacing-20px">Create Collection</h2>
      <div>
        <Form
          fluid
          model={model}
          formValue={collectionFormValue}
          onChange={handleChange}
          onSubmit={handleFormSubmit}
          layout="horizontal"
          className="spacing-20px"
        >
          <Form.Group>
            <Form.ControlLabel>Artist</Form.ControlLabel>
            <SelectPicker
              name="artistSelectPicker"
              data={artistData}
              searchable={true}
              value={collectionFormValue.artist}
              onChange={(value) => selectArtistSelectPicker(value)}
              style={{ width: 300 }}
            />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Series</Form.ControlLabel>
            <SelectPicker
              name="seriesSelectPicker"
              data={seriesData}
              searchable={true}
              value={collectionFormValue.series}
              onChange={(value) => selectSeriesSelectPicker(value)}
              style={{ width: 300 }}
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

export default CreateCollection;
