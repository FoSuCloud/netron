module.exports = {
    // 指定你的代码运行的环境，例如浏览器、Node.js等
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    // 解析器选项，可以根据需要进行配置
    parserOptions: {
        ecmaVersion: 2021, // 使用的ECMAScript版本
        sourceType: "module", // 使用的模块系统（"script"或"module"）
    },
    // 扩展已有的配置规则
    extends: [
        "eslint:recommended", // 使用ESLint推荐的规则
        // 添加其他扩展规则，例如"plugin:react/recommended"用于React项目
    ],
    // 自定义规则，可以根据项目需求进行配置
    rules: {
        // 例如，禁止使用console语句
        "no-console": "off",
        // 添加其他自定义规则
    },
};
