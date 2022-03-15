import React, { useEffect } from 'react'

import CleanLayout from '@/layouts/clean'
import VideoPlayer from '@/components/partials/demo/VideoPlayer'

const DemoPage = (props) => {
  const videoJsOptions = {
    preload: true,
    controlBar: {
      volumePanel: {
        inline: false,
        volumeControl: {
          vertical: true
        }
      }
    },
    fluid: true,
    controls: true,
    userActions: { hotkeys: true },
    seeking: true,
    poster: '/posters/elephantsdream.png',
    sources: [{
      src: '/videos/elephantsdream.mp4',
      type: 'video/mp4'
    }]
  };

  return (
    <section className="w-full min-h-screen mx-auto p-10 bg-gray-900">
      <h2 className="text-4xl font-bold text-center text-gray-300 mb-16">
        TP-Demo Next-VideoJs
      </h2>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-2/3 xl:px-3 mb-16 xl:mb-0">
          {/* eslint-disable-next-line */}
          <VideoPlayer {...videoJsOptions} /> 
        </div>
        <div className="w-full xl:w-1/3 xl:px-3">
          <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
            <div className="flex">
              <div>
                <p className="font-bold">Hotkeys</p>
                <p className="text-sm">Space: play/stop</p>
                <p className="text-sm">Arrow Left: skipping - 10s</p>
                <p className="text-sm">Arrow Right: skipping + 10s</p>
                <p className="text-sm">Arrow Up: volume up</p>
                <p className="text-sm">Arrow Down: volume down</p>
                <p className="text-sm">Shift + Arrow Left: previous video</p>
                <p className="text-sm">Shift + Arrow Right: next video</p>
                <p className="text-sm">Key M: on/off volume</p>
                <p className="text-sm">Key C: on/off caption setting</p>
                <p className="text-sm">Key F: on/off fullscreen</p>
                <p className="text-sm">Key S: on/off season setting</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

DemoPage.layout = CleanLayout

export default DemoPage;
