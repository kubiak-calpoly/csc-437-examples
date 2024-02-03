export interface Profile {
  id: string;
  name: string;
  nickname: string | undefined;
  home: string;
  airports: string[];
  avatar: string | undefined;
  color: string | undefined;
}
