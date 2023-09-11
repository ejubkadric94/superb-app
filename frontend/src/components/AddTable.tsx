import { Col } from 'antd'
import {ReactComponent as SquarePlus} from '../svgs/SquarePlus.svg'
import { RESTAURANT_ID } from '../constants/constants'
import CardButton from './CardButton'
import useCreateTable from '../customHooks/useCreateTable'

const AddTable = () => {
  const mutation = useCreateTable()

  const addTable = () => {
    mutation.mutate(RESTAURANT_ID)
  }

  return (
    <Col span={6} key='addButton' xs={24} sm={8} md={6} lg={6}>
      <CardButton title="Add a table" bordered hoverable onClick={addTable}>
        <SquarePlus />
      </CardButton>
    </Col>
  )
}

export default AddTable