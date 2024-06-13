// InvoicePdf.js
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { toWords } from "../../utils/rupeesNumberToWords";
import { formatNumber } from "../../utils/commaFormattingForAmount";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "center",
  },

  invoiceTitle: {
    fontSize: 20,
    opacity: 0.5,
  },
  paymentTo: {
    fontSize: 12,
  },
  companyName: {
    fontSize: 10,
  },
  invoiceNo: {
    fontSize: 12,
  },
  tableContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    marginTop: 20,
  },
  tableRow: {
    flexDirection: "row",
  },
  amountInWordsTableRow: {
    width: "100%",
    flexDirection: "row",
    // marginLeft: "50px",
  },
  tableColHeader: {
    flex: 1,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    backgroundColor: "#f3f3f3",
    padding: 8,
  },
  descTableColHeader: {
    flex: 2,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    backgroundColor: "#f3f3f3",
    padding: 8,
  },
  tableCol: {
    flex: 1,
    // borderStyle: "solid",
    // borderWidth: 1,
    // borderColor: "#bfbfbf",
    padding: 8,
  },
  amountTableCol: {
    flex: 1,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    padding: 8,
  },
  descTableCol: {
    flex: 2,
    // borderStyle: "solid",
    // borderWidth: 1,
    // borderColor: "#bfbfbf",
    padding: 8,
  },
  rupeesWordsTableCol: {
    // flex: 8,
    width: "auto",
    padding: 8,
  },
  tableCellHeader: {
    fontSize: 12,
    fontWeight: "bold",
  },
  tableCell: {
    fontSize: 11,
  },
  dateRangeContainer: {
    flexDirection: "row",
  },
  dateText: {
    fontSize: 10,
  },
  dateAndTimeMainContianer: {
    marginBottom: "10px",
    marginLeft: "auto",
  },
  dateAndTimeContainer: {
    fontSize: 10,
    flexDirection: "row",
  },

  secondHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  address: {
    marginTop: "2px",
    fontSize: 10,
  },
  company2: {
    marginBottom: "10px",
  },
  companiesContainer: {
    width: "100%",
  },
  companyInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  gstNo: {
    fontSize: 9,
  },

  footer: {
    flexDirection: "column",
    gap: "40px",
    alignSelf: "flex-start",
    marginTop: "40px",
  },

  footerText: {
    fontSize: 12,
  },
});

function getCurrentDateTime() {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = now.getFullYear();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const date = `${day}/${month}/${year}`;
  const time = `${hours}:${minutes}:${seconds}`;

  return { date, time };
}

const dateTime = getCurrentDateTime();

function handlePerUnitGSTPrice(unitPrice) {
  const gstPrice = parseFloat((unitPrice / 100) * 18).toFixed(2);

  return parseFloat(unitPrice - gstPrice).toFixed(2);
}

function handleGSTAmount(unitPrice, correctFields) {
  const gstPrice = parseFloat((unitPrice / 100) * 18).toFixed(2);

  return parseFloat(gstPrice * correctFields).toFixed(2);
}
function handleTotalAmountGST(amountBeforeAddingGst) {
  const gstPrice = parseFloat((amountBeforeAddingGst / 100) * 18).toFixed(2);

  return parseFloat(amountBeforeAddingGst + gstPrice).toFixed(2);
}

const InvoicePdf = ({ invoice }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.invoiceTitle}>Payment Invoice</Text>
        </View>

        <View style={styles.dateAndTimeMainContianer}>
          <View style={styles.dateAndTimeContainer}>
            <Text>Date - </Text>
            <Text>{dateTime.date} </Text>
            <Text> ({dateTime.time})</Text>
          </View>
          <Text style={styles.invoiceNo}>Invoice No - {invoice.id}</Text>
        </View>

        <View style={styles.secondHeader}>
          <View style={styles.companiesContainer}>
            <View style={styles.company2}>
              <View>
                <Text style={styles.paymentTo}>From:</Text>
              </View>

              <View style={styles.companyInfoContainer}>
                <View>
                  <Text style={styles.companyName}>{invoice.client}</Text>
                  <Text style={styles.gstNo}></Text>
                </View>

                <View style={styles.address}>
                  {/* <Text>A-16, 2nd Floor, Sector-63</Text>
                  <Text>Noida, Gautam Budh Nagar</Text>
                  <Text>Uttar Pradesh - 201301</Text> */}
                </View>
              </View>
            </View>

            <View>
              <View>
                <Text style={styles.paymentTo}>To:</Text>
              </View>

              <View style={styles.companyInfoContainer}>
                <View>
                  <Text style={styles.companyName}>
                    Ascent BPO Services Private Limited
                  </Text>
                  <Text style={styles.gstNo}>GSTIN - 09AANCA2415P1Z9</Text>
                </View>

                <View style={styles.address}>
                  <Text>A-16, 2nd Floor, Sector-63</Text>
                  <Text>Noida, Gautam Budh Nagar</Text>
                  <Text>Uttar Pradesh - 201301</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* <Text> {JSON.stringify(invoice)}</Text> */}
        {/* Table */}
        <View style={styles.tableContainer}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>S.No</Text>
              </View>
              <View style={styles.descTableColHeader}>
                <Text style={styles.tableCellHeader}>Description</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Qty</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Unit Price</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Total Amount</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>1</Text>
              </View>
              <View style={styles.descTableCol}>
                <Text style={styles.tableCell}>Data Mining Form Filling</Text>
                <Text style={styles.tableCell}>{invoice.token}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {invoice.correctFields} (Fields)
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {formatNumber(handlePerUnitGSTPrice(invoice.costPerField))}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {formatNumber(
                    parseFloat(
                      invoice.correctFields *
                        handlePerUnitGSTPrice(invoice.costPerField)
                    ).toFixed(2)
                  )}
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>2</Text>
              </View>
              <View style={styles.descTableCol}>
                <Text style={styles.tableCell}>GST 18%</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}></Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}></Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {formatNumber(
                    handleGSTAmount(invoice.costPerField, invoice.correctFields)
                  )}
                </Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}></Text>
              </View>

              <View style={styles.descTableCol}>
                <Text style={styles.tableCell}></Text>
              </View>

              <View style={styles.amountTableCol}>
                <Text style={styles.tableCell}>Total Amount</Text>
              </View>

              <View style={styles.amountTableCol}>
                <Text style={styles.tableCell}>
                  {formatNumber(
                    handleTotalAmountGST(
                      parseFloat(
                        invoice.correctFields * invoice.costPerField
                      ).toFixed(2)
                    )
                  )}
                </Text>
              </View>
            </View>
            <View style={styles.amountInWordsTableRow}>
              <View style={styles.rupeesWordsTableCol}>
                <Text style={styles.tableCell}>Payment Amount In Words</Text>
                <Text style={styles.tableCell}>
                  {toWords.convert(
                    handleTotalAmountGST(
                      parseFloat(
                        invoice.correctFields * invoice.costPerField
                      ).toFixed(2)
                    ),
                    { currency: true }
                  )}
                </Text>
              </View>

              <View style={styles.tableCol}>
                <Text style={styles.tableCell}></Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}></Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}></Text>
              </View>

              <View style={styles.tableCol}>
                <Text style={styles.tableCell}></Text>
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <View>
              <Text style={styles.footerText}>
                {" "}
                For - Ascent BPO Services PVT LTD
              </Text>
            </View>
            <View>
              <Text style={styles.footerText}> (Authorised Signatory)</Text>
            </View>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default InvoicePdf;
