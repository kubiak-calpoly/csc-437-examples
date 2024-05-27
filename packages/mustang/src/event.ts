export function relay(
  event: Event,
  customType: string,
  detail: any
) {
  const relay = event.currentTarget as EventTarget;
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
