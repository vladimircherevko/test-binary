var fs = require("fs");
var path = require("path");

function DiskStorage(opts) {
  this.getFilename = opts.filename;
  this.getDestination = opts.destination;
  this.getSharp = opts.sharp;
}

DiskStorage.prototype._handleFile = function _handleFile(req, file, cb) {
  var that = this;

  that.getDestination(req, file, function(err, destination) {
    if (err) return cb(err);

    that.getFilename(req, file, function(err, filename) {
      if (err) return cb(err);

      that.getSharp(req, file, function(err, resizer) {
        if (err) return cb(err);

        var finalPath = path.join(destination, filename);
        var outStream = fs.createWriteStream(finalPath);

        file.stream.pipe(resizer).pipe(outStream);
        outStream.on("error", cb);
        outStream.on("finish", function() {
          cb(null, {
            destination: destination,
            filename: filename,
            path: finalPath,
            size: outStream.bytesWritten
          });
        });
      });
    });
  });
};

DiskStorage.prototype._removeFile = function _removeFile(req, file, cb) {
  var path = file.path;

  delete file.destination;
  delete file.filename;
  delete file.path;

  fs.unlink(path, cb);
};

module.exports = function(opts) {
  return new DiskStorage(opts);
};
