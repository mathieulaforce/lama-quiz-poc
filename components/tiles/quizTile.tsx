import { Box, Card, CardMedia, Typography } from "@mui/material";
import QuizIcon from '@mui/icons-material/Quiz';
import { Quiz } from "@prisma/client";
import React from "react";

const QuizTile: React.FC<Quiz> = (quiz) => {
    return <Card sx={{ position: "relative", height: "100%" }}>
        <Box><QuizIcon /></Box>
        <Box position="absolute"
            textAlign="center"
            color="white"
            bottom="0" left="0" right="0" sx={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
            <Typography variant="h5" py={1}>{quiz.title}</Typography>
        </Box>
    </Card>
}

export default QuizTile;