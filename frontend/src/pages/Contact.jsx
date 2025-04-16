// components
import { Container, Box, Typography, Card, useMediaQuery } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Page from "../components/Page";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import {
  guestDefaultContainer,
  guestContainerContact,
  guestTitle,
} from "../assets/styles/guest";

import PhoneIcon from "@mui/icons-material/Phone";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EmailIcon from "@mui/icons-material/Email";

// ----------------------------------------------------------------------

const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeIn" } }
};

const fadeCenterLeft = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeIn", delay: 0.25 } }
};

const fadeCenterRight = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeIn", delay: 0.5 } }

};

const MotionCard = motion(Card);
const MotionBox = motion(Box);

export default function Contact() {
    return (
      <Page title="Contact">

        <Header />

        <Container disableGutters maxWidth="xl" sx={guestContainerContact}>

            <Container {...guestDefaultContainer}>

                <motion.div
                    initial={{ opacity: 0, y: 50 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.8 }} 
                    viewport={{ once: true }}
                >
                    <Typography sx={{...guestTitle, color: "white"}}>
                        Contact
                    </Typography>
                </motion.div>
                
                <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", gap: "5em"}}>

                    <MotionBox
                        initial="hidden" 
                        whileInView="visible" 
                        variants={fadeCenterLeft} 
                        viewport={{ once: true }}
                        sx={{ flex: 1.5 }}
                    >
                        <Typography sx={{fontSize: "1.25rem", mb: "2rem", textAlign: "justify"}}>
                            If you are a parent, student or teacher at a school that uses <strong>InfoStudia</strong>, you can get support from your Student Affairs Office.
                        </Typography>
                        <Typography sx={{fontSize: "1.25rem", textAlign: "justify"}}>
                            If you are currently an <strong>InfoStudia</strong> user, or if you are not using <strong>InfoStudia</strong> and would like to speak with one of our team members, please email us directly or come to our company for support.
                        </Typography>
                    </MotionBox>

                    <MotionCard
                            initial="hidden"
                            whileInView="visible"
                            variants={fadeCenterRight}
                            viewport={{ once: true }}
                            sx={{
                                borderRadius: 3,
                                boxShadow: 3,
                                p: "3em",
                                display: "flex",
                                flexDirection: "column",
                                gap: "2em"
                            }}
                    >
                            <Typography variant="h4" sx={{color: "secondary.darkest", textAlign: "center", fontWeight: 700}}>
                                Contact Info
                            </Typography>
                            <Box sx={{display: "flex", flexDirection: "column", gap: "1em", alignItems:"flex-start"}}>
                                <Typography sx={{fontSize: "1rem", color: "secondary.darkest", display: "flex", justifyContent: "center"}}>
                                    <MenuBookIcon sx={{mr: 2}}/> 227 Nguyễn Văn Cừ, Ward 4, District 5, Hồ Chí Minh City
                                </Typography>
                                <Typography sx={{fontSize: "1rem", color: "secondary.darkest", display: "flex", justifyContent: "center"}}>
                                    <EmailIcon sx={{mr: 2}}/> ntnhan223@clc.fitus.edu.vn
                                </Typography>
                                <Typography sx={{fontSize: "1rem", color: "secondary.darkest", display: "flex", justifyContent: "center"}}>
                                    <PhoneIcon sx={{mr: 2}}/> 028 3975 6922 | 028 3975 6991
                                </Typography>
                                <Typography sx={{fontSize: "1rem", color: "secondary.darkest", display: "flex", justifyContent: "center"}}>
                                    <SchoolIcon sx={{mr: 2}}/> Mr. Nguyễn Trọng Nhân
                                </Typography>
                            </Box>
                    </MotionCard>
                
                </Box>

            </Container>

        </Container>

      <Footer />
    </Page>
  );
}
