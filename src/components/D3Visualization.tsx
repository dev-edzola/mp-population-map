
import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import * as d3 from 'd3';

interface D3VisualizationProps {
  height: number;
}

const D3Visualization: React.FC<D3VisualizationProps> = ({ height }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    // Clear any existing visualization
    d3.select(svgRef.current).selectAll("*").remove();
    
    // Implementation based on the GitHub repository
    const createVisualization = async () => {
      const width = svgRef.current!.clientWidth;
      const margin = { top: 30, right: 30, bottom: 70, left: 60 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;
      
      // Sample data - we'll replace this with actual data from the repo if needed
      const data = [
        { group: "Madhya Pradesh", value: 8000 },
        { group: "Rajasthan", value: 7000 },
        { group: "Bihar", value: 6000 },
        { group: "Chhattisgarh", value: 5000 },
        { group: "Uttar Pradesh", value: 9000 }
      ];
      
      // Create SVG with margins
      const svg = d3.select(svgRef.current)
        .attr("width", width)
        .attr("height", height);
      
      const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
      
      // X axis
      const x = d3.scaleBand()
        .domain(data.map(d => d.group))
        .range([0, innerWidth])
        .padding(0.2);
      
      g.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");
      
      // Y axis
      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value) || 10000])
        .range([innerHeight, 0]);
      
      g.append("g")
        .call(d3.axisLeft(y));
      
      // Add bars
      g.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.group) || 0)
        .attr("y", d => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", d => innerHeight - y(d.value))
        .attr("fill", "#3b82f6"); // Blue color
      
      // Add title
      svg.append("text")
        .attr("x", width / 2)
        .attr("y", margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("Antara Foundation - Health Impact by State");
      
      // Add labels
      g.append("text")
        .attr("transform", `translate(${innerWidth / 2}, ${innerHeight + margin.bottom - 10})`)
        .style("text-anchor", "middle")
        .text("States");
      
      g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 20)
        .attr("x", -innerHeight / 2)
        .attr("text-anchor", "middle")
        .text("Impact Values");
      
      // Add hover effects
      g.selectAll(".bar")
        .on("mouseover", function(event, d) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr("fill", "#ec4899"); // Pink on hover
            
          g.append("text")
            .attr("class", "tooltip")
            .attr("x", x(d.group)! + x.bandwidth() / 2)
            .attr("y", y(d.value) - 10)
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .text(d.value);
        })
        .on("mouseout", function() {
          d3.select(this)
            .transition()
            .duration(200)
            .attr("fill", "#3b82f6"); // Back to blue
            
          g.selectAll(".tooltip").remove();
        });
    };
    
    createVisualization();
    
    // Resize handler
    const handleResize = () => {
      if (svgRef.current) {
        createVisualization();
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
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
