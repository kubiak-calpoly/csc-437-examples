export interface Profile {
  id: string;
  name: string;
  nickname: string | undefined;
  home: string;
  airports: Array<String>;
  avatar: string | undefined;
  color: string | undefined;
}
