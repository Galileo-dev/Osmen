var ffmpeg = require('fluent-ffmpeg');  
const path = require('path');
const { dialog } = require('electron');




// convert the selected video to audio(.acc)
function convertToAudio(full_path){
  console.log(full_path);

  var command = ffmpeg(full_path);
  command.outputOptions([
    '-vn',
    '-acodec copy',
  ]).save('../electron/Audio/output-audio.aac'); //save to audio folder (Will be purged later)
}

module.exports = { convertToAudio }