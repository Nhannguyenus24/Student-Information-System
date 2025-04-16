import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Page from "../../components/Page";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import { useSnackbar } from "notistack";

export default function CreateDeadline() {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs().add(1, "hour"));
  const [dialogOpen, setDialogOpen] = useState(false);
  const [errors, setErrors] = useState({ title: false, endTime: false });
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = () => {
    const hasError = title.trim() === "" || endTime.isBefore(startTime);
    setErrors({
      title: title.trim() === "",
      endTime: endTime.isBefore(startTime),
    });

    if (hasError) {
      enqueueSnackbar(
        title.trim() === ""
          ? "Please enter the deadline title."
          : "End time must be after start time.",
        { variant: "error" }
      );
      return;
    }

    setDialogOpen(true);
  };

  const handleConfirm = () => {
    enqueueSnackbar("Deadline created successfully!", { variant: "success" });
    console.log("Deadline Title:", title);
    console.log("Start:", startTime.format());
    console.log("End:", endTime.format());

    setDialogOpen(false);
    setTitle("");
    setStartTime(dayjs());
    setEndTime(dayjs().add(1, "hour"));
  };

  return (
    <Page title="Create Deadline">
      <Box maxWidth={800} mx="auto" mt={5}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Create Deadline
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <TextField
                label="Deadline Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                error={errors.title}
                helperText={errors.title ? "Title is required." : ""}
              />

              <DateTimePicker
                label="Start Time"
                value={startTime}
                onChange={(value) => setStartTime(value)}
              />

              <DateTimePicker
                label="End Time"
                value={endTime}
                onChange={(value) => setEndTime(value)}
                slotProps={{
                  textField: {
                    error: errors.endTime,
                    helperText: errors.endTime
                      ? "End time must be after start time."
                      : "",
                  },
                }}
              />

              <Box display="flex" justifyContent="flex-end" gap={2}>
                <Button
                  variant="outlined"
                  onClick={() => window.history.back()}
                >
                  Go Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Create
                </Button>
              </Box>
            </Stack>
          </LocalizationProvider>
        </Paper>
      </Box>

      <ConfirmationDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleConfirm}
        title="Confirm Deadline"
        message={
          <>
            Are you sure you want to create this deadline:{" "}
            <strong>{title}</strong>
            <br />
            From: {startTime.format("DD/MM/YYYY HH:mm:ss")}
            <br />
            To: {endTime.format("DD/MM/YYYY HH:mm:ss")}
          </>
        }
      />
    </Page>
  );
}
