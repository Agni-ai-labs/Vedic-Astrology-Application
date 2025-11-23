import { useState } from 'react';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import type { BirthDetails } from '@/services/calculations/chartCalculations';

interface BirthDetailsFormProps {
    onSubmit: (details: BirthDetails) => void;
}

export function BirthDetailsForm({ onSubmit }: BirthDetailsFormProps) {
    const [name, setName] = useState('John Doe');
    const [date, setDate] = useState('1990-08-15');
    const [time, setTime] = useState('10:30');
    const [city, setCity] = useState('New York');
    const [latitude, setLatitude] = useState(40.7128);
    const [longitude, setLongitude] = useState(-74.0060);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSubmit({
            name,
            date: new Date(date),
            time,
            latitude,
            longitude,
            timezone: 'America/New_York' // Simplified for now
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-bg-secondary p-6 rounded-lg border border-border-primary">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Enter Birth Details</h3>

            <div className="space-y-4">
                {/* Name Input */}
                <div>
                    <label className="flex items-center gap-2 text-sm text-text-secondary mb-2">
                        <User className="w-4 h-4" />
                        Full Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter full name"
                        className="w-full px-3 py-2 bg-bg-tertiary border border-border-secondary rounded text-text-primary focus:border-accent-purple focus:outline-none"
                        required
                    />
                </div>

                {/* Date Input */}
                <div>
                    <label className="flex items-center gap-2 text-sm text-text-secondary mb-2">
                        <Calendar className="w-4 h-4" />
                        Birth Date
                    </label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3 py-2 bg-bg-tertiary border border-border-secondary rounded text-text-primary focus:border-accent-purple focus:outline-none"
                        required
                    />
                </div>

                {/* Time Input */}
                <div>
                    <label className="flex items-center gap-2 text-sm text-text-secondary mb-2">
                        <Clock className="w-4 h-4" />
                        Birth Time
                    </label>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-3 py-2 bg-bg-tertiary border border-border-secondary rounded text-text-primary focus:border-accent-purple focus:outline-none"
                        required
                    />
                </div>

                {/* Location Input */}
                <div>
                    <label className="flex items-center gap-2 text-sm text-text-secondary mb-2">
                        <MapPin className="w-4 h-4" />
                        Birth Location
                    </label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City name"
                        className="w-full px-3 py-2 bg-bg-tertiary border border-border-secondary rounded text-text-primary focus:border-accent-purple focus:outline-none mb-2"
                        required
                    />
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="number"
                            step="0.0001"
                            value={latitude}
                            onChange={(e) => setLatitude(parseFloat(e.target.value))}
                            placeholder="Latitude"
                            className="px-3 py-2 bg-bg-tertiary border border-border-secondary rounded text-text-primary text-sm focus:border-accent-purple focus:outline-none"
                            required
                        />
                        <input
                            type="number"
                            step="0.0001"
                            value={longitude}
                            onChange={(e) => setLongitude(parseFloat(e.target.value))}
                            placeholder="Longitude"
                            className="px-3 py-2 bg-bg-tertiary border border-border-secondary rounded text-text-primary text-sm focus:border-accent-purple focus:outline-none"
                            required
                        />
                    </div>
                    <p className="text-xs text-text-tertiary mt-1">
                        Enter coordinates manually or use a city lookup service
                    </p>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-accent-purple text-white py-2 px-4 rounded hover:bg-accent-purple/80 transition-colors font-medium"
                >
                    Calculate Birth Chart
                </button>
            </div>
        </form>
    );
}
