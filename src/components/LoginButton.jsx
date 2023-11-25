import { Button } from "react-bootstrap";
import { useAppContext } from "../contexts/AppContext";
const LoginButton = ({ buttonType, clickHandler }) => {
  const { titleOfNavbarButton } = useAppContext();
  return (
    <Button
      className={
        buttonType === 1
          ? "float-end d-block d-lg-none"
          : "float-end d-none d-lg-block"
      }
      variant="primary"
      onClick={clickHandler}
    >
      {titleOfNavbarButton}
    </Button>
  );
};

export default LoginButton;
