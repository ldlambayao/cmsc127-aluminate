import { ReactNode } from "react";

interface StudentRecordsLayoutProps {
  children: ReactNode;
}

export default function StudentRecordsLayout({ children }: StudentRecordsLayoutProps) {
  return <>{children}</>;
}