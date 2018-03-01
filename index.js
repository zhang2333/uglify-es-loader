var UglifyJS = require("uglify-es");
var loaderUtils = require('loader-utils');
var sourceMap = require('source-map');

function mergeSourceMap(map, inputMap) {
  var inputMapConsumer = new sourceMap.SourceMapConsumer(inputMap);
  var outputMapConsumer = new sourceMap.SourceMapConsumer(map);

  var mergedGenerator = new sourceMap.SourceMapGenerator({
    file: inputMapConsumer.file,
    sourceRoot: inputMapConsumer.sourceRoot
  });

  var source = outputMapConsumer.sources[0];

  inputMapConsumer.eachMapping(function (mapping) {
    var generatedPosition = outputMapConsumer.generatedPositionFor({
      line: mapping.generatedLine,
      column: mapping.generatedColumn,
      source: source
    });
    if (generatedPosition.column != null) {
      mergedGenerator.addMapping({
        source: mapping.source,

        original: mapping.source == null ? null : {
          line: mapping.originalLine,
          column: mapping.originalColumn
        },

        generated: generatedPosition
      });
    }
  });

  var mergedMap = mergedGenerator.toJSON();
  inputMap.mappings = mergedMap.mappings;
  return inputMap
};

module.exports = function(source, inputSourceMap) {
    var callback = this.async();

    if (this.cacheable) {
      this.cacheable();
    }

    var opts = loaderUtils.getOptions(this) || {};
    var _opts = Object.assign(opts, {})
    delete _opts.enableSourceMap

    if (opts.enableSourceMap === true) {
      var result = UglifyJS.minify(source, _opts);
      var sourceMap = JSON.parse(result.code);
  
      if (inputSourceMap) {
        callback(null, result.code, mergeSourceMap(sourceMap, inputSourceMap));
      } else {
        var sourceFilename = loaderUtils.getRemainingRequest(this);
        var current = loaderUtils.getCurrentRequest(this);
        sourceMap.sources = [sourceFilename];
        sourceMap.file = current;
        sourceMap.sourcesContent = [source];
  
        callback(null, result.code, sourceMap);
      }
    } else {
      var result = UglifyJS.minify(source, _opts);
      callback(null, result.code);
    }
};
