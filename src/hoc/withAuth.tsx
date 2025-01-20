"use client";

import { useRouter } from "next/navigation";
import { ComponentType, FC, useEffect, useState } from "react";

// interface WithAuthProps {
//   children?: ReactNode;
// }

export const WithAuth = <P extends object>(WrappedComponent: ComponentType<P>): FC<P> => {
  const AuthenticatedComponent: FC<P> = (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);

      if (!token) {
        router.push("/login");
      }
    }, [router]);

    if (isAuthenticated === null) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return <div>Redirecting to login...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};
