import {createElement} from '../render.js';

/**
 *
 * @param {string} content HTML содержимое элемента
 * @returns {string} HTML разметку вместе с содержимым
 */
const createListItemTemplate = (content) =>`<li class="trip-events__item">${content??''}</li>`;

export default class ListItemTemplate {
  /**
   * @type {HTMLElement | null}
   */
  #element = null;
  /**
   * @type {string}
   */
  #content = null|null;

  /**
   *
   * @param {string|null} content
   */
  constructor(content=null) {
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
