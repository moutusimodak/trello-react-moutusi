import React, { useState } from "react";
import axios from "axios";

const APIKey = import.meta.env.VITE_APIKEY;
const APIToken = import.meta.env.VITE_TOKEN;
const BaseUrl = import.meta.env.VITE_BASE_URL

import {
  Button,
  Box,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";

const Cards = ({ id, setCards }) => {
  const [error, setError] = useState(null);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [cardName, setCardName] = useState("");
  const [toast, setToast] = useState({ open: false, message: "", severity: "" });


  //Creating card
  const createCard = async () => {
    try {
      const response = await axios.post(
        `${BaseUrl}/cards?name=${encodeURIComponent(cardName)}&idList=${id}&key=${APIKey}&token=${APIToken}`
      );
      setCards((prevCards) => [...prevCards, response.data]);
      setError(null);
      setIsInputVisible(false);
      setCardName("");
      setToast({
        open: true,
        message: "Card created successfully.",
        severity: "success",
      });
    } catch (error) {
      setError(error.message);
      setToast({
        open: true,
        message: "Error creating card.",
        severity: "error",
      });
    }
  };

  const handleToastClose = () => setToast({ ...toast, open: false });

  return (
    <Box mb={4}>
      {isInputVisible ? (
        <Box sx= {{ display: "flex", flexDirection:"column",gap:2, mt:2 }} >
          <TextField
            placeholder="Enter card name"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            variant="outlined"
            size="small"
            error={!!error}
            helperText={error}
            fullWidth
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            onClick={createCard}
            variant="contained"
            color="primary"
          >
            Create Card
          </Button>
          <Button
            onClick={() => setIsInputVisible(false)}
            variant="outlined"
            color="secondary"
          >
            Cancel
          </Button>
          </Box>
        </Box>
      ) : (
        <Button
          onClick={() => setIsInputVisible(true)}
          variant="contained"
          color="primary"
          style={{color:"white" }}
        >
          + Add new Card
        </Button>
      )}

      <Snackbar open={toast.open} autoHideDuration={6000} onClose={handleToastClose}>
        <Alert onClose={handleToastClose} severity={toast.severity} sx={{ width: "100%" }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Cards;
