import {useState} from "react";

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false);

    const fetching = async (...args) => {
        try {
            setIsLoading(true)
            await callback(...args)
        } finally {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading]
}