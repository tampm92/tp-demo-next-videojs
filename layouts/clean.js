import React from 'react'
import PropTypes from 'prop-types'
import Github from '@/layouts/components/Github'

const DefaultLayout = ({ children, header }) => (
  <div className="w-full mx-auto">
    <div style={{ backgroundImage: 'url(/header-background.jpg)' }} className="text-white mt-0 border-blue-800 py-0 w-full min-h-screen">
      {children}
    </div>
    <Github />
  </div>
);

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default DefaultLayout
