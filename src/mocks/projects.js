/**
 * Mock project records used by the DashboardPage.
 * Replace with a real API call once your backend is ready.
 * -----------------------------------------------------------------
 *  NOTE: every object key matches the column names expected by
 *  ProjectTable and KPI calculations. Feel free to extend as needed.
 */

const projects = [
  {
    id: 1,
    customer: "ACME Corp",
    projectName: "Factory A",
    tender: "T001",
    quotation: "Q1001",
    panels: 5,
    progress: 60,
  },
  {
    id: 2,
    customer: "Beta LLC",
    projectName: "Warehouse B",
    tender: "T002",
    quotation: "Q1002",
    panels: 3,
    progress: 35,
  },
  {
    id: 3,
    customer: "Gamma Industries",
    projectName: "Office Complex",
    tender: "T003",
    quotation: "Q1003",
    panels: 8,
    progress: 80,
  },
];

export default projects;
