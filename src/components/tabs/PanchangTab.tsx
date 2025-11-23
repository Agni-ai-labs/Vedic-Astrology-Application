import { useState, useEffect } from 'react'
import { Calendar, Sun, Moon, Clock, AlertCircle, CheckCircle } from 'lucide-react'
import { calculatePanchang, getDailyMuhurats, getChoghadiyas } from '@/services/calculations/panchangCalculations'
import { PanchangData, MuhuratTiming, Choghadiya, Festival } from '@/types/panchang.types'
import festivalsData from '@/data/festivals.json'

export function PanchangTab() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [panchang, setPanchang] = useState<PanchangData | null>(null)
    const [muhurats, setMuhurats] = useState<MuhuratTiming[]>([])
    const [choghadiyas, setChoghadiyas] = useState<Choghadiya[]>([])

    useEffect(() => {
        // Default location: New Delhi
        const location = { lat: 28.6139, lng: 77.2090 }
        setPanchang(calculatePanchang(currentDate, location))
        setMuhurats(getDailyMuhurats(currentDate))
        setChoghadiyas(getChoghadiyas(currentDate))
    }, [currentDate])

    if (!panchang) return null

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2 flex items-center gap-3">
                    <Sun className="w-8 h-8 text-status-warning" />
                    Lala Ramswaroop Panchang
                </h1>
                <p className="text-text-secondary">
                    Daily Vedic Calendar, Muhurats, and Auspicious Timings
                </p>
            </div>

            {/* Date Navigation */}
            <div className="flex items-center justify-between bg-bg-secondary p-4 rounded-lg border border-border-primary">
                <button
                    onClick={() => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 1)))}
                    className="text-text-tertiary hover:text-text-primary"
                >
                    ← Previous Day
                </button>
                <div className="flex items-center gap-2 font-semibold text-text-primary">
                    <Calendar className="w-5 h-5 text-status-warning" />
                    {currentDate.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <button
                    onClick={() => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 1)))}
                    className="text-text-tertiary hover:text-text-primary"
                >
                    Next Day →
                </button>
            </div>

            {/* Main Panchang Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Daily Overview */}
                <div className="bg-bg-secondary border border-border-primary rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                        <Moon className="w-5 h-5 text-accent-blue" />
                        Daily Overview
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <InfoItem label="Tithi" value={panchang.tithi.name} sub={panchang.tithi.endTime} />
                            <InfoItem label="Nakshatra" value={panchang.nakshatra.name} sub={panchang.nakshatra.endTime} />
                            <InfoItem label="Yoga" value={panchang.yoga.name} sub={panchang.yoga.endTime} />
                            <InfoItem label="Karana" value={panchang.karana.name} sub={panchang.karana.endTime} />
                        </div>
                        <div className="border-t border-border-secondary pt-4 mt-4 grid grid-cols-2 gap-4">
                            <InfoItem label="Paksha" value={panchang.paksha} />
                            <InfoItem label="Ritu" value={panchang.ritu} />
                            <InfoItem label="Vikram Samvat" value={panchang.vikramSamvat.toString()} />
                            <InfoItem label="Shaka Samvat" value={panchang.shakaSamvat.toString()} />
                        </div>
                    </div>
                </div>

                {/* Sun & Moon Details */}
                <div className="bg-bg-secondary border border-border-primary rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                        <Sun className="w-5 h-5 text-status-warning" />
                        Sun & Moon
                    </h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-status-warning">
                                <Sun className="w-4 h-4" />
                                <span className="font-medium">Sun</span>
                            </div>
                            <div className="pl-6 space-y-1">
                                <p className="text-sm text-text-secondary">Rise: {panchang.sunrise}</p>
                                <p className="text-sm text-text-secondary">Set: {panchang.sunset}</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-accent-blue">
                                <Moon className="w-4 h-4" />
                                <span className="font-medium">Moon</span>
                            </div>
                            <div className="pl-6 space-y-1">
                                <p className="text-sm text-text-secondary">Rise: {panchang.moonrise}</p>
                                <p className="text-sm text-text-secondary">Set: {panchang.moonset}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Muhurat & Choghadiya Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Muhurat Table */}
                <div className="bg-bg-secondary border border-border-primary rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-accent-purple" />
                        Auspicious Timings (Muhurat)
                    </h3>
                    <div className="space-y-3">
                        {muhurats.map((muhurat, idx) => (
                            <div
                                key={idx}
                                className={`p-3 rounded-lg border flex justify-between items-center ${muhurat.isAuspicious
                                    ? 'bg-status-success/10 border-status-success/30'
                                    : 'bg-status-error/10 border-status-error/30'}`}
                            >
                                <div>
                                    <div className="font-medium text-text-primary flex items-center gap-2">
                                        {muhurat.name}
                                        {muhurat.isAuspicious
                                            ? <CheckCircle className="w-3 h-3 text-status-success" />
                                            : <AlertCircle className="w-3 h-3 text-status-error" />
                                        }
                                    </div>
                                    <div className="text-xs text-text-tertiary">{muhurat.description}</div>
                                </div>
                                <div className="text-sm font-bold text-text-primary">
                                    {muhurat.startTime} - {muhurat.endTime}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Choghadiya Table */}
                <div className="bg-bg-secondary border border-border-primary rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                        <Sun className="w-5 h-5 text-status-warning" />
                        Day Choghadiya
                    </h3>
                    <div className="space-y-2">
                        {choghadiyas.map((choghadiya, idx) => (
                            <div
                                key={idx}
                                className={`flex items-center justify-between p-2 rounded ${choghadiya.isGood
                                    ? 'bg-status-success/5'
                                    : 'bg-status-error/5'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${choghadiya.isGood
                                        ? 'bg-status-success/20 text-status-success'
                                        : 'bg-status-error/20 text-status-error'}`}>
                                        {choghadiya.name}
                                    </span>
                                    <span className="text-sm text-text-secondary">
                                        {choghadiya.startTime} - {choghadiya.endTime}
                                    </span>
                                </div>
                                <span className="text-xs text-text-tertiary">
                                    Ruler: {choghadiya.ruler}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Upcoming Festivals */}
            <div className="bg-bg-secondary border border-border-primary rounded-lg p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Upcoming Festivals</h3>
                <div className="space-y-4">
                    {(festivalsData as Festival[]).map((festival) => (
                        <div key={festival.id} className="flex items-start gap-4 p-4 bg-bg-tertiary rounded-lg">
                            <div className="bg-status-warning/20 text-status-warning px-3 py-1 rounded text-center min-w-[80px]">
                                <div className="text-sm font-bold">{new Date(festival.date).getDate()}</div>
                                <div className="text-xs uppercase">{new Date(festival.date).toLocaleString('default', { month: 'short' })}</div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-text-primary">{festival.name}</h4>
                                <p className="text-sm text-text-secondary mb-1">{festival.description}</p>
                                <p className="text-xs text-text-tertiary italic">{festival.significance}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function InfoItem({ label, value, sub }: { label: string; value: string; sub?: string }) {
    return (
        <div>
            <p className="text-xs text-text-tertiary uppercase tracking-wider">{label}</p>
            <p className="font-medium text-text-primary">{value}</p>
            {sub && <p className="text-xs text-text-secondary">Ends at {sub}</p>}
        </div>
    )
}
