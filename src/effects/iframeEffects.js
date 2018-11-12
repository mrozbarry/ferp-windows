import { effects } from 'ferp';

export const iframePointerEffect = (pointerEvents) => {
  const iframes = Array.from(document.querySelectorAll('iframe'));
  iframes.forEach(iframe => iframe.style.pointerEvents = pointerEvents);
  return effects.none();
}
