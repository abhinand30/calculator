import React, { useEffect, useState, useRef } from "react";

export default function ScrollTracker() {
    const [scrollY, setScrollY] = useState(0);
    const lastRun = useRef(Date.now());

    useEffect(() => {
        const handleScroll = () => {
            const now = Date.now();

            // Run every 200ms maximum
            if (now - lastRun.current >= 200) {
                setScrollY(window.scrollY);
                lastRun.current = now;
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div style={{ height: "150vh", padding: "2rem" }}>
            <h2>🧭 Scroll Y position (Throttled): {Math.round(scrollY)}</h2>
            <p>Scroll down the page and watch updates every ~200ms</p>
        </div>
    );
}
