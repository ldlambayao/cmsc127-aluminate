export default function AlumniLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Alumni Navigation/Sidebar */}
      <main>{children}</main>
    </div>
  );
}
