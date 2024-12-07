import React from "react";

const withAuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  
  return (
    <div suppressHydrationWarning>
        {children}
    </div>
  );
};

export default withAuthLayout;
