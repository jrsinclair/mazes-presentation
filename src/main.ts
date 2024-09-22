import 'reveal.js/plugin/highlight/monokai.css';
import './style.css';

import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import Highlight from 'reveal.js/plugin/highlight/highlight.esm.js';
import Notes from 'reveal.js/plugin/notes/notes.esm.js';
import Math from 'reveal.js/plugin/math/math.esm.js';

let deck = new Reveal({
  plugins: [Markdown, Highlight, Notes, Math.KaTeX],
});

deck.initialize({
  markdown: {
    smartypants: true,
  },
});
