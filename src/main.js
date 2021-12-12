import {createSiteMenuTemplate} from './view/site-menu-view.js';
import {createSiteFilterTemplate} from './view/site-filter-view.js';
import {createSiteSortTemplate} from './view/site-sort-view.js';
import {createEditPointTemplate} from './view/edit-point-view.js';
import {createPointTemplate} from './view/point-view.js';

import {renderTemplate, RenderPosition} from './render.js';
import { createListFrameTemplate } from './view/list-frame.js';

const POINT_COUNT = 3;

renderTemplate(document.querySelector('.trip-controls__navigation'), createSiteMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(document.querySelector('.trip-controls__filters'), createSiteFilterTemplate(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector('.trip-events');

renderTemplate(siteMainElement, createSiteSortTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createListFrameTemplate(), RenderPosition.BEFOREEND);

const siteListElement = siteMainElement.querySelector('.trip-events__list');

renderTemplate(siteListElement, createEditPointTemplate(), RenderPosition.BEFOREEND);

for (let i = 0; i < POINT_COUNT; i++) {
  renderTemplate(siteListElement, createPointTemplate(), RenderPosition.BEFOREEND);
}
