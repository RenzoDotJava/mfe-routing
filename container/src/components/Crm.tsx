import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { mount } from 'crm/CrmApp';

const Crm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const ref = useRef<HTMLDivElement>(null);
  const isFirstRunRef = useRef(true);
  const unmountRef = useRef(() => { });

  useEffect(() => {
    const crmNavigationEventHandler = (event: Event) => {
      const pathname = (event as CustomEvent<string>).detail;
      const newPathname = `/crm${pathname === '/' ? '' : pathname}`;

      if (newPathname === location.pathname) {
        return;
      }
      navigate(newPathname);
    };
    window.addEventListener("[crm] navigated", crmNavigationEventHandler);

    return () => {
      window.removeEventListener(
        "[crm] navigated",
        crmNavigationEventHandler
      );
    };
  }, [location]);

  useEffect(() => {
    if (location.pathname.startsWith('/crm')) {
      window.dispatchEvent(
        new CustomEvent("[container] navigated", {
          detail: location.pathname.replace('/crm', ''),
        })
      );
    }
  }, [location]);

  useEffect(() => {
    if (!isFirstRunRef.current) return;
    unmountRef.current = mount({
      mountPoint: ref.current!,
      initialPathname: location.pathname.replace('/crm', ''),
    });

    isFirstRunRef.current = false;
  }, [location]);

  useEffect(() => unmountRef.current, []);

  return <div id="crm-mfe" ref={ref} />;
}

export default Crm