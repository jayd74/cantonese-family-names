export default function GuidePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold mb-6 text-center">Cantonese Family Addressing Guide</h1>
          
          <div className="prose lg:prose-lg mx-auto">
            <h2>Understanding Cantonese Family Addressing</h2>
            <p>
              In Cantonese culture, family relationships are described with specific terms that 
              indicate not only the type of relationship but also which side of the family the 
              person is from (maternal or paternal), their gender, and sometimes their age relative 
              to other family members.
            </p>
            
            <h3>Key Principles</h3>
            <ul>
              <li><strong>Paternal vs. Maternal:</strong> Different terms are used for relatives from your father&apos;s side versus your mother&apos;s side.</li>
              <li><strong>Generation:</strong> The terms reflect how many generations separate you from the relative.</li>
              <li><strong>Age Order:</strong> For siblings and cousins, different terms indicate whether they are older or younger than you.</li>
              <li><strong>Gender:</strong> Separate terms exist for male and female relatives in each category.</li>
              <li><strong>Marriage Relations:</strong> Specific terms designate relationships by marriage, such as in-laws and spouses of relatives.</li>
            </ul>
            
            <h2>Addressing Elders</h2>
            <p>
              When addressing elders in Cantonese culture, it&apos;s customary to use the appropriate kinship term 
              rather than their name. This shows respect and acknowledges their position in the family hierarchy.
            </p>
            
            <h3>General Rules for Addressing</h3>
            <ol>
              <li>Always use the appropriate term when greeting or referring to an elder.</li>
              <li>When introducing an elder to others, use their kinship term in relation to you.</li>
              <li>Never address elders by their first name alone; this is considered disrespectful.</li>
              <li>If unsure, it&apos;s better to use a more respectful term than a less formal one.</li>
            </ol>
            
            <h2>Pronouncing Cantonese Terms</h2>
            <p>
              Cantonese is a tonal language with six tones that can change the meaning of a word. 
              In our app, we use the Jyutping romanization system, where numbers represent tones:
            </p>
            
            <ul>
              <li><strong>1</strong> - High level tone</li>
              <li><strong>2</strong> - High rising tone</li>
              <li><strong>3</strong> - Mid level tone</li>
              <li><strong>4</strong> - Low falling tone</li>
              <li><strong>5</strong> - Low rising tone</li>
              <li><strong>6</strong> - Low level tone</li>
            </ul>
            
            <p>
              For example, in &quot;ye4 ye4&quot; (paternal grandfather, 爺爺), the number 4 indicates 
              you should use the low falling tone for both syllables.
            </p>
            
            <h2>Family Relationship Categories</h2>
            <p>
              Our app includes comprehensive coverage of family relationships, including:
            </p>
            
            <ul>
              <li><strong>Direct Ancestors:</strong> Parents, grandparents, and great-grandparents</li>
              <li><strong>Extended Family:</strong> Aunts, uncles, and cousins from both maternal and paternal sides</li>
              <li><strong>Spouses:</strong> Terms for husbands and wives</li>
              <li><strong>In-Laws:</strong> Parents-in-law, brothers-in-law, and sisters-in-law</li>
              <li><strong>Descendants:</strong> Children, grandchildren, and great-grandchildren</li>
              <li><strong>Extended In-Laws:</strong> Spouses of your children, grandchildren, nieces, and nephews</li>
            </ul>
            
            <div className="my-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
              <h3 className="text-xl font-bold text-blue-700 mb-2">Visual Family Relationship Tree</h3>
              <p className="mb-3">
                See the complete family relationship structure in our interactive visual chart 
                that shows how different family members are connected.
              </p>
              <a 
                href="/chart" 
                className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                View Family Tree Chart
              </a>
            </div>
            
            <h2>Family Tree Organization</h2>
            <p>
              Our app organizes family relationships by generation relative to yourself:
            </p>
            
            <ul>
              <li><strong>+3 Generations:</strong> Great-grandparents</li>
              <li><strong>+2 Generations:</strong> Grandparents</li>
              <li><strong>+1 Generation:</strong> Parents, aunts, uncles, and parents-in-law</li>
              <li><strong>Same Generation:</strong> Siblings, cousins, spouses, and siblings-in-law</li>
              <li><strong>-1 Generation:</strong> Children, nieces, nephews, and children-in-law</li>
              <li><strong>-2 Generations:</strong> Grandchildren and their spouses</li>
              <li><strong>-3 Generations:</strong> Great-grandchildren and their spouses</li>
            </ul>
            
            <h2>Using the App</h2>
            <p>
              To find the correct term:
            </p>
            
            <ol>
              <li>Use the search function to find a specific relationship</li>
              <li>Or browse by generation using the generation tabs</li>
              <li>Each card shows the English relationship, the Chinese characters, pronunciation, and contextual notes</li>
            </ol>
            
            <p>
              Remember that some terms may vary slightly depending on regional dialects of Cantonese. 
              The terms provided represent the most common usage in standard Cantonese.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 