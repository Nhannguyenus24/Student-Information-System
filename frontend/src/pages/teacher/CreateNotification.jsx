import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import Page from "../../components/Page";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import { useSnackbar } from "notistack";

export default function CreateNotification() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [errors, setErrors] = useState({ title: false, content: false });

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = () => {
    const newErrors = {
      title: title.trim() === "",
      content: content.trim() === "",
    };
    setErrors(newErrors);

    const hasError = Object.values(newErrors).some(Boolean);
    if (hasError) {
      enqueueSnackbar("Please fill in all required fields.", { variant: "error" });
      return;
    }

    setDialogOpen(true);
  };

  const handleConfirm = () => {
    enqueueSnackbar("Notification created successfully!", { variant: "success" });
    console.log("Submitted notification:");
    console.log("Title:", title);
    console.log("Content:", content);
    setDialogOpen(false);
    setTitle("");
    setContent("");
  };

  return (
    <Page title="Create Notification">
      <Box maxWidth={800} mx="auto" mt={5}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Create Notification
        </Typography>

        <Paper
          sx={{
            p: 2,
            backgroundColor: "primary.light",
            fontWeight: "bold",
            fontSize: "1.2rem",
            borderRadius: 2,
            mb: 3,
          }}
        >
          To: Class Computer Science 1
        </Paper>

        <Paper elevation={3} sx={{ p: 3 }}>
          <Stack spacing={3}>
            <TextField
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              error={errors.title}
              helperText={errors.title ? "Title is required." : ""}
            />

            <TextField
              label="Notification Content"
              variant="outlined"
              multiline
              minRows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              fullWidth
              error={errors.content}
              helperText={errors.content ? "Content is required." : ""}
            />

            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Button variant="outlined" onClick={() => window.history.back()}>
                Go Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Box>

      <ConfirmationDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleConfirm}
        title="Confirm Submission"
        message={`Are you sure you want to public this notification: ${title}`}
      />
    </Page>
  );
}
