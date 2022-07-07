import { useState, useEffect, useRef } from "react";

export const useDebounce = (callback: VoidFunction, delay: number) => {
    const latestCallback = useRef();
    const [callCount, setCallCount] = useState(0);
    useEffect(() => {
        //@ts-ignore
        latestCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (callCount > 0) {
            const fire = () => {
                setCallCount(0);
                //@ts-ignore
                latestCallback.current();
            };

            const id = setTimeout(fire, delay);
            return () => clearTimeout(id);
        }
    }, [callCount, delay]);

    return () => setCallCount(callCount => callCount + 1);
};