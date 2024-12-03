import RestroImage from '../assets/top-restro-1.avif';
import StarRating from '../assets/star-rating.svg';
const TopRestaurantCards = (props) => {
  const {resData} = props;

  console.log("restObj", resData);
  return (
    <div className="restaurant-container">
      {resData.map((item, index) => {
        const itemInfo = item.info;
        return (
          <div className="restaurant-card-container" key={index}>
            <div className="image-container">
              <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${itemInfo.cloudinaryImageId}`} alt="Restaurant Image" className="restro-image"/>
            </div>
            <div className="restro-content">
              <h3>{itemInfo.name}</h3>
              <div className="rating-and-sla-container">
                <div className="rating">
                  <span>
                    <img src={StarRating} alt="Star Rating" />
                  </span>
                  <span style={{marginLeft: '4px'}}>{itemInfo.avgRating}</span>
                </div>
                <div className="sla">
                  {itemInfo.sla.slaString}
                </div>
              </div>
              <div>{itemInfo.cuisines.map((cuisine, i) => {
                return (
                  <span key={i}>{cuisine}, </span>
                )
              })}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TopRestaurantCards;