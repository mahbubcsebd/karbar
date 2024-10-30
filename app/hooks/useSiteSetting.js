import { useContext } from 'react';
import { SiteSettingContext } from '../context/SiteSettingContext';

const useSiteSetting = () => {
    const { siteSetting } =
        useContext(SiteSettingContext);
    return { siteSetting };
};

export default useSiteSetting;