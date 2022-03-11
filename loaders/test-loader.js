module.exports = function(content, map, meta) {
    return `${content}; console.log('loader exec')`;
  };