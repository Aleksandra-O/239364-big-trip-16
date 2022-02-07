import dayjs from 'dayjs';
import AbstractView from './abstract-view.js';

/**
 *
 * @param {import('../mock/trip-event.js').TripEvent[]} tripPoints
 * @returns {string} первую и последнюю точку на маршруте
 */
const getAllTrip = (tripPoints) => {
  let strAllTrip = '';
  const arrPlaces = tripPoints.map((tripPoint,i,currentPlaceArray) => {
    const item = tripPoint.destination.name;
    if (i > 0) {
      if (item === currentPlaceArray[i-1].destination.name) {
        return null;
      } else {
        return item;
      }
    } else {
      return item;
    }
  });
  strAllTrip = arrPlaces.filter((el)=> el !== null).join(' &mdash; ');
  return strAllTrip;
};

/**
 *
 * @param {import('../mock/trip-event.js').TripEvent[]} tripPoints
 * @returns
 */
const getAllTime = (tripPoints) => {
  let newTripArr = tripPoints.slice().sort((a,b) => a.dateFrom - b.dateFrom);
  const firstDate = {
    month: dayjs(newTripArr[0].dateFrom).format('MMM'),
    day: dayjs(newTripArr[0].dateFrom).format('D')
  };
  newTripArr = tripPoints.slice().sort((a,b) => b.dateTo - a.dateTo);
  const lastDate = {
    month: dayjs(newTripArr[0].dateTo).format('MMM')===firstDate.month?null:dayjs(newTripArr[0].dateTo).format('MMM'),
    day: dayjs(newTripArr[0].dateTo).format('D')
  };

  const strAllTime = `${firstDate.month}&nbsp;${firstDate.day}&nbsp;&mdash;&nbsp;${lastDate.month!==null?`${lastDate.month} `:''}${lastDate.day}`;

  return strAllTime;
};

const getTotalTripPrice = (tripPoints) => {
  let totalPrice = 0;
  for (const tripPoint of tripPoints) {
    let basePrice = 0;
    let optionPrice = 0;
    basePrice=tripPoint.price;
    if (tripPoint.offers!==null) {
      const optionsArr = tripPoint.offers;
      for (const option of optionsArr) {
        if (option.isChecked===true) {
          optionPrice=optionPrice+option.price;
        }
      }
    }
    totalPrice=totalPrice+basePrice+optionPrice;
  }

  return totalPrice;
};

/**
 *
 * @param {import('../mock/trip-event.js').TripEvent[]} tripPoints
 * @returns {string} html markup
 */
const getTripInfo = (tripPoints) => (
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${getAllTrip(tripPoints)}</h1>

      <p class="trip-info__dates">${getAllTime(tripPoints)}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalTripPrice(tripPoints)}</span>
    </p>
  </section>`
);

export default class TripInfo extends AbstractView {
  /**
   * @type {import('../mock/trip-event.js').TripEvent[]}
   */
  #tripEvent = null;

  /**
   * @param {import('../mock/trip-event.js').TripEvent[]} tripEvent
   */
  constructor(tripEvent) {
    super();
    this.#tripEvent = tripEvent;
  }

  get template() {
    return getTripInfo(this.#tripEvent);
  }
}
