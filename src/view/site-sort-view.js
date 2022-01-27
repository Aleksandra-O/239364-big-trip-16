const createSortItem = (sort, isChecked) => {
  const {name, isDisabled} = sort;

  return `<div class="trip-sort__item  trip-sort__item--${name}">
    <input 
      id="sort-${name}" 
      class="trip-sort__input  visually-hidden" 
      type="radio" name="trip-sort" 
      value="sort-${name}" 
      ${isChecked ? 'checked' : ''}
      ${isDisabled ? 'disabled' : ''}>
    <label class="trip-sort__btn" for="sort-${name}">${name}</label>
  </div>`;
};

export const createSiteSortTemplate = (sortItems) => {
  const sortItemsTemplate = sortItems
    .map((sort, index) => createSortItem(sort, index === 0))
    .join('');

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortItemsTemplate}
  </form>`;
};
