import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { fetchCards, deleteCard } from "../features/cardsSlice";

import {
  Box,
  Typography,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  Modal,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import CheckList from "./CheckList";
import Cards from "./Cards";

const Lists = ({ list, onDelete, loading }) => {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards.cardsById[list.id] || {});
  const cardLoading = useSelector((state) => state.cards.loading);

  const [error, setError] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCards(list.id))
      .unwrap()
      .catch((err) => {
        setError("Failed to fetch cards: " + err.message);
        setSnackbarOpen(true);
      });
  }, [list.id, dispatch]);


  const handleDeleteCard = (cardId) => {
    dispatch(deleteCard(cardId))
      .unwrap()
      .catch((err) => {
        setError(err.message);
        setSnackbarOpen(true);
      });
  };

  const handleDeleteList = (e) => {
    onDelete(list.id);
  };

  const handleClickModal = (cardId) => {
    setSelectedCard(cardId);
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setSelectedCard(null);
    setIsOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardHeader
          title={list.name}
          action={
            <IconButton onClick={handleDeleteList} disabled={loading}>
              <CloseIcon />
            </IconButton>
          }
        />
        <CardContent>
          {cardLoading ? (
            <Typography>Loading cards...</Typography>
          ) : (
            Object.values(cards).map((card) => (
              <Box
                key={card.id}
                mb={1}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  bgcolor: "white",
                  p: 1,
                  borderRadius: 1,
                  boxShadow: 1,
                }}
                onClick={() => handleClickModal(card.id)}
              >
                <Typography>{card.name}</Typography>
                <IconButton
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteCard(card.id);
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            ))
          )}
          <Cards id={list.id} />
        </CardContent>
      </Card>

     
      <Modal open={isOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: "relative",
            bgcolor: "background.paper",
            boxShadow: 24,
            padding: 4,
            borderRadius: 2,
            width: "400px",
            margin: "auto",
            marginTop: "10%",
          }}
        >
          <IconButton
            onClick={handleModalClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Add Item to Checklist
          </Typography>
          {selectedCard && (
            <CheckList cardId={selectedCard} />
          )}
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Lists;
