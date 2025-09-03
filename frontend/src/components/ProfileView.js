import React, { useEffect, useState } from 'react';
import { getProfileByRollNo } from '../api';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Link,
  Grid,
  Box,
} from '@mui/material';

function ProfileView({ rollNo }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!rollNo) {
      setProfile(null);
      return;
    }
    getProfileByRollNo(rollNo).then(setProfile);
  }, [rollNo]);

  if (!rollNo)
    return (
      <Typography variant="body1" sx={{ mt: 2, ml: 2 }}>
        Select a student to view profile
      </Typography>
    );
  if (!profile)
    return (
      <Typography variant="body1" sx={{ mt: 2, ml: 2 }}>
        Loading...
      </Typography>
    );

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          {/* Name + Email */}
          <Typography variant="h5" gutterBottom>
            {profile.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {profile.email}
          </Typography>

          {/* Education */}
          <Box mt={2}>
            <Typography variant="h6" gutterBottom>
              Education
            </Typography>
            <Grid container spacing={1}>
              {profile.education?.map((edu, i) => (
                <Grid item xs={12} sm={6} key={i}>
                  <Typography variant="body2">{edu}</Typography>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Skills */}
          <Box mt={2}>
            <Typography variant="h6" gutterBottom>
              Skills
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              justifyContent="flex-start"
              sx={{ gap: 1 }}
            >
              {profile.skills?.map((skill, i) => (
                <Chip key={i} label={skill} color="secondary" />
              ))}
            </Stack>
          </Box>

          {/* Work Experience */}
          <Box mt={2}>
            <Typography variant="h6" gutterBottom>
              Work Experience
            </Typography>
            <Grid container spacing={1}>
              {profile.work?.map((job, i) => (
                <Grid item xs={12} sm={6} key={i}>
                  <Typography variant="body2">{job}</Typography>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Links */}
          <Box mt={2}>
            <Typography variant="h6" gutterBottom>
              Links
            </Typography>
            <Grid container spacing={2}>
              {profile.links?.github && (
                <Grid item xs={12} sm={4}>
                  <Link href={profile.links.github} target="_blank" rel="noopener">
                    GitHub
                  </Link>
                </Grid>
              )}
              {profile.links?.linkedin && (
                <Grid item xs={12} sm={4}>
                  <Link href={profile.links.linkedin} target="_blank" rel="noopener">
                    LinkedIn
                  </Link>
                </Grid>
              )}
              {profile.links?.portfolio && (
                <Grid item xs={12} sm={4}>
                  <Link href={profile.links.portfolio} target="_blank" rel="noopener">
                    Portfolio
                  </Link>
                </Grid>
              )}
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ProfileView;
