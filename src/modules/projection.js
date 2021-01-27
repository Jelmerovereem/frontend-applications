const d3 = require('d3');

export const projection = d3.geoMercator().center([5.116667, 52.17]).scale(6000).translate([1200/2, 600/2]);