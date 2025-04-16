import { useState, useCallback } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Chip,
  TextField,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import {
  Description as FileIcon,
  CloudUpload as UploadIcon,
  Close as CloseIcon,
  DeleteOutline as DeleteIcon,
  Title as TitleIcon,
} from "@mui/icons-material";
import { useSnackbar } from "notistack";
import Page from "../../components/Page";

export default function UploadMaterials() {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const removeFile = (indexToRemove) => {
    setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (e.target.value.trim()) {
      setTitleError(false);
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!title.trim()) {
      setTitleError(true);
      enqueueSnackbar("Please enter a title for your materials", { 
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" }
      });
      isValid = false;
    }

    if (files.length === 0) {
      enqueueSnackbar("Please select at least one file to upload", { 
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" }
      });
      isValid = false;
    }

    return isValid;
  };

  const handleUpload = () => {
    if (!validateForm()) {
      return;
    }

    console.log("Uploading files with title:", title);
    files.forEach((file) => console.log(file.name));
    
    enqueueSnackbar("Upload completed successfully!", {
      variant: "success",
    });
  };

  // Function to get file type icon color based on extension
  const getFileColor = (filename) => {
    const extension = filename.split('.').pop().toLowerCase();
    const colorMap = {
      pdf: "#F40F02",
      doc: "#2B579A",
      docx: "#2B579A",
      xls: "#217346",
      xlsx: "#217346",
      ppt: "#D24726",
      pptx: "#D24726",
      jpg: "#0063DC",
      jpeg: "#0063DC",
      png: "#4CAF50",
      txt: "#607D8B",
    };
    return colorMap[extension] || "#9E9E9E";
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <Page title="Upload Teaching Materials">
      <Box maxWidth={800} mx="auto" mt={5}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Upload Teaching Materials
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Box mb={3}>
            <TextField
              fullWidth
              label="Title"
              required
              variant="outlined"
              value={title}
              onChange={handleTitleChange}
              error={titleError}
              helperText={titleError ? "Title is required" : ""}
              placeholder="Enter the title for your teaching materials"
              InputProps={{
                startAdornment: (
                  <TitleIcon color="action" sx={{ mr: 1 }} />
                ),
              }}
            />
          </Box>

          <Typography variant="body1" mb={2}>
            Drag and drop files here, or click to select files.
          </Typography>

          <Box
            {...getRootProps()}
            sx={{
              border: "2px dashed",
              borderColor: isDragActive ? "primary.main" : "grey.400",
              borderRadius: 2,
              p: 5,
              textAlign: "center",
              cursor: "pointer",
              bgcolor: isDragActive ? "rgba(25, 118, 210, 0.08)" : "transparent",
              mb: 3,
              transition: "all 0.3s ease",
              "&:hover": {
                borderColor: "primary.main",
                bgcolor: "rgba(25, 118, 210, 0.04)",
              },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input {...getInputProps()} />
            <UploadIcon
              sx={{
                fontSize: 48,
                color: isDragActive ? "primary.main" : "grey.600",
                mb: 2,
              }}
            />
            <Typography variant="h6" color={isDragActive ? "primary.main" : "text.secondary"}>
              {isDragActive ? "Drop files here..." : "Click or drag files to upload"}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Support for multiple files
            </Typography>
          </Box>

          {files.length > 0 && (
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                mb: 3,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
                px={1}
              >
                <Typography variant="subtitle1" fontWeight={600}>
                  Files to be uploaded ({files.length})
                </Typography>
                {files.length > 0 && (
                  <Button
                    startIcon={<DeleteIcon />}
                    color="error"
                    size="small"
                    onClick={() => setFiles([])}
                  >
                    Remove All
                  </Button>
                )}
              </Box>
              <Divider sx={{ mb: 2 }} />
              <List>
                {files.map((file, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      py: 1,
                      px: 2,
                      borderRadius: 1,
                      mb: 1,
                      bgcolor: "grey.50",
                      "&:hover": {
                        bgcolor: "grey.100",
                      },
                    }}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => removeFile(index)}
                        size="small"
                        sx={{ color: "error.main" }}
                      >
                        <CloseIcon />
                      </IconButton>
                    }
                  >
                    <ListItemIcon>
                      <FileIcon sx={{ color: getFileColor(file.name) }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={file.name}
                      secondary={
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Chip
                            label={formatFileSize(file.size)}
                            size="small"
                            variant="outlined"
                            sx={{ height: 20, fontSize: "0.7rem" }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {new Date(file.lastModified).toLocaleDateString()}
                          </Typography>
                        </Stack>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}

          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="outlined" onClick={() => window.history.back()}>
              Go Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpload}
              startIcon={<UploadIcon />}
            >
              Upload
            </Button>
          </Box>
        </Paper>
      </Box>
    </Page>
  );
}