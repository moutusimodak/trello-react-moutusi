import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchBoards } from "../features/boardsSlice";
import { fetchLists, createList, deleteList } from "../features/listsSlice";

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
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards.board);
  const lists = useSelector((state) => state.lists.items);
  const listsStatus = useSelector((state) => state.lists.status);
  const [listName, setListName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "",
  });

  useEffect(() => {
    dispatch(fetchBoards(id));
    dispatch(fetchLists(id));
  }, [id, dispatch]);

  const handleCreateList = async () => {
    try {
      dispatch(createList({ boardId: id, listName }));
      setListName("");
      setOpenModal(false);
      setToast({
        open: true,
        message: `List "${listName}" is created successfully.`,
        severity: "success",
      });
    } catch (error) {
      setToast({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  };

  const handleDeleteList = async (listId) => {
    try {
      dispatch(deleteList({ listId }));
      setToast({
        open: true,
        message: "List deleted successfully.",
        severity: "success",
      });
    } catch (error) {
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
      sx={{
        backgroundColor: "black",
        minHeight: "100vh",
        padding: 4,
        color: "white",
      }}
    >
      <Typography variant="h4" gutterBottom>
        {boards || "Board Details"}
      </Typography>

      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {listsStatus === "loading" ? (
          <Typography>Loading Lists...</Typography>
        ) : (
          lists.map((list) => (
            <Grid item key={list.id} xs={12} sm={6} md={3}>
              <Lists list={list} onDelete={handleDeleteList} />
            </Grid>
          ))
        )}
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateList}
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

      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={handleToastClose}
      >
        <Alert
          onClose={handleToastClose}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BoardDetails;
