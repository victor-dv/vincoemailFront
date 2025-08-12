import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Layout } from "./components/Layout"
import { Dashboard } from "./pages/Dashboard"
import { Campaigns } from "./pages/Campaigns"
import { Templates } from "./pages/Templates"
import { Settings } from "./pages/Settings"
import { CampaignInputs } from "./pages/CampaignInputs"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="templates" element={<Templates />} />
          <Route path="settings" element={<Settings />} />
          <Route path="campaigns/:campaignId/inputs" element={<CampaignInputs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
