import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const PLAYER_KEY = 'videoplayer-current-time';

reload();

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay({ seconds }) {
  localStorage.setItem(PLAYER_KEY, JSON.stringify(seconds));
}

function getSaveTime() {
  return JSON.parse(localStorage.getItem(PLAYER_KEY));
}

function reload() {
  const getTime = getSaveTime() || 0;

  player.setCurrentTime(getTime);
}
