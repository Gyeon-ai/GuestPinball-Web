import { setupGuest } from './guest';
import './localization';
import options from './options';
import { Roulette } from './roulette';

setupGuest();

const roulette = new Roulette();

(window as any).roulette = roulette;
(window as any).options = options;
