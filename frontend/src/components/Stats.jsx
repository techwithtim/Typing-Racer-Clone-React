import React from "react"

const Stats = ({ cpm, elapsedTime }) => {
    return <div className="stats">
        <h2>Characters Per Minute: {cpm}</h2>
        <h3>Elapsed Time: {elapsedTime.toFixed(3)} seconds</h3>
    </div>
}

export default Stats