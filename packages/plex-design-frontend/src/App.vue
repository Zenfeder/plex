<template>
  <PlexDesigner
    :materialConfig="materialConfig"
    @onPreview="handlePreview"/>
</template>

<script setup>
// 本地开发自定义组件
import PlexComponent from 'plex-component';
import { material, schemas } from 'plex-component';

const materialConfig = [
  // 本地开发自定义组件
  {
    libraryName: 'plex-component',
    library: PlexComponent,
    material,
    schemas
  }
  // 远程组件
  // {
  //   libraryName: 'ELEMENT',
  //   libraryScriptUrl: 'http://localhost:3000/element-ui@2.15.14/index.js',
  //   libraryStyleUrl: 'http://localhost:3000/element-ui@2.15.14/index.css',
  // }
]

const handlePreview = (data) => {
  console.log('>>> handlePreview: ', data)
}
</script>