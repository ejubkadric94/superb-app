import { Header } from "antd/es/layout/layout"
import { useQuery } from "react-query"
import { RESTAURANT_ID } from "../constants/constants"
import { fetchRestaurant } from "../api/restaurantApi"

const HeaderComponent = () => {
  const { data: restaurant, error, isLoading } = useQuery(['restaurant', RESTAURANT_ID], () => fetchRestaurant(RESTAURANT_ID))
  
  if (error) {
    return <span>Error fetching data</span>
  }

  if (isLoading || !restaurant) {
    return <span>Loading...</span>
  }
  
  return (
    <Header className="header">
      <div className="header-title">{restaurant.restaurantName}</div>
      <div className="header-welcome">Welcome manager!</div>
    </Header>
  )
}

export default HeaderComponent