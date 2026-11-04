import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Atlas } from './pages/Atlas'
import { Play } from './pages/Play'
import { Report } from './pages/Report'
import { Analytics } from './pages/Analytics'
import { Media } from './pages/Media'
import { Community } from './pages/Community'
import { About } from './pages/About'

function ScrollTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <div className="flex min-h-screen flex-col">
        <Nav />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/atlas" element={<Atlas />} />
            <Route path="/play" element={<Play />} />
            <Route path="/report" element={<Report />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/media" element={<Media />} />
            <Route path="/community" element={<Community />} />
            <Route path="/about" element={<About />} />
            <Route path="/problem" element={<Navigate to="/analytics" replace />} />
            <Route path="/act" element={<Navigate to="/community" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
