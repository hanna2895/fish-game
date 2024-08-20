export const DefensePile = ({ totalShellsDefense, totalCoralsDefense, totalTridentsDefense}) => {
    return (
    <div className="defensePile">
        <h2>Defense Pile</h2>
        <div className="shells">Total Shells in Defense: {totalShellsDefense}</div>
        <div className="corals">Total Corals in Defense: {totalCoralsDefense}</div>
        <div className="tridents">Total Tridents in Defense: {totalTridentsDefense}</div>
    </div>
    )
}