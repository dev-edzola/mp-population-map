
import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

interface D3VisualizationProps {
  height: number;
}

const D3Visualization: React.FC<D3VisualizationProps> = ({ height }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    // Clear any existing visualization
    d3.select(svgRef.current).selectAll("*").remove();
    
    const createIndiaMapVisualization = async () => {
      const width = svgRef.current!.clientWidth;
      const margin = { top: 30, right: 30, bottom: 30, left: 30 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;
      
      // Create SVG with margins
      const svg = d3.select(svgRef.current)
        .attr("width", width)
        .attr("height", height);
      
      const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
        
      try {
        // Load India TopoJSON data
        const indiaData = await d3.json('https://raw.githubusercontent.com/dev-edzola/D3js-/master/india.json');
        if (!indiaData) throw new Error("Failed to load India map data");
        
        // Prepare map colors based on data
        const colorScale = d3.scaleOrdinal()
          .domain(["UP", "MP", "RJ", "BR", "CH", "MH", "KA", "GJ", "TN"])
          .range([
            "#e6194B", "#3cb44b", "#ffe119", "#4363d8", 
            "#f58231", "#911eb4", "#42d4f4", "#f032e6", "#bfef45"
          ]);
          
        // Define default data values
        const defaultValues = {
          "UP": 9000, // Uttar Pradesh
          "MP": 8000, // Madhya Pradesh
          "RJ": 7000, // Rajasthan
          "BR": 6000, // Bihar
          "CH": 5000, // Chhattisgarh
          "MH": 4500, // Maharashtra
          "KA": 4000, // Karnataka
          "GJ": 3500, // Gujarat
          "TN": 3000  // Tamil Nadu
        };
        
        // Convert TopoJSON to GeoJSON
        const india = topojson.feature(indiaData, indiaData.objects.india);
        
        // Create projection
        const projection = d3.geoMercator()
          .fitSize([innerWidth, innerHeight], india);
          
        // Create path generator
        const path = d3.geoPath().projection(projection);
        
        // Add tooltip div
        const tooltip = d3.select("body").append("div")
          .attr("class", "d3-tooltip")
          .style("position", "absolute")
          .style("visibility", "hidden")
          .style("background-color", "white")
          .style("border", "1px solid #ddd")
          .style("border-radius", "5px")
          .style("padding", "10px")
          .style("box-shadow", "2px 2px 6px rgba(0,0,0,0.3)");
          
        // Draw the map
        g.selectAll("path")
          .data(india.features)
          .enter()
          .append("path")
          .attr("d", path)
          .attr("fill", (d) => {
            const stateCode = d.properties.code;
            return defaultValues[stateCode] ? colorScale(stateCode) : "#cccccc";
          })
          .attr("stroke", "#fff")
          .attr("stroke-width", 0.5)
          .on("mouseover", function(event, d) {
            d3.select(this)
              .transition()
              .duration(200)
              .attr("fill", "#ec4899");
              
            const stateName = d.properties.name;
            const stateCode = d.properties.code;
            const value = defaultValues[stateCode] || "No data";
            
            tooltip
              .style("visibility", "visible")
              .html(`
                <strong>${stateName}</strong><br/>
                Health Impact: ${value.toLocaleString()}
              `);
          })
          .on("mousemove", function(event) {
            tooltip
              .style("top", (event.pageY - 10) + "px")
              .style("left", (event.pageX + 10) + "px");
          })
          .on("mouseout", function() {
            d3.select(this)
              .transition()
              .duration(200)
              .attr("fill", (d) => {
                const stateCode = d.properties.code;
                return defaultValues[stateCode] ? colorScale(stateCode) : "#cccccc";
              });
              
            tooltip.style("visibility", "hidden");
          });
          
        // Add title
        svg.append("text")
          .attr("x", width / 2)
          .attr("y", margin.top / 2)
          .attr("text-anchor", "middle")
          .style("font-size", "16px")
          .style("font-weight", "bold")
          .text("Antara Foundation - Health Impact Across India");
          
        // Add legend
        const legendData = Object.entries(defaultValues)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5); // Show top 5 states
          
        const legendGroup = svg.append("g")
          .attr("transform", `translate(${width - 150}, ${height - 150})`);
          
        legendGroup.append("rect")
          .attr("width", 140)
          .attr("height", 120)
          .attr("fill", "white")
          .attr("stroke", "#ddd")
          .attr("rx", 5);
          
        legendGroup.append("text")
          .attr("x", 10)
          .attr("y", 20)
          .style("font-size", "12px")
          .style("font-weight", "bold")
          .text("Top Impact States");
          
        legendData.forEach((d, i) => {
          const [code, value] = d;
          const stateName = india.features.find(f => f.properties.code === code)?.properties.name || code;
          
          legendGroup.append("rect")
            .attr("x", 10)
            .attr("y", 30 + i * 18)
            .attr("width", 12)
            .attr("height", 12)
            .attr("fill", colorScale(code));
            
          legendGroup.append("text")
            .attr("x", 30)
            .attr("y", 40 + i * 18)
            .style("font-size", "10px")
            .text(`${stateName}: ${value.toLocaleString()}`);
        });
        
      } catch (error) {
        console.error("Error loading map data:", error);
        
        // Display error message on SVG
        g.append("text")
          .attr("x", innerWidth / 2)
          .attr("y", innerHeight / 2)
          .style("text-anchor", "middle")
          .style("fill", "red")
          .text("Failed to load India map data. Please check console for details.");
      }
    };
    
    createIndiaMapVisualization();
    
    // Resize handler
    const handleResize = () => {
      if (svgRef.current) {
        createIndiaMapVisualization();
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      
      // Remove tooltip when component unmounts
      d3.select("body").selectAll(".d3-tooltip").remove();
    };
  }, [height]);
  
  return (
    <Card className="h-full overflow-hidden p-4">
      <div className="h-full w-full">
        <svg 
          ref={svgRef} 
          width="100%" 
          height={height}
          className="d3-visualization"
        />
      </div>
    </Card>
  );
};

export default D3Visualization;
