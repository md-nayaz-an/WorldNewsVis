import { useEffect, useState } from "react";
import { Box, Button, IconButton, Snackbar, useTheme } from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';
import data from "../data.json";
import World from "./World";
import Search from "./Search";
import NewsView from "./NewsView";


export default function Home() { 
    const [places, setPlaces] = useState([]);

    const [search, setSearch] = useState("");
    const [speed, setSpeed] = useState(0.5);

    
    const [click, setClick] = useState(null);
    const [hover, setHover] = useState('');
    let count = 0;

    const fetchData = async (queryString) => {
        setClick(null);
        setPlaces([]);
        setSpeed(2);
        
        snackOpen(null, {message: "Server Cold Start. Please wait...", autoHideDuration: 15000});

        const url = process.env.REACT_APP_SPRING_API
            + `/news/search?queryString=${encodeURIComponent(queryString)}`;
      
        const eventSource = new EventSource(url);
        

        eventSource.onmessage = (event) => {
            if(!count) {
                snackOpen(null, {message: "Fetching data", autoHideDuration: 5000});        
                count++;
            }
            const data = JSON.parse(event.data);
            console.log(data);
            setPlaces(prevPlaces => [...prevPlaces, data]);
        }
        
        eventSource.onerror = (e) => {
            if(e.eventPhase != EventSource.CLOSED)
                console.log(e);
            eventSource.close();
            setSpeed(0.5);
        }
      };
    
    const fetchTestData = async (queryString) => {
        setClick(null);
        setPlaces([]);
        setSpeed(2);
        
        snackOpen(null, {message: "Server Cold Start. Please wait...", autoHideDuration: 15000});
    
        const url = process.env.REACT_APP_SPRING_API
            + `/news/search/test?queryString=${encodeURIComponent(queryString)}`;
      
        const eventSource = new EventSource(url);

        eventSource.onmessage = (event) => {
            if(!count) {
                snackOpen(null, {message: "Fetching data", autoHideDuration: 10000});        
                count++;
            }
            const data = JSON.parse(event.data);
            setPlaces(prevPlaces => [...prevPlaces, data]);
        }
        
        eventSource.onerror = (e) => {
            if(e.eventPhase != EventSource.CLOSED) {
                console.error(e);
                snackOpen(null, {message: "Server Error", autoHideDuration: 10000});        
            }
            eventSource.close();
            setSpeed(0.5);
        }
      };
    
    const theme = useTheme();

    const [snackData, setSnackData] = useState({
        open: false,
        autoHideDuration: 15000,
        message: "Test",
    });

    const snackClose = () => {
        setSnackData(preData => ({...preData, open: false}));
    };
    
    const snackOpen = (_, data) => {
        setSnackData(preData => ({...preData, ...data, open: true}));
    };

    const action = (
        <>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={snackClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
    );
    return (
        <Box
            sx={{
                height: "100%",
                width: "100%"
            }}
        >
            <Search 
                search={search}
                setSearch={setSearch}
                fetchData={fetchData}
                fetchTestData={fetchTestData}
                snackOpen={snackOpen}
            />
            <World
                places={places}
                speed={speed}
                setSpeed={setSpeed}
                setClick={setClick}
                setHover={setHover}
            />

            {
                click && 
                <NewsView
                    click={click}
                />
            }

            <Snackbar
                {...snackData}
                onClose={snackClose}
                action={action}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                sx={{
                    opacity: 0.5,
                }}
            />
        </Box>
    )
}
