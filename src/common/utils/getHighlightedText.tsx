import React from "react";

export const getHighlightedTextFromArray = (text: string, highlights: string[]) => {
    const parts = text.split(new RegExp(`(${highlights.join('|')})`, 'gi'));
    return <span> { parts.map((part, i) =>
        <span key={i}
              style={highlights.some((highlight)=>{return part.toLowerCase() === highlight.toLowerCase()}) ? { background: "rgb(25,118,210, 0.3)" } : {}}>
        { part }
        </span>)
    } </span>;
}