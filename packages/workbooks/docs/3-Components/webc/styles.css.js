export default `/* Kram: CSS in Scene 9 */
command-group + command-group {
  --command-group-display-top-hr: none;
}

/* Kram: CSS in Scene 11 */
/* CSS to clean up the demo */

.menu-bar {
  display: flex;
  position: relative;
  gap: 4em;
  background: #f0f0f0;
  padding: 0 0.5em;
}

.menu-bar::after {
  content: "";
  position: absolute;
  height: 4px;
  left: 0;
  right: 0;
  bottom: 0;
  border-bottom: 4px solid #888;
}

.menu-bar > * {
  padding: 0.5em 0;
}
`;