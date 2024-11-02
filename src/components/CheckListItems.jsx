import React, { useEffect, useState } from "react";
import axios from "axios";

const APIKey = import.meta.env.VITE_APIKEY;
const APIToken = import.meta.env.VITE_TOKEN;
const BaseUrl = import.meta.env.VITE_BASE_URL;


import {
  Box,
  Button,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";


const CheckListItems = ({ checkListId }) => {
  const [checkItems, setCheckItems] = useState([]);
  const [error, setError] = useState(null);
  const [itemName, setItemName] = useState("");

  useEffect(() => {
    const fetchCheckItems = async () => {
      try {
        const response = await axios.get(
          `${BaseUrl}/checklists/${checkListId}/checkItems?key=${APIKey}&token=${APIToken}`
        );
        setCheckItems(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCheckItems();
  }, [checkListId]);

  const createCheckListItem = async () => {
    if (!itemName) return;

    try {
      const response = await axios.post(
        `${BaseUrl}/checklists/${checkListId}/checkItems?name=${itemName}&key=${APIKey}&token=${APIToken}`
      );
      setCheckItems((prevList) => [...prevList, response.data]);
      setItemName("");
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteCheckListItem = async (checkItemId) => {
    try {
      await axios.delete(
        `${BaseUrl}/checklists/${checkListId}/checkItems/${checkItemId}?key=${APIKey}&token=${APIToken}`
      );
      setCheckItems((prevList) =>
        prevList.filter((item) => item.id !== checkItemId)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box p={2} sx={{ bgcolor: "grey.200", borderRadius: 2, mt: 2 }}>
      <Typography variant="body1" fontWeight="bold" gutterBottom>
        Checklist Items
      </Typography>
      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}
      <List sx={{ maxHeight: 200, overflowY: "auto", p: 0 }}>
        {checkItems.map((item) => (
          <ListItem
            key={item.id}
            sx={{
              backgroundColor: "grey.300",
              borderRadius: 1,
              mb: 1,
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Checkbox defaultChecked sx={{ mr: 1 }} />
            <ListItemText primary={item.name} />
            <IconButton
              color="error"
              onClick={() => deleteCheckListItem(item.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Box display="flex" alignItems="center" mt={2}>
        <TextField
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="New checklist item"
          size="small"
          fullWidth
          sx={{ bgcolor: "grey.200", mr: 1, borderRadius: 1 }}
        />
      </Box>
      <Box display="flex" alignItems="center" mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={createCheckListItem}
        >
          Add Item
        </Button>
      </Box>
    </Box>
  );
};

export default CheckListItems;
