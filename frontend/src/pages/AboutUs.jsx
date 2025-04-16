import { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Backdrop,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import Page from "../components/Page";

// Icons
import PhoneIcon from "@mui/icons-material/Phone";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EmailIcon from "@mui/icons-material/Email";

// Styles
import { guestDefaultContainer, guestContainerBesidesHome,
        guestTitle, guestSpanStrong, guestViewDetailsButton } from "../assets/styles/guest";

// Team Members Data
const teamMembers = [
  {
    name: "Nguyễn Trọng Nhân",
    role: "Fullstack Developer",
    img: "https://scontent.fhan4-3.fna.fbcdn.net/v/t39.30808-6/474666549_2641534779375369_4594648735971289345_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=f727a1&_nc_ohc=dCbf_6N9jWAQ7kNvgEM5GVB&_nc_oc=AdnCYwXBxPmYCfe3oV9jUOTLj6uPKZ1c-1vwk0d-wrUsoFToJ-I6WcQZpk8KshxwRv0&_nc_zt=23&_nc_ht=scontent.fhan4-3.fna&_nc_gid=PnVgiWdjzmgTkuoQDwoZrQ&oh=00_AYEbVOGlrpxatLoaj8eewpNfmL7fqVta9RLku6iIn8ucqA&oe=67ED269F",
    email: "ntnhan223@clc.fitus.edu.vn",
    phone: "0345-678-901",
    university: "Trường Đại học Khoa học tự nhiên, ĐHQG-HCM",
    major: "Công nghệ phần mềm",
    bio: "Giúp công ty phát triển mạnh mẽ trong lĩnh vực công nghệ.",
  },
  {
    name: "Lâm Tiến Huy",
    role: "UI/UX Designer, Frontend Developer",
    img: "https://scontent.fhan4-5.fna.fbcdn.net/v/t39.30808-6/475598899_2645618505633663_4166463053756658026_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=kv8RNpD98iwQ7kNvgGYE_Q8&_nc_oc=AdnCtRd8Kd4DuwxZvlqQbU3yA0_9ks3Ji5ZOf9aQ3gMf66y1iTxBgkE2Byrp2XTvMaM&_nc_zt=23&_nc_ht=scontent.fhan4-5.fna&_nc_gid=-5li9zTpFtmADfRaHVmeTg&oh=00_AYED_2zd2bd5xBwzD4Pz8gfOCD9ImLjYHF9mzb9j4xwkvA&oe=67ED1618",
    email: "lthuy22@clc.fitus.edu.vn",
    phone: "0123-456-789",
    university: "Trường Đại học Khoa học tự nhiên, ĐHQG-HCM",
    major: "Hệ thống thông tin",
    bio: "Đam mê sáng tạo và thiết kế giao diện người dùng đẹp mắt, hiện đại.",
  },
  {
    name: "Trần Gia Khang",
    role: "UI/UX Designer, Frontend Developer",
    img: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/511749480.jpg?k=723012fc962d4f897dd7fd92490f31f2bb8d510087059b24af5b088cd380264c&o=&hp=1",
    email: "tgkhang22@clc.fitus.edu.vn",
    phone: "0567-890-123",
    university: "Trường Đại học Khoa học tự nhiên, ĐHQG-HCM",
    major: "Công nghệ phần mềm",
    bio: "Xây dựng trải nghiệm người dùng hiệu quả và mạnh mẽ.",
  },
  {
    name: "Kha Vĩnh Thuận",
    role: "Backend Developer",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Pig_farm_Vampula_1.jpg/330px-Pig_farm_Vampula_1.jpg",
    email: "kvthuan22@clc.fitus.edu.vn",
    phone: "0987-654-321",
    university: "Trường Đại học Khoa học tự nhiên, ĐHQG-HCM",
    major: "Hệ thống thông tin",
    bio: "Phát triển hệ thống dữ liệu tối ưu hoá về tốc độ.",
  },
  {
    name: "Phạm Thị Mỹ Hạnh",
    role: "Backend Developer",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNCKrv17KePR1T5gLtYElcSn7XSWCFbysbsA&s",
    email: "ptmhanh22@clc.fitus.edu.vn",
    phone: "0678-901-234",
    university: "Trường Đại học Khoa học tự nhiên, ĐHQG-HCM",
    major: "Công nghệ phần mềm",
    bio: "Xây dựng cơ sở dữ liệu an toàn và bảo mật.",
  },
];

export default function AboutUs() {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <Page title="About Us">
      
      <Header />

      <Container {...guestContainerBesidesHome}>

        <Container {...guestDefaultContainer}>

          {/* Introduction Section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }} 
            viewport={{ once: true }}
          >
            <Typography sx={guestTitle}>
              About Us
            </Typography>
            <Typography variant="body2" textAlign="center" color="text.secondary" sx={{ maxWidth: 700, mt: 6, mx: "auto" }}>
              We, <Typography component="span" sx={{...guestSpanStrong, fontSize: "1.4rem"}}>Group 7</Typography>
              , are a passionate team dedicated to delivering outstanding digital solutions that drive real impact.
            </Typography>
          </motion.div>

          {/* Mission Section */}
          <Grid container spacing={5} sx={{ mt: 3, px: 5 }}>

            <Grid item xs={12} md={6} display="flex" justifyContent="left">
              <motion.div 
                initial={{ opacity: 0, x: -50 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.8 }} 
                viewport={{ once: true }}
              >
                <img src="https://www.iitms.co.in/products/img/student-information-system-sis.png"
                      alt="Our Mission" sx={{ maxWidth: "100%", width: "30em" }}/>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6} display="flex" alignItems="center">
              <motion.div 
                initial={{ opacity: 0, x: 50 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.8 }} 
                viewport={{ once: true }}
              >
                <Typography variant="h4" sx={{ color: "primary.main" }} gutterBottom>
                    Our Mission
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="justify">
                  Our mission is to innovate and create digital products that help businesses grow. We focus on user
                  experience, cutting-edge technology, and impactful solutions.
                </Typography>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6} display="flex" alignItems="center">
              <motion.div 
                  initial={{ opacity: 0, x: 50 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  transition={{ duration: 0.8 }} 
                  viewport={{ once: true }}
              >
                <Typography variant="h4" sx={{ color: "primary.main" }} gutterBottom>
                  Our Vision
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="justify">
                  Our vision is to become a leading force in the digital transformation landscape,
                  empowering businesses with innovative technology solutions. We strive to create products
                  that are not only functional but also intuitive, scalable, and future-proof.
                </Typography>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6} display="flex" justifyContent="right">
              <motion.div 
                  initial={{ opacity: 0, x: -50 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  transition={{ duration: 0.8 }} 
                  viewport={{ once: true }}
              >
                <img src="https://images.squarespace-cdn.com/content/v1/5f8a1cfb2ad7a514c3fa8a88/1604354481681-DK4Y4SUFVKZ9D6BD4IC1/Choosing-a-SIS.png"
                  alt="Our Vision" sx={{ maxWidth: "100%", width: "30em" }}
                />
              </motion.div>
            </Grid>

          </Grid>
        
        </Container>

        <Container {...guestDefaultContainer} sx={{ mb: 5}}>
        
          {/* Meet Our Team Section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }} 
            viewport={{ once: true }}
          >
            <Typography variant="h3" textAlign="center" sx={{ fontSize: 40, color: "primary.main", mt: 15, mb: 8 }}>
              Meet Our Team
            </Typography>
          </motion.div>

          <Grid container spacing={8} justifyContent="center">
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={5} lg={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {/* Team Member Card */}
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      p: 3,
                      borderRadius: 3,
                      boxShadow: 3,
                      height: "100%",
                      position: "relative",
                      "&:hover": { boxShadow: 6 },
                    }}
                  >
                    <Avatar src={member.img} sx={{ width: 80, height: 80, mb: 2 }} />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" fontWeight="bold">
                        {member.name}
                      </Typography>
                      <Typography variant="body3" color="text.secondary">
                        {member.role}
                      </Typography>
                    </CardContent>
                    <Button sx = {guestViewDetailsButton} onClick={() => setSelectedMember(member)}>
                      View Details
                    </Button>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        
        </Container>

          {/* Hover Info Box - Centered */}
          <AnimatePresence>
            {selectedMember && (
              <>
                {/* Backdrop */}
                <Backdrop
                  open
                  sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 10,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => setSelectedMember(null)}
                >
                  {/* Info Card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      width: "350px",
                      background: "#fff",
                      boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                      borderRadius: "10px",
                      padding: "20px",
                      zIndex: 20,
                      textAlign: "center",
                    }}
                    onClick={(e) => e.stopPropagation()} // Ngăn click đóng khi bấm vào card
                  >
                    <Avatar
                      src={selectedMember.img}
                      sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
                    />
                    <Typography variant="h5" fontWeight="bold">
                      {selectedMember.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" mb={2}>
                      {selectedMember.role}
                    </Typography>
                    <Typography
                      variant="body3"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        gap: 1,
                      }}
                    >
                      <PhoneIcon fontSize="small" /> {selectedMember.phone}
                    </Typography>
                    <Typography
                      variant="body3"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        gap: 1,
                      }}
                    >
                      <EmailIcon fontSize="small" /> {selectedMember.email}
                    </Typography>
                    <Typography
                      variant="body3"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        gap: 1,
                      }}
                    >
                      <SchoolIcon fontSize="small" /> {selectedMember.university}
                    </Typography>
                    <Typography
                      variant="body3"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        gap: 1,
                      }}
                    >
                      <MenuBookIcon fontSize="small" /> {selectedMember.major}
                    </Typography>
                    
                    <Typography variant="body3" sx={{ mt: 2, fontStyle: "italic" }}>
                      {selectedMember.bio}
                    </Typography>
                  </motion.div>
                </Backdrop>
              </>
            )}
          </AnimatePresence>
      
      </Container>

      <Footer />
    
    </Page>
  );
}
