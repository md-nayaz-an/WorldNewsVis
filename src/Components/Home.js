import { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";

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
    
    const fetchData = async (queryString) => {
        setClick(null);
        setPlaces([]);
        setSpeed(2);

        const url = process.env.REACT_APP_SPRING_API
            + `/news/search?queryString=${encodeURIComponent(queryString)}`;
      
        const eventSource = new EventSource(url);

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data);
            setPlaces(prevPlaces => [...prevPlaces, data]);
        }
        
        eventSource.onerror = (e) => {
            if(e.eventPhase != EventSource.CLOSED)
                console.error(e);
            eventSource.close();
            setSpeed(0.5);
        }
      };
    
    const fetchTestData = async (queryString) => {
        setClick(null);
        setPlaces([]);
        setSpeed(2);
        
        console.log(process.env)
        const url = process.env.REACT_APP_SPRING_API
            + `/news/search/test?queryString=${encodeURIComponent(queryString)}`;
      
        const eventSource = new EventSource(url);

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data);
            setPlaces(prevPlaces => [...prevPlaces, data]);
        }
        
        eventSource.onerror = (e) => {
            if(e.eventPhase != EventSource.CLOSED)
                console.error(e);
            eventSource.close();
            setSpeed(0.5);
        }
      };
    
    const theme = useTheme();
    
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
        </Box>
    )
}
