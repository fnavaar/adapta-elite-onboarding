import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0C0C0D] to-[#191919] text-foreground selection:bg-primary/30 selection:text-primary">
      <Outlet />
    </div>
  )
}
