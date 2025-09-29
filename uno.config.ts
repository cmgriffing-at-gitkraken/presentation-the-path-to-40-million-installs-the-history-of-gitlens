import { defineConfig } from 'unocss'

export default defineConfig({
    rules: [
        ['m-1', { margin: '1px' }],
    ],
    theme: {
        extend: {
            animation: {
                aurora: 'aurora 8s ease-in-out infinite alternate',
            },
            keyframes: {
                aurora: {
                    '0%': {
                        backgroundPosition: '0% 50%',
                        transform: 'rotate(-5deg) scale(0.9)',
                    },
                    '25%': {
                        backgroundPosition: '50% 100%',
                        transform: 'rotate(5deg) scale(1.1)',
                    },
                    '50%': {
                        backgroundPosition: '100% 50%',
                        transform: 'rotate(-3deg) scale(0.95)',
                    },
                    '75%': {
                        backgroundPosition: '50% 0%',
                        transform: 'rotate(3deg) scale(1.05)',
                    },
                    '100%': {
                        backgroundPosition: '0% 50%',
                        transform: 'rotate(-5deg) scale(0.9)',
                    },
                },
            },
        },
    },
})