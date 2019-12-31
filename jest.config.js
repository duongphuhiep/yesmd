module.exports = {
    preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
    //https://medium.com/@farcaller/vue-storybook-typescript-starting-a-new-project-with-best-practices-in-mind-3fc7b3ceae4e
    setupFiles: ["./tests/jest-setup.js"],

    /*
    https://github.com/vuetifyjs/vuetify/issues/5395#issuecomment-433305071
   */
    transform: {
        "^.+\\.vue$": "vue-jest",
        ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
            "jest-transform-stub",
        "^.+\\.[jt]sx?$": "ts-jest",
    },
    transformIgnorePatterns: ["node_modules/(?!(vuetify)/)"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "^tests/(.*)$": "<rootDir>/tests/$1",
        "^vuetify/lib$": "vuetify",
    },

    //   /*
    //   remove warning ts-jest[config] (WARN) Unable to find the root of the project where ts-jest has been installed.
    //   https://github.com/kulshekhar/ts-jest/issues/823
    //   */
    //   globals: {
    //     "ts-jest": {
    //       packageJson: "package.json",
    //     },
    //   },
};
