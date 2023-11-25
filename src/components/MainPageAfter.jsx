import MainLeftPanel from "./MainLeftPanel";
import MainRightPanel from "./MainRightPanel";
function MainPageAfter() {
  return (
    <>
      <div className="container-fluid mt-3">
        <div className=" row">
          <div className="border border-left-0  border-bottom-0 border-top-0  col-12 col-lg-6 mt-2  p-4 p-lg-5 ">
            <h4
              className="ps-5 ps-lg-0 text-center "
              style={{ fontWeight: "bold", color: "#442190" }}
            >
              Host
            </h4>
            <MainLeftPanel />
          </div>
          <MainRightPanel />
        </div>
      </div>
    </>
  );
}

export default MainPageAfter;
