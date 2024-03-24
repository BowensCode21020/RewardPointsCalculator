module.exports = function(api) {
    api.cache(true);
  
    const presets = [
      '@babel/preset-env',
      '@babel/preset-react'
    ];
    const plugins = [
      // Add your Babel plugins here
    ];
  
    return {
      presets,
      plugins
    };
  };
  