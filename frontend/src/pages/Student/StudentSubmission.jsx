import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  Chip,
  Link,
  IconButton
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import ArticleIcon from "@mui/icons-material/Article";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import Page from "../../components/Page";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";

dayjs.extend(relativeTime);
dayjs.extend(duration);

const FILE_SIZE_LIMIT_MB = 20;

export default function StudentSubmission() {
  const [file, setFile] = useState(null);
  const [submittedAt, setSubmittedAt] = useState(null);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  // Giả lập deadline từ giáo viên
  const deadline = dayjs().add(2, "hour");
  const now = dayjs();
  const isOverdue = now.isAfter(deadline);
  const hasSubmitted = !!submittedAt;

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.size > FILE_SIZE_LIMIT_MB * 1024 * 1024) {
      enqueueSnackbar(`File vượt quá giới hạn ${FILE_SIZE_LIMIT_MB}MB.`, { variant: "error" });
      return;
    }
    setFile(selectedFile);
  };

  const handleSubmit = () => {
    setSubmittedAt(dayjs());
    enqueueSnackbar("Nộp bài thành công!", { variant: "success" });
    setConfirmSubmit(false);
  };

  const handleRemove = () => {
    setFile(null);
    setSubmittedAt(null);
    enqueueSnackbar("Đã xóa bài nộp.", { variant: "info" });
    setConfirmRemove(false);
  };

  const handleDownload = () => {
    if (!file) return;
    
    // Tạo URL cho file để tải về
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    enqueueSnackbar("Đang tải file về...", { variant: "info" });
  };

  const renderTimeInfo = () => {
    if (hasSubmitted) {
      const early = deadline.diff(submittedAt, "minute");
      return (
        <Chip
          label={`Bạn đã nộp ${
            early > 0 ? `sớm ${early} phút` : `trễ ${Math.abs(early)} phút`
          }`}
          color={early >= 0 ? "success" : "error"}
          sx={{ mt: 1 }}
        />
      );
    }

    if (isOverdue) {
      const lateBy = dayjs.duration(now.diff(deadline)).humanize();
      return (
        <Typography color="error" fontWeight="bold" sx={{ mt: 1 }}>
          Đã trễ hạn {lateBy}. Hệ thống không còn nhận tài liệu.
        </Typography>
      );
    }

    const remaining = dayjs.duration(deadline.diff(now));
    const remainingText =
      remaining.asDays() >= 1
        ? `${Math.floor(remaining.asDays())} ngày`
        : remaining.asHours() >= 1
        ? `${Math.floor(remaining.asHours())} giờ`
        : remaining.asMinutes() >= 1
        ? `${Math.floor(remaining.asMinutes())} phút`
        : `${Math.floor(remaining.asSeconds())} giây`;

    return (
      <Typography color="primary" fontWeight="bold" sx={{ mt: 1 }}>
        Còn lại: {remainingText}
      </Typography>
    );
  };

  const getFileIcon = () => {
    if (!file) return null;
    
    const extension = file.name.split('.').pop().toLowerCase();
    
    if (['pdf'].includes(extension)) {
      return <ArticleIcon sx={{ color: '#E44D26' }} />;
    } else if (['doc', 'docx'].includes(extension)) {
      return <ArticleIcon sx={{ color: '#2A5699' }} />;
    } else if (['ppt', 'pptx'].includes(extension)) {
      return <ArticleIcon sx={{ color: '#D04423' }} />;
    } else if (['xls', 'xlsx'].includes(extension)) {
      return <ArticleIcon sx={{ color: '#217346' }} />;
    } else {
      return <ArticleIcon />;
    }
  };

  const renderFileUpload = () => {
    if (!hasSubmitted) {
      return (
        <Box
          sx={{
            border: "2px dashed",
            borderColor: file ? "success.main" : "grey.400",
            padding: 3,
            borderRadius: 2,
            textAlign: "center",
            backgroundColor: file ? "success.light" : "inherit",
            transition: "all 0.3s ease",
            position: "relative",
          }}
        >
          <input
            type="file"
            accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              opacity: 0,
              width: "100%",
              height: "100%",
              cursor: isOverdue ? "not-allowed" : "pointer",
            }}
            onChange={handleFileChange}
            disabled={isOverdue}
          />
          
          {file ? (
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
              <UploadFileIcon color="success" />
              <Typography fontWeight="bold">
                File đã chọn: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
              </Typography>
              <IconButton 
                size="small" 
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Stack>
          ) : (
            <Box>
              <UploadFileIcon sx={{ fontSize: 40, color: "text.secondary", mb: 1 }} />
              <Typography>
                Kéo thả hoặc bấm để chọn file
              </Typography>
              <Typography variant="body2" color="text.secondary">
                (Dung lượng tối đa: {FILE_SIZE_LIMIT_MB}MB)
              </Typography>
            </Box>
          )}
        </Box>
      );
    } else {
      // Hiển thị file đã nộp có thể click để tải về
      return (
        <Paper
          elevation={1}
          sx={{
            padding: 3,
            borderRadius: 2,
            backgroundColor: "success.light",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "success.main",
              "& .download-icon": {
                opacity: 1,
              }
            },
          }}
          onClick={handleDownload}
        >
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
            <Stack direction="row" spacing={2} alignItems="center">
              {getFileIcon()}
              <Typography fontWeight="bold">
                {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
              </Typography>
            </Stack>
            <Box className="download-icon" sx={{ 
              opacity: 0.6, 
              transition: "opacity 0.3s ease",
              display: "flex",
              alignItems: "center",
            }}>
              <Typography variant="body2" sx={{ mr: 1 }}>Click để tải về</Typography>
              <DownloadIcon />
            </Box>
          </Stack>
        </Paper>
      );
    }
  };

  return (
    <Page title="Submit Assignment">
      <Box maxWidth={800} mx="auto" mt={5}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Nộp bài tập
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
          <Typography>
            <strong>Deadline:</strong> {deadline.format("DD/MM/YYYY HH:mm:ss")}
          </Typography>
          {renderTimeInfo()}
        </Paper>

        <Paper elevation={3} sx={{ p: 3 }}>
          <Stack spacing={3}>
            {renderFileUpload()}

            <Box display="flex" justifyContent="flex-end" gap={2}>
              {hasSubmitted ? (
                <Button 
                  variant="outlined" 
                  color="error" 
                  onClick={() => setConfirmRemove(true)}
                  startIcon={<DeleteIcon />}
                >
                  Xóa bài nộp
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!file || isOverdue}
                  onClick={() => setConfirmSubmit(true)}
                >
                  Nộp bài
                </Button>
              )}
            </Box>
          </Stack>
        </Paper>
      </Box>

      {/* Dialog xác nhận nộp */}
      <ConfirmationDialog
        open={confirmSubmit}
        onClose={() => setConfirmSubmit(false)}
        onConfirm={handleSubmit}
        title="Xác nhận nộp bài"
        message={
          <>
            Bạn có chắc chắn muốn nộp bài với file: <strong>{file?.name}</strong>?
            <br />
            Sau khi nộp, bạn vẫn có thể xóa và nộp lại trong thời gian cho phép.
          </>
        }
      />

      {/* Dialog xác nhận xóa */}
      <ConfirmationDialog
        open={confirmRemove}
        onClose={() => setConfirmRemove(false)}
        onConfirm={handleRemove}
        title="Xác nhận xóa bài"
        message="Bạn có chắc chắn muốn xóa bài nộp hiện tại?"
      />
    </Page>
  );
}