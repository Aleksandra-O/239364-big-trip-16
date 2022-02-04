import {createElement} from '../render.js';

const createListTemplate = () => `<ul class="trip-events__list">
</ul>`;

export default class ListView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createListTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
