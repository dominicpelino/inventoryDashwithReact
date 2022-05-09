import React, {useState} from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { serverCalls } from '../../api'; 
import { useGetData } from '../../custom-hooks';
import { 
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle 
} from '@mui/material'; 
import { HeroForm } from '../../components/HeroForm';

interface gridData{
    data:{
      id?:string;
    }
  }

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
  },
  {
    field: 'alias',
    headerName: 'Alias',
    width: 150,
  },
  {
    field: 'species',
    headerName: 'Species',
    width: 110,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 160,
  },
  {
    field: 'powers',
    headerName: 'Powers',
    width: 160,
  },
  {
    field: 'max_speed',
    headerName: 'Max Speed',
    width: 160,
  },
  {
    field: 'max_strength',
    headerName: 'Max Strength',
    width: 160,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];


export const DataTable =  () => {
  
    let { heroData, getData } = useGetData();
    let [open, setOpen] = useState(false);
    let [gridData, setData] = useState<GridSelectionModel>([])
  
    let handleOpen = () => {
      setOpen(true)
    }
  
    let handleClose = () => {
      setOpen(false)
    }
  
    let deleteData = () => {
      serverCalls.delete(`${gridData[0]}`)
      getData()
    }
  
    console.log(gridData) 
  
    return (
        <div style={{ height: 400, width: '100%' }}>
        <h2>Heroes In Inventory</h2>
        <DataGrid 
            rows={heroData} 
            columns={columns} 
            pageSize={5} 
            checkboxSelection 
            onSelectionModelChange = {(newSelectionModel) => {setData(newSelectionModel);}}
            {...heroData}/>

        <Button onClick={handleOpen} color='primary'>Update</Button>
        <Button onClick={deleteData} color="warning">Delete</Button>

        {/*Dialog Pop Up */}
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update Hero</DialogTitle>
        <DialogContent>
            <DialogContentText>Update Hero id: {gridData[0]}</DialogContentText>
            <HeroForm id={`${gridData[0]}`}/>
        </DialogContent>
        <DialogActions>
            <Button onClick = {handleClose} color="primary">Cancel</Button>
            <Button onClick={handleClose} color = "primary">Done</Button> 
        </DialogActions>
        </Dialog>
        </div>
    );
  }