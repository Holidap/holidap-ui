import SharedLayout from "../SharedLayout";

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return <SharedLayout>{children}</SharedLayout>;
}

export default MainLayout;
