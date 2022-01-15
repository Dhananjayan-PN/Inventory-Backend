import React, {useState, useEffect} from "react";
import { 
  Button,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Autocomplete,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";

const App = () => {
  const [items, setItems] = useState([]);
  const [locations, setLocations] = useState({});
  const [itemDiag, setItemDiag] = useState(false);
  const [locationDiag, setLocationDiag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemLocation, setItemLocation] = useState("");
  const [itemUnits, setItemUnits] = useState("");
  const [itemCost, setItemCost] = useState("");
  const [locName, setLocName] = useState("");
  const [locCapacity, setLocCapacity] = useState("");
  const [locAddress, setLocAddress] = useState("");
  const [locCity, setLocCity] = useState("");
  const [locState, setLocState] = useState("");
  const [locZip, setLocZip] = useState("");
  const [editId, setEditId] = useState(null);
  
  useEffect(() => {
    getLocations();
  }, []);
  
  const getItems = () => {
    axios.get("/api/item/get-all")
      .then((response) => {
        setItems(response.data);
        setLoading(false);
      });
  };
  
  const getLocations = () => {
    setLoading(true);
    axios.get("/api/location/get-all")
      .then((response) => {
        let locs = {}
        for (const loc of response.data) {
          locs[loc._id] = loc;
        }
        setLocations(locs);
        getItems();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const toggleItemDialog = () => {
    setItemDiag(!itemDiag);
  };
  
  const toggleLocationDialog = () => {
    setLocationDiag(!locationDiag);
    setLocName("");
    setLocCapacity("");
    setLocAddress("");
    setLocCity("");
    setLocState("");
    setLocZip("");
  };
  
  const createItem = () => {
    let newItem = {
      name: itemName,
      location: itemLocation,
      units: itemUnits,
      cost: itemCost
    }
    axios.post("/api/item/create",newItem)
      .then((response) => {
        getLocations();
        setItemDiag(false);
        setItemName("");
        setItemLocation("");
        setItemUnits("");
        setItemCost("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const deleteItem = (itemId) => {
    axios.delete(`/api/item/${itemId}`)
      .then((response) => {
        getLocations();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  const updateItem = () => {
    let updatedItem = {
      name: itemName,
      location: itemLocation,
      units: itemUnits,
      cost: itemCost
    }
    axios.put(`/api/item/${editId}`, updatedItem)
      .then((response) => {
        getLocations();
        setItemDiag(false);
        setItemName("");
        setItemLocation("");
        setItemUnits("");
        setItemCost("");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  const createLocation = () => {
    let newLocation = {
      name: locName,
      capacity: locCapacity,
      address: locAddress,
      city: locCity,
      state: locState,
      zip: locZip
    }
    axios.post("/api/location/create",newLocation)
      .then((response) => {
        getLocations();
        setLocationDiag(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (
    <div className="App" style={{padding: 50}}>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
        <Typography gutterBottom variant="h4">
          Inventory
        </Typography>
        {!loading && <div>
          <Button variant="outlined" startIcon={<AddIcon />} style={{marginRight: 10}} onClick={() => {
            setEditId(null);
            toggleItemDialog();
          }}>Item</Button>
          <Button variant="outlined" startIcon={<AddIcon />} onClick={toggleLocationDialog}>Location</Button>
        </div>}
      </div>
      {loading ?
      <CircularProgress style={{display: "flex", justifyContent: "center", width: "100%", marginTop: 60}} /> :
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650}}>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Location</TableCell>
              <TableCell align="right">Units</TableCell>
              <TableCell align="right">Cost ($)</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow
                key={item._id}
              >
                <TableCell>{item.name}</TableCell>
                <TableCell>{`${locations[item.location].name}, ${locations[item.location].address}, ${locations[item.location].city}, ${locations[item.location].state}, ${locations[item.location].zip}`}</TableCell>
                <TableCell align="right">{item.units}</TableCell>
                <TableCell align="right">{item.cost}</TableCell>
                <TableCell align="center">
                  <IconButton style={{marginRight: 10}} color="primary" onClick={() => {
                    setEditId(item._id);
                    setItemName(item.name);
                    setItemLocation(item.location);
                    setItemUnits(item.units);
                    setItemCost(item.cost);
                    toggleItemDialog();
                  }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => deleteItem(item._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>))}
          </TableBody>
        </Table>
      </TableContainer>}
      <Dialog open={itemDiag} onClose={toggleItemDialog}>
        <DialogTitle>{editId ? "Edit Item" : "Add Item"}</DialogTitle>
        <DialogContent>
          <TextField label="Name" variant="standard" fullWidth value={itemName} onChange={(e) => setItemName(e.target.value)}/>
          <Autocomplete
            value={locations[itemLocation] ?? null}
            style={{marginTop: 10}}
            options={Object.values(locations)}
            getOptionLabel={(option) => `${option.name}, ${option.address}, ${option.city}, ${option.state}, ${option.zip}`}
            renderInput={(params) => <TextField {...params} label="Location" variant="standard" fullWidth />}
            onChange={(e, newValue) => newValue ? setItemLocation(newValue._id): setItemLocation("")}
          />
          <TextField style={{marginTop: 10}} label="Units" type="number" variant="standard" fullWidth value={itemUnits} onChange={(e) => setItemUnits(e.target.value)}/>
          <TextField style={{marginTop: 10}} label="Cost" type="number" variant="standard" fullWidth value={itemCost} onChange={(e) => setItemCost(e.target.value)}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            toggleItemDialog();
            setItemName("");
            setItemLocation("");
            setItemUnits("");
            setItemCost("");
          }} color="error">Cancel</Button>
          <Button onClick={() => editId ? updateItem() : createItem()}>{editId ? "Save" : "Create"}</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={locationDiag} onClose={toggleLocationDialog}>
        <DialogTitle>Add Location</DialogTitle>
        <DialogContent>
          <TextField label="Name" variant="standard" fullWidth value={locName} onChange={(e) => setLocName(e.target.value)}/>
          <TextField style={{marginTop: 10}} label="Capacity" type="number" variant="standard" fullWidth value={locCapacity} onChange={(e) => setLocCapacity(e.target.value)}/>
          <TextField style={{marginTop: 10}} label="Address" variant="standard" fullWidth value={locAddress} onChange={(e) => setLocAddress(e.target.value)}/>
          <TextField style={{marginTop: 10}} label="City" variant="standard" fullWidth value={locCity} onChange={(e) => setLocCity(e.target.value)}/>
          <TextField style={{marginTop: 10}} label="State" variant="standard" fullWidth value={locState} onChange={(e) => setLocState(e.target.value)}/>
          <TextField style={{marginTop: 10}} label="Zip Code" type="number" variant="standard" fullWidth value={locZip} onChange={(e) => setLocZip(e.target.value)}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleLocationDialog} color="error">Cancel</Button>
          <Button onClick={createLocation}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default App;
