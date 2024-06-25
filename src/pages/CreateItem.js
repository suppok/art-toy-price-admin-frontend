import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Schema, SelectPicker, Checkbox } from 'rsuite';
import {
  showSuccessNotification,
  showErrorNotification,
} from '../utils/Toaster';
import { fetchSeries, fetchSeriesByArtist } from '../services/SeriesService';
import { fetchArtists } from '../services/ArtistService';
import {
  fetchCollection,
  fetchCollectionsBySeries,
} from '../services/CollectionService';
import { createItem } from '../services/ItemService';

const { StringType, NumberType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('This field is required.'),
  artist: StringType().isRequired('This field is required.'),
  series: StringType().isRequired('This field is required.'),
  collection: StringType().isRequired('This field is required.'),
  officialPrice: NumberType().isRequired('This field is required.'),
});

const CreateItem = () => {
  const [artistData, setArtistData] = useState([]);
  const [seriesData, setSeriesData] = useState([]);
  const [collectionData, setCollectionData] = useState([]);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [itemFormValue, setItemFormValue] = useState({
    name: '',
    artist: '',
    series: '',
    collection: '',
    officialPrice: '',
    isSecret: false,
  });
  const navigate = useNavigate();

  const handleChange = (value) => {
    setItemFormValue(value);
  };

  const selectArtistSelectPicker = async (artistId) => {
    const seriesResponse = await fetchSeriesByArtist(artistId);
    setSeriesData(
      seriesResponse.data.map((series) => ({
        label: series.name,
        value: series.id,
      }))
    );
    setCollectionData([]);
    setItemFormValue((prevValue) => ({
      ...prevValue,
      artist: artistId,
      series: '',
      collection: '',
    }));
  };

  const selectSeriesSelectPicker = async (seriesId) => {
    const collectionResponse = await fetchCollectionsBySeries(seriesId);
    setCollectionData(
      collectionResponse.data.map((collection) => ({
        label: collection.name,
        value: collection.id,
      }))
    );
    setItemFormValue((prevValue) => ({
      ...prevValue,
      series: seriesId,
      collection: '',
    }));
  };

  const selectCollectionSelectPicker = async (collectionId) => {
    setItemFormValue((prevValue) => ({
      ...prevValue,
      collection: collectionId,
    }));
  };

  const handleCheckBoxClick = (value, checked) => {
    setItemFormValue((prevValue) => ({
      ...prevValue,
      isSecret: checked,
    }));
  };

  const handleFormSubmit = async () => {
    if (isLoading) {
      return;
    }
    try {
      const response = await createItem(itemFormValue);
      if (response.status === 200) {
        showSuccessNotification('Created successfully');
        navigate(`/collection/${itemFormValue.collection}`);
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
        const initialCollectionId = location.state?.collectionId || '';
        if (initialCollectionId === '') {
          const artistResponse = await fetchArtists();
          setArtistData(
            artistResponse.data.map((artist) => ({
              label: artist.name,
              value: artist.id,
            }))
          );
        } else {
          const currentCollectionResponse = await fetchCollection(
            initialCollectionId
          );
          const seriesResponse = await fetchSeries(
            currentCollectionResponse.data.series
          );
          const artistResponse = await fetchArtists();
          setArtistData(
            artistResponse.data.map((artist) => ({
              label: artist.name,
              value: artist.id,
            }))
          );
          const seriesListResponse = await fetchSeriesByArtist(
            seriesResponse.data.artist
          );
          setSeriesData(
            seriesListResponse.data.map((series) => ({
              label: series.name,
              value: series.id,
            }))
          );
          const collectionsResponse = await fetchCollectionsBySeries(
            currentCollectionResponse.data.series
          );
          setCollectionData(
            collectionsResponse.data.map((collection) => ({
              label: collection.name,
              value: collection.id,
            }))
          );
          setItemFormValue((prevValue) => ({
            ...prevValue,
            artist: seriesResponse.data.artist,
            series: currentCollectionResponse.data.series,
            collection: initialCollectionId,
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
      <h2 className="spacing-20px">Create Item</h2>
      <div>
        <Form
          fluid
          model={model}
          formValue={itemFormValue}
          onChange={handleChange}
          onSubmit={handleFormSubmit}
          layout="horizontal"
          className="spacing-20px"
        >
          <Form.Group>
            <Form.ControlLabel>Artist</Form.ControlLabel>
            <SelectPicker
              data={artistData}
              searchable={true}
              value={itemFormValue.artist}
              onChange={(value) => selectArtistSelectPicker(value)}
              style={{ width: 300 }}
            />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Series</Form.ControlLabel>
            <SelectPicker
              data={seriesData}
              searchable={true}
              value={itemFormValue.series}
              onChange={(value) => selectSeriesSelectPicker(value)}
              style={{ width: 300 }}
            />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Collection</Form.ControlLabel>
            <SelectPicker
              data={collectionData}
              searchable={true}
              value={itemFormValue.collection}
              onChange={(value) => selectCollectionSelectPicker(value)}
              style={{ width: 300 }}
            />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Name</Form.ControlLabel>
            <Form.Control name="name" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Price</Form.ControlLabel>
            <Form.Control name="officialPrice" />
          </Form.Group>
          <Form.Group>
            <Checkbox
              name="isSecret"
              checked={itemFormValue.isSecret}
              onChange={handleCheckBoxClick}
            >
              Is Secret
            </Checkbox>
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

export default CreateItem;
