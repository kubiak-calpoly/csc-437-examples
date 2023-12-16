import { Profile } from "../models/Profile";

// in-memory DB
let profiles: Array<Profile> = [
  {
    id: "blaze",
    name: "Blaze Pasquale",
    nickname: undefined,
    home: "Oakland, CA",
    airports: ["SFO", "OAK", "SJC"],
    color: "#8A81BE",
    avatar: "/data/avatars/Blaze Pasquale.png"
  },
  {
    id: "mondy",
    name: "Pia Mondrian",
    nickname: "Mondy",
    home: "Ventura, CA",
    airports: ["LAX"],
    avatar: undefined,
    color: undefined
  },
  {
    id: "izzy",
    name: "Isabel Nuton",
    nickname: "Izzy",
    home: "San Miguel de Allende, Gto., Mexico",
    airports: ["BJX", "QRO"],
    avatar: undefined,
    color: undefined
  }
];

export function get(id: String): Profile {
  const found = profiles.find((t) => t.id === id);

  if (found) return found;

  throw `Profile not found: ${id}`;
}

export default { get };
