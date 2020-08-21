import React from 'react';
import PropTypes from 'prop-types';
import Header from '@/layouts/components/Header';
import Github from '@/layouts/components/Github';

const DefaultLayout = ({ children, header }) => (
  <div className="w-full mx-auto">
    <div style={{ backgroundImage: 'url(/header-background.jpg)' }} className="text-white mt-0 border-blue-800 py-0 w-full h-full">
      {header ? <Header /> : null }
      {children}
    </div>
    <Github />
  </div>
);

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.bool
};

DefaultLayout.defaultProps = {
  header: false
};

export default DefaultLayout;
