import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import { Link } from 'react-router';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { styled } from '@mui/material/styles';


export default function SchedulePage() {
  
  const AnimatedIcon = styled(AddCircleIcon)(({ theme }) => ({
    fontSize: 50,
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.2)',
    },
  }));
 

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        <Card style={{ minHeight: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CardActionArea
            component={Link}
            to="/schedule/addclass"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', backgroundColor: 'transparent' }}
          >
            <AnimatedIcon />
          </CardActionArea>
        </Card>
        <Card style={{ minHeight: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CardActionArea
            component={Link}
            to="schedule/addclass"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', backgroundColor: 'transparent' }}
          >
            <AnimatedIcon />
          </CardActionArea>
        </Card>
        <Card style={{ minHeight: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CardActionArea
            component={Link}
            to="schedule/addclass"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', backgroundColor: 'transparent' }}
          >
            <AnimatedIcon />
          </CardActionArea>
        </Card>
      </div>
    );
}
