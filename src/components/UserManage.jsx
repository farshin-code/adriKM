import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
function UserManage() {
  const navigate = useNavigate();
  const location = useLocation().search;

  useEffect(() => {
    const params = new URLSearchParams(location);
    const mode = params.get("mode");
    const oobCode = params.get("oobCode");
    switch (mode) {
      case "verifyEmail":
        navigate("/verified?oobCode=" + oobCode, { replace: true });
        break;
      case "resetPassword":
        navigate("/update-password?oobCode=" + oobCode, { replace: true });
        break;
      default:
        break;
    }
  });
  return (
    <div className="container-fluid row">
      <div className="col-12 col-lg-4 p-3 mt-2  mx-auto ">
        <p>Redirecting ...</p>
      </div>
    </div>
  );
}

export default UserManage;
