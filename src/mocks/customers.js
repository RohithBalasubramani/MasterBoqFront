/**
 * Hierarchical dummy data for BOQ Master
 * ───────────────────────────────────────
 * • Customer  →  Projects  →  Panels
 * • Panel list is auto-built by makePanels()
 *   – guarantees 1-5 panels per project
 * • Project progress is propagated to each panel
 * • All IDs are globally unique:
 *      customer.id      : 1-5
 *      project.id       : 100-599 (customerId * 100 + incremental)
 *      panel.id         : projectId * 10 + incremental
 */

const makePanels = (projectId, projectProgress) => {
  const count = (projectId % 5) + 1; // 1-5 panels
  return Array.from({ length: count }, (_, i) => ({
    id: projectId * 10 + (i + 1),
    panelName: `LT Panel ${i + 1}`,
    type: "LT",
    progress: projectProgress, // keep simple; change if needed
  }));
};

const customers = [
  /* ───── Customer 1: ACME Industries ─────────────────────────── */
  {
    id: 1,
    name: "ACME Industries",
    projects: [
      {
        id: 101,
        projectName: "Factory Alpha",
        tender: "T001",
        quotation: "Q1001",
        progress: 85,
        createdAt: "2025-05-14T10:02:00Z",
        updatedAt: "2025-06-10T07:21:00Z",
        panels: makePanels(101, 85),
      },
      {
        id: 102,
        projectName: "Warehouse Omega",
        tender: "T002",
        quotation: "Q1002",
        progress: 40,
        createdAt: "2025-03-03T11:20:00Z",
        updatedAt: "2025-05-24T15:12:00Z",
        panels: makePanels(102, 40),
      },
      {
        id: 103,
        projectName: "Data Center Delta",
        tender: "T003",
        quotation: "Q1003",
        progress: 60,
        createdAt: "2025-02-18T08:17:00Z",
        updatedAt: "2025-06-12T09:55:00Z", // most-recent overall
        panels: makePanels(103, 60),
      },
      {
        id: 104,
        projectName: "Office Tower Sigma",
        tender: "T004",
        quotation: "Q1004",
        progress: 20,
        createdAt: "2024-12-01T08:00:00Z",
        updatedAt: "2025-05-01T13:00:00Z",
        panels: makePanels(104, 20),
      },
      {
        id: 105,
        projectName: "Lab Complex Beta",
        tender: "T005",
        quotation: "Q1005",
        progress: 0,
        createdAt: "2025-05-20T06:10:00Z",
        updatedAt: "2025-05-20T06:10:00Z",
        panels: makePanels(105, 0),
      },
      {
        id: 106,
        projectName: "Substation Kappa",
        tender: "T006",
        quotation: "Q1006",
        progress: 55,
        createdAt: "2024-11-12T09:00:00Z",
        updatedAt: "2025-04-27T11:45:00Z",
        panels: makePanels(106, 55),
      },
      {
        id: 107,
        projectName: "Hangar Echo",
        tender: "T007",
        quotation: "Q1007",
        progress: 100,
        createdAt: "2024-09-30T14:30:00Z",
        updatedAt: "2025-03-03T09:18:00Z",
        panels: makePanels(107, 100),
      },
      {
        id: 108,
        projectName: "Research Wing Phi",
        tender: "T008",
        quotation: "Q1008",
        progress: 75,
        createdAt: "2025-01-05T07:05:00Z",
        updatedAt: "2025-05-18T04:33:00Z",
        panels: makePanels(108, 75),
      },
      {
        id: 109,
        projectName: "Cold-Storage Zeta",
        tender: "T009",
        quotation: "Q1009",
        progress: 10,
        createdAt: "2025-04-11T12:00:00Z",
        updatedAt: "2025-04-30T12:40:00Z",
        panels: makePanels(109, 10),
      },
      {
        id: 110,
        projectName: "Terminal Rho",
        tender: "T010",
        quotation: "Q1010",
        progress: 30,
        createdAt: "2024-10-22T08:45:00Z",
        updatedAt: "2025-02-12T10:30:00Z",
        panels: makePanels(110, 30),
      },
    ],
  },

  /* ───── Customer 2: Beta LLC ───────────────────────────────── */
  {
    id: 2,
    name: "Beta LLC",
    projects: [
      {
        id: 201,
        projectName: "Mall Renovation A1",
        tender: "T011",
        quotation: "Q1011",
        progress: 90,
        createdAt: "2025-02-14T07:11:00Z",
        updatedAt: "2025-05-28T09:40:00Z",
        panels: makePanels(201, 90),
      },
      {
        id: 202,
        projectName: "Mall Renovation A2",
        tender: "T012",
        quotation: "Q1012",
        progress: 65,
        createdAt: "2025-02-14T07:12:00Z",
        updatedAt: "2025-05-28T09:42:00Z",
        panels: makePanels(202, 65),
      },
      {
        id: 203,
        projectName: "Mall Renovation A3",
        tender: "T013",
        quotation: "Q1013",
        progress: 45,
        createdAt: "2025-02-14T07:13:00Z",
        updatedAt: "2025-05-28T09:44:00Z",
        panels: makePanels(203, 45),
      },
      {
        id: 204,
        projectName: "Distribution Hub 01",
        tender: "T014",
        quotation: "Q1014",
        progress: 70,
        createdAt: "2024-12-11T11:10:00Z",
        updatedAt: "2025-06-01T08:22:00Z",
        panels: makePanels(204, 70),
      },
      {
        id: 205,
        projectName: "Distribution Hub 02",
        tender: "T015",
        quotation: "Q1015",
        progress: 25,
        createdAt: "2025-03-18T12:15:00Z",
        updatedAt: "2025-05-05T10:07:00Z",
        panels: makePanels(205, 25),
      },
      {
        id: 206,
        projectName: "Server Farm Beta",
        tender: "T016",
        quotation: "Q1016",
        progress: 5,
        createdAt: "2025-01-24T10:10:00Z",
        updatedAt: "2025-05-12T14:01:00Z",
        panels: makePanels(206, 5),
      },
      {
        id: 207,
        projectName: "Retail Flagship Z9",
        tender: "T017",
        quotation: "Q1017",
        progress: 100,
        createdAt: "2024-11-16T09:00:00Z",
        updatedAt: "2025-03-27T13:30:00Z",
        panels: makePanels(207, 100),
      },
    ],
  },

  /* ───── Customer 3: Gamma Group ───────────────────────────── */
  {
    id: 3,
    name: "Gamma Group",
    projects: [
      {
        id: 301,
        projectName: "Office Complex North",
        tender: "T018",
        quotation: "Q1018",
        progress: 15,
        createdAt: "2025-04-07T08:00:00Z",
        updatedAt: "2025-05-30T11:10:00Z",
        panels: makePanels(301, 15),
      },
      {
        id: 302,
        projectName: "Office Complex South",
        tender: "T019",
        quotation: "Q1019",
        progress: 55,
        createdAt: "2025-04-07T08:10:00Z",
        updatedAt: "2025-06-04T13:15:00Z",
        panels: makePanels(302, 55),
      },
      {
        id: 303,
        projectName: "Training Center G-1",
        tender: "T020",
        quotation: "Q1020",
        progress: 100,
        createdAt: "2024-10-10T10:00:00Z",
        updatedAt: "2025-03-22T09:00:00Z",
        panels: makePanels(303, 100),
      },
    ],
  },

  /* ───── Customer 4: Delta Power ───────────────────────────── */
  {
    id: 4,
    name: "Delta Power",
    projects: [
      {
        id: 401,
        projectName: "Solar Farm Delta-West",
        tender: "T021",
        quotation: "Q1021",
        progress: 65,
        createdAt: "2025-02-20T07:30:00Z",
        updatedAt: "2025-05-10T08:00:00Z",
        panels: makePanels(401, 65),
      },
      {
        id: 402,
        projectName: "Wind Grid Delta-East",
        tender: "T022",
        quotation: "Q1022",
        progress: 35,
        createdAt: "2025-03-05T09:25:00Z",
        updatedAt: "2025-05-22T10:20:00Z",
        panels: makePanels(402, 35),
      },
    ],
  },

  /* ───── Customer 5: Epsilon Solutions ─────────────────────── */
  {
    id: 5,
    name: "Epsilon Solutions",
    projects: [
      {
        id: 501,
        projectName: "R&D Center Epsilon",
        tender: "T023",
        quotation: "Q1023",
        progress: 0,
        createdAt: "2025-05-26T06:30:00Z",
        updatedAt: "2025-05-26T06:30:00Z",
        panels: makePanels(501, 0),
      },
    ],
  },
];

export default customers;
