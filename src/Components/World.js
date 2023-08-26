import { Box, List, ListItem, ListItemText } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import getGradientColor from '../utils/getGradient';

export default function World(props) {


    const globeRef = useRef(null);

    useEffect(() => {
        const controls = globeRef.current?.controls();

        controls.autoRotate = true;
        controls.autoRotateSpeed = props.speed;
    }, [props.speed]);

    return (
        <Box position="absolute">
        <Globe 
            labelsData={props.places}
            labelLat={d => d.latlng[0]}
            labelLng={d => d.latlng[1]}
            labelText={d => d.country}
            labelSize={d => Math.sqrt(d.articleCount) * 0.8}
            labelDotRadius={d => Math.sqrt(d.articleCount)}
            labelColor={d => {
                let sent = d.averageSentiment;
                let color = getGradientColor(sent);
                //console.log({sent, color });
                return color;
            }}
            labelResolution={2}        
            globeImageUrl={require("../assets/8k_earth_nightmap.jpg")}
            backgroundImageUrl={require("../assets/8k_stars.jpg")}
            onLabelClick={d => props.setClick(d)}
            onLabelHover={d => {
                props.setHover(d ? d.cca2 : '');
                props.setSpeed(d ? 0 : 0.5);
            }}
            
            ref={globeRef}
            style={{
                overflow: "hidden",
                zIndex: 1
            }}
        />
        </Box>
    )
}
