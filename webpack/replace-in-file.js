const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin();

module.exports = function (appPath) {
  return {
    plugins: [
      new ReplaceInFileWebpackPlugin([{
        dir: appPath,
        files: ['style.css'],
        rules: [{
          search: new RegExp('(Version\:\\s*)[0-9a-z.]*', 'gi'),
          replace: function (str, rep) {
            return rep + gitRevisionPlugin.version()
          },
        }],
      }]),
    ],
  };
};
