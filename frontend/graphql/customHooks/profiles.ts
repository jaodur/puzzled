import { useEffect } from 'react';
import { useQuery } from 'react-apollo-hooks';

import { PROFILES_SEARCH_QUERY } from '../queries/profile';

type ProfilesCallbackInterface = (results: object) => any;

function useQueryProfiles(callback: ProfilesCallbackInterface) {
    const { loading, error, data, refetch } = useQuery(PROFILES_SEARCH_QUERY);

    const results = { profilesData: data, loading, error, profilesRefetch: refetch };

    useEffect(() => {
        if (!results.loading) {
            if (results.error) {
                return;
            }
            callback(results);
        }
    }, [results.loading]);

    return results;
}

export { useQueryProfiles, ProfilesCallbackInterface };
