import React from 'react'
import PropTypes from 'prop-types'
import Header from '@/layouts/components/Header'
import Github from '@/layouts/components/Github'

const DefaultLayout = ({ children, header }) => (
  <div className="w-full mx-auto">
    <div style={{ backgroundImage: 'url(/header-background.jpg)' }} className="w-full min-h-screen py-0 mt-0 text-white bg-cover border-blue-800">
      <Header />
      {children}
    </div>
    <Github />
  </div>
);

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default DefaultLayout
