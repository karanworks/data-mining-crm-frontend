import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClients } from "../../slices/AddClient/thunk";
import { getReportData } from "../../slices/Report/thunk";
import { useNavigate } from "react-router-dom";
import InvoiceModal from "./InvoiceModal";
import {
  getInvoiceData,
  createInvoice,
} from "../../helpers/fakebackend_helper";
import Loader from "../../Components/Common/Loader";

const Report = () => {
  const [modal_list, setModal_list] = useState(false);

  const [invoiceData, setInvoiceData] = useState(null);

  const [loading, setLoading] = useState(false);

  const [totalCorrectIncorrectFieldsData, setTotalCorrectIncorrectFieldsData] =
    useState(null);

  const { reportData } = useSelector((state) => state.Report);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function tog_list() {
    setModal_list(!modal_list);
  }

  function handleViewForms(token) {
    navigate("/report/view-form-data", {
      state: { data: token },
    });
  }

  useEffect(() => {
    setLoading(true);
    dispatch(getReportData()).finally(() => setLoading(false));
    dispatch(getClients());
  }, [dispatch]);

  async function handleGetInvoiceData(data) {
    // report id has to be given
    const response = await getInvoiceData(data.token);
    setTotalCorrectIncorrectFieldsData(response.data);
  }

  document.title = "Report";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Report" pageTitle="Reports" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Report</h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="userList">
                    <div className="table-responsive table-card mt-3 mb-1">
                      <table
                        className="table align-middle table-nowrap"
                        id="userTable"
                      >
                        <thead className="table-light">
                          <tr>
                            <th className="sort" data-sort="token_no">
                              Token No
                            </th>
                            <th className="sort" data-sort="client">
                              Client
                            </th>
                            <th className="sort" data-sort="client">
                              Total Users
                            </th>

                            <th className="sort" data-sort="total_forms">
                              Total Forms
                            </th>

                            <th className="sort" data-sort="checked_forms">
                              Checked Forms
                            </th>

                            <th className="sort" data-sort="action">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {loading ? (
                            <tr>
                              <td
                                colSpan={6}
                                style={{
                                  border: "none",
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                }}
                              >
                                <Loader />
                              </td>
                            </tr>
                          ) : (
                            reportData?.map((data, i) => (
                              <tr key={i}>
                                <td className="token_no">{data.token}</td>
                                <td className="client">{data.clientName}</td>
                                <td className="users">{data.totalUsers}</td>
                                <td className="type">{data.totalForms}</td>
                                <td className="type">
                                  {data.checkedFormsCount}
                                </td>

                                <td>
                                  <div className="d-flex gap-2">
                                    <div className="viewUsers">
                                      <button
                                        className="btn btn-sm btn-success edit-item-btn"
                                        data-bs-toggle="modal"
                                        data-bs-target="#showModal"
                                        onClick={() => {
                                          // forms_view_tog_list(data.token);
                                          // setListClient(client);
                                          handleViewForms(data.token);
                                        }}
                                      >
                                        View Forms
                                      </button>
                                    </div>
                                    <div className="edit">
                                      <button
                                        className="btn btn-sm btn-primary edit-item-btn"
                                        data-bs-toggle="modal"
                                        data-bs-target="#showModal"
                                        onClick={() => {
                                          tog_list();
                                          setInvoiceData(data);
                                          handleGetInvoiceData(data);
                                        }}
                                      >
                                        Create Invoice
                                      </button>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                      <div className="noresult" style={{ display: "none" }}>
                        <div className="text-center">
                          <lord-icon
                            src="https://cdn.lordicon.com/msoeawqm.json"
                            trigger="loop"
                            colors="primary:#25a0e2,secondary:#00bd9d"
                            style={{ width: "75px", height: "75px" }}
                          ></lord-icon>
                          <h5 className="mt-2">Sorry! No Result Found</h5>
                          <p className="text-muted mb-0">
                            We've searched more than 150+ Orders We did not find
                            any orders for you search.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-end">
                      <div className="pagination-wrap hstack gap-2">
                        <Link
                          className="page-item pagination-prev disabled"
                          to="#"
                        >
                          Previous
                        </Link>
                        <ul className="pagination listjs-pagination mb-0"></ul>
                        <Link className="page-item pagination-next" to="#">
                          Next
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <ToastContainer />
      </div>
      <InvoiceModal
        modal_list={modal_list}
        tog_list={tog_list}
        invoiceData={invoiceData}
        totalCorrectIncorrectFieldsData={totalCorrectIncorrectFieldsData}
        createInvoice={createInvoice}
      />
    </React.Fragment>
  );
};

export default Report;
