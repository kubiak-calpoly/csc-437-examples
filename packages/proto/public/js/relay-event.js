export function relayEvent(event, customType, detail) {
  const relay = event.currentTarget;
  const customEvent = new CustomEvent(customType, {
    bubbles: true,
    composed: true,
    detail
  });

  console.log(
    `Relaying event from ${event.type}:`,
    customEvent
  );

  relay.dispatchEvent(customEvent);
  event.stopPropagation();
}
