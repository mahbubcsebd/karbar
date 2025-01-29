import { getPageDetails } from "@/utils/getPages";
import { getSiteSettings } from "@/utils/getSiteSettings";

export async function generateMetadata({ params: { slug } }) {
    const siteSetting = await getSiteSettings();
    const pageDetails = await getPageDetails(slug);

    return {
        title: `${siteSetting.data.title} | ${pageDetails.data.title}`,
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

const AllPages = async ({params: {slug}}) => {
  const pageDetails = await getPageDetails(slug);

  return (
      <div className="privacy-policy-section mt-[60px]">
          <div className="container">
              <div
                  className="mb-5"
                  dangerouslySetInnerHTML={{
                      __html: pageDetails.data.content,
                  }}
              ></div>
          </div>
      </div>
  );
}

export default AllPages