import { Box, Button, ButtonGroup, IconButton, TextField, useTheme } from "@mui/material"
import anime from "animejs";
import { useRef } from "react";
import SendIcon from '@mui/icons-material/Send';

export default function Search(props) {
    const theme = useTheme();
    const textFieldRef = useRef();

    const handleSubmit = () => {
        anime({
            targets: textFieldRef.current,
            top: "10%", 
            duration: 200,
            easing: 'easeInQuad',
        });

    }

    const testQuery = ["Elon Musk", "One Piece", "India"];

    return(
        <Box
            sx={{
                position: "absolute",
                top: "40%",
                left: {
                    xs: 50 - 75 / 2 + "%",
                    lg: 50 - 25 /2 + "%"
                },
                zIndex: 2,
                width: {xs: "75%", lg: "25%"},
                opacity: 0.8,
            }}
            ref={textFieldRef}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            rowGap={1}
        >
        <TextField
            variant="outlined"
            value={props.search}
            onChange={(e) => props.setSearch(e.target.value)}
            sx={{
                border: "white",
                backgroundColor: theme.palette.background.main,
            }}
            InputProps={{
                style: { color: theme.text.onBackground},
                endAdornment: (
                    <IconButton
                        edge="end"
                        aria-label="submit"
                        onClick={() => {
                            if(props.search !== "") {
                                handleSubmit();
                                props.fetchData(props.search)
                            }
                        }}
                        color="secondary"
                    >
                        <SendIcon />
                    </IconButton>
                ),
            }}
            onFocus={() => 
                anime({
                targets: textFieldRef.current,
                top: "40%",
                duration: 200,
                easing: 'easeOutQuad',
            })}
            fullWidth
            focused
        />

        <ButtonGroup
            size="small"
            variant="outlined"
            color="secondary"
            aria-label="small button group"
            alignSelf="flex-end"
        >
            <Button
                variant="contained"
                onClick={(e) => props.snackOpen(e, 
                    {
                        message: "Demo without external API limit. Stream latency of 1sec (to demonstrate Streamed Response).",
                        autoHideDuration: 5000,
                    })}
            >
                Demo
            </Button>            
            {
                testQuery.map(query => 
                    <Button
                        key={query}
                        onClick={() => {
                            handleSubmit();
                            props.fetchTestData(query)}
                        }
                    >
                        {query}
                    </Button>
                )
            }
        </ButtonGroup>
    </Box>
    )
}