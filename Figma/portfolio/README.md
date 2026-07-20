
  # Enhance Personal Website Interactivity

  This is a code bundle for Enhance Personal Website Interactivity. The original project is available at https://www.figma.com/design/nb7tb8wLCMuOHRdtn8UADI/Enhance-Personal-Website-Interactivity.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Internal World Notes

  The interactive hidden notes are implemented in `src/app/App.tsx` inside the `InternalWorld` component.

  - `INTERNAL_NOTES` is the array that controls all hidden note items.
  - Each note has `top`, `left`, `text`, `bg`, and `color` properties.
  - `top` and `left` are percentage values that position notes on the page.
  - `bg` is the note background color and `color` is the text color.

  ### How to customize

  1. Open `src/app/App.tsx`.
  2. Find the `INTERNAL_NOTES` array.
  3. To change a note's text, edit the `text` value.
  4. To change a note's appearance, edit the `bg` or `color` values.
  5. To add more notes, add new objects to the array.
  6. To move notes, adjust the `top` and `left` percentages.

  The visible big moving ring in the hero section is also defined in `src/app/App.tsx` inside the `Hero` component. You can keep or change that effect there.
  