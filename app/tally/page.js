import { getSiteSettings } from '@/utils/getSiteSettings';
import { Suspense } from 'react';
import PosHeader from './component/PosHeader';
import TallyPage from './component/TallyPage';

  export async function generateMetadata() {
      const siteSetting = await getSiteSettings('en');

      return {
          title: `${siteSetting.data.title} | Point of Sale`,
          icons: {
              icon: siteSetting.data.fev_icon,
              apple: siteSetting.data.fev_icon,
          },
          openGraph: {
              title: siteSetting.data.title,
              description: siteSetting.data.footer_description,
              url: siteSetting.data.website,
              type: 'website',
              images: [
                  {
                      url: siteSetting.data.header_logo,
                      width: 1200,
                      height: 630,
                      alt: 'Karbar Logo',
                  },
              ],
          },
      };
  }

const Tally = async () => {
    const siteSetting = await getSiteSettings('en');
  return (
      <div>
          <PosHeader logo={siteSetting.data.logo} />
          <Suspense fallback={<div></div>}>
            <TallyPage />
          </Suspense>
      </div>
  );
}

export default Tally;