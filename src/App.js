
import './App.css';
import NavBar from './components/NavBar'
import Box from '@mui/material/Box';
import { FileUploader } from "react-drag-drop-files";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

import { useEffect, useState } from 'react';

function App() {
  //   const [prediction, setPrediction] = useState("");
  //   const [model, setModel] = useState(null);
  //   useEffect(() => {
  //     const fetchPrediction = async () => {
  //        const response = await fetch(
  //           '//https://mockapihaqathon.azure-api.net/predict'
  //        );
  //        const data = await response.json();
  //        console.log(data);
  //        setPrediction(data);
  //     };
  //     fetchPrediction();
  //  }, []);
  
  //   const addModel =  async (data) => {
  //     await fetch('//https://mockapihaqathon.azure-api.net/model' ,{
  //       method: "POST",
  //       body: data,
  //       headers: {"Content-Type": "application/json"}
  //   })
  //   .then((response) => response.json())
  //   .then((data) =>{
  //     setModel((model) => [data,...model]);
  //   })
  //   .catch((error) => {
  //       console.log(error);
  //   });};
  const [fileList, updateFileList] = useState([{
    name: "",
    content: ""
  }]);

  const fileTypes = ["las","txt"];

  const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'content', label: 'Content', minWidth: 100 },
    { id: 'clasification', label: 'Clasification', minWidth: 170,},
  ];

  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChange = (evt) => { 
    
    var file = evt[0];
    console.log(file);
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      updateFileList(fileList => [...fileList, {name: file.name,content: reader.result}]);
    }
    reader.onerror = () => {
      console.log("errorReadingFile");
    }
  }
  
  

  return (
      <Box sx={{ flexGrow: 1 }} spacing={1} justifyContent="center" alignItems="center">
        <NavBar/>
        <div style={
          {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "50px",

          }
        }>
          <FileUploader multiple={true} handleChange={handleChange} name="file" types={fileTypes}/>
        </div>
        
       
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }} >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {fileList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <div style={{
                                  whiteSpace: "nowrap",
                                  textOverflow: "ellipsis",
                                  width: "300px",
                                  display: "block",
                                  overflow: "hidden"
                                }}>
                              {column.format && typeof value === 'number'? column.format(value): value}
                            </div>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[0, 10, 25, 100]}
          component="div"
          count={fileList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </Paper>
        {/* {
          fileList.map(file =>
            <div>
              <p>{file.name}</p>
              <p>{file.content}</p>
            </div>
            ) }
        <p>{`File name: ${fileList.length}`}</p> */}
        

      </Box>
  );
}

export default App;
