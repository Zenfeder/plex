import { registerVueComponentLibraryDynamic } from 'plex-core';
import material from './material';
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

  lib.material = { ...material };
  lib.schemas = { ...schemas };
  return lib;
}

export default registerElementUIDynamic;
