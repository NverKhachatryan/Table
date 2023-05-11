'use client'
import { useState } from "react";
import styles from "../TableComponent.module.css";

const TableComponent = () => {
  const [rows, setRows] = useState<(number | "")[][]>([[""]]);
  const [rowInput, setRowInput] = useState<number>(0);
  const [colInput, setColInput] = useState<number>(0);

  const addRow = () => {
    const newRow = new Array(rows[0].length).fill("");
    setRows([...rows, newRow]);
  };
  
  const addColumn = () => {
    const updatedRows = rows.map((row) => [...row, "" as number | ""]);
    setRows(updatedRows);
  };

  const deleteRow = () => {
    if (rowInput >= 0 && rowInput < rows.length) {
      if (rows.length > 1) {
        const updatedRows = rows.filter((_, rowIndex) => rowIndex !== rowInput);
        setRows(updatedRows);
      } else {
        alert("Cannot delete the last cell.");
      }
    } else {
      alert("Invalid row number.");
    }
  };
  
  const deleteColumn = () => {
    if (colInput >= 0 && colInput < rows[0].length) {
      if (rows[0].length > 1) {
        const updatedRows = rows.map((row) => row.filter((_, colIndex) => colIndex !== colInput));
        setRows(updatedRows);
      } else {
        alert("Cannot delete the last cell.");
      }
    } else {
      alert("Invalid column number.");
    }
  };
  

  const updateCellValue = (rowIndex: number, colIndex: number, value: string) => {
    const parsedValue = value === "" ? "" : isNaN(Number(value)) ? rows[rowIndex][colIndex] : Number(value);
    const updatedRows = [...rows];
    updatedRows[rowIndex][colIndex] = parsedValue;
    setRows(updatedRows);
  };

  const getCellValue = () => {
    if (rowInput >= 0 && colInput >= 0 && rowInput < rows.length && colInput < rows[0].length) {
      const cellValue = rows[rowInput][colInput] === "" ? "empty" : rows[rowInput][colInput];
      alert(`Value at row ${rowInput} and column ${colInput} is: ${cellValue}`);
    } else {
      alert("Invalid row or column number.");
    }
  };

  return (
    <>
    <h1>Table</h1>
    <div className={styles.tableContainer}>
      <table>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="number"
                    value={cell === "" ? "" : String(cell)}
                    onChange={(e) => updateCellValue(rowIndex, colIndex, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addRow}>Add Row</button>
      <button onClick={addColumn}>Add Column</button>
      <button onClick={deleteRow}>Delete Row</button>
      <button onClick={deleteColumn}>Delete Column</button>
      <div>
        <input
          type="number"
          placeholder="Row"
          value={rowInput}
          onChange={(e) => setRowInput(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Column"
          value={colInput}
          onChange={(e) => setColInput(Number(e.target.value))}
        />
        <button onClick={getCellValue}>Get Cell Value</button>
      </div>
    </div>
    </>
  );
};

export default TableComponent;