import { restore, filterWidget, visitDashboard } from "__support__/e2e/cypress";
import { SAMPLE_DATABASE } from "__support__/e2e/cypress_sample_database";

const { PEOPLE, PEOPLE_ID } = SAMPLE_DATABASE;

const filter = {
  name: "Location",
  slug: "location",
  id: "5aefc725",
  type: "string/=",
  sectionId: "location",
};

const questionDetails = {
  name: "15689",
  query: { "source-table": PEOPLE_ID },
};

describe("issue 15689", () => {
  beforeEach(() => {
    restore();
    cy.signInAsAdmin();
  });

  it("dashboard filters should allow multiple selections (metabase#15689)", () => {
    cy.createQuestionAndDashboard({ questionDetails }).then(
      ({ body: { id, card_id, dashboard_id } }) => {
        cy.addFilterToDashboard({ filter, dashboard_id });

        // Connect filter to the card
        cy.request("PUT", `/api/dashboard/${dashboard_id}/cards`, {
          cards: [
            {
              id,
              card_id,
              row: 0,
              col: 0,
              sizeX: 12,
              sizeY: 9,
              visualization_settings: {},
              parameter_mappings: [
                {
                  parameter_id: "5aefc725",
                  card_id,
                  target: ["dimension", ["field", PEOPLE.STATE, null]],
                },
              ],
            },
          ],
        });

        visitDashboard(dashboard_id);
      },
    );

    filterWidget().click();

    cy.findByText("AK").click();
    cy.findByText("CA").click();

    cy.findByTestId("AK-filter-value").within(() =>
      cy.findByRole("checkbox").should("be.checked"),
    );
    cy.findByTestId("CA-filter-value").within(() =>
      cy.findByRole("checkbox").should("be.checked"),
    );
  });
});
