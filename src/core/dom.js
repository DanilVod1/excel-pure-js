class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === 'string'
        ? document.querySelector(selector)
        : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }

    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }

    return this;
  }

  get data() {
    return this.$el.dataset;
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  css(styles = {}) {
    Object.keys(styles).forEach((key) => {
      this.$el.style[key] = styles[key];
    });
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(':');
      return {
        row: +parsed[0],
        col: +parsed[1],
      };
    }
    return this.data.id;
  }

  addClass(className) {
    this.$el.classList.add(className);
  }

  removeClass(className) {
    this.$el.classList.remove(className);
  }
  calculateValueMove(where) {
    const ids = $(this.$el).id(true);
    let valueRow = 0;
    let valueCol = 0;
    if (where == 'ArrowDown' || where == 'Enter') {
      valueRow = 1;
    } else if (where == 'ArrowUp') {
      valueRow = -1;
    } else if (where == 'ArrowLeft') {
      valueCol = -1;
    } else if (where == 'ArrowRight' || where == 'Tab') {
      valueCol = 1;
    }
    return [
      ids.row + valueRow < 0 ? ids.row : ids.row + valueRow,
      ids.col + valueCol < 0 ? ids.col : ids.col + valueCol,
    ];
  }

  findMovedElement([valueRow, valueCol]) {
    return this.find(`[data-id="${valueRow}:${valueCol}"]`);
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
