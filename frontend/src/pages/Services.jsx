import { Container, Typography, Grid, Card, CardContent, Box, Button } from "@mui/material";
import { motion } from "framer-motion";
import { BusinessCenter, School, Person, AdminPanelSettings } from '@mui/icons-material';

import Header from "../components/Header";
import Footer from "../components/Footer";
import Page from "../components/Page";

import { guestDefaultContainer, guestContainerBesidesHome,
        guestTitle, guestWhiteButton } from "../assets/styles/guest";
import { fadeInLeft, fadeInRight, fadeInTop, fadeInBottom } from "../assets/styles/animations";


export default function Services() {
  return (
    <Page title="Services">
      <Header />

      <Container {...guestContainerBesidesHome}>

        <Container {...guestDefaultContainer}
                    sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5em", pb: 7 }}>

            <motion.div variants={fadeInRight(0)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Typography sx={{...guestTitle}}>
                    Services
                </Typography>
            </motion.div>

            <Grid container spacing={7} justifyContent="center">
                {/* For Organizations */}
                <Grid item xs={9}>
                    <motion.div variants={fadeInLeft(0.2)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <Card sx={{ p: 3, boxShadow: 3, borderRadius: "1em", backgroundColor: "primary.main" }}>
                        <CardContent>
                            <Grid container alignItems="center" spacing={7}>
                                <Grid item>
                                    <Box sx={{ color: "primary.lighter" }}>
                                        <BusinessCenter sx={{fontSize: "12rem"}} />
                                    </Box>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="h4" sx={{ mb: 2, color: "primary.lighter", fontWeight: 600 }}>
                                        For Administrators
                                    </Typography>
                                    <ul class="ul-guest">
                                        <li>Centralized student management system</li>
                                        <li>Seamless communication between staff, students, and parents</li>
                                        <li>Data-driven insights for better decision-making</li>
                                        <li>Real-time reporting and analysis tools</li>
                                        <li>Secure and scalable platform</li>
                                    </ul>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    </motion.div>
                </Grid>

                {/* For Students */}
                <Grid item xs={9}>
                    <motion.div variants={fadeInLeft(0.4)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <Card sx={{ p: 3, boxShadow: 3, borderRadius: "1em", backgroundColor: "primary.dark" }}>
                            <CardContent>
                                <Grid container alignItems="center" spacing={7}>
                                    <Grid item>
                                        <Box sx={{ color: "primary.lighter" }}>
                                            <School sx={{fontSize: "12rem"}} />
                                        </Box>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography variant="h4" sx={{ mb: 2, color: "primary.lighter", fontWeight: 600 }}>
                                            For Students
                                        </Typography>
                                        <ul class="ul-guest">
                                            <li>Easy access to class schedules and grades</li>
                                            <li>Online submission of assignments and projects</li>
                                            <li>Direct communication with instructors and classmates</li>
                                            <li>View and manage personal academic records</li>
                                            <li>Real-time notifications for updates and deadlines</li>
                                        </ul>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </motion.div>
                </Grid>

                {/* For Teachers */}
                <Grid item xs={9}>
                    <motion.div variants={fadeInLeft(0)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <Card sx={{ p: 3, boxShadow: 3, borderRadius: "1em", backgroundColor: "primary.darker" }}>
                            <CardContent>
                                <Grid container alignItems="center" spacing={7}>
                                        <Grid item>
                                            <Box sx={{ color: "primary.lighter" }}>
                                                <Person sx={{fontSize: "12rem"}} />
                                            </Box>
                                        </Grid>
                                    <Grid item xs>
                                        <Typography variant="h4" sx={{ mb: 2, color: "primary.lighter", fontWeight: 600 }}>
                                            For Teachers
                                        </Typography>
                                        <ul class="ul-guest">
                                            <li>Gradebook and progress tracking tools</li>
                                            <li>Manage assignments, exams, and class materials</li>
                                            <li>Instant communication with students and parents</li>
                                            <li>Customizable classroom settings and preferences</li>
                                            <li>Efficient workload management with automated reminders</li>
                                        </ul>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </motion.div>
                </Grid>

                {/* For Administrators */}
                <Grid item xs={9}>
                    <motion.div variants={fadeInLeft(0.2)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <Card sx={{ p: 3, boxShadow: 3, borderRadius: "1em", backgroundColor: "primary.darkest" }}>
                            <CardContent>
                                <Grid container alignItems="center" spacing={7}>
                                    <Grid item>
                                        <Box sx={{ color: "primary.lighter" }}>
                                            <AdminPanelSettings sx={{fontSize: "12rem"}} />
                                        </Box>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography variant="h4" sx={{ mb: 2, color: "primary.lighter", fontWeight: 600 }}>
                                            For Administrators
                                        </Typography>
                                        <ul class="ul-guest">
                                            <li>Comprehensive dashboard for all system data</li>
                                            <li>Manage user roles and permissions efficiently</li>
                                            <li>Real-time student, teacher, and course tracking</li>
                                            <li>Customizable reports and analytics</li>
                                            <li>Ensure data security and compliance with standards</li>
                                        </ul>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </motion.div>
                </Grid>
            </Grid>

            <motion.div variants={fadeInRight(0.2)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", gap: "1em", mt: 8}}>
                    <Typography variant="h5" sx={{ fontWeight: 500, fontStyle: "italic" }}>
                        Already a student, teacher, or administrator in your organization?
                    </Typography>
                    <Button component="a" href="/auth/login" sx={{...guestWhiteButton, width: "40%"}}>
                        Log In Now!
                    </Button>
                </Box>
            </motion.div>
        
        </Container>
      
      </Container>

      <Footer />
    
    </Page>
  );
}