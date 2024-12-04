import RestroImage from '../assets/top-restro-1.avif';
import StarRating from '../assets/star-rating.svg';
const TopRestaurantCards = (props) => {
  const {resData} = props;

  return (
    <div className="restaurant-container">
      {resData.map((item) => {
        const itemInfo = item.info;
        return (
          <div className="restaurant-card-container" key={itemInfo.id}>
            <div className="image-container">
              <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${itemInfo.cloudinaryImageId}`} alt="Restaurant Image" className="restro-image"/>
              <div className="discount-overlay">
                <span>{itemInfo.aggregatedDiscountInfoV3?.header} {itemInfo.aggregatedDiscountInfoV3?.subHeader}</span>
              </div>
            </div>
            <div className="restro-content">
              <h3>{itemInfo.name}</h3>
              <div className="rating-and-sla-container">
                <div className="rating">
                  <span>
                    <img src={StarRating} alt="Star Rating" />
                  </span>
                  <span style={{marginLeft: '4px'}}>{itemInfo.avgRating} ({itemInfo.totalRatingsString})</span>
                </div>
                <div className="sla">
                  {itemInfo.sla.slaString}
                </div>
              </div>
              <div className="restro-cuisines">
                {itemInfo.cuisines.join(", ")}
              </div>
              <div>{itemInfo.areaName}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TopRestaurantCards;