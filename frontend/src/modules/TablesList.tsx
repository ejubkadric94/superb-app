import { useQuery } from 'react-query'
import { Row } from "antd"
import { RESTAURANT_ID } from '../constants/constants';
import AddTable from '../components/AddTable';
import TableCard from '../components/TableCard';
import { fetchTables } from '../api/tableApi';

const TablesList = () => {
  const { data: tables, error, isLoading } = useQuery(['tables', RESTAURANT_ID], () => fetchTables(RESTAURANT_ID))

  if (error) {
    return <span>Error fetching data</span>
  }

  if (isLoading || !tables) {
    return <span>Loading...</span>
  }

  return (
    <>
      <h1>List of tables</h1>
      <Row gutter={16}>
        {tables.map((table) => <TableCard table={table} key={table._id} />)}
        <AddTable />
      </Row>
    </>
  )
}

export default TablesList
