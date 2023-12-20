import { connect } from "./services";
import { Profile } from "./models/Profile";
import profiles from "./services/profiles";
import credentials from "./services/credentials";

let test_profiles: Array<Profile> = [
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

connect("blazing");

Promise.all(test_profiles.map(profiles.create))
  .then((docs) =>
    docs.forEach((doc) =>
      console.log("Profile created:", JSON.stringify(doc))
    )
  )
  .catch((err) => console.log("Errors loading test profiles"));

credentials
  .create("blaze", "blaze")
  .then((name) => console.log("Credentials created", name))
  .catch((err) => console.log("Error creading credentials"));
