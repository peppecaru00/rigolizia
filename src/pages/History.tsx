import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { useFadeIn } from '../hooks/useFadeIn';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const History: React.FC = () => {
  const { lang } = useTranslation();
  useFadeIn();

  const isItalian = lang === 'it';

  const title = isItalian ? 'La Storia di Rigolizia' : 'The History of Rigolizia';
  const subtitle = isItalian 
    ? "Un profondo viaggio nel cuore dei Monti Iblei" 
    : "A deep journey into the heart of the Hyblaean Mountains";

  return (
    <div className="min-h-screen bg-[#FAF3E8] pt-32 pb-24 px-6 md:px-12 xl:px-0">
      <div className="max-w-[1000px] mx-auto">
        
        {/* Header Section */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6 fade-in">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-[#2C1810] mb-3">
              {title}
            </h1>
            <p className="font-body text-[#5A4636] text-xl font-light">
              {subtitle}
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#C8A96E] hover:text-[#B85C38] transition-colors font-body font-bold uppercase tracking-widest text-[0.85rem] border border-[#C8A96E]/20 hover:border-[#B85C38] px-6 py-3 rounded-full shrink-0"
          >
            <ArrowLeft size={16} />
            {isItalian ? 'Torna alla Home' : 'Back to Home'}
          </Link>
        </div>

        {/* Content Section */}
        <div className="bg-white/60 backdrop-blur-md rounded-[32px] p-8 md:p-14 shadow-xl border border-[#2C1810]/5 fade-in-scale">
          {isItalian ? (
            <div className="prose prose-lg max-w-none font-body text-[#2C1810]/80 leading-relaxed space-y-6">
              <p>
                <strong className="text-[#2C1810] font-heading text-2xl block mb-2">Un Antico Crocevia</strong>
                Rigolizia è una suggestiva frazione rurale di Noto situata in profondità nell'altopiano dei Monti Iblei, nella Sicilia sud-orientale, ad un'altitudine media di 601 metri. Questa peculiare topologia e il severo isolamento hanno plasmato nei millenni un microclima unico che ha dettato la storica vocazione agricola del territorio, molto differente dalle soleggiate pianure costiere.
              </p>
              
              <p>
                <strong className="text-[#2C1810] font-heading text-2xl block mb-2">Dalla Preistoria al Feudalesimo</strong>
                Storicamente, l'area circostante vanta tracce di insediamenti umani risalenti fino all'Età del Bronzo, come testimoniato dalla cultura di Castelluccio e dai vicini complessi rupestri. Dopo decenni di rinascita agricola sotto l'amministrazione araba e la successiva instaurazione del feudalesimo normanno, un catastrofico e potente terremoto nel 1693 rase completamente al suolo l'antica città di Noto (Noto Antica). Mentre l'importante nucleo urbano fu ricostruito più a valle, dando vita allo splendido Barocco che oggi tutti conoscono, le aspre frazioni montane come Rigolizia divennero reti decentrate e nodali della produzione agricola, raggruppandosi attorno a massicce e fortificate strutture in pietra conosciute come <em>masserie</em>.
              </p>
              
              <p>
                <strong className="text-[#2C1810] font-heading text-2xl block mb-2">Resilienza e Identità Agronomica</strong>
                Oggi, Rigolizia è il fiero simbolo della resilienza rurale iblea. La sua eccezionale economia si basa sulla conservazione di limitate colture endemiche e resistenti alla siccità, prima fra tutte la rinomata "Mandorla di Noto" (in particolare le antiche cultivar <em>Pizzuta</em>, <em>Romana</em> e <em>Fascionello</em>), accompagnata da carrubi secolari, maestosi ulivi e il recente, trionfante ritorno dei grani antichi siciliani come la Timilia. 
              </p>

              <p>
                A livello spirituale e comunitario, l'ancora della frazione è la Parrocchia del Sacro Cuore, fondata in piena Seconda Guerra Mondiale (1943) per offrire rifugio spirituale e sostegno morale a una popolazione isolata. Le sue processioni mantengono un carattere estremamente intimo e puro, legato ai veri ritmi della terra.
              </p>
              
              <p>
                <strong className="text-[#2C1810] font-heading text-2xl block mb-2">Nuove Prospettive e Agriturismo</strong>
                Da un punto di vista naturalistico, la frazione rappresenta l'accesso principale a percorsi di trekking di ineguagliabile interesse antropologico, tra cui la lussureggiante Cava Baulì e gli antichi insediamenti rupestri sospesi dei <em>Ddieri</em>. Attualmente, sfidando un severo calo demografico, Rigolizia si sta reinventando con immenso successo come meta d'eccellenza per un agriturismo d'élite, valorizzando il suo prezioso isolamento e promuovendo una genuina gastronomia a "chilometro zero" agli attenti visitatori di tutto il mondo.
              </p>
            </div>
          ) : (
            <div className="prose prose-lg max-w-none font-body text-[#2C1810]/80 leading-relaxed space-y-6">
              <p>
                <strong className="text-[#2C1810] font-heading text-2xl block mb-2">An Ancient Crossroads</strong>
                Rigolizia is a charming rural fraction of Noto sitting deep within the Hyblaean Mountains (Monti Iblei) in southeastern Sicily, located at an average elevation of 601 meters. This specific topology and comparative isolation have shaped a profound microclimate over millennia, dictating an agricultural reality far different from the sun-drenched coastal plains.
              </p>

              <p>
                <strong className="text-[#2C1810] font-heading text-2xl block mb-2">From Prehistory to Feudalism</strong>
                Historically, the surrounding area traces human habitation as far back as the Bronze Age's Castelluccio culture. After experiencing a significant agricultural renaissance during the Arab administration and the entrenched feudalism of subsequent Norman rule, a catastrophic earthquake in 1693 completely obliterated the medieval city of Noto Antica. While the main urban center was relocated closer to the coast to become the Baroque masterpiece we know today, rugged interior fractions like Rigolizia transformed into highly decentralized, functional hubs of intensive agricultural production, often revolving around the imposing architecture of stone fortified farmhouses known as <em>masserie</em>.
              </p>

              <p>
                <strong className="text-[#2C1810] font-heading text-2xl block mb-2">Agronomic Resilience</strong>
                Today, Rigolizia stands as a powerful symbol of Hyblaean rural resilience. Its specialized economy thrives by focusing on high-value, deeply rooted endemic crops that resist the dry Mediterranean heat. Most celebrated is the world-renowned "Mandorla di Noto" (specifically the ancient <em>Pizzuta</em>, <em>Romana</em>, and <em>Fascionello</em> almond cultivars), cultivated alongside drought-resistant carobs, pristine olive groves, and the triumphant return of ancient Sicilian durum wheats like Timilia.
              </p>

              <p>
                Sociologically, the community is anchored by the Parish of the Sacred Heart (Parrocchia Sacro Cuore). Established at the height of World War II in 1943 to provide moral support and spiritual refuge in a marginalized space, its intimate annual processions preserve an authentic rural rhythm deeply tied to the historical agricultural calendar.
              </p>
              
              <p>
                <strong className="text-[#2C1810] font-heading text-2xl block mb-2">New Horizons and Agritourism</strong>
                Geographically, the fraction serves as a primary gateway to incredibly profound natural trekking landscapes, including the lush Cava Baulì and the staggering "Ddieri"—multi-level troglodytic cave dwellings carved into sheer limestone cliffs. In the modern era, confronting significant demographic decline and rural flight, Rigolizia is successfully adapting by pivoting towards high-end, sustainable agritourism. It now proudly markets its absolute isolation, pristine eco-diversity, and zero-kilometer regional gastronomy to intentional travelers from across the globe.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
