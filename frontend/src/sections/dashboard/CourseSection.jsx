import { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Paper,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Chip,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LinkIcon from '@mui/icons-material/Link';
import YouTubeIcon from '@mui/icons-material/YouTube';
import NotificationsIcon from '@mui/icons-material/Notifications';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import QuizIcon from '@mui/icons-material/Quiz';

import ConfirmationDialog from '../../components/ConfirmationDialog';
// Custom styles for Moodle-like appearance
const moodleStyles = {
  accordion: {
    marginBottom: '16px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    '&:before': {
      display: 'none',
    },
  },
  accordionSummary: {
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #e0e0e0',
    borderRadius: '8px 8px 0 0',
    '&.Mui-expanded': {
      minHeight: '64px',
    }
  },
  accordionDetails: {
    padding: 0,
    backgroundColor: '#ffffff',
    borderRadius: '0 0 8px 8px',
  },
  sectionTitle: {
    fontWeight: 600,
    fontSize: '1rem',
  },
  iconBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '4px',
    backgroundColor: '#1e88e5',
    color: 'white',
    marginRight: '16px',
  },
  listItem: {
    borderLeft: '4px solid transparent',
    cursor: 'pointer',
    '&:hover': {
      borderLeft: '4px solid #1e88e5',
      backgroundColor: 'rgba(30, 136, 229, 0.04)',
    },
    padding: '12px 16px',
  },
  linkItem: {
    cursor: 'pointer',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  addButton: {
    backgroundColor: '#4caf50',
    color: 'white',
    '&:hover': {
      backgroundColor: '#388e3c',
    }
  },
  resourceIcon: {
    marginRight: '8px',
    color: '#757575',
  },
  mainContainer: {
    backgroundColor: '#f9f9f9',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },
  itemCount: {
    backgroundColor: '#e0e0e0',
    color: '#424242',
    height: '24px',
    marginLeft: '8px',
  },
  dividerContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '24px 0',
  },
  divider: {
    flexGrow: 1,
  },
  dividerText: {
    margin: '0 16px',
    color: '#757575',
  },
  uploadButton: {
    margin: '8px',
    textTransform: 'none',
  },
};

const getResourceIcon = (type) => {
  switch (type) {
    case 'pdf':
      return <InsertDriveFileIcon />;
    case 'video':
      return <YouTubeIcon />;
    case 'assignment':
      return <AssignmentIcon />;
    case 'link':
      return <LinkIcon />;
    case 'notification':
      return <NotificationsIcon />;
    case 'quiz':
      return <QuizIcon />;
    default:
      return <DescriptionIcon />;
  }
}

const CollapsibleSection = ({ title, isTeacherMode, sectionColor}) => {
  const [items, setItems] = useState([
    { id: 1, content: 'Tài liệu giới thiệu khóa học', type: 'pdf' },
    { id: 2, content: 'Video bài giảng tuần 1', type: 'video' },
    { id: 3, content: 'Bài tập thực hành', type: 'assignment' },
    { id: 4, content: 'Liên kết tham khảo', type: 'link' }
  ]);
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [newItemText, setNewItemText] = useState('');
  const [newItemType, setNewItemType] = useState('link');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  
  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };
  
  const handleConfirmDelete = () => {
    setItems(items.filter(item => item.id !== itemToDelete.id));
    setDeleteDialogOpen(false);
  };
  
  const handleAddItem = () => {
    if (newItemText.trim()) {
      const newId = Math.max(...items.map(item => item.id), 0) + 1;
      setItems([...items, { id: newId, content: newItemText, type: newItemType, url: linkUrl }]);
      setNewItemText('');
      setLinkUrl('');
      setAddDialogOpen(false);
    }
  };
  
  const handleAddLink = () => {
    if (newItemText.trim() && linkUrl.trim()) {
      const newId = Math.max(...items.map(item => item.id), 0) + 1;
      setItems([...items, { id: newId, content: newItemText, type: 'link', url: linkUrl }]);
      setNewItemText('');
      setLinkUrl('');
      setAddDialogOpen(false);
    }
  };
  
  const handleAddResource = (type) => {
    if (newItemText.trim()) {
      const newId = Math.max(...items.map(item => item.id), 0) + 1;
      setItems([...items, { id: newId, content: newItemText, type: type }]);
      setNewItemText('');
      setAddDialogOpen(false);
    }
  };
  
  return (
    <Accordion 
      expanded={expanded} 
      onChange={() => setExpanded(!expanded)}
      sx={moodleStyles.accordion}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel-content"
        id="panel-header"
        sx={{
          ...moodleStyles.accordionSummary,
          backgroundColor: sectionColor || '#f5f5f5'
        }}
      >
        <Box display="flex" alignItems="center" width="100%">
          <Typography sx={moodleStyles.sectionTitle}>{title}</Typography>
          <Box flexGrow={1} />
          <Chip 
            label={`${items.length} items`}
            size="small"
            sx={moodleStyles.itemCount}
          />
        </Box>
      </AccordionSummary>
      
      <AccordionDetails sx={moodleStyles.accordionDetails}>
        <List sx={{ width: '100%', padding: 0 }}>
          {items.map((item, index) => (
            <ListItem 
              key={item.id} 
              divider={index < items.length - 1}
              sx={{
                ...moodleStyles.listItem,
                ...(item.type === 'link' && moodleStyles.linkItem)
              }}
              button
              component={item.type === 'link' ? "a" : "div"}
              href={item.type === 'link' ? item.url : undefined}
              target={item.type === 'link' ? "_blank" : undefined}
            >
              <ListItemIcon>
                {getResourceIcon(item.type)}
              </ListItemIcon>
              <ListItemText 
                primary={item.content} 
                primaryTypographyProps={{
                  style: item.type === 'link' ? { textDecoration: 'underline' } : {}
                }}
              />
              
              {isTeacherMode && (
                <ListItemSecondaryAction>
                  <Tooltip title="Delete item">
                    <IconButton 
                      edge="end" 
                      size="small" 
                      color="error" 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDeleteClick(item);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              )}
            </ListItem>
          ))}
        </List>
        
        {isTeacherMode && (
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
            <Button 
              startIcon={<AddIcon />} 
              variant="contained" 
              size="small"
              onClick={() => setAddDialogOpen(true)}
              sx={moodleStyles.addButton}
            >
              Thêm tài liệu mới
            </Button>
          </Box>
        )}
      </AccordionDetails>
      
      <ConfirmationDialog 
        title={"Xác nhận xóa"} 
        message={"Bạn có chắc chắn muốn xóa tài liệu này?"} 
        open={deleteDialogOpen} 
        onClose={() => setDeleteDialogOpen(false)} 
        onConfirm={handleConfirmDelete} 
      />
      
      {/* Add Item Dialog - Redesigned */}
      <Dialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Thêm tài liệu mới</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              autoFocus
              margin="dense"
              label="Tên tài liệu"
              fullWidth
              variant="outlined"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
            />
          </Box>
          
          {/* Link Section */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Thêm đường liên kết:
            </Typography>
            <TextField
              margin="dense"
              label="Nhập URL"
              fullWidth
              variant="outlined"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://..."
              InputProps={{
                startAdornment: <LinkIcon color="action" sx={{ mr: 1 }} />,
              }}
            />
            
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              sx={{ mt: 1 }}
              disabled={!newItemText.trim() || !linkUrl.trim()}
              onClick={handleAddLink}
            >
              Thêm liên kết
            </Button>
          </Box>
          
          {/* Divider */}
          <Box sx={moodleStyles.dividerContainer}>
            <Divider sx={moodleStyles.divider} />
            <Typography variant="body2" sx={moodleStyles.dividerText}>HOẶC</Typography>
            <Divider sx={moodleStyles.divider} />
          </Box>
          
          {/* Resource Buttons */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<InsertDriveFileIcon />}
              sx={moodleStyles.uploadButton}
              disabled={!newItemText.trim()}
              onClick={() => handleAddResource('pdf')}
            >
              Tải tài liệu PDF
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<QuizIcon />}
              sx={moodleStyles.uploadButton}
              disabled={!newItemText.trim()}
              onClick={() => handleAddResource('quiz')}
            >
              Tạo trắc nghiệm
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<AssignmentIcon />}
              sx={moodleStyles.uploadButton}
              disabled={!newItemText.trim()}
              onClick={() => handleAddResource('assignment')}
            >
              Tạo bài nộp
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>Hủy</Button>
        </DialogActions>
      </Dialog>
    </Accordion>
  );
};

const CourseSection = ({isTeacherMode}) => {
  console.log('isTeacherMode', isTeacherMode);
  return (
    <Paper elevation={0} sx={moodleStyles.mainContainer}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">Nội dung khóa học</Typography>
      </Box>
      
      <CollapsibleSection 
        title="Thông tin chung" 
        icon={<Typography variant="h6">📢</Typography>}
        isTeacherMode={isTeacherMode}
        sectionColor="#e3f2fd" 
      />
      
      <CollapsibleSection 
        title="Bài giảng và tài liệu" 
        icon={<Typography variant="h6">📚</Typography>}
        isTeacherMode={isTeacherMode}
        sectionColor="#e8f5e9" 
      />
      
      <CollapsibleSection 
        title="Bài tập và dự án" 
        icon={<Typography variant="h6">✏️</Typography>}  
        isTeacherMode={isTeacherMode}
        sectionColor="#fff8e1" 
      />
      
      <CollapsibleSection 
        title="Tài liệu tham khảo" 
        icon={<Typography variant="h6">📋</Typography>}
        isTeacherMode={isTeacherMode}
        sectionColor="#f3e5f5" 
      />
    </Paper>
  );
};

export default CourseSection;