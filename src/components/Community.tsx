import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import communityContent from '../data/community.json';
import Carousel from './Carousel';

interface FBPost {
  id: string | number;
  url: string;
}

const Community: React.FC = () => {
  const { t } = useTranslation();
  const [facebookPosts, setFacebookPosts] = useState<FBPost[]>(
    communityContent.facebookPosts || []
  );

  useEffect(() => {
    const fetchPosts = async () => {
      const pageId = import.meta.env.VITE_FACEBOOK_PAGE_ID;
      const token = import.meta.env.VITE_FACEBOOK_ACCESS_TOKEN;

      // Fallback to static JSON if no API credentials are provided
      if (!pageId || !token) return;

      try {
        const url = `https://graph.facebook.com/v19.0/${pageId}/posts?fields=permalink_url&limit=6&access_token=${token}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.data) {
          const fetchedPosts = data.data
            .filter((item: any) => item.permalink_url)
            .map((item: any) => ({
              id: item.id,
              url: item.permalink_url,
            }));

          if (fetchedPosts.length > 0) {
            setFacebookPosts(fetchedPosts);
          }
        }
      } catch (error) {
        console.error('Error fetching Facebook posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="py-[var(--space-xl)] bg-[#FFF9F0] overflow-hidden" id="community">
      <div className="container mx-auto px-4 md:px-14 max-w-[1440px]">
        <div className="section-header text-center mb-[var(--space-xl)] fade-in px-4 md:px-0">
          <span className="block font-body font-bold text-[1rem] tracking-[0.25em] uppercase text-[#A8893E] mb-[var(--space-sm)]">
            {t('community_label')}
          </span>
          <h2 className="font-heading font-semibold text-[clamp(2.5rem,5vw,4rem)] text-[#2C1810] mb-[var(--space-md)] leading-tight tracking-[-0.015em]">
            {t('community_title')}
          </h2>
          <p className="font-body font-light text-[1.15rem] leading-[1.85] text-[#5A4636] mx-auto max-w-[65ch] tracking-[0.02em]">
            {t('community_subtitle')}
          </p>
        </div>

        <div className="fade-in-scale">
          <Carousel id="fb-carousel" autoplay={false} gap={32}>
            {facebookPosts.map((post) => {
              const encodedUrl = encodeURIComponent(post.url);
              const iframeSrc = `https://www.facebook.com/plugins/post.php?href=${encodedUrl}&show_text=true&width=500`;
              return (
                <div key={post.id} className="basis-full md:basis-[48%] lg:basis-[31%] shrink-0 flex justify-center py-4">
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full max-w-[500px] bg-white rounded-xl shadow-[0_8px_40px_rgba(44,24,16,0.1)] overflow-hidden border border-black/5 block cursor-pointer transition-transform duration-300 hover:-translate-y-1"
                  >
                    <iframe
                      src={iframeSrc}
                      width="100%"
                      height={(post as any).height || 600}
                      style={{ border: 'none', overflow: 'hidden', borderRadius: '8px' }}
                      scrolling="no"
                      frameBorder="0"
                      allowFullScreen={true}
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      title={`Facebook post ${post.id}`}
                      className="pointer-events-none md:pointer-events-auto"
                    />
                  </a>
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Community;
