import React from 'react';

import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';

import { Dashboard, School, Event, Assignment, Payments, Settings } from '@mui/icons-material';

const navTeacherConfig = [
    { title: 'profile', path: '/profile', icon: <AccountCircleIcon /> },
    { title: 'home', path: '/', icon: <HomeIcon /> },
    { title: 'about', path: '/about', icon: <InfoIcon /> },
  ];

const navStudentConfig = [
    { title: "Dashboard", path: "", icon: <Dashboard /> },
    { title: "Courses", path: "/", icon: <School /> },
    { title: "Schedule", path: "/", icon: <Event /> },
    { title: "Class Registration", path: "/", icon: <Assignment /> },
    { title: "Tuition Fee", path: "/", icon: <Payments /> },
    { title: "Settings", path: "/", icon: <Settings /> }
  ];

const navAdminConfig = [
    { title: 'dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { title: 'courses', path: '/courses', icon: <MenuBookIcon /> },
]

export { navTeacherConfig, navStudentConfig, navAdminConfig };