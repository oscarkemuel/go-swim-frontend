export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen text-gray-800 bg-[#F3F6FD] p-6">
      <main className="h-full">
        {children}
      </main>
    </div>
  );
}
