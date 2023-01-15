import React from 'react'

import { CSidebar, CSidebarNav } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  return (
    <CSidebar position="fixed">
      <CSidebarNav>
        <img src="../homelogo.png" className="mt-2 mb-3 ml-auto mr-auto" width="70%" />
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
