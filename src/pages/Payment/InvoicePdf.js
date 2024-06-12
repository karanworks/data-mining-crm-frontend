// InvoicePdf.js
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import ascentLogo from "./ascent-logo.jpg";

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
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 50,
    marginRight: 10,
  },
  invoiceTitle: {
    fontSize: 24,
    fontWeight: 900,
  },
});

const InvoicePdf = ({ invoice }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <View style={styles.header}>
          <Image style={styles.image} src={ascentLogo} />
          <Text style={styles.invoiceTitle}>Invoice</Text>
        </View>
        <Text>Client: {invoice.client}</Text>
        <Text>Token: {invoice.token}</Text>
        <Text>Users: {invoice.noOfUsers}</Text>
        <Text>Date Range: {invoice.dateRange}</Text>
        <Text>Amount: {invoice.totalAmount}</Text>
      </View>
    </Page>
  </Document>
);

export default InvoicePdf;
