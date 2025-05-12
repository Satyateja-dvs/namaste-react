import StarRating from '../../assets/star-rating.svg';
import { RESTRO_IMAGE_BASE_URL, CONTENT_TYPE_ENUM } from '../utils/constants';
import { Link } from 'react-router';

const TopRestaurantCards = (props) => {
  const { resData } = props;
  // console.log("resData11111111", resData.cards);
  // const resDatFinal = resData?.cards?.map(card => console.log("card", card.card.gridElements.infoWithStyle.restaurants));

  return (
    resData?.cards?.map((card, index) => {
      const {
        card: restroWidget,
      } = card.card;
      console.log("restroWidget", restroWidget);
      // const resDataFinal = restroWidget?.gridElements?.infoWithStyle?.filter(item => item['@type'] === CONTENT_TYPE_ENUM.GRID_WIDGETS);
      // console.log("resDataFinal", resDataFinal);
      return (
        <div className="restaurant-container" key={index}>
          {
            restroWidget?.gridElements?.infoWithStyle?.restaurants?.map((restro) => {
              console.log("restro", restro);
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
                <Link to={`/restaurants/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
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
                </Link>
              )
            })
          }

        </div>

      )
    })
  )
}

export default TopRestaurantCards;