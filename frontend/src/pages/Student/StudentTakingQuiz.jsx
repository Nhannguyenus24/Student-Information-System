import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ConfirmationDialog from "../../components/ConfirmationDialog";

export default function StudentTakingQuiz() {
  // Mock quiz data
  const quizData = {
    title: "Midterm Computer Science Fundamentals",
    timeLimit: 5, // time limit in minutes
    totalPoints: 10,
    questions: [
      {
        id: 1,
        question: "What is the time complexity of a binary search algorithm?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(n²)"],
        points: 2,
        type: "single" // single choice question
      },
      {
        id: 2,
        question:
          "Which of the following is not a primitive data type in JavaScript?",
        options: ["String", "Number", "Array", "Boolean"],
        points: 2,
        type: "single"
      },
      {
        id: 3,
        question: "Is HTML a programming language?",
        options: ["Yes", "No"],
        points: 2,
        type: "single"
      },
      {
        id: 4,
        question: "Which statement correctly describes recursion?",
        options: [
          "A process that calls itself",
          "A loop that executes once",
          "A function that cannot return a value",
          "A method to sort data",
        ],
        points: 2,
        type: "single"
      },
      {
        id: 5,
        question:
          "Which approach is better for managing state in large React applications?",
        options: ["Local component state only", "Context API and Reducers"],
        points: 2,
        type: "single"
      },
      {
        id: 6,
        question: "Select all valid ways to create a JavaScript object:",
        options: [
          "Object literal notation: {}", 
          "Using the new Object() constructor", 
          "Using Object.create()", 
          "Using JSON.stringify()"
        ],
        points: 2,
        type: "multiple" // multiple choice question
      },
    ],
  };

  // State management
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(quizData.questions.length).fill(null));
  const [timeRemaining, setTimeRemaining] = useState(quizData.timeLimit * 60); // in seconds
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Handle timer
  useEffect(() => {
    if (timeRemaining > 0 && !quizSubmitted) {
      const timer = setTimeout(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !quizSubmitted) {
      // Auto-submit when time runs out
      handleSubmitQuiz();
    }
  }, [timeRemaining, quizSubmitted]);

  // Format time remaining
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Check if a question has been answered
  const isQuestionAnswered = (index) => {
    return answers[index] !== null && 
           (typeof answers[index] === 'number' || 
           (Array.isArray(answers[index]) && answers[index].length > 0));
  };

  // Navigation functions
  const goToNextQuestion = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  // Handle answer changes
  const handleSingleChoiceChange = (event, value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = parseInt(value);
    setAnswers(newAnswers);
  };

  const handleMultipleChoiceChange = (optionIndex) => {
    const newAnswers = [...answers];
    const currentAnswer = newAnswers[currentQuestionIndex] || [];
    
    if (Array.isArray(currentAnswer)) {
      if (currentAnswer.includes(optionIndex)) {
        // Remove option if already selected
        newAnswers[currentQuestionIndex] = currentAnswer.filter(idx => idx !== optionIndex);
      } else {
        // Add option if not selected
        newAnswers[currentQuestionIndex] = [...currentAnswer, optionIndex];
      }
    } else {
      // Initialize as array with this option
      newAnswers[currentQuestionIndex] = [optionIndex];
    }
    
    setAnswers(newAnswers);
  };

  // Submit quiz handlers
  const openSubmitDialog = () => {
    setIsDialogOpen(true);
  };

  const closeSubmitDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
    
    // Format answers for submission
    const submissionData = {
      title: quizData.title,
      submissionTime: new Date().toLocaleString(),
      timeSpent: quizData.timeLimit * 60 - timeRemaining,
      answers: answers.map((answer, index) => ({
        questionId: quizData.questions[index].id,
        answer: answer,
        questionType: quizData.questions[index].type
      }))
    };
    
    // Log submission data to console
    console.log("Quiz Submission:", submissionData);
    closeSubmitDialog();
  };

  // Calculate progress percentage
  const answeredCount = answers.filter(answer => 
    answer !== null && (typeof answer === 'number' || 
    (Array.isArray(answer) && answer.length > 0))
  ).length;
  
  const progressPercentage = (answeredCount / quizData.questions.length) * 100;

  // Current question data
  const currentQuestion = quizData.questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestionIndex];

  // For multiple choice questions, ensure the answer is an array
  const ensureArray = (value) => {
    if (value === null) return [];
    return Array.isArray(value) ? value : [value];
  };

  return (
    <Box maxWidth={1200} mx="auto" mt={4} pb={5}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Stack spacing={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" fontWeight={700}>
              {quizData.title}
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <AccessTimeIcon color="primary" />
              <Typography 
                variant="h6" 
                fontWeight={600}
                color={timeRemaining < 60 ? "error" : "primary"}
              >
                {formatTime(timeRemaining)}
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ width: '100%' }}>
            <LinearProgress 
              variant="determinate" 
              value={progressPercentage} 
              sx={{ height: 8, borderRadius: 1 }}
            />
            <Box display="flex" justifyContent="space-between" mt={1}>
              <Typography variant="body2">Progress</Typography>
              <Typography variant="body2" fontWeight={600}>
                {answeredCount}/{quizData.questions.length} questions answered
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Paper>

      <Grid container spacing={3}>
        {/* Question navigation panel */}
        <Grid item xs={12} md={3}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Questions
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {quizData.questions.map((question, index) => (
                <Button
                  key={question.id}
                  variant={currentQuestionIndex === index ? "contained" : "outlined"}
                  color={isQuestionAnswered(index) ? "success" : "primary"}
                  size="small"
                  onClick={() => goToQuestion(index)}
                  sx={{ 
                    minWidth: 40, 
                    position: 'relative',
                    p: 1
                  }}
                >
                  {index + 1}
                  {isQuestionAnswered(index) && (
                    <CheckCircleIcon 
                      sx={{ 
                        position: 'absolute', 
                        top: -5, 
                        right: -5, 
                        fontSize: 14,
                        bgcolor: 'white',
                        borderRadius: '50%'
                      }} 
                    />
                  )}
                </Button>
              ))}
            </Box>
            
            <Box mt={3}>
              <Button 
                variant="contained" 
                color="error" 
                fullWidth 
                onClick={openSubmitDialog}
                disabled={quizSubmitted}
              >
                Submit Quiz
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Current question */}
        <Grid item xs={12} md={9}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h6" fontWeight={600}>
                Question {currentQuestionIndex + 1} 
                {currentQuestion.type === "multiple" && " (Multiple Choice)"}
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                {currentQuestion.points} points
              </Typography>
            </Box>

            <Typography variant="body1" mb={3}>
              {currentQuestion.question}
            </Typography>

            <FormControl component="fieldset" fullWidth sx={{ mb: 4 }}>
              {currentQuestion.type === "multiple" ? (
                // Multiple choice renderer
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  {currentQuestion.options.map((option, optIndex) => (
                    <FormControlLabel
                      key={optIndex}
                      control={
                        <Checkbox
                          checked={ensureArray(currentAnswer).includes(optIndex)}
                          onChange={() => handleMultipleChoiceChange(optIndex)}
                          disabled={quizSubmitted}
                        />
                      }
                      label={
                        <Typography sx={{ 
                          py: 1,
                          ...(ensureArray(currentAnswer).includes(optIndex) && {
                            fontWeight: 600,
                          })
                        }}>
                          {option}
                        </Typography>
                      }
                    />
                  ))}
                </Box>
              ) : (
                // Single choice renderer
                <RadioGroup
                  value={currentAnswer !== null ? currentAnswer.toString() : ""}
                  onChange={handleSingleChoiceChange}
                >
                  {currentQuestion.options.map((option, optIndex) => (
                    <FormControlLabel
                      key={optIndex}
                      value={optIndex.toString()}
                      control={<Radio disabled={quizSubmitted} />}
                      label={
                        <Typography sx={{ 
                          py: 1,
                          ...(currentAnswer === optIndex && {
                            fontWeight: 600,
                          })
                        }}>
                          {option}
                        </Typography>
                      }
                    />
                  ))}
                </RadioGroup>
              )}
            </FormControl>

            {/* Navigation buttons */}
            <Box display="flex" justifyContent="space-between" mt={3}>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0 || quizSubmitted}
              >
                Previous
              </Button>
              
              {currentQuestionIndex < quizData.questions.length - 1 ? (
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  onClick={goToNextQuestion}
                  disabled={quizSubmitted}
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="error"
                  onClick={openSubmitDialog}
                  disabled={quizSubmitted}
                >
                  Submit Quiz
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={isDialogOpen}
        onClose={closeSubmitDialog}
        onConfirm={handleSubmitQuiz}
        title="Submit Quiz"
        message={`Are you sure you want to submit your quiz? You have answered ${answeredCount} out of ${quizData.questions.length} questions.`}
      />
      
      {/* Quiz Submitted Dialog */}
      <Dialog open={quizSubmitted}>
        <DialogTitle>Quiz Submitted!</DialogTitle>
        <DialogContent>
          <Typography>
            Your quiz has been successfully submitted. You answered {answeredCount} out of {quizData.questions.length} questions.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained">
            Back to Dashboard
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}