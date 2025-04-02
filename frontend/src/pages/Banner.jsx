import { Box, Typography, GlobalStyles } from '@mui/material';

export default function Banner() {
  return (
    <>
      <GlobalStyles styles={{
        '@font-face': {
          fontFamily: 'Star Wars',
          src: 'url("https://fonts.cdnfonts.com/css/star-wars") format("woff2")',
          fontWeight: 400,
          fontStyle: 'normal',
        }
      }} />

      <Box sx={{
        background: 'linear-gradient(to right, #000, #1a1a1a)',
        color: 'white',
        py: 3, // Reduje el padding vertical
        textAlign: 'center',
        borderBottom: '2px solid #f5d742'
      }}>
        {/* Contenedor flex para organizar las líneas */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.5,
        }}>
          {/* Línea "STAR" */}
          <Typography
            component="span"
            sx={{
                fontFamily: '"Star Wars", sans-serif',
                fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' }, // Tamaño un poco mayor
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0',
                lineHeight: 0.8,
                marginTop: '-0.1em', // Superpone ligeramente
            }}
          >
            star
          </Typography>
          
          {/* Línea "WARS" */}
          <Typography
            component="span"
            sx={{
              fontFamily: '"Star Wars", sans-serif',
              fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' }, // Tamaño un poco mayor
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0',
              lineHeight: 0.8,
              marginTop: '-0.1em' // Superpone ligeramente
            }}
          >
            wars
          </Typography>
        </Box>
      </Box>
    </>
  );
}