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
    
    // Define generations and their heights
    const generations = [
      { level: 3, y: 50, label: 'Great Grandparents (+3)' },
      { level: 2, y: 150, label: 'Grandparents (+2)' },
      { level: 1, y: 250, label: 'Parents\' Generation (+1)' },
      { level: 0, y: 400, label: 'Your Generation (0)' },
      { level: -1, y: 550, label: 'Children\'s Generation (-1)' },
      { level: -2, y: 650, label: 'Grandchildren (-2)' },
      { level: -3, y: 750, label: 'Great Grandchildren (-3)' }
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
        x: 400, 
        label: '伯父 / 叔父',
        sublabel: 'Father\'s Brothers', 
        cantonese: 'baak3 fu6 / suk1 fu6',
        side: 'paternal'
      },
      { 
        generation: 1, 
        x: 600, 
        label: '姑媽',
        sublabel: 'Father\'s Sister', 
        cantonese: 'gu1 maa1',
        side: 'paternal'
      },
      { 
        generation: 1, 
        x: 800, 
        label: '舅父',
        sublabel: 'Mother\'s Brother', 
        cantonese: 'kau5 fu6',
        side: 'maternal'
      },
      { 
        generation: 1, 
        x: 1000, 
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
        x: 400, 
        label: '哥哥 / 弟弟',
        sublabel: 'Elder/Younger Brothers', 
        cantonese: 'go1 go1 / dai6 dai2',
        side: 'direct'
      },
      { 
        generation: 0, 
        x: 800, 
        label: '姐姐 / 妹妹',
        sublabel: 'Elder/Younger Sisters', 
        cantonese: 'ze2 ze2 / mui6 mui2',
        side: 'direct'
      },
      // Paternal cousins
      { 
        generation: 0, 
        x: 200, 
        label: '堂兄 / 堂弟',
        sublabel: 'Male Paternal Cousins', 
        cantonese: 'tong4 hing1 / tong4 dai6',
        side: 'paternal'
      },
      { 
        generation: 0, 
        x: 300, 
        label: '堂姐 / 堂妹',
        sublabel: 'Female Paternal Cousins', 
        cantonese: 'tong4 ze2 / tong4 mui6',
        side: 'paternal'
      },
      // Maternal cousins
      { 
        generation: 0, 
        x: 900, 
        label: '表兄 / 表弟',
        sublabel: 'Male Maternal Cousins', 
        cantonese: 'biu2 hing1 / biu2 dai6',
        side: 'maternal'
      },
      { 
        generation: 0, 
        x: 1000, 
        label: '表姐 / 表妹',
        sublabel: 'Female Maternal Cousins', 
        cantonese: 'biu2 ze2 / biu2 mui6',
        side: 'maternal'
      },
      // Cousin's spouses
      { 
        generation: 0, 
        x: 100, 
        label: '堂嫂 / 堂弟媳',
        sublabel: 'Paternal Male Cousin\'s Wife', 
        cantonese: 'tong4 sou2 / tong4 dai6 sik1',
        side: 'paternal'
      },
      { 
        generation: 0, 
        x: 1100, 
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
        x: 300, 
        label: '侄子 / 侄女',
        sublabel: 'Nephew/Niece (Brother\'s)', 
        cantonese: 'zat6 zi2 / zat6 neoi5',
        side: 'paternal'
      },
      { 
        generation: -1, 
        x: 900, 
        label: '外甥 / 外甥女',
        sublabel: 'Nephew/Niece (Sister\'s)', 
        cantonese: 'ngoi6 saang1 / ngoi6 saang1 neoi5',
        side: 'maternal'
      },
      // Cousin's children
      { 
        generation: -1, 
        x: 150, 
        label: '堂侄 / 堂侄女',
        sublabel: 'Paternal Male Cousin\'s Children', 
        cantonese: 'tong4 zat6 / tong4 zat6 neoi5',
        side: 'paternal'
      },
      { 
        generation: -1, 
        x: 225, 
        label: '堂外甥 / 堂外甥女',
        sublabel: 'Paternal Female Cousin\'s Children', 
        cantonese: 'tong4 ngoi6 saang1 / tong4 ngoi6 saang1 neoi5',
        side: 'paternal'
      },
      { 
        generation: -1, 
        x: 975, 
        label: '表侄 / 表侄女',
        sublabel: 'Maternal Male Cousin\'s Children', 
        cantonese: 'biu2 zat6 / biu2 zat6 neoi5',
        side: 'maternal'
      },
      { 
        generation: -1, 
        x: 1050, 
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
    
    // Create the nodes
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
      
      // Create node rectangle
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', (rel.x - 80).toString());
      rect.setAttribute('y', (gen.y + 20).toString());
      rect.setAttribute('width', '160');
      rect.setAttribute('height', '80');
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
      
      // Create the sublabel (English)
      const sublabelText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      sublabelText.setAttribute('x', rel.x.toString());
      sublabelText.setAttribute('y', (gen.y + 65).toString());
      sublabelText.setAttribute('text-anchor', 'middle');
      sublabelText.setAttribute('font-size', '12');
      sublabelText.setAttribute('fill', rel.primary ? 'white' : '#666');
      sublabelText.textContent = rel.sublabel;
      g.appendChild(sublabelText);
      
      // Create the Cantonese pronunciation
      const cantoneseText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      cantoneseText.setAttribute('x', rel.x.toString());
      cantoneseText.setAttribute('y', (gen.y + 85).toString());
      cantoneseText.setAttribute('text-anchor', 'middle');
      cantoneseText.setAttribute('font-size', '10');
      cantoneseText.setAttribute('font-style', 'italic');
      cantoneseText.setAttribute('fill', rel.primary ? 'rgba(255,255,255,0.8)' : '#888');
      cantoneseText.textContent = rel.cantonese;
      g.appendChild(cantoneseText);
    });
    
    // Draw connections between nodes
    // Connect great grandparents to grandparents
    drawConnection(svg, 300, generations[0].y + 100, 300, generations[1].y + 20);
    drawConnection(svg, 700, generations[0].y + 100, 700, generations[1].y + 20);
    
    // Connect grandparents to parents
    drawConnection(svg, 300, generations[1].y + 100, 200, generations[2].y + 20);
    drawConnection(svg, 700, generations[1].y + 100, 800, generations[2].y + 20);
    
    // Connect parents to you
    drawConnection(svg, 200, generations[2].y + 100, 600, generations[3].y + 20);
    
    // Connect aunts/uncles to cousins
    drawConnection(svg, 400, generations[2].y + 100, 200, generations[3].y + 20); // Father's brother to male paternal cousins
    drawConnection(svg, 400, generations[2].y + 100, 300, generations[3].y + 20); // Father's brother to female paternal cousins
    drawConnection(svg, 600, generations[2].y + 100, 900, generations[3].y + 20); // Father's sister to male maternal-type cousins
    drawConnection(svg, 600, generations[2].y + 100, 1000, generations[3].y + 20); // Father's sister to female maternal-type cousins
    drawConnection(svg, 800, generations[2].y + 100, 900, generations[3].y + 20); // Mother's brother to male maternal cousins
    drawConnection(svg, 800, generations[2].y + 100, 1000, generations[3].y + 20); // Mother's brother to female maternal cousins
    drawConnection(svg, 1000, generations[2].y + 100, 900, generations[3].y + 20); // Mother's sister to male maternal cousins
    drawConnection(svg, 1000, generations[2].y + 100, 1000, generations[3].y + 20); // Mother's sister to female maternal cousins
    
    // Connect male cousins to their wives
    drawConnection(svg, 200, generations[3].y + 60, 100, generations[3].y + 60); // Male paternal cousin to wife
    drawConnection(svg, 900, generations[3].y + 60, 1100, generations[3].y + 60); // Male maternal cousin to wife
    
    // Connect you to siblings
    drawConnection(svg, 600, generations[3].y + 60, 400, generations[3].y + 60);
    drawConnection(svg, 600, generations[3].y + 60, 800, generations[3].y + 60);
    
    // Connect you to children
    drawConnection(svg, 600, generations[3].y + 100, 500, generations[4].y + 20);
    drawConnection(svg, 600, generations[3].y + 100, 700, generations[4].y + 20);
    
    // Connect siblings to their children (your nephews/nieces)
    drawConnection(svg, 400, generations[3].y + 100, 300, generations[4].y + 20);
    drawConnection(svg, 800, generations[3].y + 100, 900, generations[4].y + 20);
    
    // Connect cousins to their children
    drawConnection(svg, 200, generations[3].y + 100, 150, generations[4].y + 20); // Male paternal cousin to their children
    drawConnection(svg, 300, generations[3].y + 100, 225, generations[4].y + 20); // Female paternal cousin to their children
    drawConnection(svg, 900, generations[3].y + 100, 975, generations[4].y + 20); // Male maternal cousin to their children
    drawConnection(svg, 1000, generations[3].y + 100, 1050, generations[4].y + 20); // Female maternal cousin to their children
    
    // Connect children to grandchildren
    drawConnection(svg, 500, generations[4].y + 100, 500, generations[5].y + 20);
    drawConnection(svg, 700, generations[4].y + 100, 700, generations[5].y + 20);
    
    // Connect grandchildren to great grandchildren
    drawConnection(svg, 500, generations[5].y + 100, 600, generations[6].y + 20);
    drawConnection(svg, 700, generations[5].y + 100, 600, generations[6].y + 20);
    
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
      { color: '#f6ffed', label: 'Direct Family', stroke: '#d9d9d9' },
      { color: '#e6f7ff', label: 'Paternal Side', stroke: '#d9d9d9' },
      { color: '#fff1f0', label: 'Maternal Side', stroke: '#d9d9d9' },
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
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-full mx-auto bg-white p-6 rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold mb-6 text-center">Cantonese Family Relationship Tree</h1>
          
          <nav className="mb-6 text-center">
            <p className="mb-2">
              This chart shows family relationships organized by generation, color-coded by paternal, maternal, and direct family lines.
            </p>
            <Link href="/guide" className="inline-block px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
              Return to Guide
            </Link>
          </nav>
          
          <div className="overflow-auto">
            <svg 
              ref={svgRef} 
              className="w-full border border-gray-200 rounded-lg" 
              style={{ height: '850px', minWidth: '900px' }}
            ></svg>
          </div>
          
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">About This Chart</h2>
            <p>
              This family tree visualization displays the complex system of Cantonese family relationship terms. 
              The chart is organized vertically by generation (from great-grandparents to great-grandchildren) 
              and horizontally based on the family line.
            </p>
            <ul className="list-disc ml-6 mt-2">
              <li><span className="font-medium">Green node:</span> Your position in the family tree</li>
              <li><span className="font-medium">Light green nodes:</span> Direct family (parents, children)</li>
              <li><span className="font-medium">Blue nodes:</span> Paternal side relatives</li>
              <li><span className="font-medium">Red nodes:</span> Maternal side relatives</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
} 