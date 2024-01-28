import { Profile } from "../models/Profile";

export default function profileView(profile: Profile) {
  const { name, nickname, city, airports, color, avatar } =
    profile;

  return `<h1>${name}</h1>
  <dt>Nickname</dt>
  <dd>${nickname}</dd>
  <dt>Home city</dt>
  <dd>${city}</dd>
  <dt>Home airport(s)</dt>
  ${airports.map((a) => `<dd>${a}</dd>`).join("\n")}
  <dt>Favorite Color</dt>
  <dd>${color}</dd>
  <dt>Avatar</dt>
  <dd>${avatar}</dd>
  `;
}
