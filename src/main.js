import { app, effects, util } from 'ferp';

import { windowAddEffect } from './effects/windowEffects.js';
import { interactionDoneEffect } from './effects/interactionEffects.js';
import {
  moveStartEffect,
  moveToEffect,
  resizeStartEffect,
  resizeToEffect,
} from './effects/windowInteractionEffects.js';

import { mouseEventsSubscription } from './subscriptions/mouseEventsSubscription.js';
import { windowSubscription } from './subscriptions/windowSubscription.js';

import * as messages from './messages.js';

import { interactionCreate } from './interaction.js';

import { windowsReducer } from './reducers/windowsReducer.js';
import { interactionReducer } from './reducers/interactionReducer.js';

const focusEffect = (rootWindow) => ({ type: messages.windowFocus, rootWindow });

const initialState = {
  windows: [],
  interaction: interactionCreate('none'),
};

app({
  init: [
    initialState,
    effects.batch([
      windowAddEffect('Minecraft Map', 'https://map.daggasoft.com/', { left: 0, top: 0, width: 800, height: 600 }),
      windowAddEffect('Wolfram', 'https://www.wolframalpha.com/', { left: 100, top: 100, width: 800, height: 600 }),
    ]),
  ],

  update: (message, previousState) => {
    return util.combineReducers({
      windows: windowsReducer(message, previousState.windows),
      interaction: interactionReducer(message, previousState.interaction, previousState.windows),
    });
  },

  subscribe: (state) => {
    const moveEffect = state.interaction.type === 'drag'
      ? moveToEffect
      : state.interaction.type === 'resize'
      ? resizeToEffect
      : effects.none;

    return [
      [mouseEventsSubscription, moveEffect, interactionDoneEffect],
      ...state.windows.map(handle => (
        [windowSubscription, handle, moveStartEffect, resizeStartEffect, focusEffect]
      ))
    ];
  },
});
