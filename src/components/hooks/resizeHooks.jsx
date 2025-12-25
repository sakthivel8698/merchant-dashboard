import { useState, useEffect } from 'react';

const ResizeHook = () => {

    const [rewidth, setRewidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setRewidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [rewidth]);

    return rewidth;
}

export default ResizeHook;