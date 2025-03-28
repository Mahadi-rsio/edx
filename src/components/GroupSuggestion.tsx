import React, { useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Divider,
  Avatar,
} from '@mui/material';
import { BsFillPersonPlusFill } from 'react-icons/bs';

const cards = [
  {
    title: 'Card 1',
    description: 'This is the first card.',
    groupInfo: 'Active discussions',
    members: '1,234 members',
    image: 'https://picsum.photos/200/300',
    avatar: 'https://picsum.photos/200/300',
  },
  {
    title: 'Card 2',
    description: 'This is the second card.',
    groupInfo: '500+ posts weekly',
    members: '987 members',
    image: 'https://picsum.photos/200/300',
    avatar: 'https://picsum.photos/200/300',
  },
  {
    title: 'Card 3',
    description: 'This is the third card.',
    groupInfo: 'Community of experts',
    members: '2,345 members',
    image: 'https://picsum.photos/200/300',
    avatar: 'https://picsum.photos/200/300',
  },
  {
    title: 'Card 4',
    description: 'This is the fourth card.',
    groupInfo: 'Trending now',
    members: '876 members',
    image: 'https://picsum.photos/200/300',
    avatar: 'https://picsum.photos/200/300',
  },
];

const GroupSuggestionCard = () => {
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
    <Box sx={{ padding: 3 }}>
      {/* Cards Container */}
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
          '&::-webkit-scrollbar': { display: 'none' },
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
              minWidth: { xs: '80vw', sm: '300px' },
              scrollSnapAlign: 'start',
              border: '1px solid rgba(50,50,50,0.7)',
              flexShrink: 0,
              transition: 'transform 0.3s ease-in-out',
              '&:hover': { transform: 'scale(1.03)' },
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={card.image}
              alt={card.title}
            />
            <CardContent>
              <Box display="flex" alignItems="center" marginBottom={1}>
                <Avatar src={card.avatar} alt={card.title} sx={{ marginRight: 1 }} />
                <Typography variant="h6">{card.title}</Typography>
              </Box>
              <Typography variant="body2" color="textSecondary">
                {card.description}
              </Typography>
              <Divider sx={{ marginY: 1 }} />
              <Typography variant="caption" color="textSecondary" display="block">
                {card.groupInfo}
              </Typography>
              <Typography variant="caption" color="textSecondary" display="block">
                {card.members}
              </Typography>
            </CardContent>
            <Box sx={{ padding: 2, display: 'flex', justifyContent: 'flex-start' }}>
              <Button
                variant="contained"
                color="info"
                size="small"
                startIcon={<BsFillPersonPlusFill />}
              >
                Join Now
              </Button>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default GroupSuggestionCard;
