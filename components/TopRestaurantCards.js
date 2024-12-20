import StarRating from '../assets/star-rating.svg';
const TopRestaurantCards = (props) => {
  const {resData} = props;

  return (
    <div className="restaurant-container">
      {resData.map((item) => {
        const {
          id,
          name,
          cloudinaryImageId,
          aggregatedDiscountInfoV3,
          avgRating,
          totalRatingsString,
          sla,
          cuisines,
          areaName
        } = item.info;
        return (
          <div className="restaurant-card-container" key={id}>
            <div className="image-container">
              <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`} alt="Restaurant Image" className="restro-image"/>
              <div className="discount-overlay">
                <span>{aggregatedDiscountInfoV3?.header} {aggregatedDiscountInfoV3?.subHeader}</span>
              </div>
            </div>
            <div className="restro-content">
              <h3>{name}</h3>
              <div className="rating-and-sla-container">
                <div className="rating">
                  <span>
                    <img src={StarRating} alt="Star Rating" />
                  </span>
                  <span style={{marginLeft: '4px'}}>{avgRating} ({totalRatingsString})</span>
                </div>
                <div className="sla">
                  {sla.slaString}
                </div>
              </div>
              <div className="restro-cuisines">
                {cuisines.join(", ")}
              </div>
              <div>{areaName}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TopRestaurantCards;