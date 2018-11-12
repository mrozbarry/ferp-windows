export const mouseEventsSubscription = (mouseMoveEffect, mouseUpEffect) => (dispatch) => {
  const onMouseMove = (event) => {
    dispatch(mouseMoveEffect(event));
  };

  const onMouseUp = (event) => {
    dispatch(mouseUpEffect(event));
  };

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);

  return () => {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };
};
