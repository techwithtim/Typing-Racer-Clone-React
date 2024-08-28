import React, { useState, useEffect } from "react";
const apiUrl = import.meta.env.VITE_WS_URL;

const Leaderboard = ({ snippet }) => {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        if (!snippet) return;
        setScores([]);

        let ws = new WebSocket(`wss:///${apiUrl}/Scores/`);
        ws.onmessage = (event) => {
            let newScore = JSON.parse(event.data).value;
            if (newScore.snippetId !== snippet.id) return;
            setScores((prevScores) => {
                const updatedScores = [...prevScores, newScore];
                updatedScores.sort((a, b) => b.cpm - a.cpm);
                return updatedScores;
            });
        };

        return () => ws.close();
    }, [snippet]);

    return (
        <div className="leaderboard-container">
            <h2>Leaderboard</h2>
            <table className="leaderboard-table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Time (s)</th>
                        <th>CPM</th>
                        <th>Region</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map((score, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{score.time}</td>
                            <td>{score.cpm}</td>
                            <td>{score.region}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
