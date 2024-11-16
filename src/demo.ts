/// <reference types="vite/client" />

import { maze } from '../lib/main';
import { renderMazeSVG } from '../lib/render';

const DEFAULT_SIZE = 10;
const DEFAULT_SEED = 42;

const $$: typeof document.querySelectorAll =
  document.querySelectorAll.bind(document);
const $: typeof document.querySelector =
  document.querySelector.bind(document);

const wrapper = $('.maze-wrapper');

function handleChange() {
  if (!wrapper) return;
  const n = Number(
    (
      ($('.maze-input--size') as HTMLInputElement) ?? {
        value: DEFAULT_SIZE,
      }
    ).value,
  );
  const seed = Number(
    (
      ($('.maze-input--seed') as HTMLInputElement) ?? {
        value: DEFAULT_SEED,
      }
    ).value,
  );
  const mazeRooms = maze(n, seed);
  wrapper.innerHTML = renderMazeSVG(n, 25, mazeRooms);
}

$$('.maze-input').forEach((input) => {
  input.addEventListener('change', handleChange);
});
$$('form').forEach((form) => {
  form.addEventListener('submit', (evt) => {
    handleChange();
    evt.preventDefault();
  });
});

const mazeRooms = maze(DEFAULT_SIZE, DEFAULT_SEED);
wrapper &&
  (wrapper.innerHTML = renderMazeSVG(
    DEFAULT_SIZE,
    25,
    mazeRooms,
  ));
