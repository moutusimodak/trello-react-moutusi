import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const APIKey = import.meta.env.VITE_APIKEY;
const APIToken = import.meta.env.VITE_TOKEN;
const BaseUrl = import.meta.env.VITE_BASE_URL

import Lists from "../components/Lists";

import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";


const BoardDetails = () => {
  const { id } = useParams();
  const [board, setBoard] = useState([]);
  const [lists, setLists] = useState([]);
  const [listName, setListName] = useState("");
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "", severity: "" });


  
  useEffect(() => {
    const fetchBoardDetails = async () => {
      try {
        const response = await axios.get(
          `${BaseUrl}/boards/${id}?key=${APIKey}&token=${APIToken}`
        );
        setBoard(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    //Fetching Lists
    const fetchLists = async () => {
      try {
        const response = await axios.get(
          `${BaseUrl}/boards/${id}/lists?filter=open&key=${APIKey}&token=${APIToken}`
        );
      
        
        setLists(response.data);
      } catch (error) {
        setError(error.message);
        setToast({
          open: true,
          message: error.message,
          severity: "error",
        });
      }
    };

    fetchBoardDetails();
    fetchLists();
  }, [id]);


  //Creating List
  const createList = async () => {
    try {
      const response = await axios.post(
        `${BaseUrl}/lists?name=${encodeURIComponent(
          listName
        )}&idBoard=${id}&key=${APIKey}&token=${APIToken}`
      );
      setLists((prevLists) => [...prevLists, response.data]);
      setListName("");
      setOpenModal(false);
      setToast({
        open: true,
        message: `List "${response.data.name}" is created successfully.`,
        severity: "success",
      });
    } catch (error) {
      setError(error.message);
      setToast({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  };


  //Deleting List
  const deleteList = async (listId) => {
    try {
      await axios.put(
        `${BaseUrl}/lists/${listId}/closed?value=true&key=${APIKey}&token=${APIToken}`
      );
      setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
      setToast({
        open: true,
        message: "The list is deleted successfully.",
        severity: "success",
      });
    } catch (error) {
      setError(error.message);
      setToast({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  };

  const handleToastClose = () => setToast({ ...toast, open: false });

  return (
    <Box
      sx={{ backgroundColor: "black", minHeight: "100vh", padding: 4, color: "white" }} 
    >
      <Typography variant="h4" gutterBottom>
        {board.name || "Board Details"}
      </Typography>

      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {lists.map((list) => (
          <Grid item key={list.id} xs={12} sm={6} md={3}> 
            <Lists list={list} onDelete={deleteList} />
          </Grid>
        ))}
        <Grid item>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => setOpenModal(true)}
            sx={{ color: "white" }} 
          >
            + Create List
          </Button>
        </Grid>
      </Grid>

   
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            backgroundColor: "white",
            padding: 4,
            borderRadius: 2,
            maxWidth: 400,
            margin: "auto",
            marginTop: "20vh",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Create a new list
          </Typography>
          <TextField
            fullWidth
            label="Enter list name"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            margin="normal"
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={createList}
              sx={{ color: "white" }} 
            >
              Create
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => setOpenModal(false)} 
              sx={{ color: "black" }} 
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      <Snackbar open={toast.open} autoHideDuration={6000} onClose={handleToastClose}>
        <Alert onClose={handleToastClose} severity={toast.severity} sx={{ width: "100%" }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BoardDetails;
