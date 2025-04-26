import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Divider,
  Chip,
} from '@mui/material';
import { styled } from '@mui/system';
import { BsCheckCircle } from 'react-icons/bs';
import { IoMdFlash } from 'react-icons/io';

const GradientButton = styled(Button)(({ }) => ({
  background: 'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)',
  color: '#fff',
  padding: '14px 0',
  fontWeight: 700,
  fontSize: '1rem',
  textTransform: 'uppercase',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 20px rgba(248, 87, 166, 0.5)',
  '&:hover': {
    transform: 'scale(1.06)',
    boxShadow: '0 6px 25px rgba(255, 88, 88, 0.6)',
  },
}));

const HighlightedCard = styled(Card)(({ }) => ({
  
  borderRadius: '20px',
  boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
  },
}));

const plans = [
  {
    title: 'Basic',
    price: '$9.99/month',
    features: ['Feature A', 'Feature B', 'Feature C'],
  },
  {
    title: 'Pro',
    price: '$19.99/month',
    features: ['Feature A', 'Feature B', 'Feature C', 'Feature D'],
    popular: true,
  },
  {
    title: 'Enterprise',
    price: '$49.99/month',
    features: [
      'Feature A',
      'Feature B',
      'Feature C',
      'Feature D',
      'Feature E',
    ],
  },
];

const Plans: React.FC = () => {
  return (
    <Box sx={{ p: { xs: 2, md: 6 }, minHeight: '100vh' }}>
      

      <Grid container spacing={4} justifyContent="center">
        {plans.map((plan, i) => (
          <Grid item xs={12} sm={8} md={4} key={i}>
            <HighlightedCard>
              <CardContent sx={{ textAlign: 'center', py: 5 }}>
                {plan.popular && (
                  <Chip
                    label="Most Popular"
                    color="secondary"
                    sx={{ mb: 2, fontWeight: 600 }}
                  />
                )}
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                  {plan.title}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 800, mb: 2 }}
                  color={plan.popular ? 'primary' : 'text.primary'}
                >
                  {plan.price}
                </Typography>
                <Divider variant="middle" />

                <Box mt={3} textAlign="left">
                  {plan.features.map((feat, idx) => (
                    <Box key={idx} display="flex" alignItems="center" mb={1}>
                      <BsCheckCircle size={20} style={{ marginRight: 8, color: '#3f51b5' }} />
                      <Typography variant="body1">{feat}</Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
              <CardActions sx={{ p: 3 }}>
                <GradientButton fullWidth>
                  <IoMdFlash size={20} /> Get Started
                </GradientButton>
              </CardActions>
            </HighlightedCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Plans;
