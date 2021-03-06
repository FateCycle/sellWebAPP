// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    //方法名要和(参数) 空开
    "space-before-function-paren":0,
    //方法名要和{空开
    "space-before-blocks":0,
    //=>要和{空开
    "arrow-spacing":0,
    //for循环的key不能省略
    "vue/require-v-for-key":0,
    //逗号后面要有空格
    "comma-spacing":0,
    //不能有分号
    "Extra semicolon":0,
    //字符串必需单引号
    "Strings must use singlequote": 0
  }
}
