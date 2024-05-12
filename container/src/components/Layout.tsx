import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav style={{ marginBottom: "3rem" }}>
        <Link to={`/crm/page-1`} style={{ marginRight: "1rem" }}>
          App1 Page1
        </Link>
      </nav>
      <Outlet />
    </>
  );
}

export default Layout;