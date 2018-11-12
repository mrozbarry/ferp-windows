import { effects } from 'ferp';

import * as messages from '../messages.js';
import { createWindow } from '../components/createWindow.js';

export const windowMoveEffect = (rootWindow, position) => {
  const windowHandle = rootWindow.get();

  if ('left' in position) {
    windowHandle.style.left = `${Math.max(position.left, 6)}px`;
  }
  if ('top' in position) {
    windowHandle.style.top = `${Math.max(position.top, 6)}px`;
  }
return effects.none();
};

export const windowMoveFromInteractionEffect = (drag) => {
  const left = drag.position.left - drag.relativeMouseToWindow.left;
  const top = drag.position.top - drag.relativeMouseToWindow.top;

  return windowMoveEffect(drag.rootWindow, { top, left });
};

export const windowResizeEffect = (rootWindow, size) => {
  const windowHandle = rootWindow.get();
  
  if ('width' in size) {
    windowHandle.style.width = `${size.width}px`;
  }
  if ('height' in size) {
    windowHandle.style.height = `${size.height}px`;
  }
  
  return effects.none();
};

export const windowResizeFromInteractionEffect = (resize) => {
  const position = resize.rootWindow.get().getBoundingClientRect();
  const width = resize.position.left - position.left;
  const height = resize.position.top - position.top;
  
  return windowResizeEffect(resize.rootWindow, { width, height });
};

export const windowCommitEffect = (rootWindow) => {
  return effects.none();
};

export const windowAddEffect = (title, href, box = {}) => {
  const newWindow = createWindow(href, { title, movable: true, resizable: true }).get();
  document.body.appendChild(newWindow);

  const id = Math.random().toString(36).slice(2);

  const rootWindow = {
    get: () => newWindow,
    id,
  };

  return effects.batch([
    { type: messages.windowAdd, rootWindow },
    windowMoveEffect(rootWindow, box),
    windowResizeEffect(rootWindow, box),
    windowCommitEffect(rootWindow),
  ]);
};
