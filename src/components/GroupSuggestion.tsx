import React, { useRef } from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';

const cards = [
    { title: 'Card 1', description: 'This is the first card.' },
    { title: 'Card 2', description: 'This is the second card.' },
    { title: 'Card 3', description: 'This is the third card.' },
    { title: 'Card 4', description: 'This is the fourth card.' },
];

const GroupSuggetionCard = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        isDown = true;
        startX = e.pageX - containerRef.current.offsetLeft;
        scrollLeft = containerRef.current.scrollLeft;
    };

    const handleMouseLeave = () => {
        isDown = false;
    };

    const handleMouseUp = () => {
        isDown = false;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDown || !containerRef.current) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Faster scroll speed
        containerRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <Box
            ref={containerRef}
            sx={{
                display: 'flex',
                gap: 2,
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                padding: 2,
                cursor: 'grab',
                userSelect: 'none',
                '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar
            }}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            {cards.map((card, index) => (
                <Card
                    key={index}
                    sx={{
                        minWidth: { xs: '80vw', sm: '250px' }, // Adjust width for mobile & desktop
                        scrollSnapAlign: 'start',
                        border: '1px solid rgba(50,50,50,0.7)',
                        padding: 2,
                        flexShrink: 0,
                    }}
                >
                    <CardContent>
                        <Typography variant="h6">{card.title}</Typography>
                        <Typography variant="body2">
                            {card.description}
                        </Typography>
                    </CardContent>
                    <Button variant="contained" color="info" size="small">
                        Join Now
                    </Button>
                </Card>
            ))}
        </Box>
    );
};

export default GroupSuggetionCard;
