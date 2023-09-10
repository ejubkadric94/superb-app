import { useParams } from 'react-router-dom'

const TableDetails = () => {
  let { tableId } = useParams<{ tableId: string }>()
  return <div>Table Detail for table ID: {tableId}</div>
}

export default TableDetails
