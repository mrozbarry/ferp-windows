import { effects, util } from 'ferp';
import * as messages from '../messages.js';

export const windowReducer = (message, windowHandle) => {
  return [windowHandle, effects.none()];
};

export const windowsReducer = (message, windowHandles) => {
  const reduceOverEachWindowHandle = (nextWindowHandles) => util.combineReducers(
    nextWindowHandles.map(windowHandle => windowReducer(message, windowHandle))
  );

  switch (message.type) {
    case messages.setWindows:
      return reduceOverEachWindowHandle(message.windows);

    case messages.windowAdd:
      return reduceOverEachWindowHandle(windowHandles.concat(message.rootWindow));

    default:
      return reduceOverEachWindowHandle(windowHandles);
  }
};
