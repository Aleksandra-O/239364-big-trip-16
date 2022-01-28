import {createSiteMenuTemplate} from './view/site-menu-view.js';
import {createSiteFilterTemplate} from './view/site-filter-view.js';
import {createSiteSortTemplate} from './view/site-sort-view.js';
import {createEditPointTemplate} from './view/edit-point-view.js';
import {createPointTemplate} from './view/point-view.js';
import {createListFrameTemplate } from './view/list-frame.js';
import {createListItemTemplate } from './view/list-item.js';
import {getTripInfo } from './view/all-trip.js';
import {renderTemplate, RenderPosition} from './render.js';
import {generateEvent} from './mock/trip-event.js';
import {generateFilter} from './mock/filter.js';
import {generateSort} from './mock/sort.js';
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
    _currentData = Array.from({length:POINT_COUNT},generateEvent).sort(function(a,b) {
      return new Date(a.dateFrom) - new Date(b.dateFrom);
    });
  }
  return _currentData;
};

const renderItem = (container, editing, item)=>{
  if(editing){
    renderTemplate(container,createListItemTemplate(createEditPointTemplate(item)),RenderPosition.BEFOREEND);
    attachFlicker(container);
  } else{
    renderTemplate(container,createListItemTemplate(createPointTemplate(item)),RenderPosition.BEFOREEND);
  }
};

const renderItems = (container)=>{
  getCurrentData().forEach((item,ix)=>renderItem(container,ix===0, item));
};

const renderList = (container)=>{
  renderTemplate(container, createListFrameTemplate(), RenderPosition.BEFOREEND);
  renderItems(container.querySelector('.trip-events__list'));
};

const renderTripEvents = (container)=>{
  renderTemplate(container, createSiteSortTemplate(generateSort), RenderPosition.BEFOREEND);
  renderList(container);
};

renderTemplate(document.querySelector('.trip-main'), getTripInfo(getCurrentData()), RenderPosition.AFTERBEGIN);
renderTemplate(document.querySelector('.trip-controls__navigation'), createSiteMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(document.querySelector('.trip-controls__filters'), createSiteFilterTemplate(generateFilter), RenderPosition.BEFOREEND);

renderTripEvents(document.querySelector('.trip-events'));
