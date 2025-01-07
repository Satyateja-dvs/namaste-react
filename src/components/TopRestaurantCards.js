import StarRating from '../../assets/star-rating.svg';
import { RESTRO_IMAGE_BASE_URL, CONTENT_TYPE_ENUM } from '../utils/constants';

const TopRestaurantCards = (props) => {
  const { resData } = props;
  console.log("resData", resData.cards);

  return (
    resData?.cards?.map((card, index) => {
      const {
        card: restroWidget,
      } = card.card;
      return (
        <div className="restaurant-container" key={index}>
          {
            restroWidget?.gridElements?.infoWithStyle?.restaurants?.map((restro) => {
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
              } = restro.info;
              return (
                <div className="restaurant-card-container" key={id}>
                  <div className="image-container">
                    <img src={`${RESTRO_IMAGE_BASE_URL}/${cloudinaryImageId}`} alt="Restaurant Image" className="restro-image" />
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
                        <span style={{ marginLeft: '4px' }}>{avgRating} ({totalRatingsString})</span>
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
            })
          }

        </div>

      )
    })
  )
}

export default TopRestaurantCards;