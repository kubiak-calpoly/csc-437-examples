export default `<html>
          <body>
            <template id="blz-accommodation-template">
  <p>Stay at <slot>*** Accommodation Name Goes HERE ***</slot></p>
  <style>
    * {
      margin: 0;
    }
  </style>
</template>

<template id="blz-destination-template">
  <p><slot name="dates">*** Date Range ***</slot></p>
  <header>
    <h2><slot name="name">*** Name of Destination ***</slot></h2>
    <p><slot name="nights">##</slot> nights</p>
  </header>
  <div class="list">
    <slot>*** Accommodations and Excursions Go HERE ***</slot>
  </div>
  <style>
    * {
      margin: 0;
    }
    :host {
      display: grid;
      grid-template-columns: [dates] auto [header] 1fr [info] 3fr [info-end];
      gap: var(--size-spacing-medium) var(--size-spacing-large);
      align-items: baseline;
    }
    header {
      --color-text: var(--color-text-inverted);
      --color-text-heading: var(--color-text-inverted);
      --color-link: var(--color-link-inverted);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      box-sizing: border-box;
      padding: var(--size-spacing-small);
      background: var(--color-background-header);
      color: var(--color-text);
    }
    h2 {
      color: var(--color-text-heading);
      font-family: var(--font-display);
    }
    .list {
      display: flex;
      flex-direction: column;
      grid-column: info / info-end;
    }
  </style>
</template>

<template id="blz-excursion-template">
  <p id="message">
    Visit <slot id="place">*** Place Visited Goes HERE ***</slot>
  </p>
  <style>
    * {
      margin: 0;
    }
  </style>
</template>

<template id="blz-itinerary-template">
  <div class="itinerary">
    <slot>*** Destinations and Transportation Go HERE ***</slot>
  </div>
  <style>
    .itinerary {
      display: grid;
      grid-template-columns:
        [start] auto [header] auto
        [info] 1fr 2fr 1fr 2fr [end];
      gap: var(--size-spacing-medium) var(--size-spacing-large);
      align-items: baseline;
      margin: var(--size-spacing-small);
    }

    ::slotted(*) {
      grid-column: start / end;
      grid-template-columns: subgrid;
    }
  </style>
</template>

          </body>
        </html>`;