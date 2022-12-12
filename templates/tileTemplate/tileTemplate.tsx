import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Stack, SxProps, Typography } from '@mui/material';
import { unstable_renderSubtreeIntoContainer } from "react-dom";

interface TileTemplateProps extends React.PropsWithChildren {
    title?: string;
    description?: string;
    footer?: React.ReactNode;
    maxItemsOnPage?: number;
    useTransitionEffect?: boolean;
}

const calculateNumberOfPages = (items: React.ReactNode, maxItemsOnPage: number) => {
    if (Array.isArray(items)) {
        const totalItems = items.length;
        const numberOfPages = Math.ceil(totalItems / maxItemsOnPage);
        return {
            totalItems: totalItems,
            numberOfPages: numberOfPages
        };
    } else {
        return {
            totalItems: 1,
            numberOfPages: 1
        };
    }
}

const calculateMaxItemPerRowLastPage = (pageInfo: {
    totalItems: number,
    numberOfPages: number
}, maxItemsOnPage: number) => {
    const itemsOnPage = pageInfo.totalItems - ((pageInfo.numberOfPages - 1) * maxItemsOnPage);
    if (maxItemsOnPage / 2 >= itemsOnPage) {
        return itemsOnPage;
    }
    return Math.ceil(itemsOnPage / 2)
}

interface TileContainerProps extends React.PropsWithChildren {
    itemsPerRow: number;

}

export const TilesContainer: React.FC<TileContainerProps> = ({ itemsPerRow, children }) => {
    return <Box display="grid"
        alignContent="center"
        justifyContent="center"
        width="100%"
        height="100%"
        gap={2}
        sx={() => {
            let styles: SxProps = {
                columnGap: 2,
                rowGap: 4,

                gridTemplateColumns: `repeat(${itemsPerRow * 2}, minmax(0, 150px))`,
                "& > *": { gridColumn: "span 2" }
            };
            const gridItemToMove = `& > *:nth-last-child(${itemsPerRow - 1}):nth-child(${itemsPerRow + 1})`;
            styles[gridItemToMove] = {
                gridColumnEnd: 4
            }
            return styles;
        }}>
        {children}
    </Box>
}

export const TileTemplate: React.FC<TileTemplateProps> = ({ maxItemsOnPage = 8, ...props }) => {

    const tileContainerRef = useRef<Element>(null);
    const currentPage = useRef(1);
    const pageInfo = calculateNumberOfPages(props.children, maxItemsOnPage);
    const calculateItemsPerPage = (displayPage: number) => pageInfo.numberOfPages > displayPage ? maxItemsOnPage / 2 : calculateMaxItemPerRowLastPage(pageInfo, maxItemsOnPage);

    const onPageChange = (changePageStep: number) => {
        if (!currentPage.current || !tileContainerRef.current) {
            return;
        }

        const newPageNumber = currentPage.current + changePageStep;
        if (newPageNumber < 1 || newPageNumber > pageInfo.numberOfPages) {
            return;
        }

        currentPage.current = newPageNumber;
        tileContainerRef.current.children[newPageNumber - 1].scrollIntoView();
    }

    return <Container sx={{ height: "100%" }}>
        <Stack spacing={1} height="100%">

            {props.title && <Typography variant="h2">{props.title}</Typography>}

            {props.description && <Typography variant="body1">{props.description}</Typography>}

            <Box display="flex"
                alignItems="center"
                gap={1}
                sx={{
                    flexGrow: 1
                }}>

                <Button onClick={() => onPageChange(-1)}>prev</Button>
                <Box display={"flex"}
                    ref={tileContainerRef}
                    sx={{
                        overflowX: "hidden",
                        scrollBehavior: 'smooth'
                    }}>
                    {[...Array(pageInfo.numberOfPages)].map((_, index) => {

                        const start = index * maxItemsOnPage;
                        const end = start + maxItemsOnPage;
                        console.log(index, start, end)
                        return <Box key={index} flex="0 0 auto" width="100%" p={1} >
                            <TilesContainer itemsPerRow={calculateItemsPerPage(index + 1)}>
                                {Array.isArray(props.children) && props.children.slice(start, end)}
                                {!Array.isArray(props.children) && props.children}
                            </TilesContainer>
                        </Box>
                    })}
                </Box>
                <Button onClick={() => onPageChange(1)}>next</Button>
            </Box>
            {props.footer && props.footer}
        </Stack>
    </Container >
}