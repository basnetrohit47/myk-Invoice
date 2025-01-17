"use client";

import { useRouter } from "next/navigation";
import { ComponentType, ReactNode, FC, useEffect, useState } from "react";

interface WithAuthProps {
  children?: ReactNode;
}

export const WithAuth = <P extends object>(WrappedComponent: ComponentType<P>): FC<P & WithAuthProps> => {
  const AuthenticatedComponent: FC<P & WithAuthProps> = (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
      // Check localStorage only after component mounts (client-side)
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);

      if (!token) {
        router.push("/login");
      }
    }, [router]);

    // Initial loading state
    if (isAuthenticated === null) {
      return <div>Loading...</div>;
    }

    // Not authenticated
    if (!isAuthenticated) {
      return <div>Redirecting to login...</div>;
    }

    // Authenticated
    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};
