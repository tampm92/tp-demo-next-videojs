import React from 'react';
import Link from 'next/link';

const Index = () => {
  const a = '';
  return (
    <section className="px-8 md:px-10 mt-10 sm:mt-16 flex w-full container mx-auto pb-16">
      <div className="flex w-full text-white">
        <div className="w-full md:w-1/2">
          <h2 className="leading-none font-bold text-3xl xs:text-2xl md:text-5xl uppercase">Next - VideoJS - Tailwindcss</h2>
          <div className="mt-12 mb-4">
            <h3 className="text-2xl md:text-5xl text-blue-400">Features</h3>
            <ul className="text-xl md:text-2xl">
              <li>React</li>
              <li>Next</li>
              <li>PWA</li>
              <li>Tailwindcss</li>
              <li>VideoJS</li>
              <ul className="text-sm md:text-xl ml-2 text-gray-500">
                <li>Custom skin</li>
                <li>Custom control</li>
                <li>Custom hotkeys</li>
              </ul>
            </ul>
          </div>
          <div className="py-4">
            <Link href="/demo">
              <a href="/demo" className="uppercase font-bold px-6 md:px-16 py-2 md:py-4 rounded-full bg-blue-400 border-blue-500 hover:bg-blue-600">
                Lauch demo
              </a>
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 md:justify-center items-center flex">
          <img src="/web-designing.png" alt="" />
        </div>
      </div>
    </section>
  );
};

export default Index;
