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
      // const resDataFinal = restroWidget?.gridElements?.infoWithStyle?.filter(item => item['@type'] === CONTENT_TYPE_ENUM.GRID_WIDGETS);
      return (
        <div className="flex flex-wrap justify-evenly" key={index}>
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
                <Link to={`/restaurants/${id}`} className='m-4 bg-neutral-100'>
                  <div className="flex flex-col p-4" key={id}>
                    <div className="relative">
                      <img src={`${RESTRO_IMAGE_BASE_URL}/${cloudinaryImageId}`} alt="Restaurant Image" className="w-80 h-auto min-h-40" />
                      <div className="absolute top-0 left-0 bg-black text-white p-2 rounded-br-2xl">
                        <span>{aggregatedDiscountInfoV3?.header} {aggregatedDiscountInfoV3?.subHeader}</span>
                      </div>
                    </div>
                    <div className="flex flex-col p-2 flex-wrap">
                      <h3>{name}</h3>
                      <div className="flex flex-col">
                        <div className="flex">
                          <span>
                            <img src={StarRating} alt="Star Rating" />
                          </span>
                          <span style={{ marginLeft: '4px' }}>{avgRating} ({totalRatingsString})</span>
                        </div>
                        <div className="mt-4">
                          {sla.slaString}
                        </div>
                      </div>
                      {/* <div className="">
                        {cuisines.join(", ")}
                      </div> */}
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
