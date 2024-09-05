const staticParts = {
  stylesheets: ["/styles/destination.css"],
  styles: [
    `main.page {
        --page-grids: 8;
        grid-template-areas:
          "hdr hdr img img img img img img"
          "acc acc img img img img img img"
          "-- -- img img img img img img"
          "exc exc exc exc exc exc exc exc"
          "ftr ftr ftr ftr ftr ftr ftr ftr";
      }
      @media screen and (max-width: 48rem) {
        main.page {
          --page-grids: 6;
          grid-template-areas:
            "hdr hdr acc acc acc acc"
            "img img img img img img"
            "exc exc exc exc exc exc";
            "ftr ftr ftr ftr ftr ftr";
        }
      }`
  ],
  scripts: [
    `
      import { define, Auth } from "@calpoly/mustang";
      import { AccommodationElement } from "/scripts/accommodation.js";
      import { DestinationView } from "/scripts/destination-view.js";

      define({
        "destination-view": DestinationView,
        "mu-auth": Auth.Provider
      });
      `
  ]
};
export class DestinationPage {
  static render(tourId: string, destIndex: number) {
    return {
      ...staticParts,
      body: `<body>
      <mu-auth provides="blazing:auth">
        <article>
          <blz-header>
            <a href="../">&larr; Tour</a>
          </blz-header>
          <main class="page">
            <destination-view
              src-tour="/api/tours/${tourId}"
              destination-index="${destIndex}">
            </destination-view>
          </main>
        </article>
      </mu-auth>
    </body>`
    };
  }
}
