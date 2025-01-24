'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchProviders } from '@/store/slices/providerSlice';

const ProvidersSection = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { providers, loading, error, providersByState } = useSelector(
        (state: RootState) => state.providers
    );

    useEffect(() => {
        // Fetch providers when component mounts
        dispatch(fetchProviders());
    }, [dispatch]);

    useEffect(() => {
        // Log providers data when it changes
        if (providers.length > 0) {
            console.log('All Providers:', providers);
            console.log('Providers by State:', providersByState);
        }
    }, [providers, providersByState]);

    if (loading) {
        return <div>Loading providers...</div>;
    }

    if (error) {
        return <div>Error loading providers: {error}</div>;
    }

    // For now, we'll just return null as we only want to test the API
    return null;
};

export default ProvidersSection; 