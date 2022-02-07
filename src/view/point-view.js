import dayjs from 'dayjs';
import AbstractView from './abstract-view.js';

/**
 *
 * @param {import('../mock/trip-event.js').TripEvent} tripEvent
 * @returns {string} HTML разметку для точки маршрута
 */
const createPointTemplate = (tripEvent) => {
  const {price, type, destination, dateFrom, dateTo, isFavorite, offers} = tripEvent;

  const visDate = dayjs(dateFrom).format('MMM D');
  const hidDate = dayjs(dateFrom).format('YYYY-MM-DD');
  const startTime = dayjs(dateFrom).format('HH:mm');
  const finishTime = dayjs(dateTo).format('HH:mm');
  const gapDate = new Date(+dateTo-dateFrom-10800000);

  /**
   *
   * @param {number} gapTime
   * @returns {string} количество часов и минут
   */
  const formatGapTime = (gapTime) => {
    if (gapTime < 3600000) {
      const intervalMin = String(dayjs(gapTime).format('mm'));
      const interval = `${intervalMin}M`;
      return interval;
    } else {
      const intervalHours = String(dayjs(gapTime).format('HH'));
      const intervalMin = String(dayjs(gapTime).format('mm'));
      const interval = `${intervalHours}H ${intervalMin}M`;
      return interval;
    }
  };

  const gapTimeTemplate = formatGapTime(gapDate);

  const favoriteClassName = isFavorite
    ? 'event__favorite-btn event__favorite-btn--active'
    : 'event__favorite-btn';

  /**
     *
     * @param {import('../mock/trip-event.js').Offer[] | null} options
     * @returns {string} HTML разметка предложений
     */
  const isCheckedOffer = (options) => {
    if (options === null) {
      return '';
    } else {
      return `<ul class="event__selected-offers">
${options.map((option) => {
    if (option.isChecked === true) {return `<li class="event__offer">
    <span class="event__offer-title">${option.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${option.price}</span>
    </li>`;
    } else {
      return '';
    }
  }).join('')
}
      </ul>`;
    }
  };

  return `<li class="trip-events__item">
  <div class="event">
        <time class="event__date" datetime="${hidDate}">${visDate}</time>
        <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination.name}</h3>
        <div class="event__schedule">
            <p class="event__time">
            <time class="event__start-time" datetime="${hidDate}T${startTime}">${startTime}</time>
            &mdash;
            <time class="event__end-time" datetime="${hidDate}T${finishTime}">${finishTime}</time>
            </p>
            <p class="event__duration">${gapTimeTemplate}</p>
        </div>
        <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        ${isCheckedOffer(offers)}
        <!--<ul class="event__selected-offers">
            <li class="event__offer">
            <span class="event__offer-title">Order Uber</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">20</span>
            </li>
        </ul>-->
        <button class="${favoriteClassName}" type="button">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
        </button>
        <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
        </button>
    </div>
  </li>`;
};
export default class EventView extends AbstractView {
  /**
   * @type {import('../mock/trip-event.js').TripEvent}
   */
  #tripEvent = null;

  /**
   *
   * @param {import('../mock/trip-event.js').TripEvent} tripEvent
   */
  constructor(tripEvent) {
    super();
    this.#tripEvent = tripEvent;
  }

  get template() {
    return createPointTemplate(this.#tripEvent);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  #editClickHandler = () => {
    this._callback.editClick();
  }
}
