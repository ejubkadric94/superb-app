import { useQuery } from 'react-query'
import { Row } from "antd"
import { RESTAURANT_ID } from '../constants/constants';
import AddTable from '../components/AddTable';
import TableCard from '../components/TableCard';
import { fetchTables } from '../api/tableApi';
import './TablesList.css'
import WorkingHours from '../components/WorkingHours';

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
      <WorkingHours />
      <h2>List of tables</h2>
      <Row gutter={16}>
        {tables.map((table) => <TableCard table={table} key={table._id} />)}
        <AddTable />
      </Row>
    </>
  )
}

export default TablesList
