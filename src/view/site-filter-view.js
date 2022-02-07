import AbstractView from './abstract-view.js';

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

export default class FilterView extends AbstractView {
  #filters = null;

  /**
   *
   * @param {string[]} filters
   */
  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createSiteFilterTemplate(this.#filters);
  }
}
