export function dispatchCustom(
  target: EventTarget,
  customType: string,
  detail?: any
) {
  const customEvent = new CustomEvent(customType, {
    bubbles: true,
    composed: true,
    detail
  });

  target.dispatchEvent(customEvent);
}

export function relay(
  event: Event,
  customType: string,
  detail?: any
) {
  const target = event.target as EventTarget;

  dispatchCustom(target, customType, detail);
}

export function originalTarget(
  event: Event,
  selector: string = "*"
): HTMLElement | undefined {
  const path = event.composedPath();
  const target = path.find((tgt) => {
    const el = tgt as HTMLElement;
    return el.tagName && el.matches(selector);
  });
  return target as HTMLElement || undefined;
}
