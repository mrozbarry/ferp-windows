const elementWrapper = (element) => ({
  get: () => element,
  class: (name) => {
    element.className = [element.className, name]
      .filter(Boolean)
      .join(' ');

    return elementWrapper(element);
  },
  attribute: (key, value) => {
    element.setAttribute(key, value);
    return elementWrapper(element);
  },
  text: (text) => {
    element.innerText = text;
    return elementWrapper(element);
  },
  push: (child) => {
    if (child) {
      element.appendChild(child.get());
    }
    return elementWrapper(element);
  },
})

const e = (tagName = 'div') => (
  elementWrapper(document.createElement(tagName))
);

const defaultBodyTransform = e => e;

export const createView = (options = {}, createBodyFn = () => {}) => (
  e('article').class('window')
    .push(
      e('header').class('title-bar').class(options.movable && 'movable')
        .push(e().class('title').text(options.title))
        .push(e().class('buttons')),
    )
    .push(
      createBodyFn(options),
    )
    .push(
      options.resizable && e('footer').class('footer')
        .push(
          e().class('resize'),
        ),
    )
);

export const createWindow = (src, options = {}) => (
  createView(
    Object.assign({ movable: true, resizable: true }, options),
    () => e('iframe').class('body').attribute('src', src),
  )
);
