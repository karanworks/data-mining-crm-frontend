import {
  Alert,
  Input,
  Label,
  Form,
  FormFeedback,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { useState } from "react";

function AddBankCodeModal({
  centers,
  modal_list,
  tog_list,
  formHandleSubmit,
  validation,
  isEditingBankCode,
  alreadyRegisteredError,
}) {
  const [selectedSingleCenterName, setSelectedSingleCenterName] =
    useState(null);

  const [selectedSingleBankName, setSelectedSingleBankName] = useState(null);

  function handleSelectSingleCenter(centerName) {
    setSelectedSingleCenterName(centerName);
  }

  function handleSelectSingleBank(bankName) {
    setSelectedSingleBankName(bankName);
  }

  let CenterOptions = centers?.map((center) => {
    return { value: center.centerName, label: center.centerName };
  });

  const TemporaryBankNameOptions = [
    { value: "Axis Bank", label: "Axis Bank" },
    { value: "HDFC Bank", label: "HDFC Bank" },
    { value: "ICICI Bank", label: "ICICI Bank" },
    { value: "AU Bank", label: "AU Bank" },
  ];

  // let BankNameOptions = banks?.map((bank) => {
  //   return { value: bank.bankName, label: bank.bankName };
  // });

  return (
    <Modal
      isOpen={modal_list}
      toggle={() => {
        tog_list();
      }}
      centered
    >
      <ModalHeader
        className="bg-light p-3"
        toggle={() => {
          tog_list();
        }}
      >
        {isEditingBankCode ? "Update Bank Code" : "Add Bank Code"}
      </ModalHeader>
      <Form className="tablelist-form" onSubmit={(e) => formHandleSubmit(e)}>
        <ModalBody style={{ paddingTop: "0px" }}>
          {alreadyRegisteredError && (
            <Alert color="danger" style={{ marginBlock: "10px" }}>
              {alreadyRegisteredError}
            </Alert>
          )}

          <div className="mb-2">
            <Label htmlFor="centerName" className="form-label">
              Center Name
            </Label>
            <Select
              id="centerName"
              name="centerName"
              value={selectedSingleCenterName}
              onChange={(centerName) => {
                handleSelectSingleCenter(centerName);
                validation.setFieldValue("centerName", centerName.value);
              }}
              options={CenterOptions}
              placeholder="Select Center Name"
            />
          </div>
          <div className="mb-2">
            <Label htmlFor="bankName" className="form-label">
              Bank Name
            </Label>
            <Select
              id="bankName"
              name="bankName"
              value={selectedSingleBankName}
              onChange={(bankName) => {
                handleSelectSingleBank(bankName);
                validation.setFieldValue("bankName", bankName.value);
              }}
              options={TemporaryBankNameOptions}
              placeholder="Select Bank Name"
            />
          </div>

          <div className="mb-2">
            <Label htmlFor="userNameCode" className="form-label">
              User Name/Code
            </Label>

            <Input
              id="userNameCode"
              name="userNameCode"
              className="form-control"
              placeholder="Enter User Name/Code"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.userNameCode || ""}
              invalid={
                validation.touched.userNameCode &&
                validation.errors.userNameCode
                  ? true
                  : false
              }
            />

            {validation.touched.userNameCode &&
            validation.errors.userNameCode ? (
              <FormFeedback type="invalid">
                {validation.errors.userNameCode}
              </FormFeedback>
            ) : null}
          </div>

          <div className="mb-2">
            <Label htmlFor="password" className="form-label">
              Password
            </Label>

            <Input
              id="password"
              name="password"
              className="form-control"
              placeholder="Enter Password"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.password || ""}
              invalid={
                validation.touched.password && validation.errors.password
                  ? true
                  : false
              }
            />

            {validation.touched.password && validation.errors.password ? (
              <FormFeedback type="invalid">
                {validation.errors.password}
              </FormFeedback>
            ) : null}
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              {isEditingBankCode ? "Update Bank Code" : "Save Bank Code"}
            </button>
          </div>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default AddBankCodeModal;
