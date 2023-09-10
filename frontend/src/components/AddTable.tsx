import { useMutation, useQueryClient } from 'react-query';
import { Col } from 'antd';
import {ReactComponent as SquarePlus} from '../svgs/SquarePlus.svg'
import { RESTAURANT_ID } from '../constants/constants';
import { createTable } from '../api/api';
import CardButton from './CardButton';

const AddTable = () => {
  const queryClient = useQueryClient();

  const addTableMutation = useMutation(
    (restaurantId?: string) => createTable(restaurantId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tables', RESTAURANT_ID]);
      },
    }
  )

  const addTable = () => {
    addTableMutation.mutate(RESTAURANT_ID)
  }

  return (
    <Col span={6} key='addButton' xs={24} sm={8} md={6} lg={6}>
      <CardButton title="Add a table" bordered onClick={addTable}>
        <SquarePlus />
      </CardButton>
    </Col>
  )
};

export default AddTable;