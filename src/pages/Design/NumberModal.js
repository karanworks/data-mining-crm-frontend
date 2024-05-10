import {
  Alert,
  Input,
  Label,
  Form,
  FormFeedback,
  Modal,
  ModalBody,
  ModalHeader,
  ButtonGroup,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { changeDepartment } from "../../slices/Design/reducer";
import { useDispatch } from "react-redux";
import userIcon from "./user-icon.png";
import { useState } from "react";

function NumberModal({
  number_modal_list, // modal state
  number_tog_list, // to change modal state
  numberFromHandleSubmit, // submit function for form
  numberValidation, // to get the values from formik
  alreadyExistsError,
  layerId,
  departments,
  departmentNumbers,
  handleAddNumber,
  selectedNumbers,
}) {
  const [selectedSingle, setSelectedSingle] = useState(null);

  const dispatch = useDispatch();

  const departmentOptions = departments?.map((department) => {
    return { value: department, label: department };
  });

  function handleSelectSingle(selectedSingle) {
    console.log("selected single ->", selectedSingle);
    setSelectedSingle(selectedSingle);
  }

  return (
    <Modal
      isOpen={number_modal_list}
      toggle={() => {
        number_tog_list();
      }}
      centered
    >
      <ModalHeader
        className="bg-light p-3"
        toggle={() => {
          number_tog_list();
        }}
      >
        {" "}
        Add Number
      </ModalHeader>
      <Form
        className="tablelist-form"
        onSubmit={(e) => numberFromHandleSubmit(e)}
      >
        <ModalBody style={{ paddingTop: "0px" }}>
          {/* {alreadyExistsError && (
            <Alert color="danger" style={{ marginBlock: "10px" }}>
              {alreadyExistsError}
            </Alert>
          )} */}

          <div className="mb-2">
            <Label htmlFor="choices-single-default" className="form-label ">
              Select Department
            </Label>

            <Select
              value={selectedSingle}
              onChange={(department) => {
                handleSelectSingle(department);
                dispatch(changeDepartment(department.value));
                numberValidation.setFieldValue("department", department.value);
              }}
              onBlur={numberValidation.handleBlur}
              invalid={
                numberValidation.touched.department &&
                numberValidation.errors.department
                  ? true
                  : false
              }
              placeholder="Select Department"
              options={departmentOptions}
            />
            {numberValidation.touched.department &&
            numberValidation.errors.department ? (
              <FormFeedback type="invalid">
                {numberValidation.errors.department}
              </FormFeedback>
            ) : null}
          </div>

          <div className="mb-2">
            <Label className="form-label ">Select Number</Label>
            <div>
              <ButtonGroup>
                <UncontrolledDropdown>
                  <DropdownToggle
                    // tag="button"
                    className="btn text-muted"
                    style={{ background: "white", border: "1px solid #e8e6e6" }}
                  >
                    Select Numbers <i className="mdi mdi-chevron-down"></i>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-sm p-2 mt-1">
                    <div className="form-check custom-checkbox mb-2">
                      <Input
                        type="checkbox"
                        className="form-check-input"
                        id="selectAll"
                        name="selectAll"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="selectAll"
                        style={{ marginLeft: "7px" }}
                      >
                        Select All
                      </label>
                    </div>
                    {departmentNumbers?.map((departmentNumber) => (
                      <div className="mb-2" key={departmentNumber.number}>
                        <div
                          className="form-check custom-checkbox d-flex align-items-center"
                          style={{ gap: "7px" }}
                        >
                          <Input
                            type="checkbox"
                            className="form-check-input"
                            id={departmentNumber.number}
                            name={departmentNumber.number}
                            onChange={() => handleAddNumber(departmentNumber)}
                          />
                          <label
                            className="form-check-label d-flex align-items-center"
                            htmlFor={departmentNumber.number}
                          >
                            <div
                              className="d-flex align-items-center"
                              style={{
                                padding: "0",
                              }}
                            >
                              <img
                                src={userIcon}
                                alt=""
                                className="avatar-xs rounded-3 me-2"
                              />
                              <div>
                                <h5 className="fs-13 mb-0">
                                  {departmentNumber.name}
                                </h5>
                                <p className="fs-12 mb-0 text-muted">
                                  {departmentNumber.number}
                                </p>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                    ))}
                    {/* <div className="mb-2">
                      <div className="form-check custom-checkbox">
                        <Input
                          type="checkbox"
                          className="form-check-input"
                          id="number"
                          name="number"
                          // onChange={() => {}}
                        />
                        <label className="form-check-label" htmlFor="number">
                          Number
                        </label>
                      </div>
                    </div> */}
                  </DropdownMenu>
                </UncontrolledDropdown>
              </ButtonGroup>
            </div>
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              Add Number
            </button>
          </div>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default NumberModal;