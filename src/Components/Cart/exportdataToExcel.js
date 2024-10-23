import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

/**
 * Exports the provided data to an Excel file with custom formatting.
 * @param {Array} data - Array of objects containing the data to be exported.
 * @param {string} fileName - The name of the Excel file to be generated.
 */
export const exportDataToExcel = (data, fileName = "boq.xlsx") => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("by BOQ Master");

  // Define styles
  const headerStyle = {
    font: { bold: true, color: { argb: "FFFFFF" } },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "09193D" } },
  };
  const headingStyle = {
    font: { bold: true, color: { argb: "09193D" } },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "DDEBF7" } },
  };

  // Define columns with proper widths
  worksheet.columns = [
    { header: "ProductName", key: "ProductName", width: 80 },
    { header: "Brand", key: "Brand", width: 20 },
    { header: "SubCategory", key: "SubCategory", width: 30 },
    { header: "SubCategory2", key: "SubCategory2", width: 30 },
    { header: "SubCategory3", key: "SubCategory3", width: 30 },
    { header: "SubCategory5", key: "SubCategory5", width: 30 },
    { header: "Quantity", key: "Quantity", width: 10 },
    { header: "GSTPercentage", key: "GSTPercentage", width: 15 },
    { header: "Price", key: "Price", width: 15 },
  ];

  // Apply styles to the header row (first row)
  worksheet.getRow(1).eachCell((cell) => {
    cell.style = headerStyle;
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  // Add header row with styles
  //   worksheet
  //     .addRow({
  //       ProductName: "ProductName",
  //       Brand: "Brand",
  //       SubCategory: "SubCategory",
  //       SubCategory2: "SubCategory2",
  //       SubCategory3: "SubCategory3",
  //       SubCategory5: "SubCategory5",
  //       Quantity: "Quantity",
  //       GSTPercentage: "GSTPercentage",
  //       Price: "Price",
  //     })
  //     .eachCell((cell) => {
  //       cell.style = headerStyle;
  //     });

  // Group data by headings and add rows with styles
  let currentHeading = "";

  data.forEach((item) => {
    const {
      Heading,
      ProductName,
      Brand,
      SubCategory,
      SubCategory2,
      SubCategory3,
      SubCategory5,
      quantity,
      GSTPercentage,
      Price,
    } = item;

    // Add a new heading row if the heading changes
    if (Heading !== currentHeading) {
      currentHeading = Heading;
      const headingRow = worksheet.addRow({
        ProductName: `${Heading} `,
      });
      headingRow.eachCell((cell) => {
        cell.style = headingStyle;
      });
      worksheet.mergeCells(`A${headingRow.number}:I${headingRow.number}`); // Merge cells for the heading
    }

    // Add the data row
    worksheet.addRow({
      ProductName,
      Brand,
      SubCategory,
      SubCategory2,
      SubCategory3,
      SubCategory5,
      Quantity: quantity,
      GSTPercentage,
      Price: parseFloat(Price).toFixed(2),
    });
  });

  // Draw borders around the data
  worksheet.eachRow((row) => {
    row.eachCell((cell) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
  });

  // Generate the Excel file and download it
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, fileName);
  });
};
