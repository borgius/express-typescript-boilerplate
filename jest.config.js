module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.spec.json',
            diagnostics: {
                warOnly: true,
                ignoreCodes: [6133]
            }
        }
    },
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "json"
    ],
    setupFilesAfterEnv: ["<rootDir>/test/setup.ts"]
};
