import { css } from "lit";

const styles = css`
  svg.icon {
    --size-icon: var(--size-icon-normal);

    display: inline-block;
    height: var(--size-icon);
    width: var(--size-icon);
    vertical-align: calc(0.5em - 0.5 * var(--size-icon));
    fill: currentColor;
  }
`;

export default styles;
