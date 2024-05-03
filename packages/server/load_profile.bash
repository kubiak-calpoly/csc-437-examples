curl --request POST --header "Content-Type: application/json" \
--data '{"userid":"blaze","name":"Blaze Pasquale","city":"Oakland, CA","airports":["SFO", "OAK", "SJC"]}' \
http://localhost:3000/api/profiles

curl --request POST --header "Content-Type: application/json" \
--data '{"userid":"izzy","name":"Isabel Nuton","nickname":"Izzy","city":"San Miguel de Allende, Gto., Mexico","airports": ["BJX", "QRO"]}' \
http://localhost:3000/api/profiles

curl --request POST --header "Content-Type: application/json" \
--data '{"userid":"mondy","name":"Pia Mondrian","nickname":"Mondy","city":"Ventura, CA","airports": ["LAX"]}' \
http://localhost:3000/api/profiles


