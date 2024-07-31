import { registerVueComponentLibraryDynamic } from 'plex-core';
import materail from './materail';
import schemas from './schemas';

async function registerElementUIDynamic ({
  libraryName = 'ELEMENT',
  libraryScriptUrl = 'https://unpkg.com/element-ui/lib/index.js',
  libraryStyleUrl = 'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
  register
}) {
  const lib = await registerVueComponentLibraryDynamic({
    libraryName,
    libraryScriptUrl,
    libraryStyleUrl,
    register,
    needWindowVue: true
  });

  window[libraryName].material = materail;

  Object.keys(schemas).forEach(key => {
    window[libraryName][key] && (window[libraryName][key].schemas = schemas[key]);
  });
  return lib;
}

export default registerElementUIDynamic;
