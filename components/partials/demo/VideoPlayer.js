import React from 'react'
import videojs from 'video.js'
require("silvermine-videojs-quality-selector")(videojs)

import seasons from "@/data/seasons"

let currentVideo = {
  seasonIndex: 0,
  videoIndex: 0,
  video: null
}
let nextVideo = {
  seasonIndex: 0,
  videoIndex: 1,
  video: null
}

const VideoPlayer = (props) => {
  let videoRef = React.useRef(null);
  let playerRef = React.useRef(null);

  React.useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      setCurrentVideo(0, 0);

      let options = {
        // height: "360",
        fluid: true,
        autoplay: false,
        controls: true,
        preload: "auto",
        controlBar: {
          volumePanel: { inline: false }
        },
        poster: currentVideo.video.poster,
        sources: currentVideo.video.sources,
        tracks: currentVideo.video.tracks,
        userActions: {
          hotkeys: event => {
            const player = playerRef.current;
            switch (event.code) {
              case "Space":
                if (player.paused()) {
                  player.play();
                } else {
                  player.pause();
                }
                break;
              case "ArrowRight":
                if (event.shiftKey) {
                  vjsNextVideo();
                } else {
                  player.currentTime(player.currentTime() + 10);
                }
                break;
              case "ArrowLeft":
                if (event.shiftKey) {
                  vjsPreviousVideo();
                } else {
                  player.currentTime(player.currentTime() - 10);
                }
                break;
              case "ArrowUp":
                player.volume(player.volume() + 0.05);
                break;
              case "ArrowDown":
                player.volume(player.volume() - 0.05);
                break;
              case "KeyM":
                if (player.muted()) {
                  player.muted(false);
                } else {
                  player.muted(true);
                }
                break;
              case "KeyC":
                vjsSubsCapsClicked();
                break;
              case "KeyF":
                if (player.isFullscreen()) {
                  player.exitFullscreen();
                } else {
                  player.requestFullscreen();
                }
                break;
              case "KeyS":
                vjsChaptersClicked();
                break;
  
              default:
                break;
            }
          }
        }
      };

      playerRef.current = videojs(videoElement, options, () => {
        initPlayer()
      });
    } else {
      // you can update player here [update player through props]
      // player.src(options.sources);
    }
  }, [videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  const initPlayer = () => {
    const player = playerRef.current;
    player.ready(function() {
      player.focus()
      console.log("video ready");
    });
    player.on("ended", function() {
      console.log("video ended");
    });
    player.on("play", () => {
      if (
        player.controlBar.chaptersButton
          .el()
          .classList.contains("vjs-hidden")
      ) {
        player.controlBar.chaptersButton.show();
      }
      showSeason(currentVideo.seasonIndex);
      console.log("video play");
    });
    player.on("pause", function() {
      console.log("video pause");
    });
    player.on("error", function() {
      console.log("video error");
    });
    player.on("waiting", function() {
      console.log("video waiting");
    });
    player.on("emptied", function() {
      console.log("video emptied");
    });

    player.controlBar.addChild("QualitySelector");

    addOrUpdateVideoTitle(currentVideo.video.name);
    addSkipButtons();
    addOrUpdateNextButton();
  }
  const setCurrentVideo = (seasonIndex = 0, videoIndex = 0) => {
    currentVideo.seasonIndex = seasonIndex;
    currentVideo.videoIndex = videoIndex;
    currentVideo.video =
      seasons[currentVideo.seasonIndex].videos[
        currentVideo.videoIndex
      ];

    // update next video
    if (
      videoIndex ===
      seasons[currentVideo.seasonIndex].videos.length - 1
    ) {
      if (seasonIndex === seasons.length - 1) {
        nextVideo.seasonIndex = 0;
        nextVideo.videoIndex = 0;
      } else {
        nextVideo.seasonIndex = seasonIndex + 1;
        nextVideo.videoIndex = 0;
      }
    } else {
      nextVideo.seasonIndex = seasonIndex;
      nextVideo.videoIndex = videoIndex + 1;
    }

    nextVideo.video =
      seasons[nextVideo.seasonIndex].videos[nextVideo.videoIndex];
  }
  const playVideo = (seasonIndex = 0, videoIndex = 0) => {
    const player = playerRef.current;
    setCurrentVideo(seasonIndex, videoIndex);
    addOrUpdateVideoTitle(currentVideo.video.name);
    addOrUpdateNextButton();
    player.src(currentVideo.video.sources);
    player.play();
  }
  const addOrUpdateNextButton = () => {
    const player = playerRef.current;
    if (document.querySelector(".next-video-block") !== null) {
      document
        .querySelector(".next-video-block-cover")
        .setAttribute(
          "style",
          "background-image:url(" + nextVideo.video.poster + ")"
        );
      document.querySelector(
        ".next-video-block-name"
      ).innerText = nextVideo.video.name;
      document.querySelector(
        ".next-video-block-description"
      ).innerText = nextVideo.video.description;
    } else {
      var nextButton = player.controlBar.addChild("button");
      nextButton.addClass("next-video");
      nextButton.setAttribute("title", "Next video");

      nextButton.el().innerHTML +=
        '<div class="next-video-block">' +
        '<span class="next-video-block-title">Next video</span>' +
        '<span class="next-video-block-content">' +
        '<span class="next-video-block-cover" style="background-image:url(' +
        nextVideo.video.poster +
        ')"></span>' +
        '<span class="next-video-block-text">' +
        '<span class="next-video-block-name">' +
        nextVideo.video.name +
        "</span>" +
        '<span class="next-video-block-description">' +
        nextVideo.video.description;
      +"</span>" + "</span>" + "</span>" + "</div>";
      nextButton.on("click", () => {
        playVideo(nextVideo.seasonIndex, nextVideo.videoIndex);
      });
    }
  }
  const addOrUpdateVideoTitle = (title) => {
    const player = playerRef.current;
    let videoTitleEl = document.querySelector("#video-title");

    if (!!!videoTitleEl) {
      videoTitleEl = player
        .el()
        .appendChild(document.createElement("span"));
      videoTitleEl.id = "video-title";
    }

    videoTitleEl.textContent = title;
  }
  const addSkipButtons = () => {
    const player = playerRef.current;
    let skipForvardButton = player.controlBar.addChild("button");
    player.controlBar
      .el()
      .insertBefore(
        skipForvardButton.el(),
        player.controlBar.el().firstChild.nextSibling
      );
    skipForvardButton.addClass("skip-forvard");
    skipForvardButton.setAttribute("title", "Skip forvard");
    skipForvardButton.el_.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="clipboard_v62" documentref="IDI_15xylr1u" style=" height: 4.5em; width: 4em; "><defs></defs><g transform="matrix(1 0 0 1 20.4637 21.1995)" class=""><path stroke="white" stroke-width="3.4270233425567604" d="M -18.87236213684082 -3.590014934539795 L -15.035825729370117 3.9342041015625 L -22.688581466674805 7.642200946807861 " transform="matrix(0.986901 -0.161327 0.161327 0.986901 28.096 -19.4831)" class="" fill="none"></path><path d="M 31.202484130859375 26.431718826293945 C 32.353084564208984 29.798948287963867 32.4420166015625 33.539520263671875 31.214237213134766 37.153221130371094 C 28.203319549560547 46.015201568603516 18.41401481628418 50.75841522216797 9.349221229553223 47.747501373291016 C 0.28441911935806274 44.73657989501953 -4.623226642608643 35.11171340942383 -1.6123096942901611 26.249731063842773 C 1.3986061811447144 17.387760162353516 11.187910079956055 12.644540786743164 20.25271224975586 15.65545654296875 L 23.535364151000977 16.745805740356445 " stroke="white" stroke-width="3.4270233425567604" transform="matrix(0.986901 -0.161327 0.161327 0.986901 -19.7215 -27.1337)" class="" fill="none"></path><text font-size="17.135117449101145" font-weight="400" letter-spacing="-0.5140535234730346" fill="#fff" transform="matrix(1 0 0 1 -9 7.5)" class="" height="4" text-anchor="start"><tspan style="white-space: pre;" x="0" dy="0">1</tspan><tspan style="white-space: pre;">0</tspan></text><path stroke="white" stroke-width="3.4270233425567604" d="M -26.258333206176758 -6.043300628662109 L -22.38226890563965 1.3645679950714111 L -30.074556350708008 5.188914775848389 " transform="matrix(0.986901 -0.161327 0.161327 0.986901 28.096 -19.4831)" class="" fill="none"></path></g></svg>';
    skipForvardButton.on("click", () => {
      player.currentTime(player.currentTime() + 10);
    });

    let skipBackwardButton = player.controlBar.addChild("button");
    player.controlBar
      .el()
      .insertBefore(skipBackwardButton.el(), skipForvardButton.el());
    skipBackwardButton.addClass("skip-backward");
    skipBackwardButton.setAttribute("title", "Skip backward");
    skipBackwardButton.el_.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="clipboard_v62" documentref="IDI_7xbq6oi" style=" height: 4.5em; width: 4em; "> <defs></defs> <g transform="matrix(1,0,0,1,0,0)" id="content"> <g transform="matrix(1 0 0 1 20.4637 21.1995)" class=""> <path stroke="white" stroke-width="3.450229000484504" d="M 18.976259231567383 2.5876729488372803 L 12.93835735321045 8.625574111938477 L 18.976259231567383 14.663475036621094 " transform="matrix(0.986901 -0.161327 0.161327 0.986901 -28.0094 -19.8442)" class="" fill="none"></path> <path d="M -37.95124816894531 15.522653579711914 C -40.11845397949219 18.40645408630371 -41.40275192260742 21.991607666015625 -41.40275192260742 25.876718521118164 C -41.40275192260742 35.404266357421875 -33.67914581298828 43.12786102294922 -24.151607513427734 43.12786102294922 C -14.624061584472656 43.12786102294922 -6.900459289550781 35.404266357421875 -6.900459289550781 25.876718521118164 C -6.900459289550781 16.34917449951172 -14.624061584472656 8.62557315826416 -24.151607513427734 8.62557315826416 L -27.60183334350586 8.62557315826416 " stroke="white" stroke-width="3.450229000484504" transform="matrix(0.986901 -0.161327 0.161327 0.986901 19.6607 -27.6366)" class="" fill="none"></path> <text font-size="17.135117449101145" font-weight="400" letter-spacing="-0.5140535234730346" fill="#fff" transform="matrix(1 0 0 1 -9 7.5)" class="" height="4" text-anchor="start"><tspan style="white-space: pre;" x="0" dy="0">1</tspan><tspan style="white-space: pre;">0</tspan></text> <path stroke="white" stroke-width="3.450229000484504" d="M 26.739274978637695 2.5876729488372803 L 20.701374053955078 8.50048542022705 L 26.739274978637695 14.663475036621094 " transform="matrix(0.986901 -0.161327 0.161327 0.986901 -28.0094 -19.8442)" class="" fill="none"></path> </g> </g> </svg>';
    skipBackwardButton.on("click", () => {
      player.currentTime(player.currentTime() - 10);
    });
  }
  const showSeason = (seasonIndex = 0) => {
    const player = playerRef.current;
    let currentSeason = seasons[seasonIndex];
    let listMenu = player.controlBar.chaptersButton.menu.el();
    let listMenuInner =
      '<div class="season-cover"></div> <span class="list-menu-item-title"></span><span class="list-menu-arrow arrow-left disabled"></span><span class="list-menu-arrow arrow-right" ></span><ul class="list-menu-ul">';
    for (var i = 0; i < currentSeason.videos.length; i++) {
      listMenuInner +=
        `<li class="list-menu-item" seasonIndex="${seasonIndex}" videoIndex="${i}">` +
        '<div class="list-menu-cover" style="background-image:url(' +
        currentSeason.videos[i].poster +
        ')"><span class="progress-bar" style="width:' +
        currentSeason.videos[i].progress +
        '"></span> </div>' +
        '<div class="list-menu-title">' +
        currentSeason.videos[i].name +
        "</div>" +
        '<div class="list-menu-description">' +
        currentSeason.videos[i].description +
        "</div>" +
        '<div class="list-menu-time">' +
        currentSeason.videos[i].time +
        "</div>" +
        "</li>";
    }
    listMenuInner += "</ul>";
    listMenu.innerHTML = listMenuInner;
    let listMenuTitle = `<span class="list-menu-close-button""></span><select class="season-select-list" seasonId="${seasonIndex}">`;
    for (var i = 0; i < seasons.length; i++) {
      if (i === seasonIndex) {
        listMenuTitle += `<option value="${i}" selected>Season ${i +
          1}</option>`;
      } else {
        listMenuTitle += `<option value="${i}">Season ${i + 1}</option>`;
      }
    }
    listMenuTitle += "</select>";
    let videoListTitle = document.querySelector(
      ".vjs-chapters-button .list-menu-item-title"
    );
    videoListTitle.innerHTML = listMenuTitle;

    document.querySelector(".list-menu-close-button").onclick = () => {
      vjsChaptersClicked();
    };
    document.querySelector(".arrow-left").onclick = () => {
      vjsScrollSeasonList("left");
    };
    document.querySelector(".arrow-right").onclick = () => {
      vjsScrollSeasonList("right");
    };
    document.querySelector(".list-menu-ul").onscroll = () => {
      vjsListUlScroll();
    };
    let menuItems = document.querySelectorAll(".list-menu-item");
    for (const menuItem of menuItems) {
      menuItem.onclick = el => {
        vjsSelectVideo(el.target.closest(".list-menu-item"));
      };
    }
    document.querySelector(".season-select-list").onchange = () => {
      showSeason(
        Number(document.querySelector(".season-select-list").value)
      );
    };
  }
  const vjsChaptersClicked = () => {
    document.querySelector("button.vjs-chapters-button").click();
  }
  const vjsSubsCapsClicked = () => {
    document.querySelector("button.vjs-subs-caps-button").click();
  }
  const vjsSelectVideo = (el) => {
    playVideo(
      Number(el.attributes.seasonIndex.value),
      Number(el.attributes.videoIndex.value)
    );
  }
  const vjsScrollSeasonList = (direction) => {
    let videoList = document.querySelector(".list-menu-ul");
    let vidWidth = document.querySelector(".list-menu-item").clientWidth;
    let iterations = 24; //like 24frames per sec
    //for animated movement
    for (var i = 0; i < iterations; i++) {
      setTimeout(function() {
        if (direction == "left") {
          videoList.scrollLeft -= vidWidth / iterations;
        } else if (direction == "right") {
          videoList.scrollLeft += vidWidth / iterations;
        } else {
          console.log("Meh..");
        }
      }, (200 / iterations) * i);
    }
  }
  const vjsListUlScroll = () => {
    let videoList = document.querySelector(".list-menu-ul");
    if (videoList.scrollLeft == 0) {
      document
        .querySelector(".list-menu-arrow.arrow-left")
        .classList.add("disabled");
    } else {
      document
        .querySelector(".list-menu-arrow.arrow-left")
        .classList.remove("disabled");
    }
    if (
      videoList.scrollLeft >=
      videoList.scrollWidth - videoList.clientWidth
    ) {
      document
        .querySelector(".list-menu-arrow.arrow-right")
        .classList.add("disabled");
    } else {
      document
        .querySelector(".list-menu-arrow.arrow-right")
        .classList.remove("disabled");
    }
  }
  const vjsNextVideo = () => {
    let seasonIndex = 0;
    let videoIndex = 0;
    if (
      currentVideo.videoIndex >=
      seasons[currentVideo.seasonIndex].videos.length - 1
    ) {
      if (currentVideo.seasonIndex >= seasons.length - 1) {
        seasonIndex = 0;
        videoIndex = 0;
      } else {
        seasonIndex = currentVideo.seasonIndex + 1;
        videoIndex = 0;
      }
    } else {
      seasonIndex = currentVideo.seasonIndex;
      videoIndex = currentVideo.videoIndex + 1;
    }
    playVideo(seasonIndex, videoIndex);
  }
  const vjsPreviousVideo = () => {
    let seasonIndex = 0;
    let videoIndex = 0;
    if (
      currentVideo.videoIndex <= 0
    ) {
      if (currentVideo.seasonIndex <= 0) {
        seasonIndex = 0;
        videoIndex = 0;
      } else {
        seasonIndex = currentVideo.seasonIndex - 1;
        videoIndex = 0;
      }
    } else {
      seasonIndex = currentVideo.seasonIndex;
      videoIndex = currentVideo.videoIndex - 1;
    }
    playVideo(seasonIndex, videoIndex);
  }

  return (
    <video ref={videoRef} className="video-js" tabIndex="1">
      <p className="vjs-no-js">
        To view this video please enable JavaScript, and consider upgrading to a
        web browser that
        <a
          href="http://videojs.com/html5-video-support/"
          target="_blank"
        >supports HTML5 video</a>
      </p>
    </video>
  )
}

export default VideoPlayer
