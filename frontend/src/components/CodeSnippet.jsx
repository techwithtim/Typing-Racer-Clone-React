import React from "react"

const CodeSnippet = ({ snippet, userInput }) => {
    const getHighlightedText = () => {
        return snippet.text.split("").map((char, index) => {
            let color;
            if (index < userInput.length) {
                color = char === userInput[index] ? "green" : "red"
            }
            return <span key={index} style={{ color: color }}>
                {char}
            </span>
        })
    }

    return <pre className="code-snippet">{getHighlightedText()}</pre>
}

export default CodeSnippet