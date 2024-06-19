import notAuthorizedGif from "./not-authorized.gif";

function NotAuthorized() {
  return (
    <div className="d-flex flex-column align-items-center">
      <h1>You are not authorized to visit this page</h1>

      <img src={notAuthorizedGif} width="300px" height="180px" />
    </div>
  );
}
export default NotAuthorized;
