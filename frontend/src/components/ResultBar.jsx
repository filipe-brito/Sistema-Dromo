const ResultBar = ({ columns, data }) => {
    return ( 
        <div>
            <table className="border-collapse border-stone-600 rounded overflow-hidden">
                <thead>
                    <tr>
                    {columns.map((column) => (
                        <th key={column.key} className="px-2 border-2 border-stone-500">{column.label}</th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            {columns.map((column) => (
                                <td key={column.key} className="px-2 border-2 border-stone-500">{item[column.key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultBar;