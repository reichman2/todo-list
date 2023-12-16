import React, { useEffect, useState } from 'react';


/**
 * Retrieve a value from local storage and update it when it changes
 * @param key the key of the value to retrieve in local storage
 */
export function useLocalStorage<T>(key: string) {
    const [ value, setValue ] = useState<T | null>(null);

    useEffect(() => {
        const storedValue = localStorage.getItem(key);
        setValue((storedValue)? JSON.parse(storedValue) : null);
    }, [key]);


    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [ value, setValue ] as const;
}