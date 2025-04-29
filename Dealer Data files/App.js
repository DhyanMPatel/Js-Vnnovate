import React, { Suspense } from "react"

// ** Router Import
import Router from "./router/Router"
import WebFont from "webfontloader"
import { useEffect } from "react"
import { Toaster } from "react-hot-toast"
import "react-tippy/dist/tippy.css"

const App = () => {
  useEffect(() => {
    WebFont.load({
      custom: {
        families: ["LandRoverMedium"],
      },
    })
  }, [])

  return (
    <Suspense fallback={null}>
      <Toaster position="top-right" reverseOrder={false} />
      <Router />
    </Suspense>
  )
}

export default App
