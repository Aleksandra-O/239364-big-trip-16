import SiteMenuView from './view/site-menu-view.js';
import FilterView from './view/site-filter-view.js';
import SortView from './view/site-sort-view.js';
import EventEditView from './view/edit-point-view.js';
import EventView from './view/point-view.js';
import ListView from './view/list-frame.js';
import TripInfo from './view/all-trip.js';
import {render, RenderPosition} from './render.js';
import {generateEvent} from './mock/trip-event.js';
import {generateFilter} from './mock/filter.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';

const flatPickerSettings = {
  enableTime: true,
  dateFormat: 'd/m/y H:i',
};

const attachFlicker = (container)=>{
  flatpickr(container.querySelector('#event-start-time-1'),flatPickerSettings);
  flatpickr(container.querySelector('#event-end-time-1'),flatPickerSettings);
};

const POINT_COUNT = 15;

let _currentData = null;
const getCurrentData = ()=>{
  if(_currentData === null){
    _currentData = Array.from({length:POINT_COUNT},generateEvent).sort((a,b)=>a.dateFrom - b.dateFrom);
  }
  return _currentData;
};

const renderItem = (container, item)=>{
  const eventTemplate = new EventView(item);
  const eventEditTemplate = new EventEditView(item);

  const replaceCardToForm = () => {
    container.replaceChild(eventEditTemplate.element, eventTemplate.element);
  };
  const replaceFormToCard = () => {
    container.replaceChild(eventTemplate.element, eventEditTemplate.element);
  };

  eventTemplate.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceCardToForm();
    attachFlicker(container);
  });

  eventEditTemplate.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceFormToCard();
  });

  eventEditTemplate.element.querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToCard();
  });

  render(container, eventTemplate.element, RenderPosition.BEFOREEND);
};

const renderItems = (container)=>{
  getCurrentData().forEach((item)=>renderItem(container,item));
};

const renderList = (container)=>{
  render(container, new ListView().element, RenderPosition.BEFOREEND);
  renderItems(container.querySelector('.trip-events__list'));
};

const renderTripEvents = (container)=>{
  render(container, new SortView().element, RenderPosition.BEFOREEND);
  renderList(container);
};

render(document.querySelector('.trip-main'), new TripInfo(getCurrentData()).element, RenderPosition.AFTERBEGIN);
render(document.querySelector('.trip-controls__navigation'), new SiteMenuView().element, RenderPosition.BEFOREEND);
render(document.querySelector('.trip-controls__filters'), new FilterView(generateFilter).element, RenderPosition.BEFOREEND);

renderTripEvents(document.querySelector('.trip-events'));
