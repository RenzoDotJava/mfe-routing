import React, { useEffect } from "react";
import { matchRoutes, useLocation, useNavigate } from "react-router-dom";
import { routes } from "../routing/routes";

interface NavigationManagerProps {
  children: React.ReactElement;
}

export function NavigationManager({ children }: NavigationManagerProps) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    function containerNavigationHandler(event: Event) {
      const pathname = (event as CustomEvent<string>).detail;

      if (location.pathname === pathname || !matchRoutes(routes, { pathname })) {
        return;
      }
      navigate(pathname);
    }

    window.addEventListener("[container] navigated", containerNavigationHandler);

    return () => {
      window.removeEventListener("[container] navigated", containerNavigationHandler);
    };
  }, [location]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("[crm] navigated", { detail: location.pathname })
    );
  }, [location]);

  return children;
}