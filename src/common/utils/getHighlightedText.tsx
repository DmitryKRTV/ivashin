import React from "react";

export const getHighlightedText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return <span> { parts.map((part, i) =>
        <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { background: "rgb(25,118,210, 0.3)" } : {} }>
        { part }
        </span>)
    } </span>;
}