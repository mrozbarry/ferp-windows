import { effects } from 'ferp';
import { interactionDone } from '../messages.js';

export const interactionDoneEffect = () => ({ type: interactionDone });
