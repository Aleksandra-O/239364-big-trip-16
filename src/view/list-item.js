import {createElement} from '../render.js';

const createListItemTemplate = (content) =>`<li class="trip-events__item">${content}</li>`;

export default class ListItemTemplate {
  #element = null;
  #content = null;

  constructor() {
    this.#content = content;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createListItemTemplate(this.#content);
  }

  removeElement() {
    this.#element = null;
  }
}
