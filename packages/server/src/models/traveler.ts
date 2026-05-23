export interface Traveler {
  userid: string;
  name: string;
  nickname?: string;
  home: string;
  airports: Array<string>;
  avatar?: string;
  color?: string;
}
