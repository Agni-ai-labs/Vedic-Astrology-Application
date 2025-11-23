import { D1Chart } from '@/types/vedic.types'

interface D1ChartProps {
    chart: D1Chart
}

export function D1ChartVisualization({ chart }: D1ChartProps) {
    // North Indian style chart layout
    const houses = chart.houses;

    // Get planets in each house
    const getPlanetsInHouse = (houseNum: number) => {
        return chart.planets
            .filter(p => p.house === houseNum)
            .map(p => p.planet + (p.isRetrograde ? ' (R)' : ''))
            .join(', ');
    };

    return (
        <div className="bg-bg-secondary border border-border-primary rounded-lg p-6">
            <h3 className="text-xl font-bold text-text-primary mb-4">D1 Chart (Rashi)</h3>

            {/* North Indian style grid */}
            <div className="grid grid-cols-4 gap-0 max-w-2xl mx-auto border-2 border-accent-purple">
                {/* Row 1 */}
                <div className="aspect-square border border-border-secondary p-2 bg-bg-tertiary">
                    <div className="text-xs text-text-tertiary mb-1">12</div>
                    <div className="text-sm text-text-primary font-semibold">{houses[11].sign}</div>
                    <div className="text-xs text-accent-purple mt-1">{getPlanetsInHouse(12)}</div>
                </div>
                <div className="aspect-square border border-border-secondary p-2 bg-bg-tertiary">
                    <div className="text-xs text-text-tertiary mb-1">1 (ASC)</div>
                    <div className="text-sm text-text-primary font-semibold">{houses[0].sign}</div>
                    <div className="text-xs text-accent-purple mt-1">{getPlanetsInHouse(1)}</div>
                </div>
                <div className="aspect-square border border-border-secondary p-2 bg-bg-tertiary">
                    <div className="text-xs text-text-tertiary mb-1">2</div>
                    <div className="text-sm text-text-primary font-semibold">{houses[1].sign}</div>
                    <div className="text-xs text-accent-purple mt-1">{getPlanetsInHouse(2)}</div>
                </div>
                <div className="aspect-square border border-border-secondary p-2 bg-bg-tertiary">
                    <div className="text-xs text-text-tertiary mb-1">3</div>
                    <div className="text-sm text-text-primary font-semibold">{houses[2].sign}</div>
                    <div className="text-xs text-accent-purple mt-1">{getPlanetsInHouse(3)}</div>
                </div>

                {/* Row 2 */}
                <div className="aspect-square border border-border-secondary p-2 bg-bg-tertiary">
                    <div className="text-xs text-text-tertiary mb-1">11</div>
                    <div className="text-sm text-text-primary font-semibold">{houses[10].sign}</div>
                    <div className="text-xs text-accent-purple mt-1">{getPlanetsInHouse(11)}</div>
                </div>
                <div className="aspect-square border border-border-secondary p-2 bg-bg-elevated col-span-2 row-span-2 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-accent-purple mb-2">D1</div>
                        <div className="text-sm text-text-secondary">Rashi Chart</div>
                        <div className="text-xs text-text-tertiary mt-2">Ascendant: {chart.ascendant}</div>
                    </div>
                </div>
                <div className="aspect-square border border-border-secondary p-2 bg-bg-tertiary">
                    <div className="text-xs text-text-tertiary mb-1">4</div>
                    <div className="text-sm text-text-primary font-semibold">{houses[3].sign}</div>
                    <div className="text-xs text-accent-purple mt-1">{getPlanetsInHouse(4)}</div>
                </div>

                {/* Row 3 */}
                <div className="aspect-square border border-border-secondary p-2 bg-bg-tertiary">
                    <div className="text-xs text-text-tertiary mb-1">10</div>
                    <div className="text-sm text-text-primary font-semibold">{houses[9].sign}</div>
                    <div className="text-xs text-accent-purple mt-1">{getPlanetsInHouse(10)}</div>
                </div>
                <div className="aspect-square border border-border-secondary p-2 bg-bg-tertiary">
                    <div className="text-xs text-text-tertiary mb-1">5</div>
                    <div className="text-sm text-text-primary font-semibold">{houses[4].sign}</div>
                    <div className="text-xs text-accent-purple mt-1">{getPlanetsInHouse(5)}</div>
                </div>

                {/* Row 4 */}
                <div className="aspect-square border border-border-secondary p-2 bg-bg-tertiary">
                    <div className="text-xs text-text-tertiary mb-1">9</div>
                    <div className="text-sm text-text-primary font-semibold">{houses[8].sign}</div>
                    <div className="text-xs text-accent-purple mt-1">{getPlanetsInHouse(9)}</div>
                </div>
                <div className="aspect-square border border-border-secondary p-2 bg-bg-tertiary">
                    <div className="text-xs text-text-tertiary mb-1">8</div>
                    <div className="text-sm text-text-primary font-semibold">{houses[7].sign}</div>
                    <div className="text-xs text-accent-purple mt-1">{getPlanetsInHouse(8)}</div>
                </div>
                <div className="aspect-square border border-border-secondary p-2 bg-bg-tertiary">
                    <div className="text-xs text-text-tertiary mb-1">7</div>
                    <div className="text-sm text-text-primary font-semibold">{houses[6].sign}</div>
                    <div className="text-xs text-accent-purple mt-1">{getPlanetsInHouse(7)}</div>
                </div>
                <div className="aspect-square border border-border-secondary p-2 bg-bg-tertiary">
                    <div className="text-xs text-text-tertiary mb-1">6</div>
                    <div className="text-sm text-text-primary font-semibold">{houses[5].sign}</div>
                    <div className="text-xs text-accent-purple mt-1">{getPlanetsInHouse(6)}</div>
                </div>
            </div>
        </div>
    )
}
