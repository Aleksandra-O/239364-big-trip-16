import {createSiteMenuTemplate} from './view/site-menu-view.js';
import {createSiteFilterTemplate} from './view/site-filter-view.js';
import {createSiteSortTemplate} from './view/site-sort-view.js';
import {createEditPointTemplate} from './view/edit-point-view.js';
import {createPointTemplate} from './view/point-view.js';
import {createListFrameTemplate } from './view/list-frame.js';
import {createListItemTemplate } from './view/list-item.js';
import {renderTemplate, RenderPosition} from './render.js';
import {generateEvent} from './mock/trip-event.js';
import {generateFilter} from './mock/filter.js';

const POINT_COUNT = 15;

const createItemTemplate = (editing)=> editing?createEditPointTemplate(generateEvent()):createPointTemplate(generateEvent());

const renderItem = (container, editing)=>{
  renderTemplate(container,createListItemTemplate(createItemTemplate(editing)),RenderPosition.BEFOREEND);
};

const renderItems = (container)=>{
  Array.from({length:POINT_COUNT+1}).forEach((_,ix)=>renderItem(container,ix===0));
};

const renderList = (container)=>{
  renderTemplate(container, createListFrameTemplate(), RenderPosition.BEFOREEND);
  renderItems(container.querySelector('.trip-events__list'));
};

const renderTripEvents = (container)=>{
  renderTemplate(container, createSiteSortTemplate(), RenderPosition.BEFOREEND);
  renderList(container);
};

renderTemplate(document.querySelector('.trip-controls__navigation'), createSiteMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(document.querySelector('.trip-controls__filters'), createSiteFilterTemplate(generateFilter), RenderPosition.BEFOREEND);

renderTripEvents(document.querySelector('.trip-events'));
