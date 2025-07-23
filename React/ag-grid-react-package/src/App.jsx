import { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import * as XLSX from "xlsx";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./App.css"; // Custom CSS for vertical lines

// Register the AllCommunityModule
ModuleRegistry.registerModules([AllCommunityModule]);

function App() {
  const [rowData, setRowData] = useState([
    {
      itemName: "Milk",
      description:
        "Milk Boxes packed in large quantities for dairy distribution",
      category: "Dairy",
      unit: "MILLILITRE",
      alternateUnit: "",
      conversionRate: "",
      itemCode: "MILK1",
      hsnCode: "4010",
      gstTaxRate: 0.25,
      salesPrice: "40 Inclusive",
      salesTax: "",
      purchasePrice: "100 Inclusive",
      purchaseTax: "",
    },
    {
      itemName: "Wallpaper",
      description:
        "Orange wall paper with high-quality design for home decoration",
      category: "Decor",
      unit: "CUBIC CENTIMETER",
      alternateUnit: "",
      conversionRate: "",
      itemCode: "WP32",
      hsnCode: "05",
      gstTaxRate: 5.0,
      salesPrice: "10 Inclusive",
      salesTax: "",
      purchasePrice: "200 Inclusive",
      purchaseTax: "",
    },
    {
      itemName: "Jeans",
      description: "Stretchable Broadband fabric for durable clothing",
      category: "Clothing",
      unit: "PIECES",
      alternateUnit: "",
      conversionRate: "",
      itemCode: "CJ16",
      hsnCode: "5213240",
      gstTaxRate: 3.0,
      salesPrice: "700 Exclusive",
      salesTax: "",
      purchasePrice: "900 Inclusive",
      purchaseTax: "",
    },
    {
      itemName: "Biscuits",
      description: "Sweet Biscuits made with premium ingredients",
      category: "Food",
      unit: "UNITS",
      alternateUnit: "",
      conversionRate: "",
      itemCode: "CODE322",
      hsnCode: "099601",
      gstTaxRate: 0.0,
      salesPrice: "50 Exclusive",
      salesTax: "",
      purchasePrice: "250 Exclusive",
      purchaseTax: "",
    },
    ...Array(10)
      .fill()
      .map(() => ({
        itemName: "",
        description: "",
        category: "",
        unit: "",
        alternateUnit: "",
        conversionRate: "",
        itemCode: "",
        hsnCode: "",
        gstTaxRate: null,
        salesPrice: "",
        salesTax: "",
        purchasePrice: "",
        purchaseTax: "",
      })),
  ]);

  const [columnDefs] = useState([
    {
      field: "itemName",
      headerName: "Item Name",
      editable: true,
      sortable: true,
      filter: true,
      width: 120,
    },
    {
      field: "description",
      headerName: "Description",
      editable: true,
      sortable: true,
      filter: true,
      width: 200,
    },
    {
      field: "category",
      headerName: "Category",
      editable: true,
      sortable: true,
      filter: true,
      width: 120,
    },
    {
      field: "unit",
      headerName: "Unit",
      editable: true,
      sortable: true,
      filter: true,
      width: 150,
    },
    {
      field: "alternateUnit",
      headerName: "Alternate Unit",
      editable: true,
      sortable: true,
      filter: true,
      width: 120,
    },
    {
      field: "conversionRate",
      headerName: "Conversion Rate",
      editable: true,
      sortable: true,
      filter: true,
      width: 120,
    },
    {
      field: "itemCode",
      headerName: "Item Code",
      editable: true,
      sortable: true,
      filter: true,
      width: 120,
    },
    {
      field: "hsnCode",
      headerName: "HSN Code",
      editable: true,
      sortable: true,
      filter: true,
      width: 120,
    },
    {
      field: "gstTaxRate",
      headerName: "GST Tax Rate(%)",
      editable: true,
      sortable: true,
      filter: true,
      width: 120,
      valueParser: (params) => parseFloat(params.newValue) || null,
      valueFormatter: (params) =>
        params.value !== null ? params.value.toString() : "",
    },
    {
      field: "salesPrice",
      headerName: "Sales Price",
      editable: true,
      sortable: true,
      filter: true,
      width: 120,
    },
    {
      field: "salesTax",
      headerName: "Sales Tax",
      editable: true,
      sortable: true,
      filter: true,
      width: 120,
    },
    {
      field: "purchasePrice",
      headerName: "Purchase Price",
      editable: true,
      sortable: true,
      filter: true,
      width: 120,
    },
    {
      field: "purchaseTax",
      headerName: "Purchase Tax",
      editable: true,
      sortable: true,
      filter: true,
      width: 120,
    },
  ]);

  const gridRef = useRef();

  const addRow = () => {
    setRowData((prevRowData) => [
      ...prevRowData,
      {
        itemName: "",
        description: "",
        category: "",
        unit: "",
        alternateUnit: "",
        conversionRate: "",
        itemCode: "",
        hsnCode: "",
        gstTaxRate: null,
        salesPrice: "",
        salesTax: "",
        purchasePrice: "",
        purchaseTax: "",
      },
    ]);
  };

  const onCellValueChanged = (params) => {
    const rowNode = params.node;
    const data = rowNode.data;
    if (data.itemName && !rowNode.isRowPinned()) {
      const emptyRows = rowData.filter(
        (row) => !row.itemName && !rowNode.isRowPinned()
      ).length;
      if (emptyRows < 10) {
        setRowData((prevRowData) => [
          ...prevRowData,
          {
            itemName: "",
            description: "",
            category: "",
            unit: "",
            alternateUnit: "",
            conversionRate: "",
            itemCode: "",
            hsnCode: "",
            gstTaxRate: null,
            salesPrice: "",
            salesTax: "",
            purchasePrice: "",
            purchaseTax: "",
          },
        ]);
      }
    }
  };

  const handleSubmit = () => {
    // Filter out empty rows for export (only rows with itemName)
    const dataToExport = rowData.filter((row) => row.itemName);
    console.log("Data to be submitted:", dataToExport);

    // Create a worksheet
    const ws = XLSX.utils.json_to_sheet(dataToExport);

    // Set column widths based on columnDefs widths (convert pixels to character units, approximate 1px = 0.5 characters)
    ws["!cols"] = columnDefs.map((colDef) => ({
      wch: Math.max(10, Math.round(colDef.width / 2)), // Minimum width of 10 characters
    }));

    // Create a workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    // Generate buffer and trigger download
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "exported_data.xlsx";
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "10px" }}>
        <button
          onClick={addRow}
          style={{ marginRight: "10px", padding: "5px 10px" }}
        >
          Add Items
        </button>
        <button onClick={handleSubmit} style={{ padding: "5px 10px" }}>
          Submit
        </button>
      </div>
      <div
        className="ag-theme-alpine"
        style={{ height: "auto", width: "100%", minWidth: "1560px", minHeight: "fit-content" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          editType="fullRow"
          defaultColDef={{
            resizable: true,
            suppressSizeToFit: true,
            wrapText: true,
            autoHeight: true,
            cellStyle: { borderRight: "1px solid #ccc" },
          }}
          onGridReady={(params) => {
            params.api.sizeColumnsToFit();
          }}
          onCellValueChanged={onCellValueChanged}
        />
      </div>
    </div>
  );
}

export default App;
