import React, { useEffect, useState } from "react";
import axios from "axios";

const APIKey = import.meta.env.VITE_APIKEY;
const APIToken = import.meta.env.VITE_TOKEN;
const BaseUrl = import.meta.env.VITE_BASE_URL;

import CheckListItems from "./CheckListItems";


import {
  Box,
  Button,
  Typography,
  IconButton,
  Modal,
  TextField,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";




const CheckList = ({ cardId }) => {
  const [checkLists, setCheckLists] = useState([]);
  const [error, setError] = useState(null);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [newCheckListName, setNewCheckListName] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  //Fetching Checklist
  useEffect(() => {
    const fetchCheckLists = async () => {
      try {
        const response = await axios.get(
          `${BaseUrl}/cards/${cardId}/checklists?key=${APIKey}&token=${APIToken}`
        );
        setCheckLists(response.data);
      } catch (error) {
        setError(error.message);
        setSnackbarOpen(true);
      }
    };

    fetchCheckLists();
  }, [cardId]);


  //Creating checkList
  const createList = async () => {
    if (!newCheckListName) return;

    try {
      const response = await axios.post(
        `${BaseUrl}/cards/${cardId}/checklists?key=${APIKey}&token=${APIToken}`,
        { name: newCheckListName }
      );
      setCheckLists((prevLists) => [...prevLists, response.data]);
      setNewCheckListName("");
      setIsInputVisible(false);
    } catch (error) {
      setError(error.message);
      setSnackbarOpen(true);
    }
  };

  //Deleting CheckList
  const deleteCheckList = async (checkListId) => {
    try {
      await axios.delete(
        `${BaseUrl}/checklists/${checkListId}?key=${APIKey}&token=${APIToken}`
      );
      setCheckLists((prevLists) =>
        prevLists.filter((list) => list.id !== checkListId)
      );
    } catch (error) {
      setError(error.message);
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        p: 2,
        bgcolor: "background.paper",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Checklists
      </Typography>
      <Box sx={{ maxHeight: 300, overflowY: "auto" }}>
        <List>
          {checkLists.map((checkList) => (
            <Box
              key={checkList.id}
              sx={{ p: 2, mb: 2, bgcolor: "grey.100", borderRadius: 2 }}
            >
              <ListItem>
                <CheckCircleIcon color="primary" sx={{ mr: 2 }} />
                <ListItemText primary={checkList.name} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    color="error"
                    onClick={() => deleteCheckList(checkList.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
             
              <CheckListItems checkListId={checkList.id} cardId={cardId} />


            </Box>
          ))}
        </List>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsInputVisible(true)}
        sx={{ mt: 2, width: "100%" }}
      >
        + Add Checklist
      </Button>

      <Modal open={isInputVisible} onClose={() => setIsInputVisible(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: 300,
          }}
        >
          <Typography variant="h6">New Checklist</Typography>
          <TextField
            label="Checklist Name"
            value={newCheckListName}
            onChange={(e) => setNewCheckListName(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={createList}
            sx={{ mt: 2 }}
          >
            Add
          </Button>
          <Button
            variant="text"
            fullWidth
            onClick={() => setIsInputVisible(false)}
            sx={{ mt: 1 }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CheckList;
