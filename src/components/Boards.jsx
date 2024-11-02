import React from "react";
import { Link } from "react-router-dom";

import { Card, CardContent, Typography } from "@mui/material";

const Boards = ({ board }) => {
  if (board.closed) {
    return null;
  }

  const { backgroundColor } = board.prefs || {};
  const bgColor = backgroundColor || "transparent";

  return (
    <Link to={`/boards/${board.id}`} style={{ textDecoration: "none" }}>
      <Card
        style={{
          backgroundColor: bgColor,
          color: "white",
          width: "190px",
          height: "96px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "16px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          borderRadius: "8px",
        }}
      >
        <CardContent>
          <Typography variant="h6" align="center">
            {board.name}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Boards;
