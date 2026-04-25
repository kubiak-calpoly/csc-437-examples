export interface Traveler {
  userid: string;
  name: string;
  nickname: string | undefined;
  home: string;
  airports: Array<string>;
  avatar: string | undefined;
  color: string | undefined;
}
