import { useEffect, useState } from "react"

console.log(window.location.hostname);
const API_URL = 'http://localhost:3000/users'

const StudentsTable = () => {
    // Store fetched data
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const [error, setError] = useState<string | null>(null); // error state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }
                const jsonData = await response.json();
                setData(jsonData); // Set data state
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, []); // Runs once when component mounts

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

    return (
        <div>
            <h2>Students</h2>
            <table border={1} cellPadding={10} style={{borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        {data.length > 0 &&
                        Object.keys(data[0]).map((key) => (
                            <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            {Object.values(item).map((value, i) => (
                                <td key={i}>{String(value)}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                <tbody>
                </tbody>
            </table>
        </div>
    );
}

export default function Students () {
    return (
        <div>
            <StudentsTable />
        </div>
    )
}

