import React, { useEffect, useState } from "react";
import axios from "axios";


const APIKey = import.meta.env.VITE_APIKEY;
const APIToken = import.meta.env.VITE_TOKEN;
const BaseUrl = import.meta.env.VITE_BASE_URL;


import Cards from "./Cards";
import CheckList from "./CheckList";


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



const Lists = ({ list, onDelete, loading }) => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);


  //Fetching Card
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(
          `${BaseUrl}/lists/${list.id}/cards?key=${APIKey}&token=${APIToken}`
        );
        console.log("fetching card is : ", response.data);

        setCards(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCards();
  }, [list.id]);


  //Deleting Card
  const deleteCard = async (cardId) => {
    try {
      await axios.delete(
        `${BaseUrl}/cards/${cardId}?key=${APIKey}&token=${APIToken}`
      );
      setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
    } catch (error) {
      setError(error.message);
      setSnackbarOpen(true);
    }
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
            <IconButton onClick={() => onDelete(list.id)} disabled={loading}>
              <CloseIcon />
            </IconButton>
          }
        />
        <CardContent>
          {cards.map((card) => (
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
                  deleteCard(card.id);
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          ))}

          <Cards id={list.id} setCards={setCards} />
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

          <CheckList cardId={selectedCard} />
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
