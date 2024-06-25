import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Button,
  Schema,
  Table,
  IconButton,
  SelectPicker,
  Checkbox,
} from 'rsuite';
import { useParams } from 'react-router-dom';
import PlusIcon from '@rsuite/icons/legacy/Plus';
import {
  showSuccessNotification,
  showErrorNotification,
} from '../utils/Toaster';
import DateCell from '../components/DateCell';
import DeleteCell from '../components/DeleteCell';
import { fetchSeries, fetchSeriesByArtist } from '../services/SeriesService';
import {
  deleteCollection,
  fetchCollection,
  updateCollection,
} from '../services/CollectionService';
import { fetchArtists } from '../services/ArtistService';
import { deleteItem, fetchItemsByCollection } from '../services/ItemService';

const { Column, HeaderCell, Cell } = Table;
const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('This field is required.'),
  artist: StringType().isRequired('This field is required.'),
  series: StringType().isRequired('This field is required.'),
});

const CollectionDetail = () => {
  const { id } = useParams();
  const [artistData, setArtistData] = useState([]);
  const [seriesData, setSeriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [collectionFormValue, setCollectionFormValue] = useState({
    name: '',
    artist: '',
    series: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionResponse = await fetchCollection(id);
        setCollectionFormValue(collectionResponse.data);
        const artistResponse = await fetchArtists();
        setArtistData(
          artistResponse.data.map((artist) => ({
            label: artist.name,
            value: artist.id,
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
        setCollectionFormValue((prevValue) => ({
          ...prevValue,
          artist: seriesResponse.data.artist,
          series: collectionResponse.data.series,
        }));
        const itemResponse = await fetchItemsByCollection(id);
        setItems(itemResponse.data);
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
      const response = await updateCollection(id, collectionFormValue);
      if (response.status === 200) {
        showSuccessNotification('Data updated successfully');
      } else {
        showErrorNotification('Failed to update data');
      }
    } catch (error) {
      showErrorNotification(`Failed to update collection: ${error}`);
    }
  };

  const handleItemRowClick = (rowData) => {
    navigate(`/item/${rowData.id}`);
  };

  const handleAddItemClick = () => {
    navigate(`/create-item`, { state: { collectionId: id } });
  };

  const handleDeleteCollectionClick = async () => {
    try {
      const response = await deleteCollection(id);
      if (response.status === 200) {
        showSuccessNotification('Deleted successfully');
        navigate(`/collection`);
      } else {
        showErrorNotification('Failed to delete');
      }
    } catch (error) {
      showErrorNotification(`Failed to delete collection: ${error}`);
    }
  };

  const handleDeleteItemClick = async (deletedId) => {
    try {
      const response = await deleteItem(deletedId);
      if (response.status === 200) {
        const newItemData = items.filter((item) => item.id !== deletedId);
        setItems(newItemData);
        showSuccessNotification('Deleted successfully');
      } else {
        showErrorNotification('Failed to delete');
      }
    } catch (error) {
      showErrorNotification(`Failed to delete: ${error}`);
    }
  };

  return (
    <div>
      <h2 className="spacing-20px">Collection Data</h2>
      <div>
        <Form
          fluid
          model={model}
          formValue={collectionFormValue}
          onChange={setCollectionFormValue}
          onSubmit={handleFormSubmit}
          layout="horizontal"
          className="spacing-20px"
        >
          <Form.Group>
            <Form.ControlLabel>Name</Form.ControlLabel>
            <Form.Control name="name" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Artist</Form.ControlLabel>
            <SelectPicker
              data={artistData}
              value={collectionFormValue.artist}
              onChange={(value) =>
                setCollectionFormValue({
                  ...collectionFormValue,
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
              value={collectionFormValue.series}
              onChange={(value) =>
                setCollectionFormValue({
                  ...collectionFormValue,
                  series: value,
                })
              }
              style={{ width: 300 }}
              disabled
            />
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
                onClick={handleDeleteCollectionClick}
                appearance="primary"
                color="red"
                className="right-space"
              >
                Delete
              </Button>
            </Form.Group>
          </div>
        </Form>
        <h3 className="spacing-20px">Items</h3>
        <div className="spacing-20px">
          <IconButton
            className="purple-button"
            appearance="primary"
            onClick={handleAddItemClick}
            icon={<PlusIcon className="purple-button" />}
          >
            Add
          </IconButton>
        </div>
        <Table
          data={items}
          width={2000}
          rowKey="id"
          autoHeight
          affixHeader
          affixHorizontalScrollbar
          loading={isLoading}
          onRowClick={handleItemRowClick}
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
          <Column width={300}>
            <HeaderCell>Official Price</HeaderCell>
            <Cell dataKey="officialPrice" />
          </Column>
          <Column width={200}>
            <HeaderCell>Secret</HeaderCell>
            <Cell dataKey="isSecret">
              <Checkbox />
            </Cell>
          </Column>
          <Column width={500}>
            <HeaderCell>Create At</HeaderCell>
            <DateCell dataKey="createAt" />
          </Column>
          <Column width={200}>
            <HeaderCell>Actions</HeaderCell>
            <DeleteCell dataKey="id" onDelete={handleDeleteItemClick} />
          </Column>
        </Table>
      </div>
    </div>
  );
};

export default CollectionDetail;
