import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Schema, SelectPicker, Checkbox } from 'rsuite';
import { useParams } from 'react-router-dom';
import {
  showSuccessNotification,
  showErrorNotification,
} from '../utils/Toaster';
import { fetchSeries, fetchSeriesByArtist } from '../services/SeriesService';
import {
  fetchCollection,
  fetchCollectionsBySeries,
} from '../services/CollectionService';
import { fetchArtists } from '../services/ArtistService';
import { deleteItem, fetchItem, updateItem } from '../services/ItemService';

const { StringType, NumberType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('This field is required.'),
  artist: StringType().isRequired('This field is required.'),
  series: StringType().isRequired('This field is required.'),
  collection: StringType().isRequired('This field is required.'),
  officialPrice: NumberType().isRequired('This field is required.'),
});

const ItemDetail = () => {
  const { id } = useParams();
  const [artistData, setArtistData] = useState([]);
  const [seriesData, setSeriesData] = useState([]);
  const [collectionData, setCollectionData] = useState([]);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemResponse = await fetchItem(id);
        setItemFormValue(itemResponse.data);
        const artistResponse = await fetchArtists();
        setArtistData(
          artistResponse.data.map((artist) => ({
            label: artist.name,
            value: artist.id,
          }))
        );
        const collectionResponse = await fetchCollection(
          itemResponse.data.collection
        );
        const collectionListResponse = await fetchCollectionsBySeries(
          collectionResponse.data.series
        );
        setCollectionData(
          collectionListResponse.data.map((collection) => ({
            label: collection.name,
            value: collection.id,
          }))
        );
        const seriesResponse = await fetchSeries(
          collectionResponse.data.series
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
        setItemFormValue((prevValue) => ({
          ...prevValue,
          artist: seriesResponse.data.artist,
          series: collectionResponse.data.series,
          collection: itemResponse.data.collection,
        }));
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
      const response = await updateItem(id, itemFormValue);
      if (response.status === 200) {
        showSuccessNotification('Data updated successfully');
      } else {
        showErrorNotification('Failed to update data');
      }
    } catch (error) {
      showErrorNotification(`Failed to update item: ${error}`);
    }
  };

  const handleDeleteItemClick = async () => {
    try {
      const response = await deleteItem(id);
      if (response.status === 200) {
        showSuccessNotification('Deleted successfully');
        navigate(`/item`);
      } else {
        showErrorNotification('Failed to delete');
      }
    } catch (error) {
      showErrorNotification(`Failed to delete item: ${error}`);
    }
  };

  const handleCheckBoxClick = (value, checked) => {
    setItemFormValue((prevValue) => ({
      ...prevValue,
      isSecret: checked,
    }));
  };

  return (
    <div>
      <h2 className="spacing-20px">Item Data</h2>
      <div>
        <Form
          fluid
          model={model}
          formValue={itemFormValue}
          onChange={setItemFormValue}
          onSubmit={handleFormSubmit}
          layout="horizontal"
          className="spacing-20px"
        >
          <Form.Group>
            <Form.ControlLabel>Artist</Form.ControlLabel>
            <SelectPicker
              data={artistData}
              value={itemFormValue.artist}
              onChange={(value) =>
                setItemFormValue({
                  ...itemFormValue,
                  artist: value,
                })
              }
              style={{ width: 300 }}
              disabled
            />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Series</Form.ControlLabel>
            <SelectPicker
              data={seriesData}
              value={itemFormValue.series}
              onChange={(value) =>
                setItemFormValue({
                  ...itemFormValue,
                  series: value,
                })
              }
              style={{ width: 300 }}
              disabled
            />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Collection</Form.ControlLabel>
            <SelectPicker
              data={collectionData}
              value={itemFormValue.collection}
              onChange={(value) =>
                setItemFormValue({
                  ...itemFormValue,
                  collection: value,
                })
              }
              style={{ width: 300 }}
              disabled
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
                onClick={handleDeleteItemClick}
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

export default ItemDetail;
