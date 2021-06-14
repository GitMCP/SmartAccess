module.exports = {
	'env': {
		'es2021': true,
		'node': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
        "plugin:prettier/recommended"
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 12,
		'sourceType': 'module'
	},
	'plugins': [
		'@typescript-eslint',
        "prettier"
	],
	'rules': {
        "prettier/prettier": "error",
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": [
            "error"
        ],
		"no-var-requires": false

	},
    "settings": {
        "import/resolver": {
          "typescript": {}
        }
    },
};
