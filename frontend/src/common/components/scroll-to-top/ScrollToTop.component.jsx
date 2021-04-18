import React, { useEffect, useState } from "react";
import { DigitFAB, DigitLayout } from "@cthit/react-digit-components";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // Top: 0 takes us all the way back to the top of the page
    // Behavior: smooth keeps it smooth!
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        // Button is displayed after scrolling for 500 pixels
        const toggleVisibility = () => {
            if (window.pageYOffset > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <div className="scroll-to-top">
            {isVisible && (
                <DigitLayout.DownRightPosition>
                    <DigitFAB onClick={scrollToTop} icon={ArrowUpwardIcon} />
                </DigitLayout.DownRightPosition>
            )}
        </div>
    );
}
