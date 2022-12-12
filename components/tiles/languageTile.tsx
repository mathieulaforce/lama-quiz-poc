import { Box, Card, CardMedia, Typography } from "@mui/material";
import { Language } from "@prisma/client";
import Image from "next/image";
import React from "react";
import styled from '@emotion/styled'

const CountryFlag = styled.img`
  width: 100%;
  height: 100%;
  display: block;
`;


const LanguageTile: React.FC<Language> = (language) => {
    return <Card sx={{ position: "relative", height: "100%" }}>
        <CountryFlag src={language.iconUrl} alt={language.displayText} />
        <Box position="absolute"
            textAlign="center"
            color="white"
            bottom="0" left="0" right="0" sx={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
            <Typography variant="h5" py={1}>{language.displayText}</Typography>
        </Box>
    </Card>
}

export default LanguageTile;