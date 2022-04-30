import React, {useState} from 'react';
import axios from 'axios';

const useDataCall = (requestConfig, callBack) => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = async () => {

        setIsLoading(true);
        
        try {

            const response = await axios.get(
                requestConfig.url,
                {
                    method: requestConfig.method ? requestConfig.method : null,
                    headers: requestConfig.headers ? requestConfig.headers : {},
                    body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
                }
            );

            if(response.status !== 200) throw new Error('Request Failed')
            
            callBack(response.data);
            setIsLoading(false);
        }

        catch(err) { setError(err.message || 'Something went wrong') }
    
    };

    return {isLoading, error, sendRequest}
};

export default useDataCall;