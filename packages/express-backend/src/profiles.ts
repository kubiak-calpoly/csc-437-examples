import { Profile } from "./models/profile";

let profiles: Profile[] = [
  {
    userid: "blaze",
    name: "Blaze Pasquale",
    city: "Oakland, CA",
    airports: ["SFO", "OAK", "SJC"],
    color: "#8A81BE",
    avatar: "/data/avatars/Blaze Pasquale.png"
  },
  {
    userid: "mondy",
    name: "Pia Mondrian",
    nickname: "Mondy",
    city: "Ventura, CA",
    airports: ["LAX"]
  },
  {
    userid: "izzy",
    name: "Isabel Nuton",
    nickname: "Izzy",
    city: "San Miguel de Allende, Gto., Mexico",
    airports: ["BJX", "QRO"]
  }
];

export default {
  index: () => profiles,
  get: (userid: string) => {
    const matches = profiles.filter((p) => p.userid === userid);

    return matches.length ? matches[0] : undefined;
  }
};
