import { Container, Typography, Button, Box } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        
      }}
    >
      <Box
        textAlign="center"
        p={4}
        bgcolor="white"
        borderRadius={2}
        boxShadow={3}
        sx={{ animation: "fadeIn 0.5s ease-in-out" }}
      >
        <WarningIcon
          color="error"
          sx={{ fontSize: "4rem", mb: 2, animation: "bounce 1s infinite" }}
        />
        <Typography variant="h4" component="h1" color="text.primary" fontWeight="bold" mb={1}>
          Oops!
        </Typography>
       
        <Typography variant="body1" color="text.secondary" mb={3}>
          The page you are looking for does not exist.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/"
          sx={{
            px: 4,
            py: 1.5,
            fontWeight: "bold",
            boxShadow: 2,
            "&:hover": { backgroundColor: "primary.dark" },
          }}
        >
          Go Back Home
        </Button>
      </Box>
    </Container>
  );
}

export default ErrorPage;
