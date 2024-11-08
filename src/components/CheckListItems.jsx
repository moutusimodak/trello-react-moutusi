import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchCheckItems,
  createCheckItem,
  deleteCheckItem,
  updateCheckItemStatus,
} from "../features/checkListItemsSlice";

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

const CheckListItems = ({ checkListId, cardId }) => {
  const dispatch = useDispatch();
  const checkItems = useSelector(
    (state) => state.checkListItems.itemsByCheckListId[checkListId] || []
  );
  const [itemName, setItemName] = useState("");

  useEffect(() => {
    dispatch(fetchCheckItems(checkListId));
  }, [checkListId, dispatch]);

  const handleCreateCheckListItem = () => {
    if (itemName.trim()) {
      dispatch(createCheckItem({ checkListId, name: itemName }));
      setItemName("");
    }
  };

  const handleDeleteCheckListItem = (itemId) => {
    dispatch(deleteCheckItem({ checkListId, itemId }));
  };

  const handleUpdateStatus = (itemId, isComplete) => {
    dispatch(updateCheckItemStatus({ cardId, itemId, newStatus: !isComplete }));
  };

  return (
    <Box p={2} sx={{ bgcolor: "grey.200", borderRadius: 2, mt: 2 }}>
      <Typography variant="body1" fontWeight="bold" gutterBottom>
        Checklist Items
      </Typography>
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
            <Checkbox
              checked={item.state === "complete"}
              onChange={() =>
                handleUpdateStatus(item.id, item.state === "complete")
              }
              sx={{ mr: 1 }}
            />
            <ListItemText primary={item.name} />
            <IconButton
              color="error"
              onClick={() => handleDeleteCheckListItem(item.id)}
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
          onClick={handleCreateCheckListItem}
        >
          Add Item
        </Button>
      </Box>
    </Box>
  );
};

export default CheckListItems;
