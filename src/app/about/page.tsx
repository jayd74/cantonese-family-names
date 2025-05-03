export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold mb-6 text-center">About This Project</h1>
          
          <div className="prose lg:prose-lg mx-auto">
            <h2>Why We Created This Tool</h2>
            <p>
              For many English speakers with Cantonese heritage, addressing family members correctly 
              can be challenging. The Cantonese family addressing system is complex and specific, 
              with different terms based on maternal or paternal lineage, relative age, and generation.
            </p>
            
            <p>
              This app was created to help bridge the cultural and linguistic gap, allowing English 
              speakers to show respect and maintain cultural traditions when addressing their elders 
              and family members in Cantonese.
            </p>
            
            <h2>How It Works</h2>
            <p>
              Simply search for the family relationship you&apos;re looking for, or browse by generation. 
              The app will show you the correct Cantonese term, its pronunciation in Jyutping romanization, 
              and additional notes to help you understand the context.
            </p>
            
            <h2>Cultural Importance</h2>
            <p>
              In Cantonese culture, using the correct family terms is more than just etiquette—it&apos;s a way 
              of showing respect and acknowledging family hierarchy. Unlike English, which often uses the 
              same terms regardless of which side of the family a relative is from, Cantonese makes clear 
              distinctions.
            </p>
            
            <h2>About Jyutping</h2>
            <p>
              The pronunciations in this app use Jyutping romanization, a system developed by the Linguistic 
              Society of Hong Kong for Cantonese. The numbers after syllables indicate tones, which are crucial 
              for correct pronunciation.
            </p>
            
            <h2>Feedback and Contributions</h2>
            <p>
              This is an ongoing project. If you notice any errors or have suggestions for improvement, 
              please reach out. We&apos;re committed to making this resource as accurate and helpful as possible.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 