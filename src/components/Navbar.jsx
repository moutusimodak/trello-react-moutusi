import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="fixed" sx={{ background: "#212121" }}>
      <Toolbar sx={{ justifyContent: "space-between", height: "90px" }}>
        <Button
          onClick={() => navigate("/")}
          variant="contained"
          sx={{
            padding: "16px 32px",
            color: "white",
            fontWeight: "bold",
            borderRadius: "8px",
            background: "#90A4AE",
            "&:hover": {
              background: "#424242",
            },
          }}
        >
          Boards
        </Button>
        <Typography
          variant="h4"
          sx={{ flex: 1, textAlign: "center", fontWeight: "bold" }}
        >
          Trello
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
