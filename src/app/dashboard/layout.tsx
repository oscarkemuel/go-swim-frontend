import Sidebar from "@/components/layout/Sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen text-gray-800 bg-[#F3F6FD]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto py-6 px-8 my-4 bg-white rounded-2xl">
        {children}
      </main>
    </div>
  )
}
