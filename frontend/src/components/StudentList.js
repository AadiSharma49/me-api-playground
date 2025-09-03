import React, { useEffect, useState } from 'react';
import { getAllProfiles } from '../api';
import {
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Container,
  Paper,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

function StudentList({ onSelect }) {
  const [students, setStudents] = useState([]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    getAllProfiles().then(setStudents);
  }, []);

  return (
    <Container
      maxWidth={isSmallScreen ? 'xs' : 'sm'}
      sx={{ mt: 4, px: isSmallScreen ? 1 : 2 }}
    >
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" mb={2} align="center">
          Students
        </Typography>

        {students.length === 0 ? (
          <Typography align="center">No students found</Typography>
        ) : (
          <List dense>
            {students.map((student) => (
              <ListItemButton
                key={student.rollNo}
                onClick={() => onSelect(student.rollNo)}
              >
                <ListItemText
                  primary={student.name}
                  secondary={`Roll No: ${student.rollNo}`}
                />
              </ListItemButton>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
}

export default StudentList;
