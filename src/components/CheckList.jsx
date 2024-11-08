import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchCheckLists,
  createCheckList,
  deleteCheckList,
  clearError,
} from "../features/checkListsSlice";

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
  const dispatch = useDispatch();
  const checkLists = useSelector(
    (state) => state.checkLists.items[cardId] || []
  );
  const loading = useSelector((state) => state.checkLists.loading);
  const error = useSelector((state) => state.checkLists.error);

  const [isInputVisible, setIsInputVisible] = useState(false);
  const [newCheckListName, setNewCheckListName] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCheckLists(cardId));
  }, [cardId, dispatch]);

  const handleCreateList = () => {
    if (!newCheckListName) return;
    dispatch(createCheckList({ cardId, name: newCheckListName }));
    setNewCheckListName("");
    setIsInputVisible(false);
  };

  const handleDeleteCheckList = (checkListId) => {
    dispatch(deleteCheckList(checkListId));
  };

  const handleSnackbarClose = () => {
    dispatch(clearError());
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (error) setSnackbarOpen(true);
  }, [error]);

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
                    onClick={() => handleDeleteCheckList(checkList.id)}
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
            onClick={handleCreateList}
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
