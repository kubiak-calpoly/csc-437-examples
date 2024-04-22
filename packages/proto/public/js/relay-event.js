export function relayEvent(event, customType, detail) {
  const relay = event.currentTarget;
  const customEvent = new CustomEvent(customType, {
    bubbles: true,
    detail
  });

  relay.dispatchEvent(customEvent);
  event.stopPropagation();
}
