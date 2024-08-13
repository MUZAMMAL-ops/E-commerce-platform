import React from 'react'
import App from './App'
import { Total1 } from './components/Totalcontext'
import { Cxi } from './components/cxintent'

const Appwrapper = () => {
  return (
    <>
    <Cxi>
    <Total1>
    <App/>
    </Total1>
    </Cxi>
    </>
)
}

export default Appwrapper