import { useState } from 'react'
import './App.css'
import { WesternTab } from './components/tabs/WesternTab'
import { TarotTab } from './components/tabs/TarotTab'
import { PanchangTab } from './components/tabs/PanchangTab'
import { VedicTab } from './components/tabs/VedicTab'
import { LalKitabTab } from './components/tabs/LalKitabTab'
import { NumerologyTab } from './components/tabs/NumerologyTab'
import { CombinedTab } from './components/tabs/CombinedTab'
import { AstrologyProvider } from './context/AstrologyContext'
import { Sparkles, Calendar, Sun, Star, BookOpen, Hash, Layers } from 'lucide-react'

type TabType = 'vedic' | 'lalkitab' | 'numerology' | 'combined' | 'western' | 'tarot' | 'panchang'

function App() {
    const [activeTab, setActiveTab] = useState<TabType>('vedic')

    return (
        <AstrologyProvider>
            <div className="min-h-screen bg-bg-primary">
                {/* Header */}
                <header className="bg-bg-secondary border-b border-border-primary sticky top-0 z-50">
                    <div className="container mx-auto px-4 py-4">
                        <h1 className="text-2xl font-bold text-text-primary mb-4">
                            Vedic Astrology Application
                        </h1>
                        <p className="text-text-tertiary mt-2">
                            Comprehensive astrology insights using Vedic, Lal Kitab, Numerology, Western, and Tarot
                        </p>

                        {/* Tab Navigation */}
                        <nav className="flex gap-2 mt-4 overflow-x-auto pb-2">
                            <button
                                onClick={() => setActiveTab('vedic')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${activeTab === 'vedic'
                                    ? 'bg-accent-purple text-white'
                                    : 'bg-bg-tertiary text-text-tertiary hover:bg-bg-elevated'
                                    }`}
                            >
                                <Star className="w-4 h-4" />
                                Vedic
                            </button>
                            <button
                                onClick={() => setActiveTab('lalkitab')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${activeTab === 'lalkitab'
                                    ? 'bg-status-error text-white'
                                    : 'bg-bg-tertiary text-text-tertiary hover:bg-bg-elevated'
                                    }`}
                            >
                                <BookOpen className="w-4 h-4" />
                                Lal Kitab
                            </button>
                            <button
                                onClick={() => setActiveTab('numerology')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${activeTab === 'numerology'
                                    ? 'bg-accent-purple text-white'
                                    : 'bg-bg-tertiary text-text-tertiary hover:bg-bg-elevated'
                                    }`}
                            >
                                <Hash className="w-4 h-4" />
                                Numerology
                            </button>
                            <button
                                onClick={() => setActiveTab('combined')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${activeTab === 'combined'
                                    ? 'bg-gradient-to-r from-accent-purple to-accent-blue text-white'
                                    : 'bg-bg-tertiary text-text-tertiary hover:bg-bg-elevated'
                                    }`}
                            >
                                <Layers className="w-4 h-4" />
                                Combined Analysis
                            </button>
                            <button
                                onClick={() => setActiveTab('western')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${activeTab === 'western'
                                    ? 'bg-accent-purple text-white'
                                    : 'bg-bg-tertiary text-text-tertiary hover:bg-bg-elevated'
                                    }`}
                            >
                                <Sun className="w-4 h-4" />
                                Western
                            </button>
                            <button
                                onClick={() => setActiveTab('tarot')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${activeTab === 'tarot'
                                    ? 'bg-accent-purple text-white'
                                    : 'bg-bg-tertiary text-text-tertiary hover:bg-bg-elevated'
                                    }`}
                            >
                                <Sparkles className="w-4 h-4" />
                                Tarot
                            </button>
                            <button
                                onClick={() => setActiveTab('panchang')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${activeTab === 'panchang'
                                    ? 'bg-accent-purple text-white'
                                    : 'bg-bg-tertiary text-text-tertiary hover:bg-bg-elevated'
                                    }`}
                            >
                                <Calendar className="w-4 h-4" />
                                Panchang
                            </button>
                        </nav>
                    </div>
                </header>

                {/* Main Content */}
                <main className="container mx-auto px-4 py-8">
                    {activeTab === 'vedic' && <VedicTab />}
                    {activeTab === 'lalkitab' && <LalKitabTab />}
                    {activeTab === 'numerology' && <NumerologyTab />}
                    {activeTab === 'combined' && <CombinedTab />}
                    {activeTab === 'western' && <WesternTab />}
                    {activeTab === 'tarot' && <TarotTab />}
                    {activeTab === 'panchang' && <PanchangTab />}
                </main>

                {/* Footer */}
                <footer className="bg-bg-secondary border-t border-border-primary mt-16">
                    <div className="container mx-auto px-4 py-6 text-center text-text-tertiary text-sm">
                        Session 5 Complete: Combined Analysis (Holistic Insights) • Next: Testing
                    </div>
                </footer>
            </div>
        </AstrologyProvider>
    )
}

export default App
