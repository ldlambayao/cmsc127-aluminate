export default function AlumniLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Alumni Section Layout */}
      <main>{children}</main>
    </div>
  );
}
