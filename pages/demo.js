import React, { useEffect } from 'react';
import VideoPlayer from '@/components/VideoPlayer';

const Demo = (props) => {
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
    <section className="w-full h-full mx-auto p-10 bg-gray-900">
      <h2 className="text-4xl font-bold text-center text-gray-300 mb-16">
        TP-Demo Next-VideoJs
      </h2>
      <div className="flex">
        <div className="w-full xl:w-2/3 xl:px-3 mb-6 xl:mb-0">
          {/* eslint-disable-next-line */}
          <VideoPlayer {...videoJsOptions} /> 
        </div>
        <div className="w-full xl:w-1/3 xl:px-3">aa</div>
      </div>
    </section>
  );
};

export async function getStaticProps() {
  return {
    props: {
      header: false
    }
  };
}

export default Demo;
