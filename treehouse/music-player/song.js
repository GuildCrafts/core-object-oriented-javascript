function Song(title, artist, duration) {
  var song = this;
  Media.call(song, title, duration); //could also put "this" here instead of song and skip the line above
  this.artist = artist;
}

Song.prototype = Object.create(Media.prototype);
Song.prototype.constructor = Song;
Song.prototype.toHTML = function() {
  var htmlString = '<li ';
  if(this.isPlaying) {
    htmlString += 'class="current"';
  }
  htmlString += '>';
  htmlString += this.title;
  htmlString += ' - ';
  htmlString += this.artist;
  htmlString += '<span class="duration">';
  htmlString += this.duration;
  htmlString += '</span></li>';
  return htmlString;
};
