const WebpackSftpClient = require('webpack-ftp-upload-plugin');
const atob = require('atob');

module.exports = function (PATHS, folder) {
  var ftp_project_dir = process.env.PROJECT_NAME+'/';
  var relPath = PATHS.relDist.replace(/\\/g, '/');

  if ( parseInt( process.env.EXCLUDE_WPAPP ) ) {
    relPath = relPath.replace(`wp-app${PATHS.sep}`, '');
  }

  var ftp_options = {
    host: process.env.FTP_HOST,
    port: process.env.FTP_PORT,
    username: process.env.FTP_USER,
    password: process.env.FTP_PASS,
    local: PATHS.dist + folder,
    path: process.env.FTP_PATH + ftp_project_dir + relPath + folder,
  };

  console.log(ftp_options);

  return {
    plugins: [
      new WebpackSftpClient(ftp_options),
    ]
  }
};
