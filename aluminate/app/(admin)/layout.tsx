export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Admin Navigation/Sidebar */}
      <main>{children}</main>
    </div>
  );
}
