/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Background colors
                'bg-primary': '#000000',
                'bg-secondary': '#0a0a0a',
                'bg-tertiary': '#1a1a1a',
                'bg-elevated': '#2a2a2a',

                // Accent colors
                'accent-blue': '#0070f3',
                'accent-purple': '#7928ca',
                'accent-pink': '#ff0080',

                // Text colors
                'text-primary': '#ffffff',
                'text-secondary': '#e5e5e5',
                'text-tertiary': '#a0a0a0',

                // Border colors
                'border-primary': '#333333',
                'border-secondary': '#404040',

                // Status colors
                'status-success': '#10b981',
                'status-warning': '#f59e0b',
                'status-error': '#ef4444',

                // Zodiac element colors
                'element-fire': '#ef4444',
                'element-earth': '#10b981',
                'element-air': '#3b82f6',
                'element-water': '#8b5cf6',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.2s ease-in',
                'scale-up': 'scaleUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                scaleUp: {
                    '0%': { transform: 'scale(1)' },
                    '100%': { transform: 'scale(1.05)' },
                },
            },
        },
    },
    plugins: [],
}
