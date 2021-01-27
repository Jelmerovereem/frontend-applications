import React, { useState, useRef, useEffect } from 'react';
import fetchData from "./modules/fetchData.js";
import createMap from "./modules/createMap.js";
import addCoordinates from "./modules/addCoordinates.js";
import combineData from "./modules/combineData.js";
import renderCircles from "./modules/renderCircles.js";
import updateData from "./modules/updateData.js";
import VisTitle from "./components/visTitle.js";
import { Tooltip } from "./components/tooltip.js";
import { Legend } from "./components/legend.js";
import { SvgContainer } from "./components/svgContainer.js";
import { Sources } from "./components/sources.js";
import './App.css';
import { feature } from "topojson-client";
const d3 = require('d3')

const root = document.getElementById('root')
const width = window.innerWidth
const heigth = window.innerHeight

const visTitleText = "What is the best way to park in the city throughout the Netherlands?";
const geoMapData = "https://cartomap.github.io/nl/wgs84/gemeente_2020.topojson";
export const garagesData = "https://opendata.rdw.nl/resource/adw6-9hsg.json?$limit=8352&$$app_token=zI34snM8XBhNRzxL50vrTeOLA";
export const garagesCapacityData = "https://opendata.rdw.nl/resource/b3us-f26s.json?$limit=1567&$$app_token=zI34snM8XBhNRzxL50vrTeOLA";
export const garagesLocationData = "https://opendata.rdw.nl/resource/nsk3-v9n7.json?$limit=6101&$$app_token=zI34snM8XBhNRzxL50vrTeOLA";

export let garageData;
export let capacityData;
export let garageLocatieData;

function App() {

  useEffect(() => {
    fetchData(geoMapData).then(result => {
      createMap(result)
    })

    Promise.all([
      fetch(garagesData).then(response => response.json()),
      fetch(garagesCapacityData).then(response => response.json()),
      fetch(garagesLocationData).then(response => response.json())
      ]).then((result) => {
        garageData = result[0];
        capacityData = result[1];
        garageLocatieData = result[2];
        garageLocatieData = addCoordinates(garageLocatieData);

        const outcomeData = combineData(garageData, garageLocatieData, capacityData);

        renderCircles(outcomeData);
      })

  })

  return (
    <>
      <Tooltip />
      <VisTitle text={visTitleText} />
      <Legend />
      <SvgContainer width={1200} height={600} />
      <Sources />
    </>
  );
}

export default App;