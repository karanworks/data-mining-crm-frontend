function FourthLayer({
  designItems,
  grandParentKey,
  tog_delete,
  setListDesignId,
}) {
  return (
    <>
      <div
        className="key-heading d-flex mb-2 pb-2"
        style={{
          gap: "5px",
          borderBottom: "1px solid #8F92A0",
        }}
      >
        <span className="fw-bold">Key - </span>
        <div
          className="bg-secondary d-flex justify-content-center align-items-center rounded-2"
          style={{
            width: "25px",
            height: "25px",
            color: "white",
          }}
        >
          {grandParentKey}
        </div>
      </div>

      {designItems?.number?.map((number) => (
        <div className="single-key-info-container d-flex" key={number.id}>
          {console.log("NUMBER INSIDE FOURTH LAYER ->", number)}
          <div className="d-flex flex-column" style={{ gap: "5px" }}>
            <div className="d-flex align-items-center" style={{ gap: "5px" }}>
              <span>{number.name} -</span>
              <span>{number.number}</span>
              <div
                className="bg-primary-subtle d-flex justify-content-center align-items-center rounded-2"
                style={{
                  width: "25px",
                  height: "25px",
                  border: "1px solid #32A6E4",
                }}
              >
                1
              </div>
            </div>
          </div>
          <div className="d-flex" style={{ gap: "3px", marginLeft: "5px" }}>
            <button
              type="button"
              className="d-flex justify-content-center align-items-center  btn btn-warning waves-effect waves-light"
              style={{
                width: "25px",
                height: "25px",
              }}
            >
              <i className="ri-edit-line"></i>
            </button>
            <button
              type="button"
              className="d-flex justify-content-center align-items-center  btn btn-danger waves-effect waves-light"
              style={{
                width: "25px",
                height: "25px",
              }}
              onClick={() => {
                console.log(
                  "NUMBER ID WHILE DELETING NUMBER IN FOURTH LAYER ->",
                  number.id
                );
                tog_delete();
                setListDesignId(number.id);
              }}
            >
              <i className="ri-delete-bin-2-line"></i>
            </button>
          </div>
        </div>
      ))}

      {/* <div className="single-key-info-container">
          <div
            className="key-heading d-flex mb-2 pb-2"
            style={{
              gap: "5px",
              borderBottom: "1px solid #8F92A0",
            }}
          >
            <span className="fw-bold">Key - </span>
            <div
              className="bg-secondary d-flex justify-content-center align-items-center rounded-2"
              style={{
                width: "25px",
                height: "25px",
                color: "white",
              }}
            >
              2
            </div>
          </div>
          <div className="d-flex flex-column" style={{ gap: "5px" }}>
            <div className="d-flex align-items-center" style={{ gap: "5px" }}>
              <span>Bheem -</span>
              <span>9239823893</span>
              <div
                className="bg-primary-subtle d-flex justify-content-center align-items-center rounded-2"
                style={{
                  width: "25px",
                  height: "25px",
                  border: "1px solid #32A6E4",
                }}
              >
                1
              </div>
            </div>
            <div className="d-flex align-items-center" style={{ gap: "5px" }}>
              <span>Kaliya -</span>
              <span>9239823893</span>
              <div
                className="bg-primary-subtle d-flex justify-content-center align-items-center rounded-2"
                style={{
                  width: "25px",
                  height: "25px",
                  border: "1px solid #32A6E4",
                }}
              >
                2
              </div>
            </div>
          </div>
        </div> */}
    </>
  );
}

export default FourthLayer;