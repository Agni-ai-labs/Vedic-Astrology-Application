
return (
    <AstrologyProvider>
        <div className="min-h-screen bg-bg-primary">
            {/* Header */}
            <header className="bg-bg-secondary border-b border-border-primary sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <h1 className="text-2xl font-bold text-text-primary mb-4">
                        Vedic Astrology Application
                    </h1>

                    {/* Tab Navigation */}
                    <nav className="flex gap-2">
                        <button
                            onClick={() => setActiveTab('western')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'western'
                                ? 'bg-accent-purple text-white'
                                : 'bg-bg-tertiary text-text-tertiary hover:bg-bg-elevated'
                                }`}
                        >
                            <Sun className="w-4 h-4" />
                            Western
                        </button>
                        <button
                            onClick={() => setActiveTab('tarot')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'tarot'
                                ? 'bg-accent-purple text-white'
                                : 'bg-bg-tertiary text-text-tertiary hover:bg-bg-elevated'
                                }`}
                        >
                            <Sparkles className="w-4 h-4" />
                            Tarot
                        </button>
                        <button
                            onClick={() => setActiveTab('panchang')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'panchang'
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
                {activeTab === 'western' && <WesternTab />}
                {activeTab === 'tarot' && <TarotTab />}
                {activeTab === 'panchang' && <PanchangTab />}
            </main>

            {/* Footer */}
            <footer className="bg-bg-secondary border-t border-border-primary mt-16">
                <div className="container mx-auto px-4 py-6 text-center text-text-tertiary text-sm">
                    Vedic Astrology Application - Real Calculations Active
                </div>
            </footer>
        </div>
    </AstrologyProvider>
)
}

export default App
