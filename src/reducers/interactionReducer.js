import { effects } from 'ferp';

import {
  windowMoveFromInteractionEffect,
  windowResizeFromInteractionEffect,
} from '../effects/windowEffects.js';

import { iframePointerEffect } from '../effects/iframeEffects.js';
import { windowFocusEffect } from '../effects/windowInteractionEffects.js';

import * as messages from '../messages.js';

import {
  interactionCreate,
  interactionCreateFrom,
  interactionUpdate,
} from '../interaction.js';


export const interactionReducer = (message, interaction, windows) => {
  switch (message.type) {
    case messages.windowFocus:
      return [
        interaction,
        effects.batch([
          windowFocusEffect(message.rootWindow, windows),
        ]),
      ];

    case messages.moveStart:
      return [
        interactionCreateFrom('drag', message),
        effects.batch([
          windowFocusEffect(message.rootWindow, windows),
          iframePointerEffect('none'),
        ]),
      ];

    case messages.resizeStart:
      return [
        interactionCreateFrom('resize', message),
        effects.batch([
          windowFocusEffect(message.rootWindow, windows),
          iframePointerEffect('none'),
        ]),
      ];

    case messages.moveTo: {
      if (interaction.type === 'none') {
        return [interaction, effects.none()];
      }
      const nextInteraction = interactionUpdate(interaction, message.position);
      return [
        nextInteraction,
        windowMoveFromInteractionEffect(nextInteraction),
      ];
    }

    case messages.resizeTo: {
      if (interaction.type === 'none') {
        return [interaction, effects.none()];
      }
      const nextInteraction = interactionUpdate(interaction, message.position);
      return [
        nextInteraction,
        windowResizeFromInteractionEffect(nextInteraction),
      ];
    }

    case messages.interactionDone:
      return [
        interactionCreate('none'),
        effects.batch([
          iframePointerEffect('auto'),
        ].filter(Boolean)),
      ];

    default:
      return [interaction, effects.none()];
  }
};
