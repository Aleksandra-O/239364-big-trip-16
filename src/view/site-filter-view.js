import {createElement} from '../render.js';

/**
 *
 * @param {string} filter
 * @param {boolean} isChecked
 * @returns
 */
const createFilterItemTemplate = (filter, isChecked) => {
  const name = filter;

  return (
    `<div class="trip-filters__filter">
      <input
        id="filter-${name}"
        class="trip-filters__filter-input visually-hidden"
        type="radio"
        name="trip-filter"
        value="${name}"
        ${isChecked ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>`
  );
};

const createSiteFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join('');

  return `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
  </form>`;
};

export default class FilterView {
  #element = null;
  #filters = null;

  constructor(filters) {
    this.#filters = filters;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createSiteFilterTemplate(this.#filters);
  }

  removeElement() {
    this.#element = null;
  }
}
