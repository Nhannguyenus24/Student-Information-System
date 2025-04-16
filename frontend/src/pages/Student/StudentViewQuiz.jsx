import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Chip,
  Checkbox,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export default function QuizResult() {
  // Mock data
  const [quizData, setQuizData] = useState({
    title: "Midterm Computer Science Fundamentals",
    submissionTime: "12/03/2025 15:45:22",
    // Set to null for "Not Available" scenario, or a number for graded scenario
    score: 8, // Set to null to test "score is not available"
    totalPoints: 10,
    questions: [
      {
        id: 1,
        question: "What is the time complexity of a binary search algorithm?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(n²)"],
        studentAnswer: 1, // Index of the selected option (0-based)
        correctAnswer: 1,
        points: 2,
        explanation: "Binary search divides the search interval in half with each step, resulting in a logarithmic O(log n) time complexity.",
        type: "single" // single choice question
      },
      {
        id: 2,
        question:
          "Which of the following is not a primitive data type in JavaScript?",
        options: ["String", "Number", "Array", "Boolean"],
        studentAnswer: 2,
        correctAnswer: 2,
        points: 2,
        explanation: "Array is not a primitive data type in JavaScript. The primitive data types are String, Number, Boolean, Undefined, Null, Symbol, and BigInt.",
        type: "single"
      },
      {
        id: 3,
        question: "Is HTML a programming language?",
        options: ["Yes", "No"],
        studentAnswer: 0,
        correctAnswer: 1,
        points: 2,
        explanation: "HTML is a markup language, not a programming language. It doesn't have programming constructs like variables, loops, or conditional statements.",
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
        studentAnswer: 0,
        correctAnswer: 0,
        points: 2,
        explanation: "Recursion is a programming technique where a function calls itself directly or indirectly to solve a problem.",
        type: "single"
      },
      {
        id: 5,
        question:
          "Which approach is better for managing state in large React applications?",
        options: ["Local component state only", "Context API and Reducers"],
        studentAnswer: 1,
        correctAnswer: 1,
        points: 2,
        explanation: "For large React applications, using Context API and Reducers provides better state management across components compared to only using local state.",
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
        studentAnswer: [0, 1, 3], // Multiple selected answers including wrong one (indexes)
        correctAnswer: [0, 1, 2], // All correct answers (indexes)
        points: 2,
        explanation: "Valid ways to create a JavaScript object include using object literal notation {}, the new Object() constructor, and Object.create(). JSON.stringify() converts an object to a JSON string, not create an object.",
        type: "multiple" // multiple choice question
      },
    ],
  });

  // Helper function to check if an option is selected in multiple choice questions
  const isOptionSelected = (questionIndex, optionIndex) => {
    const question = quizData.questions[questionIndex];
    if (question.type === "multiple") {
      return question.studentAnswer.includes(optionIndex);
    }
    return optionIndex === question.studentAnswer;
  };

  // Helper function to check if a selected option is incorrect (for multiple choice)
  const isIncorrectSelection = (question, optionIndex) => {
    if (question.type !== "multiple" || quizData.score === null) return false;
    
    // If option was selected by student but not in correct answers
    return question.studentAnswer.includes(optionIndex) && 
           !question.correctAnswer.includes(optionIndex);
  };

  // Helper function to check if student answered correctly
  const isAnsweredCorrectly = (question) => {
    if (question.type === "multiple") {
      // For multiple choice, all correct options must be selected and no incorrect ones
      const selectedSet = new Set(question.studentAnswer);
      const correctSet = new Set(question.correctAnswer);
      
      // Check if all correct answers are selected and no extra answers
      if (selectedSet.size !== correctSet.size) return false;
      
      for (const selected of question.studentAnswer) {
        if (!correctSet.has(selected)) return false;
      }
      
      return true;
    }
    // For single choice
    return question.studentAnswer === question.correctAnswer;
  };

  return (
    <Box maxWidth={800} mx="auto" mt={5} pb={5}>
      <Typography variant="h4" fontWeight={700} gutterBottom mb={3}>
        {quizData.title}
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Stack spacing={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body1" fontWeight={500}>
              Submission Time:
            </Typography>
            <Typography variant="body1">{quizData.submissionTime}</Typography>
          </Box>

          <Divider />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body1" fontWeight={500}>
              Score:
            </Typography>
            <Typography variant="body1" fontWeight={700}>
              {quizData.score !== null
                ? `${quizData.score}/${quizData.totalPoints}`
                : "Score is not available"}
            </Typography>
          </Box>
        </Stack>
      </Paper>

      <Stack spacing={4}>
        {quizData.questions.map((question, index) => (
          <Paper key={question.id} elevation={2} sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h6" fontWeight={600}>
                Question {index + 1} {question.type === "multiple" && "(Multiple Choice)"}
              </Typography>
              {quizData.score !== null && (
                <Box display="flex" alignItems="center" gap={1}>
                  {isAnsweredCorrectly(question) ? (
                    <Chip
                      icon={<CheckCircleIcon fontSize="small" />}
                      label="Correct"
                      color="success"
                      size="small"
                    />
                  ) : (
                    <Chip
                      icon={<CancelIcon fontSize="small" />}
                      label="Incorrect"
                      color="error"
                      size="small"
                    />
                  )}

                  <Typography variant="body2" fontWeight={500}>
                    {isAnsweredCorrectly(question)
                      ? question.points
                      : 0}
                    /{question.points} pts
                  </Typography>
                </Box>
              )}
            </Box>

            <Typography variant="body1" mb={2}>
              {question.question}
            </Typography>

            <FormControl component="fieldset" fullWidth>
              {question.type === "multiple" ? (
                // Multiple choice display - vertical layout
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  {question.options.map((option, optIndex) => {
                    const isSelected = isOptionSelected(index, optIndex);
                    const isCorrect = question.correctAnswer.includes(optIndex);
                    const isWrongSelection = isIncorrectSelection(question, optIndex);
                    
                    return (
                      <FormControlLabel
                        key={optIndex}
                        value={option}
                        control={
                          <Checkbox
                            checked={isSelected}
                            disabled
                            sx={{ 
                              color: (quizData.score !== null && isWrongSelection) 
                                ? "error.main" 
                                : (quizData.score !== null && isCorrect && isSelected)
                                  ? "success.main"
                                  : undefined
                            }}
                          />
                        }
                        sx={{ 
                          width: "100%",
                        }}
                        label={
                          <Box display="flex" alignItems="center" width="100%">
                            <Typography
                              sx={{
                                bgcolor: isSelected ? "grey.200" : "transparent",
                                px: 1,
                                py: 0.5,
                                borderRadius: 1,
                                display: "inline-block",
                                width: "100%",
                                position: "relative",
                                ...(quizData.score !== null && isCorrect && {
                                  color: "success.main",
                                  fontWeight: 600,
                                }),
                                ...(quizData.score !== null && isWrongSelection && {
                                  color: "error.main",
                                  fontWeight: 600,
                                })
                              }}
                            >
                              {option}
                              {quizData.score !== null && isCorrect && (
                                <CheckCircleIcon
                                  fontSize="small"
                                  sx={{
                                    ml: 1,
                                    verticalAlign: "middle",
                                    color: "success.main",
                                  }}
                                />
                              )}
                              {quizData.score !== null && isWrongSelection && (
                                <CancelIcon
                                  fontSize="small"
                                  sx={{
                                    ml: 1,
                                    verticalAlign: "middle",
                                    color: "error.main",
                                  }}
                                />
                              )}
                            </Typography>
                          </Box>
                        }
                      />
                    );
                  })}
                </Box>
              ) : (
                // Single choice display (unchanged)
                <RadioGroup>
                  {question.options.map((option, optIndex) => (
                    <FormControlLabel
                      key={optIndex}
                      value={option}
                      control={
                        <Radio
                          checked={optIndex === question.studentAnswer}
                          disabled
                          sx={{
                            color: (quizData.score !== null && 
                                    optIndex === question.studentAnswer && 
                                    optIndex !== question.correctAnswer)
                              ? "error.main"
                              : (quizData.score !== null && 
                                 optIndex === question.correctAnswer)
                                ? "success.main"
                                : undefined
                          }}
                        />
                      }
                      label={
                        <Box display="flex" alignItems="center">
                          <Typography
                            sx={{
                              bgcolor:
                                optIndex === question.studentAnswer
                                  ? "grey.200"
                                  : "transparent",
                              px: 1,
                              py: 0.5,
                              borderRadius: 1,
                              display: "inline-block",
                              width: "100%",
                              position: "relative",
                              ...(quizData.score !== null &&
                                optIndex === question.correctAnswer && {
                                  color: "success.main",
                                  fontWeight: 600,
                                }),
                              ...(quizData.score !== null &&
                                optIndex === question.studentAnswer &&
                                optIndex !== question.correctAnswer && {
                                  color: "error.main",
                                  fontWeight: 600,
                                }),
                            }}
                          >
                            {option}
                            {quizData.score !== null &&
                              optIndex === question.correctAnswer && (
                                <CheckCircleIcon
                                  fontSize="small"
                                  sx={{
                                    ml: 1,
                                    verticalAlign: "middle",
                                    color: "success.main",
                                  }}
                                />
                              )}
                            {quizData.score !== null &&
                              optIndex === question.studentAnswer &&
                              optIndex !== question.correctAnswer && (
                                <CancelIcon
                                  fontSize="small"
                                  sx={{
                                    ml: 1,
                                    verticalAlign: "middle",
                                    color: "error.main",
                                  }}
                                />
                              )}
                          </Typography>
                        </Box>
                      }
                    />
                  ))}
                </RadioGroup>
              )}
            </FormControl>

            {/* Explanation section - only shown when score is available */}
            {quizData.score !== null && (
              <Box mt={3} p={2} bgcolor="grey.100" borderRadius={1}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  Explanation:
                </Typography>
                <Typography variant="body2">
                  {question.explanation}
                </Typography>
              </Box>
            )}
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}