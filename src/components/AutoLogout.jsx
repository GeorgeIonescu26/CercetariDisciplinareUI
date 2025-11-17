import { useEffect, useRef, useState } from "react";
import "./AutoLogout.css";

export default function AutoLogout({ children, logoutMinutes = 30 }) {
    const timeoutRef = useRef(null);
    const warningRef = useRef(null);
    const [showWarning, setShowWarning] = useState(false);

    const resetTimer = () => {
        setShowWarning(false);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (warningRef.current) clearTimeout(warningRef.current);

        // Warning cu 1 minut înainte
        warningRef.current = setTimeout(() => {
            setShowWarning(true);
        }, (logoutMinutes - 1) * 60 * 1000);

        // Logout efectiv
        timeoutRef.current = setTimeout(() => {
            localStorage.clear();
            window.location.href = "/login";
        }, logoutMinutes * 60 * 1000);
    };

    useEffect(() => {
        const events = ["mousemove", "mousedown", "keypress", "scroll", "touchstart"];
        events.forEach((e) => window.addEventListener(e, resetTimer));

        resetTimer(); // pornește timer-ul

        return () => {
            events.forEach((e) => window.removeEventListener(e, resetTimer));
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (warningRef.current) clearTimeout(warningRef.current);
        };
    }, []);

    return (
        <>
            {showWarning && (
                <div className="auto-logout-warning">
                    <span>Ești inactiv, vei fi delogat în 1 minut!</span>
                </div>
            )}
            {children}
        </>
    );
}
