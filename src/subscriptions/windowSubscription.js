export const windowSubscription = (rootWindow, moveStartEffect, resizeStartEffect, focusEffect) => (dispatch) => {
  const windowHandle = rootWindow.get();
  const titleBar = windowHandle.querySelector('.title-bar.movable');
  const resize = windowHandle.querySelector('.resize');
  const body = windowHandle.querySelector('.body');

  const onMoveStart = (event) => {
    dispatch(moveStartEffect(rootWindow, event));
  };

  const onResizeStart = (event) => {
    dispatch(resizeStartEffect(rootWindow, event));
  };

  const onFocusIn = (event) => {
    console.log('focusIn', rootWindow, event);
    // dispatch(focusEffect(rootWindow, event));
  };

  if (titleBar) titleBar.addEventListener('mousedown', onMoveStart);
  if (resize) resize.addEventListener('mousedown', onResizeStart);

  body.addEventListener('focusin', onFocusIn);

  return () => {
    if (titleBar) titleBar.removeEventListener('mousedown', onMoveStart);
    if (resize) resize.removeEventListener('mousedown', onResizeStart);
    body.removeEventListener('focusin', onFocusIn);
  };
};
