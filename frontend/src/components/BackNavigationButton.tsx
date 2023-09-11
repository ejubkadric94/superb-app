import { Button } from "antd"
import { LeftOutlined } from '@ant-design/icons'
import { useNavigate } from "react-router-dom"

const BackNavigationButton = () => {
  const navigate = useNavigate()
  return (
    <Button type="text" icon={<LeftOutlined />} onClick={() => navigate(-1)} style={{ padding: 0, marginBottom: '16px' }}>
      Back
    </Button>
  )
}

export default BackNavigationButton