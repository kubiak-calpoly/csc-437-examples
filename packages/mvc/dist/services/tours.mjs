// in-memory
let tours = [
    {
        id: "tour0",
        name: "Trip to Italy",
        destinations: [
            {
                name: "Venice",
                startDate: new Date("2024-10-14"),
                endDate: new Date("2024-10-18"),
                icon: new URL("/icons/italy.svg#icon-venice"),
                featuredImage: new URL("/images/preview/Canal_Grande_Chiesa_della_Salute_e_Dogana_dal_ponte_dell_Accademia.jpg"),
                accommodations: [
                    {
                        name: "Locanda San Barnaba",
                        nights: 4,
                        link: undefined
                    }
                ],
                excursions: [
                    {
                        name: "Murano",
                        link: undefined,
                        type: undefined
                    },
                    {
                        name: "Piazza San Marco",
                        link: undefined,
                        type: "walking"
                    }
                ]
            }
        ]
    }
];
export function get(id) {
    return tours[0];
}
