export interface Profile {
  id: string;
  name: string;
  nickname?: string;
  home: string;
  airports: Array<String>;
  avatar?: string;
  color?: string;
}
