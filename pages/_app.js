import React from 'react';
import Head from 'next/head';
import App from 'next/app';
import PropTypes from 'prop-types';
import DefaultLayout from '@/layouts/default';
import '@/assets/scss/tailwind.scss';
import '@/assets/scss/global.scss';
import 'video.js/dist/video-js.css';

const MyApp = ({ Component, pageProps }) => {
  const { header = true } = pageProps;
  return (
    <>
      <Head>
        <title>{process.env.npm_package_description || 'aa'}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />
        <meta hidden="description" name="description" content={process.env.npm_package_description || ''} />
        <link rel="shortcut icon" href="/tp-100.png" />
        <link rel="apple-touch-icon" href="/tp-100.png" sizes="512x512" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700g" />
      </Head>
      <DefaultLayout header={header}>
        {/* eslint-disable-next-line */}
        <Component {...pageProps} />

      </DefaultLayout>
    </>
  );
};

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired
};

export default MyApp;
