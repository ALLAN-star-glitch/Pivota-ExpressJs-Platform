export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-pivotaLightGray">
      <div className="overflow-y-auto flex-1">{children}</div>
    </div>
  );
}
