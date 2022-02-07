import {PLACES, POINTTYPES} from '../const.js';
import {editDateTemplate} from '../utils.js';
import AbstractView from './abstract-view.js';

const BLANK_EVENT = {
  type: POINTTYPES[0],
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  price: 1100,
  offers: null,
  destination: null,
};

const createTypeList = (types) => (
  `<div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>

  ${types.map((type) => `<div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type[0].toUpperCase() + type.slice(1)}</label>
  </div>`).join('')
  }

    </fieldset>
  </div>`
);

const createPrice = (price) => (
  `<div class="event__field-group  event__field-group--price">
    <label class="event__label" for="event-price-1">
      <span class="visually-hidden">Price</span>
      &euro;
    </label>
    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
  </div>`
);

const createDestination = (destination, places) => {
  if (destination === null) {
    return '';
  } else {
    return `<input autocomplete="off" class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
    <datalist id="destination-list-1">
      ${places.map((place) => `<option value="${place}"></option>`).join('')}
    </datalist>`;
  }
};

const createOffers = (offers) => {
  if (offers === null) {
    return '';
  } else {
    return `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
${offers.map((offer) => `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title}-${offer.id}" type="checkbox" name="event-offer-${offer.title}" ${offer.isChecked?'checked':''}>
    <label class="event__offer-label" for="event-offer-${offer.title}-${offer.id}">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`).join('')
}
    </div>
  </section>`;
  }
};

const createDescription = (destination) => {
  if (destination === null) {
    return '';
  } else {
    if (destination.description !== null || destination.pictures !== null) {

      const createPhotos = (place) => {
        const pictures = Array.from({length:place.pictures.length}).map((elem,ix)=>{
          elem = {
            src: place.pictures[ix].src,
            description: place.pictures[ix].description
          };
          return elem;
        });

        return pictures.map((picture) => (`
          <img class="event__photo" src="${picture.src}" alt="${picture.description}">
        `)).join('');
      };

      return `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        ${destination.description===null?'':`<p class="event__destination-description">${destination.description}</p>`}
        ${destination.pictures===null?'':`
          <div class="event__photos-container">
            <div class="event__photos-tape">
            ${createPhotos(destination)}
          </div>`}
      </section>`;
    } else {
      return '';
    }
  }
};

const createTime = (dateFrom, dateTo) => (`<div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${editDateTemplate(dateFrom)}">
    &mdash;
    <label class="visually-hidden" for="event-end-time-1">To</label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${editDateTemplate(dateTo)}">
  </div>`
);

const createEditPointTemplate = (tripEvent) => {
  const {type, dateFrom, dateTo, price, offers, destination} = tripEvent;

  const priceTemplate = createPrice(price);
  const destinationTemplate = createDestination(destination, PLACES);
  const offersTemplate = createOffers(offers);
  const descriptionTemplate = createDescription(destination);
  const typeListTemplate = createTypeList(POINTTYPES);
  const timeTemplate = createTime(dateFrom, dateTo);

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
        ${typeListTemplate}
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        ${destinationTemplate}
      </div>

      ${timeTemplate}      
      ${priceTemplate}

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      ${offersTemplate}
      ${descriptionTemplate}
    </section>
  </form>
  </li>`;
};

export default class EventEditView extends AbstractView {
  #tripEvent = null;

  constructor(tripEvent = BLANK_EVENT) {
    super();
    this.#tripEvent = tripEvent;
  }

  get template() {
    return createEditPointTemplate(this.#tripEvent);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit();
  }

  setFormClickHandler = (callback) => {
    this._callback.formClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formClickHandler);
  }

  #formClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.formClick();
  }
}
