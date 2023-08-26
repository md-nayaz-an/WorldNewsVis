import { Avatar, Box, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, useTheme } from "@mui/material"
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import anime from "animejs";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CircleIcon from '@mui/icons-material/Circle';
import getGradientColor from "../utils/getGradient";


export default function NewsView (props) {
    const newsViewRef = React.useRef();
    const theme = useTheme();

    const [expanded, setExpanded] = React.useState(false);

    React.useEffect(() => {
        console.log(props.click);
    }, [props.click])

    return(
        <Box 
            className="Hovered"
            sx={{
                position: "absolute",
                top: {
                    xs: 80 + "%",
                    lg: "40%"
                },
                right: {
                    xs: "50%",
                    lg: "5%"
                },
                transform: {
                    xs: "translate(50%, 0)",
                    lg: "translate(0, 0)"
                },
                height: "auto",
                width: {xs: "90%", lg: "40%"},
                backgroundColor: theme.palette.primary.main,
                borderRadius: "4px",
                opacity: 0.8
            }}
            ref={newsViewRef}
        >
            <Accordion
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: theme.spacing.apply(1),
                    backgroundColor: theme.palette.primary.main,
                    rowGap: theme.spacing.apply(1),
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon
                        color="secondary"
                    />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{
                        backgroundColor: theme.palette.background.main,
                        color: theme.text.onPrimary,
                        borderRadius: "5px"
                    }}
                    onClick={() => {
                        anime({
                            targets: newsViewRef.current,
                            top: expanded ? "80%" : "50%",
                            duration: 500,
                            easing: 'easeInQuad',
                        })
                        setExpanded(prevExpanded => !prevExpanded)
                    }}
                >
                    <Typography>{props.click.country}</Typography>
                </AccordionSummary>
                <AccordionDetails
                    sx={{
                        backgroundColor: theme.palette.background.main,
                        color: theme.text.onPrimary,
                        borderRadius: "5px",
                        maxHeight: "30vh",
                        overflowY: "scroll",
                        "&::-webkit-scrollbar": {display:"none"}
                    }}
                >

                <List>
                    {
                            props.click.articles.map((article, key) =>
                                <>
                                    <Item article={article} key={key} />
                                    <Divider 
                                        sx={{
                                            opacity: 1,
                                            borderColor: theme.palette.primary.main
                                        }}
                                    />
                                </>
                            )
                    }      
                </List>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}

function Item(props) {
    const theme = useTheme();
    return (
            <ListItem
                secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                        <OpenInNewIcon 
                            color="secondary"
                            onClick={() => {
                                window.open(props.article.url);
                            }}
                            />
                    </IconButton>
                }
            >

                <ListItemText
                    primary={props.article.title}
                    secondary={'\t- ' + 
                        props.article.author ? props.article.author : "" 
                    }
                    secondaryTypographyProps={{
                        sx:{
                            color: theme.palette.text.onPrimarys
                        }
                    }}
                />
                
                <ListItemIcon>
                    <CircleIcon 
                        sx={{
                            fontSize:10,
                            color: getGradientColor(props.article.sentiment)
                        }}
                        
                    />
                </ListItemIcon>
                
            </ListItem>
    )
}