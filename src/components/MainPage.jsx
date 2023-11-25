import Image from "react-bootstrap/Image";

function MainPage() {
  return (
    <>
      <div className="container-fluid mt-3">
        <div className=" row">
          <div className="col-12 col-lg-6 mt-2 text-justify p-4 p-lg-5 m-auto  d-flex justify-content-center flex-column enter-from-left ">
            <h4
              className="ps-5 ps-lg-0 "
              style={{ fontWeight: "bold", color: "#442190" }}
            >
              Knowledge Sharing Pipeline!
            </h4>
            <p className="ps-5 ps-lg-0 pt-2">
              Adri-KM is a platform for sharing knowledge.It Grabs Speechs and
              convert it to text then based on that text it will index a context
              and let others to search through it to find the knowledge accross
              a company.
            </p>
          </div>
          <div className="col-12 col-lg-6 p-5 mt-2 m-auto  text-center fade-in">
            <Image
              src="./illustrations/host.svg"
              fluid
              width={"50%"}
              height={"50%"}
            />
          </div>
        </div>
        <div className="row">
          <SecondImage lg={true} />
          <div className="col-12 col-lg-6  text-justify  p-4 p-lg-5  m-auto  d-flex justify-content-center   flex-column  enter-from-right ">
            <h4
              className="ps-5 ps-lg-0 "
              style={{ fontWeight: "bold", color: "#442190" }}
            >
              Pipeline Detail!
            </h4>
            <p className="ps-5 ps-lg-0 pt-2">
              Adri Meet is a platform for meeting people.epsum Lorem ipsum dolor
              sit amet, consectetur adipisicing elit. Provident praesentium,
              suscipit magni unde ad quo eius impedit, quos ratione veritatis
              voluptatem porro. Atque natus nisi quaerat deleniti fugit
              veritatis molestias.Lorem ipsum dolor sit amet, consectetur
              adipisicing elit.Lorem ipsum dolor sit amet, consectetur
              adipisicing elit
            </p>
          </div>
          <SecondImage lg={false} />
        </div>
      </div>
    </>
  );
}

const SecondImage = ({ lg }) => {
  return (
    <div
      className={`${
        lg === true ? "d-none d-lg-block" : "d-block d-lg-none"
      }  col-12 col-lg-6 p-5 mt-2 m-auto text-center fade-in`}
    >
      <Image
        src="./illustrations/guest.svg"
        alt="guest..."
        width={"50%"}
        height={"50%"}
        fluid
      />
    </div>
  );
};
export default MainPage;
