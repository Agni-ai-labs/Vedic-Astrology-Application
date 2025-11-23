import { LalKitabChart } from '@/types/lalkitab.types'

interface LalKitabChartProps {
    chart: LalKitabChart
}

export function LalKitabChartVisualization({ chart }: LalKitabChartProps) {
    // Helper to get planets in a house
    const getPlanetsInHouse = (houseNum: number) => {
        const house = chart.houses.find(h => h.number === houseNum);
        if (!house || house.planets.length === 0) return null;

        return (
            <div className="flex flex-wrap gap-1 mt-1">
                {house.planets.map((p, idx) => (
                    <span
                        key={idx}
                        className={`text-xs px-1 rounded ${p.status === 'Benefic'
                                ? 'bg-status-success/20 text-status-success'
                                : 'bg-status-error/20 text-status-error'
                            }`}
                        title={`${p.planet} (${p.status})`}
                    >
                        {p.planet.substring(0, 2)}
                    </span>
                ))}
            </div>
        );
    };

    const isSleeping = (houseNum: number) => {
        const house = chart.houses.find(h => h.number === houseNum);
        return house?.isSleeping;
    };

    // Common style for grid cells
    const cellStyle = "aspect-square border border-border-secondary p-2 bg-bg-tertiary relative";
    const sleepingStyle = "after:content-[''] after:absolute after:inset-0 after:bg-black/5 after:pointer-events-none";

    return (
        <div className="bg-bg-secondary border border-border-primary rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-text-primary">Lal Kitab Chart</h3>
                <div className="flex gap-4 text-xs">
                    <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-status-success"></span> Benefic
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-status-error"></span> Malefic
                    </div>
                </div>
            </div>

            {/* North Indian style grid adapted for Lal Kitab */}
            <div className="grid grid-cols-4 gap-0 max-w-2xl mx-auto border-2 border-accent-purple">
                {/* Row 1 */}
                <div className={`${cellStyle} ${isSleeping(12) ? sleepingStyle : ''}`}>
                    <div className="text-xs text-text-tertiary mb-1">12</div>
                    {getPlanetsInHouse(12)}
                </div>
                <div className={`${cellStyle} ${isSleeping(1) ? sleepingStyle : ''}`}>
                    <div className="text-xs text-text-tertiary mb-1">1 (Lagna)</div>
                    {getPlanetsInHouse(1)}
                </div>
                <div className={`${cellStyle} ${isSleeping(2) ? sleepingStyle : ''}`}>
                    <div className="text-xs text-text-tertiary mb-1">2</div>
                    {getPlanetsInHouse(2)}
                </div>
                <div className={`${cellStyle} ${isSleeping(3) ? sleepingStyle : ''}`}>
                    <div className="text-xs text-text-tertiary mb-1">3</div>
                    {getPlanetsInHouse(3)}
                </div>

                {/* Row 2 */}
                <div className={`${cellStyle} ${isSleeping(11) ? sleepingStyle : ''}`}>
                    <div className="text-xs text-text-tertiary mb-1">11</div>
                    {getPlanetsInHouse(11)}
                </div>
                <div className="aspect-square border border-border-secondary p-2 bg-bg-elevated col-span-2 row-span-2 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-accent-purple mb-2">LK</div>
                        <div className="text-sm text-text-secondary">Varshphal {chart.varshphal.year}</div>
                    </div>
                </div>
                <div className={`${cellStyle} ${isSleeping(4) ? sleepingStyle : ''}`}>
                    <div className="text-xs text-text-tertiary mb-1">4</div>
                    {getPlanetsInHouse(4)}
                </div>

                {/* Row 3 */}
                <div className={`${cellStyle} ${isSleeping(10) ? sleepingStyle : ''}`}>
                    <div className="text-xs text-text-tertiary mb-1">10</div>
                    {getPlanetsInHouse(10)}
                </div>
                <div className={`${cellStyle} ${isSleeping(5) ? sleepingStyle : ''}`}>
                    <div className="text-xs text-text-tertiary mb-1">5</div>
                    {getPlanetsInHouse(5)}
                </div>

                {/* Row 4 */}
                <div className={`${cellStyle} ${isSleeping(9) ? sleepingStyle : ''}`}>
                    <div className="text-xs text-text-tertiary mb-1">9</div>
                    {getPlanetsInHouse(9)}
                </div>
                <div className={`${cellStyle} ${isSleeping(8) ? sleepingStyle : ''}`}>
                    <div className="text-xs text-text-tertiary mb-1">8</div>
                    {getPlanetsInHouse(8)}
                </div>
                <div className={`${cellStyle} ${isSleeping(7) ? sleepingStyle : ''}`}>
                    <div className="text-xs text-text-tertiary mb-1">7</div>
                    {getPlanetsInHouse(7)}
                </div>
                <div className={`${cellStyle} ${isSleeping(6) ? sleepingStyle : ''}`}>
                    <div className="text-xs text-text-tertiary mb-1">6</div>
                    {getPlanetsInHouse(6)}
                </div>
            </div>
            <p className="text-center text-xs text-text-tertiary mt-4">
                * Shaded boxes indicate "Sleeping Houses" (No planets/aspects)
            </p>
        </div>
    )
}
