/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
    printWidth: 100,
    singleQuote: true,
    overrides: [
        {
            files: '*.html',
            options: {
                parser: 'angular',
            },
        },
    ],
    tailwindStylesheet: './src/styles.css',
    tailwindAttributes: ['className', 'clsx'],
    tailwindFunctions: ['clsx'],
    plugins: ['prettier-plugin-tailwindcss'],
};
