export function relay(
  event: Event,
  customType: string,
  detail?: any
) {
  const relay = event.target as EventTarget;
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

export function originalTarget(
  event: Event,
  selector: string = "*"
) {
  const path = event.composedPath();
  return path.find((tgt) => {
    const el = tgt as HTMLElement;
    return el.tagName && el.matches(selector);
  });
}
