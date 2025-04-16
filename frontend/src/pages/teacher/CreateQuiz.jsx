import { useState, useCallback } from "react";
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Stack, 
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DownloadIcon from "@mui/icons-material/Download";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Page from "../../components/Page";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import { useSnackbar } from "notistack";

export default function CreateQuiz() {
  const [quizName, setQuizName] = useState("");
  const [file, setFile] = useState(null);
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs().add(1, "day"));
  const [timeLimit, setTimeLimit] = useState(30); // Default time limit: 30 minutes
  const [dialogOpen, setDialogOpen] = useState(false);
  const [errors, setErrors] = useState({ 
    quizName: false, 
    file: false, 
    startTime: false,
    endTime: false
  });
  const { enqueueSnackbar } = useSnackbar();

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setErrors(prev => ({ ...prev, file: false }));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    maxFiles: 1
  });

  const validateDates = () => {
    const now = dayjs();
    const isStartInPast = startTime.isBefore(now);
    const isEndBeforeStart = endTime.isBefore(startTime);
    
    setErrors(prev => ({
      ...prev,
      startTime: isStartInPast,
      endTime: isEndBeforeStart
    }));
    
    return !isStartInPast && !isEndBeforeStart;
  };

  const handleSubmit = () => {
    const dateValid = validateDates();
    const nameValid = quizName.trim() !== "";
    const fileValid = file !== null;
    console.log("File:", file);
    setErrors({
      quizName: !nameValid,
      file: !fileValid,
      startTime: errors.startTime,
      endTime: errors.endTime
    });

    if (!nameValid || !fileValid || !dateValid) {
      if (!nameValid) {
        enqueueSnackbar("Please enter the quiz name.", { variant: "error" });
      }
      if (!fileValid) {
        enqueueSnackbar("Please upload a quiz file (XLSX format).", { variant: "error" });
      }
      if (!dateValid) {
        if (errors.startTime) {
          enqueueSnackbar("Start time cannot be in the past.", { variant: "error" });
        }
        if (errors.endTime) {
          enqueueSnackbar("End time must be after start time.", { variant: "error" });
        }
      }
    }

    setDialogOpen(true);
  };

  const handleConfirm = () => {
    enqueueSnackbar("Quiz created successfully!", { variant: "success" });
    console.log("Quiz Name:", quizName);
    console.log("File:", file);
    console.log("Start Time:", startTime.format());
    console.log("End Time:", endTime.format());
    console.log("Time Limit:", timeLimit, "minutes");

    setDialogOpen(false);
    setQuizName("");
    setFile(null);
    setStartTime(dayjs());
    setEndTime(dayjs().add(1, "day"));
    setTimeLimit(30);
  };

  const downloadTemplate = () => {
    // In a real application, this would be a link to a template file stored on your server
    enqueueSnackbar("Downloading quiz template...", { variant: "info" });
    console.log("Template download requested");
    
    // Normally, you would have something like this:
    // const link = document.createElement('a');
    // link.href = '/templates/quiz_template.xlsx';
    // link.download = 'quiz_template.xlsx';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  };

  const handleStartTimeChange = (newValue) => {
    setStartTime(newValue);
    
    // Validate if the new start time is in the past
    const isInPast = newValue.isBefore(dayjs());
    
    // Validate if end time is before the new start time
    const isEndBeforeStart = endTime.isBefore(newValue);
    
    setErrors(prev => ({
      ...prev,
      startTime: isInPast,
      endTime: isEndBeforeStart
    }));
    
    // If end time is now before start time, adjust it
    if (isEndBeforeStart) {
      setEndTime(newValue.add(1, "hour"));
    }
  };

  const handleEndTimeChange = (newValue) => {
    setEndTime(newValue);
    
    // Validate if the new end time is before start time
    const isBeforeStart = newValue.isBefore(startTime);
    
    setErrors(prev => ({
      ...prev,
      endTime: isBeforeStart
    }));
  };

  // Time limit options (in minutes)
  const timeLimitOptions = [5, 10, 15, 20, 30, 45, 60, 90, 120];

  return (
    <Page title="Create Quiz">
      <Box maxWidth={800} mx="auto" mt={5}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Create Quiz
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
                label="Quiz Name"
                variant="outlined"
                value={quizName}
                onChange={(e) => {
                  setQuizName(e.target.value);
                  if (e.target.value.trim() !== "") {
                    setErrors(prev => ({ ...prev, quizName: false }));
                  }
                }}
                fullWidth
                error={errors.quizName}
                helperText={errors.quizName ? "Quiz name is required." : ""}
              />

              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Quiz File (XLSX only)
                </Typography>
                
                <Paper
                  {...getRootProps()}
                  sx={{
                    p: 3,
                    border: '2px dashed',
                    borderColor: errors.file ? 'error.main' : (isDragActive ? 'primary.main' : 'grey.400'),
                    borderRadius: 2,
                    backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  <input {...getInputProps()} />
                  <CloudUploadIcon color={isDragActive ? "primary" : "action"} sx={{ fontSize: 48, mb: 1 }} />
                  
                  {file ? (
                    <Typography>
                      Selected file: <strong>{file.name}</strong> ({(file.size / 1024).toFixed(2)} KB)
                    </Typography>
                  ) : (
                    <Typography>
                      {isDragActive
                        ? "Drop the XLSX file here..."
                        : "Drag and drop an XLSX file here, or click to select a file"}
                    </Typography>
                  )}
                </Paper>
                
                {errors.file && (
                  <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
                    Please upload a quiz file in XLSX format
                  </Typography>
                )}
              </Box>

              <DateTimePicker
                label="Start Time"
                value={startTime}
                onChange={handleStartTimeChange}
                disablePast
                slotProps={{
                  textField: {
                    error: errors.startTime,
                    helperText: errors.startTime ? "Start time cannot be in the past." : "",
                    fullWidth: true
                  },
                }}
              />

              <DateTimePicker
                label="End Time"
                value={endTime}
                onChange={handleEndTimeChange}
                disablePast
                slotProps={{
                  textField: {
                    error: errors.endTime,
                    helperText: errors.endTime ? "End time must be after start time." : "",
                    fullWidth: true
                  },
                }}
              />

              <FormControl fullWidth>
                <InputLabel id="time-limit-label">Time Limit (minutes)</InputLabel>
                <Select
                  labelId="time-limit-label"
                  id="time-limit"
                  value={timeLimit}
                  label="Time Limit (minutes)"
                  onChange={(e) => setTimeLimit(e.target.value)}
                >
                  {timeLimitOptions.map(option => (
                    <MenuItem key={option} value={option}>{option} minutes</MenuItem>
                  ))}
                  <MenuItem value={-1}>No time limit</MenuItem>
                </Select>
                <FormHelperText>
                  The maximum time students have to complete the quiz once started
                </FormHelperText>
              </FormControl>

              <Alert severity="info" sx={{ display: 'flex', alignItems: 'center' }}>
                Need a template? 
                <Button 
                  startIcon={<DownloadIcon />} 
                  onClick={downloadTemplate}
                  sx={{ ml: 2 }}
                >
                  Download Quiz Template
                </Button>
              </Alert>

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
                  Create Quiz
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
        title="Confirm Quiz Creation"
        message={
          <>
            Are you sure you want to create this quiz:{" "}
            <strong>{quizName}</strong>
            <br />
            File: {file && file.name}
            <br />
            Start Time: {startTime.format("DD/MM/YYYY HH:mm:ss")}
            <br />
            End Time: {endTime.format("DD/MM/YYYY HH:mm:ss")}
            <br />
            Time Limit: {timeLimit === -1 ? "No time limit" : `${timeLimit} minutes`}
          </>
        }
      />
    </Page>
  );
}