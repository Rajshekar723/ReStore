import { Typography, Box } from "@mui/material";
import image1 from '../../images/banner/1.png';
import image2 from '../../images/banner/2.png';
import image3 from '../../images/banner/3.png';
import image4 from '../../images/banner/bg.png';


import { useState, useEffect } from "react";

const images = [image1, image2, image3];

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(images[currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % images.length);
      setCurrentImage(images[currentIndex]);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <>
    <div>
    <div className="bg" style={{ background: `url(${image4})` , maxWidth:'1200px'}}>
      <Typography variant="h5" align="center" gutterBottom>
        Welcome to the Restore, All your needs in one click
      </Typography>
      
      {/* Banner picture */}
      <Box
        sx={{
          
          width: '100%',
          height: '40vh',
          backgroundImage: `url(${currentImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* You can add content inside the banner picture if needed */}
      </Box>
    </div>
    
    </div>
    
    </>
  );
}
