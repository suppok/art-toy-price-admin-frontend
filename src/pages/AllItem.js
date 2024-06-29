import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, IconButton } from 'rsuite';
import PlusIcon from '@rsuite/icons/legacy/Plus';
import DateCell from '../components/DateCell';
import DeleteCell from '../components/DeleteCell';
import BooleanCell from '../components/BooleanCell';
import {
  showSuccessNotification,
  showErrorNotification,
} from '../utils/Toaster';
import { deleteItem, fetchItems } from '../services/ItemService';
import { fetchCollectionNames } from '../services/CollectionService';

const { Column, HeaderCell, Cell } = Table;

const AllItem = () => {
  const [itemData, setItemData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemResponse = await fetchItems();
        let itemList;
        if (itemResponse.data.length > 0) {
          const params = new URLSearchParams();
          const collectionIdList = itemResponse.data.map(
            (item) => item.collection
          );
          collectionIdList.forEach((uuid) => params.append('uuids', uuid));
          const collectionNamesResponse = await fetchCollectionNames(params);
          itemList = itemResponse.data;
          for (let i = 0; i < itemList.length; i++) {
            itemList[i].collection = collectionNamesResponse.data[i].name;
          }
        } else {
          itemList = itemResponse.data;
        }
        setItemData(itemList);
        setIsLoading(false);
      } catch (error) {
        showErrorNotification(`Error fetching items: ${error}`);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleItemRowClick = (rowData) => {
    navigate(`/item/${rowData.id}`);
  };

  const handleCreateItemClick = () => {
    navigate(`/create-item`);
  };

  const handleDeleteItemClick = async (deletedId) => {
    try {
      const response = await deleteItem(deletedId);
      if (response.status === 200) {
        const newData = itemData.filter((item) => item.id !== deletedId);
        setItemData(newData);
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
      <h2 className="spacing-20px">Items</h2>
      <div className="spacing-20px">
        <IconButton
          className="purple-button"
          appearance="primary"
          onClick={handleCreateItemClick}
          icon={<PlusIcon className="purple-button" />}
        >
          New
        </IconButton>
      </div>
      <div>
        <Table
          data={itemData}
          width={2000}
          rowKey="id"
          autoHeight
          affixHeader
          affixHorizontalScrollbar
          loading={isLoading}
          onRowClick={handleItemRowClick}
          rowClassName="clickable-row"
        >
          <Column width={300}>
            <HeaderCell>ID</HeaderCell>
            <Cell dataKey="id" />
          </Column>
          <Column width={400}>
            <HeaderCell>Name</HeaderCell>
            <Cell dataKey="name" />
          </Column>
          <Column width={300}>
            <HeaderCell>Collection</HeaderCell>
            <Cell dataKey="collection" />
          </Column>
          <Column width={300}>
            <HeaderCell>Official Price</HeaderCell>
            <Cell dataKey="officialPrice" />
          </Column>
          <Column width={200}>
            <HeaderCell>Secret</HeaderCell>
            <BooleanCell dataKey="isSecret" />
          </Column>
          <Column width={300}>
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

export default AllItem;
