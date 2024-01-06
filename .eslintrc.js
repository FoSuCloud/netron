module.exports = {
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    parserOptions: {
        sourceType: "module",
    },
    extends: [
        "eslint:recommended",
    ],
    rules: {
        "array-callback-return": "error",
        "brace-style": "error",
        "curly": "error",
        "consistent-return": "error",
        "default-case": "error",
        "default-case-last": "error",
        "indent": [
            "error",
            4,
            {
                "SwitchCase": 1
            }
        ],
        "keyword-spacing": "error",
        "linebreak-style": "off",
        "no-array-constructor": "error",
        "no-await-in-loop": "error",
        "no-console": "off",
        "no-constructor-return": "error",
        "no-duplicate-imports": "error",
        "no-else-return": "error",
        "no-extra-semi": "error",
        "no-invalid-this": "error",
        "no-iterator": "error",
        "no-labels": "error",
        "no-lone-blocks": "error",
        "no-lonely-if": "error",
        "no-promise-executor-return": "error",
        "no-proto": "error",
        "no-self-compare": "error",
        "no-sequences": "error",
        "no-template-curly-in-string": "error",
        "no-trailing-spaces": "error",
        "no-unmodified-loop-condition": "error",
        "no-unreachable-loop": "error",
        "no-unused-private-class-members": "error",
        "no-use-before-define": "error",
        "object-curly-spacing": [
            "error",
            "always"
        ],
        "prefer-const": [
            "error",
            {
                "destructuring": "all"
            }
        ],
        "require-atomic-updates": "error",
        "semi": [
            "error",
            "always"
        ],
        "space-before-blocks": "error",
        "space-in-parens": "error"
    },
    "globals": {
        "flatbuffers": "readonly",
        "protobuf": "readonly"
    }
};
