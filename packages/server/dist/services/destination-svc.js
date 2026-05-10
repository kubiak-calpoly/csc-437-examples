const destinations = {
    venice: {
        name: "Venice",
        startDate: new Date("2024-10-14"),
        endDate: new Date("2024-10-17"),
        location: { lat: 45.4375, lon: 12.335833 },
        featuredImage: "/images/full/Canal_Grande_Chiesa_della_Salute_e_Dogana_dal_ponte_dell_Accademia.jpg",
        accommodations: [
            {
                name: "Locanda San Barnaba",
                checkIn: new Date("2024-10-14"),
                checkOut: new Date("2024-10-17"),
                persons: 4,
                roomType: "2Q",
                rate: {
                    amount: 190,
                    currency: "EUR"
                }
            }
        ],
        excursions: [
            {
                name: "Vaporetto trip to Murano",
                type: "boat"
            },
            {
                name: "Walking tour of Piazza San Marco",
                type: "walking"
            }
        ]
    },
};
function get(id) {
    return destinations[id];
}
export default { get };
