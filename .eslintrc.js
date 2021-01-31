module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        "plugin:@typescript-eslint/recommended"
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module"
    },
    env: {
        node: true,
        jest: true,
    },
    rules: {
        "no-shadow": "warn",
        '@typescript-eslint/no-unused-vars': [
        'warn',
        {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            vars: 'all',
            args: 'after-used',
            ignoreRestSiblings: false,
        },
        ],
    }
}