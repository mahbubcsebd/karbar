'use client'

import { LanguageProvider } from '@/context/LanguageContext'
import { UserProvider } from '@/context/UserContext'
import { AdProvider } from '@/provider/AdProvider'
import { ProductContext } from '@/context/cartContext'
import { SearchProvider } from '@/reducer/SearchContext'
import { SortProvider } from '@/context/SortContext'
import { BrandProvider } from '@/context/brandContext'
import { ModalProvider } from '@/reducer/ModalProvider'
import { SiteSettingProvider } from '@/context/SiteSettingContext'
import { OrderProvider } from '@/provider/orderIdProvider'

export default function AppProviders({ children }) {
    return (
        <LanguageProvider>
            <UserProvider>
                <AdProvider>
                    <SearchProvider>
                        <SortProvider>
                            <BrandProvider>
                                <ModalProvider>
                                    <SiteSettingProvider>
                                        <OrderProvider>
                                            {children}
                                        </OrderProvider>
                                    </SiteSettingProvider>
                                </ModalProvider>
                            </BrandProvider>
                        </SortProvider>
                    </SearchProvider>
                </AdProvider>
            </UserProvider>
        </LanguageProvider>
    )
}