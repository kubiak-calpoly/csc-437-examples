export interface Profile {
  id: string;
  name: string;
<<<<<<< HEAD
  nickname?: string;
  home: string;
  airports: Array<String>;
  avatar?: string;
  color?: string;
=======
  nickname: string | undefined;
  home: string;
  airports: Array<String>;
  avatar: string | undefined;
  color: string | undefined;
>>>>>>> main
}
