import { Typography } from '@mui/joy';

const Logo = () => {
  return (
    <Typography
      level="h1"
      py={2}
      sx={{
        background: 'linear-gradient(to right bottom, #5bb9f0, #021017)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      Harmony Helper
    </Typography>
  );
};

export default Logo;
