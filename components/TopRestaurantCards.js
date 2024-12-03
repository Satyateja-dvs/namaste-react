import RestroImage from '../images/top-restro-1.avif';

const TopRestaurantCards = () => {
  return (
    <div className="restaurant-card-container">
      <div className="image-container">
        <img src={RestroImage} alt="Restaurant Image" className="restro-image"/>
      </div>
      <div className="restro-content">
        <h3>Pizza Hut</h3>
        <div>Pizzas, Burgers</div>
        <div>30-35 mins</div>
      </div>
    </div>
  )
}

export default TopRestaurantCards;