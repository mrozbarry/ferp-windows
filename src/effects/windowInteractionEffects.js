import * as messages from '../messages.js';

export const moveStartEffect = (rootWindow, event) => {
  const mousePosition = {
    left: event.clientX,
    top: event.clientY,
  }
  const windowPosition = rootWindow.get().getBoundingClientRect();
  const relativeMouseToWindow = {
    left: mousePosition.left - windowPosition.left,
    top: mousePosition.top - windowPosition.top,
  }
  return {
    type: messages.moveStart,
    rootWindow,
    position: mousePosition,
    relativeMouseToWindow,
  };
};

export const moveToEffect = (event) => ({
  type: messages.moveTo,
  position: {
    left: event.clientX,
    top: event.clientY,
  }
});

export const resizeStartEffect = (rootWindow, event) => {
  const position = {
    left: event.clientX,
    top: event.clientY,
  }
  return {
    type: messages.resizeStart,
    rootWindow,
    position,
    relativeMouseToWindow: {},
  };
};

export const resizeToEffect = (event) => ({
  type: messages.resizeTo,
  position: {
    left: event.clientX,
    top: event.clientY,
  }
});

export const setWindowsEffect = (windows) => ({
  type: messages.setWindows,
  windows,
});

export const windowFocusEffect = (rootWindow, rootWindows) => {
  const windows = rootWindows.filter(rw => rw.id !== rootWindow.id).concat(rootWindow);
  windows.forEach((rw, index) => {
    rw.get().style.zIndex = (index * 10) + 10;
  });

  return setWindowsEffect(windows);
};
