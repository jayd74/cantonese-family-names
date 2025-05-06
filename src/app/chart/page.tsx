'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function FamilyChartPage() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    
    // Set up the SVG element
    const svg = svgRef.current;
    const width = 1200;
    const height = 850;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    
    // Clear existing content
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }
    
    // Define generations and their heights with more spacing
    const generations = [
      { level: 3, y: 50, label: 'Great Grandparents (+3)' },
      { level: 2, y: 150, label: 'Grandparents (+2)' },
      { level: 1, y: 250, label: 'Parents\' Generation (+1)' },
      { level: 0, y: 400, label: 'Your Generation (0)' },
      { level: -1, y: 575, label: 'Children\'s Generation (-1)' },
      { level: -2, y: 700, label: 'Grandchildren (-2)' },
      { level: -3, y: 800, label: 'Great Grandchildren (-3)' }
    ];
    
    // Add generation labels
    generations.forEach(gen => {
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', '10');
      text.setAttribute('y', gen.y.toString());
      text.setAttribute('fill', '#444');
      text.setAttribute('font-weight', 'bold');
      text.textContent = gen.label;
      svg.appendChild(text);
      
      // Add horizontal line for this generation
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', '10');
      line.setAttribute('y1', (gen.y + 10).toString());
      line.setAttribute('x2', (width - 10).toString());
      line.setAttribute('y2', (gen.y + 10).toString());
      line.setAttribute('stroke', '#ddd');
      line.setAttribute('stroke-width', '1');
      svg.appendChild(line);
    });
    
    // Define and create the relationship nodes
    const relationships = [
      // Great Grandparents (paternal)
      { 
        generation: 3, 
        x: 300, 
        label: '太爺 / 太嫲',
        sublabel: 'Great Grandfather/mother (Paternal)', 
        cantonese: 'taai3 ye4 / taai3 maa4',
        side: 'paternal'
      },
      // Great Grandparents (maternal)
      { 
        generation: 3, 
        x: 700, 
        label: '太外公 / 太外婆',
        sublabel: 'Great Grandfather/mother (Maternal)', 
        cantonese: 'taai3 ngoi6 gung1 / taai3 ngoi6 po4',
        side: 'maternal'
      },
      
      // Grandparents (paternal)
      { 
        generation: 2, 
        x: 300, 
        label: '爺爺 / 嫲嫲',
        sublabel: 'Grandfather/mother (Paternal)', 
        cantonese: 'ye4 ye4 / maa4 maa4',
        side: 'paternal'
      },
      // Grandparents (maternal)
      { 
        generation: 2, 
        x: 700, 
        label: '外公 / 外婆',
        sublabel: 'Grandfather/mother (Maternal)', 
        cantonese: 'ngoi6 gung1 / ngoi6 po4',
        side: 'maternal'
      },
      
      // Parents and uncles/aunts (paternal)
      { 
        generation: 1, 
        x: 200, 
        label: '爸爸 / 媽媽',
        sublabel: 'Father/Mother', 
        cantonese: 'baa4 baa1 / maa1 maa1',
        side: 'direct'
      },
      { 
        generation: 1, 
        x: 380, 
        label: '伯父 / 叔父',
        sublabel: 'Father\'s Brothers', 
        cantonese: 'baak3 fu6 / suk1 fu6',
        side: 'paternal'
      },
      { 
        generation: 1, 
        x: 550, 
        label: '姑媽',
        sublabel: 'Father\'s Sister', 
        cantonese: 'gu1 maa1',
        side: 'paternal'
      },
      { 
        generation: 1, 
        x: 850, 
        label: '舅父',
        sublabel: 'Mother\'s Brother', 
        cantonese: 'kau5 fu6',
        side: 'maternal'
      },
      { 
        generation: 1, 
        x: 1020, 
        label: '姨媽',
        sublabel: 'Mother\'s Sister', 
        cantonese: 'ji4 maa1',
        side: 'maternal'
      },
      
      // Your generation
      { 
        generation: 0, 
        x: 600, 
        label: '你 / 老公 / 老婆',
        sublabel: 'You / Husband / Wife', 
        cantonese: 'nei5 / lou5 gung1 / lou5 po4',
        side: 'direct',
        primary: true
      },
      { 
        generation: 0, 
        x: 380, 
        label: '哥哥 / 弟弟',
        sublabel: 'Elder/Younger Brothers', 
        cantonese: 'go1 go1 / dai6 dai2',
        side: 'direct'
      },
      { 
        generation: 0, 
        x: 820, 
        label: '姐姐 / 妹妹',
        sublabel: 'Elder/Younger Sisters', 
        cantonese: 'ze2 ze2 / mui6 mui2',
        side: 'direct'
      },
      // Paternal cousins
      { 
        generation: 0, 
        x: 180, 
        label: '堂兄 / 堂弟',
        sublabel: 'Male Paternal Cousins', 
        cantonese: 'tong4 hing1 / tong4 dai6',
        side: 'paternal'
      },
      { 
        generation: 0, 
        x: 310, 
        label: '堂姐 / 堂妹',
        sublabel: 'Female Paternal Cousins', 
        cantonese: 'tong4 ze2 / tong4 mui6',
        side: 'paternal'
      },
      // Maternal cousins
      { 
        generation: 0, 
        x: 890, 
        label: '表兄 / 表弟',
        sublabel: 'Male Maternal Cousins', 
        cantonese: 'biu2 hing1 / biu2 dai6',
        side: 'maternal'
      },
      { 
        generation: 0, 
        x: 1020, 
        label: '表姐 / 表妹',
        sublabel: 'Female Maternal Cousins', 
        cantonese: 'biu2 ze2 / biu2 mui6',
        side: 'maternal'
      },
      // Cousin's spouses
      { 
        generation: 0, 
        x: 70, 
        label: '堂嫂 / 堂弟媳',
        sublabel: 'Paternal Male Cousin\'s Wife', 
        cantonese: 'tong4 sou2 / tong4 dai6 sik1',
        side: 'paternal'
      },
      { 
        generation: 0, 
        x: 1130, 
        label: '表嫂 / 表弟媳',
        sublabel: 'Maternal Male Cousin\'s Wife', 
        cantonese: 'biu2 sou2 / biu2 dai6 sik1',
        side: 'maternal'
      },
      
      // Children generation
      { 
        generation: -1, 
        x: 500, 
        label: '兒子',
        sublabel: 'Son', 
        cantonese: 'ji4 zi2',
        side: 'direct'
      },
      { 
        generation: -1, 
        x: 700, 
        label: '女兒',
        sublabel: 'Daughter', 
        cantonese: 'neoi5 ji4',
        side: 'direct'
      },
      { 
        generation: -1, 
        x: 280, 
        label: '侄子 / 侄女',
        sublabel: 'Nephew/Niece (Brother\'s)', 
        cantonese: 'zat6 zi2 / zat6 neoi5',
        side: 'paternal'
      },
      { 
        generation: -1, 
        x: 920, 
        label: '外甥 / 外甥女',
        sublabel: 'Nephew/Niece (Sister\'s)', 
        cantonese: 'ngoi6 saang1 / ngoi6 saang1 neoi5',
        side: 'maternal'
      },
      // Cousin's children
      { 
        generation: -1, 
        x: 110, 
        label: '堂侄 / 堂侄女',
        sublabel: 'Paternal Male Cousin\'s Children', 
        cantonese: 'tong4 zat6 / tong4 zat6 neoi5',
        side: 'paternal'
      },
      { 
        generation: -1, 
        x: 180, 
        label: '堂外甥 / 堂外甥女',
        sublabel: 'Paternal Female Cousin\'s Children', 
        cantonese: 'tong4 ngoi6 saang1 / tong4 ngoi6 saang1 neoi5',
        side: 'paternal'
      },
      { 
        generation: -1, 
        x: 1020, 
        label: '表侄 / 表侄女',
        sublabel: 'Maternal Male Cousin\'s Children', 
        cantonese: 'biu2 zat6 / biu2 zat6 neoi5',
        side: 'maternal'
      },
      { 
        generation: -1, 
        x: 1090, 
        label: '表外甥 / 表外甥女',
        sublabel: 'Maternal Female Cousin\'s Children', 
        cantonese: 'biu2 ngoi6 saang1 / biu2 ngoi6 saang1 neoi5',
        side: 'maternal'
      },
      
      // Grandchildren
      { 
        generation: -2, 
        x: 500, 
        label: '孫子 / 孫女',
        sublabel: 'Grandson/daughter (Son\'s)', 
        cantonese: 'syun1 zi2 / syun1 neoi5',
        side: 'paternal'
      },
      { 
        generation: -2, 
        x: 700, 
        label: '外孫 / 外孫女',
        sublabel: 'Grandson/daughter (Daughter\'s)', 
        cantonese: 'ngoi6 syun1 / ngoi6 syun1 neoi5',
        side: 'maternal'
      },
      
      // Great Grandchildren
      { 
        generation: -3, 
        x: 600, 
        label: '曾孫 / 曾孫女',
        sublabel: 'Great Grandson/daughter', 
        cantonese: 'zang1 syun1 / zang1 syun1 neoi5',
        side: 'direct'
      }
    ];
    
    // Create the nodes with larger boxes
    relationships.forEach(rel => {
      const gen = generations.find(g => g.level === rel.generation);
      if (!gen) return;
      
      // Create group
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      svg.appendChild(g);
      
      // Node background color based on side
      let bgColor = '#f0f4f8'; // default
      if (rel.side === 'paternal') bgColor = '#e6f7ff';
      if (rel.side === 'maternal') bgColor = '#fff1f0';
      if (rel.side === 'direct') bgColor = '#f6ffed';
      
      // Create node rectangle - increase size to prevent text overflow
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', (rel.x - 90).toString());
      rect.setAttribute('y', (gen.y + 20).toString());
      rect.setAttribute('width', '180');
      rect.setAttribute('height', '90');
      rect.setAttribute('rx', '5');
      rect.setAttribute('ry', '5');
      rect.setAttribute('fill', rel.primary ? '#52c41a' : bgColor);
      rect.setAttribute('stroke', rel.primary ? '#389e0d' : '#d9d9d9');
      rect.setAttribute('stroke-width', rel.primary ? '2' : '1');
      g.appendChild(rect);
      
      // Create the main label (Chinese)
      const labelText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      labelText.setAttribute('x', rel.x.toString());
      labelText.setAttribute('y', (gen.y + 45).toString());
      labelText.setAttribute('text-anchor', 'middle');
      labelText.setAttribute('font-weight', 'bold');
      labelText.setAttribute('fill', rel.primary ? 'white' : '#333');
      labelText.textContent = rel.label;
      g.appendChild(labelText);
      
      // Break the sublabel into multiple lines if needed
      const sublabelText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      sublabelText.setAttribute('x', rel.x.toString());
      sublabelText.setAttribute('y', (gen.y + 65).toString());
      sublabelText.setAttribute('text-anchor', 'middle');
      sublabelText.setAttribute('font-size', '11');
      sublabelText.setAttribute('fill', rel.primary ? 'white' : '#666');
      
      // For longer sublabels, break into two lines if needed
      if (rel.sublabel.length > 22) {
        // Find a space to break the line near the middle
        const midpoint = Math.floor(rel.sublabel.length / 2);
        let breakIndex = rel.sublabel.indexOf(' ', midpoint);
        if (breakIndex === -1) {
          breakIndex = rel.sublabel.lastIndexOf(' ', midpoint);
        }
        
        if (breakIndex !== -1) {
          const firstLine = rel.sublabel.substring(0, breakIndex);
          const secondLine = rel.sublabel.substring(breakIndex + 1);
          
          const tspan1 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
          tspan1.setAttribute('x', rel.x.toString());
          tspan1.setAttribute('dy', '0');
          tspan1.textContent = firstLine;
          sublabelText.appendChild(tspan1);
          
          const tspan2 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
          tspan2.setAttribute('x', rel.x.toString());
          tspan2.setAttribute('dy', '14');
          tspan2.textContent = secondLine;
          sublabelText.appendChild(tspan2);
        } else {
          sublabelText.textContent = rel.sublabel;
        }
      } else {
        sublabelText.textContent = rel.sublabel;
      }
      
      g.appendChild(sublabelText);
      
      // Create the Cantonese pronunciation
      const cantoneseText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      cantoneseText.setAttribute('x', rel.x.toString());
      cantoneseText.setAttribute('y', (gen.y + 95).toString());
      cantoneseText.setAttribute('text-anchor', 'middle');
      cantoneseText.setAttribute('font-size', '10');
      cantoneseText.setAttribute('font-style', 'italic');
      cantoneseText.setAttribute('fill', rel.primary ? 'rgba(255,255,255,0.8)' : '#888');
      cantoneseText.textContent = rel.cantonese;
      g.appendChild(cantoneseText);
    });
    
    // Update connection points for the adjusted positions
    // Connect great grandparents to grandparents
    drawConnection(svg, 300, generations[0].y + 110, 300, generations[1].y + 20);
    drawConnection(svg, 700, generations[0].y + 110, 700, generations[1].y + 20);
    
    // Connect grandparents to parents
    drawConnection(svg, 300, generations[1].y + 110, 200, generations[2].y + 20);
    drawConnection(svg, 700, generations[1].y + 110, 850, generations[2].y + 20);
    
    // Connect parents to you
    drawConnection(svg, 200, generations[2].y + 110, 600, generations[3].y + 20);
    
    // Connect aunts/uncles to cousins
    drawConnection(svg, 380, generations[2].y + 110, 180, generations[3].y + 20); // Father's brother to male paternal cousins
    drawConnection(svg, 380, generations[2].y + 110, 310, generations[3].y + 20); // Father's brother to female paternal cousins
    drawConnection(svg, 550, generations[2].y + 110, 890, generations[3].y + 20); // Father's sister to male maternal-type cousins
    drawConnection(svg, 550, generations[2].y + 110, 1020, generations[3].y + 20); // Father's sister to female maternal-type cousins
    drawConnection(svg, 850, generations[2].y + 110, 890, generations[3].y + 20); // Mother's brother to male maternal cousins
    drawConnection(svg, 850, generations[2].y + 110, 1020, generations[3].y + 20); // Mother's brother to female maternal cousins
    drawConnection(svg, 1020, generations[2].y + 110, 890, generations[3].y + 20); // Mother's sister to male maternal cousins
    drawConnection(svg, 1020, generations[2].y + 110, 1020, generations[3].y + 20); // Mother's sister to female maternal cousins
    
    // Connect male cousins to their wives
    drawConnection(svg, 180, generations[3].y + 65, 70, generations[3].y + 65); // Male paternal cousin to wife
    drawConnection(svg, 890, generations[3].y + 65, 1130, generations[3].y + 65); // Male maternal cousin to wife
    
    // Connect you to siblings
    drawConnection(svg, 600, generations[3].y + 65, 380, generations[3].y + 65);
    drawConnection(svg, 600, generations[3].y + 65, 820, generations[3].y + 65);
    
    // Connect you to children
    drawConnection(svg, 600, generations[3].y + 110, 500, generations[4].y + 20);
    drawConnection(svg, 600, generations[3].y + 110, 700, generations[4].y + 20);
    
    // Connect siblings to their children (your nephews/nieces)
    drawConnection(svg, 380, generations[3].y + 110, 280, generations[4].y + 20);
    drawConnection(svg, 820, generations[3].y + 110, 920, generations[4].y + 20);
    
    // Connect cousins to their children
    drawConnection(svg, 180, generations[3].y + 110, 110, generations[4].y + 20); // Male paternal cousin to their children
    drawConnection(svg, 310, generations[3].y + 110, 180, generations[4].y + 20); // Female paternal cousin to their children
    drawConnection(svg, 890, generations[3].y + 110, 1020, generations[4].y + 20); // Male maternal cousin to their children
    drawConnection(svg, 1020, generations[3].y + 110, 1090, generations[4].y + 20); // Female maternal cousin to their children
    
    // Connect children to grandchildren
    drawConnection(svg, 500, generations[4].y + 110, 500, generations[5].y + 20);
    drawConnection(svg, 700, generations[4].y + 110, 700, generations[5].y + 20);
    
    // Connect grandchildren to great grandchildren
    drawConnection(svg, 500, generations[5].y + 110, 600, generations[6].y + 20);
    drawConnection(svg, 700, generations[5].y + 110, 600, generations[6].y + 20);
    
    // Add legend
    addLegend(svg, width);
  }, []);

  function drawConnection(svg: SVGSVGElement, x1: number, y1: number, x2: number, y2: number) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    
    // Calculate control points for a curved line
    const midY = (y1 + y2) / 2;
    
    // Create the path using bezier curves
    const d = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;
    
    path.setAttribute('d', d);
    path.setAttribute('stroke', '#ccc');
    path.setAttribute('stroke-width', '1.5');
    path.setAttribute('fill', 'none');
    svg.appendChild(path);
  }
  
  function addLegend(svg: SVGSVGElement, width: number) {
    const legend = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    legend.setAttribute('transform', `translate(${width - 200}, 30)`);
    
    // Title
    const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    title.setAttribute('x', '0');
    title.setAttribute('y', '0');
    title.setAttribute('font-weight', 'bold');
    title.textContent = 'Legend:';
    legend.appendChild(title);
    
    // Create legend items
    const items = [
      { color: '#f6ffed', label: 'Direct family', stroke: '#d9d9d9' },
      { color: '#e6f7ff', label: 'Paternal side', stroke: '#d9d9d9' },
      { color: '#fff1f0', label: 'Maternal side', stroke: '#d9d9d9' },
    ];
    
    items.forEach((item, index) => {
      const y = 20 + index * 25;
      
      // Color box
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', '0');
      rect.setAttribute('y', y.toString());
      rect.setAttribute('width', '20');
      rect.setAttribute('height', '20');
      rect.setAttribute('fill', item.color);
      rect.setAttribute('stroke', item.stroke);
      legend.appendChild(rect);
      
      // Label
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', '30');
      text.setAttribute('y', (y + 15).toString());
      text.textContent = item.label;
      legend.appendChild(text);
    });
    
    svg.appendChild(legend);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-sky-100 p-2 sm:p-4">
      {/* On mobile: No container, full width chart */}
      <div className="block sm:hidden w-full overflow-x-auto">
        <h1 className="text-2xl font-bold text-center text-sky-700 dark:text-sky-300 mb-4">Cantonese Family Chart</h1>
        <div className="bg-white p-2 rounded-xl shadow-sm">
          <p className="text-center text-sm text-gray-500 mb-2">Scroll horizontally to view the full chart</p>
          <svg ref={svgRef} className="w-full" style={{ minWidth: '1000px', height: '900px' }} />
        </div>
        <div className="text-center mt-4">
          <Link href="/" className="inline-flex items-center px-3 py-1.5 bg-sky-100 text-sky-700 rounded-full hover:bg-sky-200 transition-colors text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
      
      {/* On tablet/desktop: Contained chart with max width */}
      <div className="hidden sm:block">
        <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden p-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-sky-700 dark:text-sky-300 mb-4">Cantonese Family Chart</h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
            A visual representation of Cantonese family relationships and their connections
          </p>
          <div className="overflow-auto">
            <svg ref={svgRef} className="w-full" style={{ height: '900px' }} />
          </div>
          
          <div className="mt-6">
            <div className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
              <h3 className="font-medium mb-2">Chart Legend</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><span className="inline-block w-3 h-3 bg-[#f6ffed] border border-[#d9d9d9] mr-2"></span> Direct family (you, your parents, siblings, children)</li>
                <li><span className="inline-block w-3 h-3 bg-[#e6f7ff] border border-[#d9d9d9] mr-2"></span> Paternal side relatives (father&apos;s side)</li>
                <li><span className="inline-block w-3 h-3 bg-[#fff1f0] border border-[#d9d9d9] mr-2"></span> Maternal side relatives (mother&apos;s side)</li>
                <li><span className="inline-block w-3 h-3 bg-[#52c41a] border border-[#389e0d] mr-2"></span> Your position in the family tree</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 