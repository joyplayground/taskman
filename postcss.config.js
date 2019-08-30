const browsers = ['chrome 76'];
module.exports = {
  plugins: [
    require('stylelint')({
      extends: 'stylelint-config-recommended',
      rules: {}
    }),
    require('postcss-cssnext')({
      browsers: browsers
    }),
    require('doiuse')({
      browsers: browsers
    }),
    require('postcss-normalize')({
      browsers: browsers
    })
  ]
};
