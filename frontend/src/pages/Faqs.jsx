// @mui
import { styled } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Header from "../components/Header";
import Footer from "../components/Footer";
import Page from "../components/Page";

import { guestDefaultContainer, guestContainerHomeParts, guestContainerImageHome,
        guestBlueButton, guestWhiteButton, guestBlueStairsCard,
        guestTitle, guestSpanStrong } from "../assets/styles/guest";

import { FaqsHero, FaqsList, FaqsForm } from '../sections/faqs';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

export default function Faqs() {

  return (
    <Page title="Faqs">

      <Header />

      <Container {...guestDefaultContainer}>

        <FaqsHero />

        <Container sx={{ mb: 10, position: 'relative' }}>

          <Typography variant="h3" sx={{ mb: 5 }}>
            Frequently asked questions
          </Typography>

          <Grid container spacing={10}>
            <Grid item xs={12} md={6}>
              <FaqsList />
            </Grid>
            <Grid item xs={12} md={6}>
              <FaqsForm />
            </Grid>
          </Grid>
        </Container>
      
      </Container>

      <Footer />

    </Page>
  );
}
