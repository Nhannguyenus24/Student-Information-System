import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import LockIcon from "@mui/icons-material/Lock";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import Page from "../../components/Page";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";

dayjs.extend(relativeTime);
dayjs.extend(duration);

export default function StudentAttemptQuiz() {
  // Quiz states
  const [confirmAttempt, setConfirmAttempt] = useState(false);
  const [quizStatus, setQuizStatus] = useState("not_attempted"); // not_attempted, completed
  const [attemptedAt, setAttemptedAt] = useState(dayjs());
  
  const { enqueueSnackbar } = useSnackbar();

  // Mock quiz data
  const quiz = {
    name: "Midterm Quiz: Computer Science Fundamentals",
    startTime: dayjs().subtract(1, "hour"),
    endTime: dayjs().add(5, "hour"),
    timeLimit: 45, // minutes
    questionCount: 20
  };

  // For demo purposes - to simulate expired quiz
  // Uncomment this to test expired quiz state
  // quiz.endTime = dayjs().subtract(1, "hour");

  // Calculate current state
  const now = dayjs();
  const isNotStarted = now.isBefore(quiz.startTime);
  const isExpired = now.isAfter(quiz.endTime);
  const isActive = !isNotStarted && !isExpired;
  const hasAttempted = quizStatus === "completed";

  const calculateTimeRemaining = () => {
    if (isNotStarted) {
      return dayjs.duration(quiz.startTime.diff(now));
    } else if (isActive) {
      return dayjs.duration(quiz.endTime.diff(now));
    }
    return null;
  };

  const timeRemaining = calculateTimeRemaining();

  const formatDuration = (duration) => {
    if (!duration) return "";
    
    if (duration.asDays() >= 1) {
      return `${Math.floor(duration.asDays())} days ${Math.floor(duration.hours())} hours`;
    } else if (duration.asHours() >= 1) {
      return `${Math.floor(duration.asHours())} hours ${Math.floor(duration.minutes())} minutes`;
    } else {
      return `${Math.floor(duration.asMinutes())} minutes`;
    }
  };

  const handleAttemptQuiz = () => {
    setQuizStatus("completed");
    setAttemptedAt(dayjs());
    enqueueSnackbar("You have completed the quiz!", { variant: "success" });
    setConfirmAttempt(false);
  };

  const handleViewResults = () => {
    enqueueSnackbar("Opening results page...", { variant: "info" });
    // Navigate to results page in a real app
  };

  const renderTimeInfo = () => {
    if (isNotStarted) {
      return (
        <Chip
          icon={<AccessTimeIcon />}
          label={`Quiz will open in ${formatDuration(timeRemaining)}`}
          color="primary"
          sx={{ mt: 1 }}
        />
      );
    }
    
    if (isExpired) {
      return (
        <Chip
          icon={<LockIcon />}
          label="Time for participation has ended"
          color="error"
          sx={{ mt: 1 }}
        />
      );
    }
    
    return (
      <Chip
        icon={<AccessTimeIcon />}
        label={`Time remaining: ${formatDuration(timeRemaining)}`}
        color="success"
        sx={{ mt: 1 }}
      />
    );
  };

  const renderQuizStatus = () => {
    if (hasAttempted) {
      return (
        <Paper elevation={2} sx={{ p: 2, mt: 2, backgroundColor: "success.light", borderRadius: 2 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <CheckCircleIcon color="success" />
            <Typography>
              You completed this quiz on{" "}
              <strong>{attemptedAt.format("MM/DD/YYYY HH:mm:ss")}</strong>
            </Typography>
          </Stack>
        </Paper>
      );
    }

    if (isExpired) {
      return (
        <Paper elevation={2} sx={{ p: 2, mt: 2, backgroundColor: "error.light", borderRadius: 2 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <LockIcon color="error" />
            <Typography color="error" fontWeight="medium">
              You are no longer permitted to participate in this quiz
            </Typography>
          </Stack>
        </Paper>
      );
    }

    if (isNotStarted) {
      return (
        <Paper elevation={2} sx={{ p: 2, mt: 2, backgroundColor: "info.light", borderRadius: 2 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <AccessTimeIcon color="info" />
            <Typography color="info.dark" fontWeight="medium">
              Quiz has not started yet
            </Typography>
          </Stack>
        </Paper>
      );
    }

    return null;
  };

  const renderAction = () => {
    if (hasAttempted) {
      return (
        <Button
          variant="contained"
          color="primary"
          startIcon={<VisibilityIcon />}
          onClick={handleViewResults}
          sx={{ mt: 2 }}
        >
          View Results
        </Button>
      );
    }

    if (isActive && !hasAttempted) {
      return (
        <Button
          variant="contained"
          color="primary"
          startIcon={<PlayArrowIcon />}
          onClick={() => setConfirmAttempt(true)}
          sx={{ mt: 2 }}
        >
          Attempt Quiz Now
        </Button>
      );
    }

    return null;
  };

  return (
    <Page title="Quiz Details">
      <Box maxWidth={800} mx="auto" mt={5}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Quiz Details
        </Typography>

        <Paper 
          sx={{ 
            p: 2, 
            mb: 3, 
            backgroundColor: "primary.light", 
            fontWeight: "bold",
            fontSize: "1.1rem",
            borderRadius: 2 
          }}
        >
          <Stack direction="column" spacing={1}>
            <Typography variant="h6" fontWeight={700}>
              {quiz.name}
            </Typography>
            <Divider />
            <Typography>
              <strong>Start Time:</strong> {quiz.startTime.format("MM/DD/YYYY HH:mm:ss")}
            </Typography>
            <Typography>
              <strong>End Time:</strong> {quiz.endTime.format("MM/DD/YYYY HH:mm:ss")}
            </Typography>
            {renderTimeInfo()}
          </Stack>
        </Paper>

        {renderQuizStatus()}

        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" fontWeight={600} mb={2}>
            Quiz Information
          </Typography>
          
          <List>
            <ListItem>
              <ListItemIcon>
                <HelpOutlineIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Number of Questions" 
                secondary={`${quiz.questionCount} questions`} 
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <AccessTimeIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Time Limit" 
                secondary={`${quiz.timeLimit} minutes`} 
              />
            </ListItem>
          </List>
          
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary" mb={2}>
              <strong>Important Note:</strong> Once you start the quiz, the system will record your time.
              If you leave the page or close the browser, your submission may be marked as incomplete.
            </Typography>
            
            <Grid container justifyContent={hasAttempted ? "space-between" : "flex-end"}>
              {renderAction()}
            </Grid>
          </Box>
        </Paper>
      </Box>

      {/* Confirmation dialog */}
      <ConfirmationDialog
        open={confirmAttempt}
        onClose={() => setConfirmAttempt(false)}
        onConfirm={handleAttemptQuiz}
        title="Confirm Quiz Attempt"
        message={
          <>
            <Typography gutterBottom>
              Are you sure you want to start the quiz <strong>{quiz.name}</strong>?
            </Typography>
            <Typography variant="body2" color="warning.main" sx={{ mt: 1 }}>
              Note: The system will record your start time immediately. If you exit during the quiz,
              the system may flag this as cheating behavior and will not save your results.
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Time limit: <strong>{quiz.timeLimit} minutes</strong>
            </Typography>
          </>
        }
      />
    </Page>
  );
}