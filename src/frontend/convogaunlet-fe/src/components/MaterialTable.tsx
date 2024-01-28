import MaterialTable from "material-table"
import {createTheme, ThemeProvider} from "@mui/material";

const Table = () => {
  const defaultMaterialTheme = createTheme();

  const tableColumns = [
    { title: 'Gesture' , field: 'gesture' },
    { title: 'Word', field: 'word' }
  ]

  const tableData = [
    { title: 'AAAAA', word: 'Hello'},
    { title: 'ABABA', word: 'Hello'},
    { title: 'BABAB', word: 'Hello'},
    { title: 'ABCBA', word: 'Hello'},
    { title: 'CBABC', word: 'Hello'},
  ]

  const tableActions = [
    {
      icon: 'edit',
      tooltip: 'Edit Gesture',
      onClick: (_event: never, rowData: string) => alert("You edited " + rowData)
    } ,
    {
      icon: 'delete',
      tooltip: 'Delete Gesture',
      onClick: (_event: never, rowData: string) => alert("You deleted " + rowData)
    }
  ]

  return (
      <div>
        <ThemeProvider theme={defaultMaterialTheme}>
          <MaterialTable columns={tableColumns} data={tableData}></MaterialTable>
        </ThemeProvider>
      </div>
  )
}

export default Table;
