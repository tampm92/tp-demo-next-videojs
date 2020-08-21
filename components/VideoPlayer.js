import React, { createRef, useEffect } from 'react';
import videojs from 'video.js';

const VideoPlayer = (props) => {
  const videoNode = createRef(null);

  const skipSecond = (player, second) => {
    player.currentTime(player.currentTime() + second);
  };
  const addSkipdBtn = (player) => {
    const skipBackwar = player.controlBar.addChild('button');
    const backEl = skipBackwar.el();
    backEl.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="clipboard_v62" documentref="IDI_7xbq6oi" style=" height: 4.5em; width: 4em; "> <defs></defs> <g transform="matrix(1,0,0,1,0,0)" id="content"> <g transform="matrix(1 0 0 1 20.4637 21.1995)" class=""> <path stroke="white" stroke-width="3.450229000484504" d="M 18.976259231567383 2.5876729488372803 L 12.93835735321045 8.625574111938477 L 18.976259231567383 14.663475036621094 " transform="matrix(0.986901 -0.161327 0.161327 0.986901 -28.0094 -19.8442)" class="" fill="none"></path> <path d="M -37.95124816894531 15.522653579711914 C -40.11845397949219 18.40645408630371 -41.40275192260742 21.991607666015625 -41.40275192260742 25.876718521118164 C -41.40275192260742 35.404266357421875 -33.67914581298828 43.12786102294922 -24.151607513427734 43.12786102294922 C -14.624061584472656 43.12786102294922 -6.900459289550781 35.404266357421875 -6.900459289550781 25.876718521118164 C -6.900459289550781 16.34917449951172 -14.624061584472656 8.62557315826416 -24.151607513427734 8.62557315826416 L -27.60183334350586 8.62557315826416 " stroke="white" stroke-width="3.450229000484504" transform="matrix(0.986901 -0.161327 0.161327 0.986901 19.6607 -27.6366)" class="" fill="none"></path> <text font-size="17.135117449101145" font-weight="400" letter-spacing="-0.5140535234730346" fill="#fff" transform="matrix(1 0 0 1 -9 7.5)" class="" height="4" text-anchor="start"><tspan style="white-space: pre;" x="0" dy="0">1</tspan><tspan style="white-space: pre;">0</tspan></text> <path stroke="white" stroke-width="3.450229000484504" d="M 26.739274978637695 2.5876729488372803 L 20.701374053955078 8.50048542022705 L 26.739274978637695 14.663475036621094 " transform="matrix(0.986901 -0.161327 0.161327 0.986901 -28.0094 -19.8442)" class="" fill="none"></path> </g> </g> </svg>';
    skipBackwar.addClass('skip-backward');
    backEl.setAttribute('title', 'Skip Backward');
    backEl.onclick = () => {
      skipSecond(player, -10);
    };
    const controlBarEl = player.controlBar.el();
    controlBarEl.insertBefore(backEl, controlBarEl.firstChild.nextSibling);
    const skipforwar = player.controlBar.addChild('button');
    const forEl = skipforwar.el();
    forEl.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="clipboard_v62" documentref="IDI_15xylr1u" style=" height: 4.5em; width: 4em; "><defs></defs><g transform="matrix(1 0 0 1 20.4637 21.1995)" class=""><path stroke="white" stroke-width="3.4270233425567604" d="M -18.87236213684082 -3.590014934539795 L -15.035825729370117 3.9342041015625 L -22.688581466674805 7.642200946807861 " transform="matrix(0.986901 -0.161327 0.161327 0.986901 28.096 -19.4831)" class="" fill="none"></path><path d="M 31.202484130859375 26.431718826293945 C 32.353084564208984 29.798948287963867 32.4420166015625 33.539520263671875 31.214237213134766 37.153221130371094 C 28.203319549560547 46.015201568603516 18.41401481628418 50.75841522216797 9.349221229553223 47.747501373291016 C 0.28441911935806274 44.73657989501953 -4.623226642608643 35.11171340942383 -1.6123096942901611 26.249731063842773 C 1.3986061811447144 17.387760162353516 11.187910079956055 12.644540786743164 20.25271224975586 15.65545654296875 L 23.535364151000977 16.745805740356445 " stroke="white" stroke-width="3.4270233425567604" transform="matrix(0.986901 -0.161327 0.161327 0.986901 -19.7215 -27.1337)" class="" fill="none"></path><text font-size="17.135117449101145" font-weight="400" letter-spacing="-0.5140535234730346" fill="#fff" transform="matrix(1 0 0 1 -9 7.5)" class="" height="4" text-anchor="start"><tspan style="white-space: pre;" x="0" dy="0">1</tspan><tspan style="white-space: pre;">0</tspan></text><path stroke="white" stroke-width="3.4270233425567604" d="M -26.258333206176758 -6.043300628662109 L -22.38226890563965 1.3645679950714111 L -30.074556350708008 5.188914775848389 " transform="matrix(0.986901 -0.161327 0.161327 0.986901 28.096 -19.4831)" class="" fill="none"></path></g></svg>';
    skipforwar.addClass('skip-forward');
    forEl.setAttribute('title', 'Skip Forward');
    forEl.onclick = () => {
      skipSecond(player, 10);
    };
    controlBarEl.insertBefore(forEl, backEl.nextSibling);
  };
  useEffect(() => {
    /* eslint no-param-reassign: ["error", { "props": false }] */
    const player = videojs(videoNode.current, props, () => {
      addSkipdBtn(player);
    });

    return () => {
      player.dispose();
    };
  }, [videoNode, props]);

  return (
    <div data-vjs-player>
      <video ref={videoNode} className="video-js vjs-fluid vjs-paused">
        <track kind="captions" />
      </video>

    </div>
  );
};

export default VideoPlayer;
