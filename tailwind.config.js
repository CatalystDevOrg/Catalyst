module.exports = {
    content: ["./src/**/*.{html,js}"],
    darkMode: "class",
    extend: {
        // that is actual animation
        keyframes: theme => ({
            fadeOut: {
                '0%': { backgroundColor: theme('colors.red.300') },
                '100%': { backgroundColor: theme('colors.transparent') },
            },
        }),
    }
}