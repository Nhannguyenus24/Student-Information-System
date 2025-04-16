import {useContext } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { 
  Box,
  List,
  Drawer,
  Divider,
  Typography,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  IconButton,
  Tooltip,
  Avatar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { AuthContext } from '../contexts/JWTContext';
// icons
import MenuIcon from '@mui/icons-material/Menu';
import { navAdminConfig, navTeacherConfig, navStudentConfig } from './NavConfig';
// Constants
const DRAWER_WIDTH = 250;
const COLLAPSED_WIDTH = 85;

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// Sidebar Component
export default function MainSideBar({ isOpenSidebar, onToggleSidebar }) {
  // Internal collapsed state
  const { user } = useContext(AuthContext);
  const navConfig = user?.role === 'admin' ? navAdminConfig : user?.role === 'teacher' ? navTeacherConfig : navStudentConfig;
  const renderContent = (
    <>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: isOpenSidebar ? 'center' : 'space-between', 
        p: isOpenSidebar ? 1 : 2,
        minHeight: 64
      }}>
        {isOpenSidebar ? (
          <IconButton onClick={onToggleSidebar} color="primary">
            <MenuIcon />
          </IconButton>
        ) : (
          <>
            <Typography sx={{ flexGrow: 1, fontWeight: 700, fontSize: "1.2rem", color: "primary.main" }}>
              Workplace
            </Typography>
            <IconButton onClick={onToggleSidebar}>
              <MenuIcon />
            </IconButton>
          </>
        )}
      </Box>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <List disablePadding>
        {navConfig.map((item) => (
          <NavItem key={item.title} item={item} isOpenSidebar={isOpenSidebar} />
        ))}
      </List>

      {/* Spacer to push the user profile to the bottom */}
      <Box sx={{ flexGrow: 1 }} />

      <Divider sx={{ mt: 2 }} />
      
      {/* User Profile Section */}
      <Box
        sx={{
          p: 2, backgroundColor: "primary.main",
          display: 'flex',
          alignItems: 'center', gap: "1em",
          justifyContent: isOpenSidebar ? 'center' : 'flex-start',
        }}
      >
        <Avatar 
          src={user?.avatar || undefined} 
          alt={user?.name || "User Avatar"}
          sx={{ 
            width: 40, 
            height: 40,
            border: '2px solid primary.main',
            bgcolor: user?.avatar ? 'transparent' : 'grey.300',
            color: 'white', 
            fontWeight: 'bold',
            fontSize: 18
          }}
        >
          {!user?.avatar && user?.name ? user.name.charAt(0).toUpperCase() : ''}
        </Avatar>
        
        {!isOpenSidebar && (
          <Box sx = {{ display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
            <Typography variant="h5" sx={{ color: 'primary.lighter' }}>
              {user?.name || "Unknown"}
            </Typography>
            <Typography variant="caption" sx={{ color: 'primary.lighter', textTransform: 'capitalize'  }}>
              {user?.role || "unknown"} 
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );

  return (
    <Drawer
      open={isOpenSidebar}
      variant="permanent"
      sx={{
        width: isOpenSidebar ? COLLAPSED_WIDTH : DRAWER_WIDTH,
        transition: theme => theme.transitions.create('width', {
          duration: theme.transitions.duration.standard,
        }),
        '& .MuiDrawer-paper': {
          width: isOpenSidebar ? COLLAPSED_WIDTH : DRAWER_WIDTH,
          transition: theme => theme.transitions.create('width', {
            duration: theme.transitions.duration.standard,
          }),
          bgcolor: 'background.default',
          position: 'fixed',
          height: "calc(100vh - 64px)", // Full height minus header
          marginTop: "64px", // Adjust for header
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      {renderContent}
    </Drawer>
  );
}

// Navigation Item Component
function NavItem({ item, isOpenSidebar }) {
  const { title, path, icon } = item;

  const listItemButton = (
    <ListItemButton
      component={RouterLink}
      to={path}
      sx={{
        height: 48,
        position: 'relative',
        textTransform: 'capitalize',
        color: 'text.secondary',
        '&.active': {
          color: 'white',
          bgcolor: 'primary.main',
          fontWeight: 'fontWeightBold',
        },
        '&:hover': {
          bgcolor: 'action.hover',
          color: 'primary.main',
        },
        justifyContent: isOpenSidebar ? 'center' : 'flex-start',
        px: 0, py: "1.75em"
      }}
    >
      <ListItemIconStyle>{icon}</ListItemIconStyle>
      {!isOpenSidebar && (
        <ListItemText 
          disableTypography 
          primary={title} 
          sx={{ textTransform: 'capitalize' }} 
        />
      )}
    </ListItemButton>
  );

  return isOpenSidebar ? (
    <Tooltip title={title} placement="right">
      {listItemButton}
    </Tooltip>
  ) : (
    listItemButton
  );
}