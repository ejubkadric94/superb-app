import { useQuery } from "react-query"
import { RESTAURANT_ID } from "../constants/constants"
import { fetchRestaurant } from "../api/restaurantApi"
import ChangeWorkingHours from "./ChangeWorkingHours"

const WorkingHours = () => {
  const { data: restaurant, error, isLoading } = useQuery(['restaurant', RESTAURANT_ID], () => fetchRestaurant(RESTAURANT_ID))

  if (error) {
    return <span>Error fetching data</span>
  }

  if (isLoading || !restaurant) {
    return <span>Loading...</span>
  }

  return (
    <div className='working-hours'>
      <h2>Working hours: {restaurant.workingHours.start}h - {restaurant.workingHours.end}h</h2> 
      <ChangeWorkingHours workingHours={restaurant.workingHours} />
    </div>
  )
}

export default WorkingHours