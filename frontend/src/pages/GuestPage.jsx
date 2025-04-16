// components
import React from "react";
import { Container, Box, Typography, Button, Grid, Card, CardContent, IconButton } from "@mui/material";
import { AccountCircle, FileUpload, SettingsSuggest } from '@mui/icons-material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { School, Chat, Security, Settings } from "@mui/icons-material";
import { motion } from "framer-motion";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Page from "../components/Page";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import FrontPicture from "/Guest Introduction.svg";
import Logo from "../assets/Logo.svg"
import { guestDefaultContainer, guestContainerHomeParts, guestContainerImageHome,
        guestBlueButton, guestWhiteButton, guestBlueStairsCard,
        guestTitle, guestSpanStrong } from "../assets/styles/guest";
import { fadeInLeft, fadeInRight, fadeInTop, fadeInBottom } from "../assets/styles/animations"

// ----------------------------------------------------------------------
const benefits = [
    { icon: <School />, title: "All-in-One System", description: "Manage students, teachers, staff, grades, and even attendance." },
    { icon: <Chat />, title: "Easy Communication", description: "Messaging & notifications for parents, students, and teachers." },
    { icon: <Security />, title: "Data Security", description: "Secure cloud storage for student records." },
    { icon: <Settings />, title: "Customizable", description: "Adapt to any institution’s needs." }
  ];

  const testimonials = [
    { text: "InfoStudia transformed our school’s management system. Our workflow is now seamless!", author: "Principal, XYZ High School" },
    { text: "We reduced admin time by 60%! Highly recommended for any institution.", author: "Admin Officer, ABC University" },
    { text: "The system is intuitive and easy to use. It saved us so much time and effort in managing student data.", author: "IT Specialist, DEF College" },
    { text: "Thanks to InfoStudia, we can now easily track student progress and attendance. It's a game changer!", author: "Teacher, GHI Academy" },
    { text: "InfoStudia has made communication between staff, students, and parents so much easier. It's incredibly efficient!", author: "Director, JKL School District" },
    { text: "The cloud storage and data security features are fantastic. We feel much more secure in handling sensitive information.", author: "Data Officer, MNO University" },
    { text: "InfoStudia's customizable features made it the perfect solution for our school’s unique needs. Highly recommend it!", author: "Principal, PQR School" },
    { text: "We can now generate reports effortlessly. InfoStudia has truly streamlined our administrative processes.", author: "Administrator, STU High School" }
  ];

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <IconButton
        onClick={onClick}
        sx={{ position: "absolute", top: "50%", right: "-50px", transform: "translateY(-50%)", backgroundColor: "primary.lighter",
          "&:hover": { backgroundColor: "primary.light" },}}>
        <ArrowForwardIos sx={{ color: "primary.main", fontSize: "2rem" }} />
      </IconButton>
    );
  };
  
  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <IconButton
        onClick={onClick}
        sx={{
          position: "absolute", top: "50%", left: "-50px", transform: "translateY(-50%)", backgroundColor: "primary.lighter",
          "&:hover": { backgroundColor: "primary.light" },}}>
        <ArrowBackIos sx={{ color: "primary.main", fontSize: "2rem" }} />
      </IconButton>
    );
};
  
  export function Testimonials() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />
    };
  
    return (
      <Container>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <Box key={index} sx={{ display: "flex", justifyContent: "center" }}>
              <Card sx={{ maxWidth: 800, p: 4, boxShadow: 3, margin: "0 auto" }}>
                <CardContent>
                  <Typography variant="subtitlecard1" sx={{ fontStyle: "italic", mb: 2 }}>
                    {testimonial.text}
                  </Typography>
                  <Typography variant="subtitlecard2" sx={{ textAlign: "right", color: "primary.main" }}>
                    – {testimonial.author}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Slider>
      </Container>
    );
}

// ----------------------------------------------------------------------

export default function GuestPage() {
    return (
      <Page title="InfoStudia">

        <Header />

        <Container {...guestDefaultContainer}>

            <Container {...guestContainerHomeParts}
                    sx={{ minHeight: "100vh", gap: "9em", pt: "4em", px: "6.5em",
                        display: "flex", alignItems: "center", justifyContent: "space-between"}}>

                {/* Left Section */}
                <Box sx={{flexGrow: 1, pr: "5em", maxWidth: "55%",
                            display: "flex", flexDirection: "column", justifyContent: "left", gap: "3.5em"}}>
                    <Box>
                        <motion.div variants={fadeInLeft(0)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <Typography sx={{fontWeight: 400, fontSize: "4rem", lineHeight: 1.15, mb: "0.5em"}}>
                                Where education meets innovation.
                            </Typography>
                        </motion.div>

                        <motion.div variants={fadeInLeft(0.2)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <Typography variant="subtitle2" sx={{textAlign: "justify"}}>
                                Streamline student management with a powerful, all-in-one system
                                designed for modern institutions. Experience the future of
                                education management today, with 
                                <Typography component="span"
                                    sx = {{...guestSpanStrong, fontSize: "1.4rem"}}> InfoStudia.</Typography>
                            </Typography>
                        </motion.div>
                    </Box>

                    <motion.div variants={fadeInLeft(0.4)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Button component="a" href="/services"
                                    sx={guestBlueButton}>
                                Get Started
                            </Button>
                            <Button component="a" href="/about"
                                    sx={guestWhiteButton}>
                                About Us
                            </Button>
                        </Box>
                    </motion.div>
                </Box>
                    
                {/* Right Section*/}
                <Box sx={{
                    flexShrink: 0, maxWidth: 500,
                    display: "flex", justifyContent: "center", alignItems: "center"
                }}>
                    <motion.img
                        src={FrontPicture} alt="InfoStudia"
                        variants={fadeInRight(0.6)} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        style={{ width: "100%", objectFit: "contain"}}
                    />
                </Box>
                
            </Container>

            <Container disableGutters maxWidth="xl"
                    sx={{ ...guestContainerImageHome}}>
                
                <motion.div variants={fadeInTop(0)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <Box sx={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                        <Typography sx={{...guestTitle, color: "primary.lighter", mb: 0}}>
                            Revolutionizing Student Management
                        </Typography>
                        <Typography variant="h4" sx={{color: "primary.lighter", fontWeight: "light"}}>
                            for Schools & Universities
                        </Typography>
                    </Box>
                </motion.div>
                

                <Grid container spacing={7}>
                    {benefits.map((benefit, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <motion.Grid
                            variants={fadeInBottom(0.1 * index + 0.1)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5em"}}
                        >
                            <Box sx= {{backgroundColor: "primary.lighter", borderRadius: "6rem", p: 3}}>
                                {React.cloneElement(benefit.icon,
                                    { sx: { color: "secondary.darker", fontSize: "6rem" } })}
                            </Box>
                            <Box>
                                <Typography variant="h5" sx={{color: "primary.lighter", textAlign: "center", fontWeight: 600, mb: 1.5}}>
                                    {benefit.title}
                                </Typography>
                                <Typography sx={{fontSize: "1rem", color: "primary.lighter", textAlign: "center"}}>
                                    {benefit.description}
                                </Typography>
                            </Box>
                        </motion.Grid>
                    </Grid>
                    ))}
                </Grid>
            
            </Container>

            <Container {...guestContainerHomeParts}
                    sx={{ minHeight: "100vh", gap: "2em", py: "5em", px: "6.5em",
                        display: "flex", alignItems: "center", flexDirection: "column"}}>

                <motion.div variants={fadeInLeft(0)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <Typography sx={{...guestTitle, color: "primary.main"}}>
                        How InfoStudia works?
                    </Typography>
                </motion.div>
                
                <Box sx={{display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "2em", width: "100%"}}>
                    <motion.div variants={fadeInRight(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                            <Card sx={guestBlueStairsCard}>
                                <AccountCircle sx={{fontSize: "5rem", color: "primary.lighter"}}/>
                                <Box sx={{ display: "flex", flexDirection: "column",
                                        alignItems: "flex-start", justifyContent: "center", gap: "0.4em"}}>
                                    <Typography variant="h5" sx={{ color: "primary.lighter", fontWeight: 600 }}>
                                        Set Up Your Organization
                                    </Typography>
                                    <Typography sx={{ fontSize: '1rem', color: "primary.lighter" }}>
                                        Contact us, set up your organization, and get started.
                                    </Typography>
                                </Box>
                            </Card>
                        </Box>
                    </motion.div>
                    
                    <motion.div variants={fadeInRight(0.2)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Card sx={{...guestBlueStairsCard, backgroundColor: "primary.darker"}}>
                                <FileUpload sx={{fontSize: "5rem", color: "primary.lighter"}}/>
                                <Box sx={{ display: "flex", flexDirection: "column",
                                        alignItems: "flex-start", justifyContent: "center", gap: "0.4em"}}>
                                    <Typography variant="h5" sx={{ color: "primary.lighter", fontWeight: 600 }}>
                                        Manage Your Data
                                    </Typography>
                                    <Typography sx={{ fontSize: '1rem', color: "primary.lighter" }}>
                                        Upload student records, manage attendance, grades, and more.
                                    </Typography>
                                </Box>
                            </Card>
                        </Box>
                    </motion.div>
                    
                    <motion.div variants={fadeInRight(0.3)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <Card sx={{...guestBlueStairsCard, backgroundColor: "primary.darkest"}}>
                                <SettingsSuggest sx={{fontSize: "5rem", color: "primary.lighter"}}/>
                                <Box sx={{ display: "flex", flexDirection: "column",
                                        alignItems: "flex-start", justifyContent: "center", gap: "0.4em"}}>
                                    <Typography variant="h5" sx={{ color: "primary.lighter", fontWeight: 600 }}>
                                        Start Automating Your Process
                                    </Typography>
                                    <Typography sx={{ fontSize: '1rem', color: "primary.lighter" }}>
                                        Automate reports, grades, and attendance for a smooth operation.
                                    </Typography>
                                </Box>
                            </Card>
                        </Box>
                    </motion.div>

                </Box>
                
            </Container>

            <Container {...guestContainerHomeParts}
                    sx={{ minHeight: "85vh", gap: "3.5em", py: "5em", px: "6.5em", backgroundColor: "primary.main",
                        display: "flex", alignItems: "center", flexDirection: "column"}}>
                
                <motion.div variants={fadeInRight(0)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <Typography sx={{...guestTitle, color: "primary.lighter"}}>
                        Our Clients Speak
                    </Typography>
                </motion.div>

                <motion.div variants={fadeInLeft(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <Testimonials />
                </motion.div>

            </Container>

            <Container {...guestContainerHomeParts}
                    sx={{ minHeight: "60vh", gap: "2em", py: "2em", px: "6.5em",
                        display: "flex", alignItems: "center", flexDirection: "column"}}>
                
                <Box sx={{width: "100%", gap: "3em", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    
                    <Box sx={{ width: "40%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <motion.img
                            src={Logo} alt="Logo"
                            variants={fadeInLeft(0)} initial="hidden" whileInView="visible" viewport={{ once: true }}
                            style={{ width: "100%", objectFit: "contain"}}
                        />
                    </Box>

                    <Box sx={{display: "flex", flexDirection: "column", width: "55%"}}>
                        <motion.div variants={fadeInRight(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <Typography sx={{...guestTitle, fontWeight: 400, color:"secondary.main", mb: 3}}>
                                Interested in <Typography component="span" sx={{...guestTitle, display: "inline", color: "primary.main"}}>InfoStudia?</Typography>
                            </Typography>
                        </motion.div>
                        
                        <motion.div variants={fadeInRight(0.2)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Button component="a" href="/services"
                                        sx={guestBlueButton}>
                                    Our Services
                                </Button>
                                <Button component="a" href="/contact"
                                        sx={guestWhiteButton}>
                                    Contact Us
                                </Button>
                            </Box>
                        </motion.div>
                    </Box>

                </Box>
                
            </Container>

        </Container>

        <Footer />

      </Page>
    );
}