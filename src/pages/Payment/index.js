import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Input,
  Button,
  Form,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  ButtonGroup,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Flatpickr from "react-flatpickr";
import { getClients, getClientUsers } from "../../slices/AddClient/thunk";
import { getReportData } from "../../slices/Report/thunk";
import { useNavigate } from "react-router-dom";
import { searchCompletedData } from "../../slices/CompletedData/reducer";
import { searchData } from "../../slices/CountReport/reducer";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  getCompletedWorkData,
  filterCompletedWorkData,
} from "../../slices/CompletedData/thunk";
import {
  getCountReportData,
  filterReportData,
} from "../../slices/CountReport/thunk";
import Select from "react-select";
import { getPayments } from "../../helpers/fakebackend_helper";
import InvoicePdf from "./InvoicePdf";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import { formatNumber } from "../../utils/commaFormattingForAmount";
import Loader from "../../Components/Common/Loader";

const Payment = () => {
  const [paymentInvoices, setPaymentInvoices] = useState(null);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const handleViewInvoice = async (invoice) => {
    const blob = await pdf(<InvoicePdf invoice={invoice} />).toBlob();
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  useEffect(() => {
    setLoading(true);
    async function handlePayment() {
      const response = await getPayments();

      setPaymentInvoices(response.data.paymentInvoices);
      setLoading(false);
    }

    handlePayment();
  }, []);

  useEffect(() => {
    setLoading(true);
    dispatch(getReportData());
    dispatch(getCompletedWorkData());
    dispatch(getClients());
    dispatch(getCountReportData());
  }, [dispatch]);

  document.title = "Payment";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Payment" pageTitle="Management" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Payment</h4>
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
                            <th className="sort" data-sort="client">
                              Client
                            </th>
                            <th className="sort" data-sort="token">
                              Token
                            </th>
                            <th className="sort" data-sort="users">
                              Users
                            </th>
                            <th className="sort" data-sort="date-range">
                              Date Range
                            </th>

                            <th className="sort" data-sort="amount">
                              Amount
                            </th>

                            <th className="sort" data-sort="action">
                              Actions
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
                            paymentInvoices?.map((invoice) => (
                              <tr key={invoice.id}>
                                <td className="client">{invoice.client}</td>
                                <td className="assigned-data">
                                  {invoice.token}
                                </td>
                                <td className="working-users">
                                  {invoice.noOfUsers}
                                </td>

                                <td className="completed-data">
                                  <div>
                                    <span className="badge border border-primary text-primary fs-12">
                                      {invoice.startDate}
                                    </span>
                                    <span> - </span>
                                    <span className="badge border border-primary text-primary fs-12">
                                      {invoice.endDate}
                                    </span>
                                  </div>
                                </td>
                                <td className="for-checking">
                                  ₹{formatNumber(invoice.totalAmount)}
                                </td>
                                <td className="verified-data">
                                  <button
                                    className="btn btn-sm btn-success"
                                    onClick={() => handleViewInvoice(invoice)}
                                  >
                                    View Invoice
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
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
    </React.Fragment>
  );
};

export default Payment;
