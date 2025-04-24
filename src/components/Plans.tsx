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
} from '@mui/material';
import { BsCheckCircle } from 'react-icons/bs';

const plans = [
    {
        title: 'Basic Plan',
        price: '$9.99/month',
        features: ['Feature 1', 'Feature 2', 'Feature 3'],
    },
    {
        title: 'Pro Plan',
        price: '$19.99/month',
        features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
    },
    {
        title: 'Enterprise Plan',
        price: '$49.99/month',
        features: [
            'Feature 1',
            'Feature 2',
            'Feature 3',
            'Feature 4',
            'Feature 5',
        ],
    },
];

const Plans: React.FC = () => {
    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Subscription Plans
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {plans.map((plan, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ boxShadow: 3 }}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    {plan.title}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    {plan.price}
                                </Typography>
                                <Divider sx={{ my: 2 }} />
                                {plan.features.map((feature, idx) => (
                                    <Box
                                        key={idx}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            mb: 1,
                                        }}
                                    >
                                        <BsCheckCircle
                                            style={{
                                                marginRight: 8,
                                                color: 'green',
                                            }}
                                        />
                                        <Typography>{feature}</Typography>
                                    </Box>
                                ))}
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                >
                                    Choose Plan
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Plans;
