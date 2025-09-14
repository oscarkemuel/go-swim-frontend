export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen text-gray-800 bg-[#F3F6FD]">
      <main className="h-">
        {children}
      </main>
    </div>
  );
}
