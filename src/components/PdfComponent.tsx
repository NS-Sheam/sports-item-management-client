import { BlobProvider, Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { Button } from "antd";
import { ISalesData } from "../pages/sale/SalesManagement";

const PdfComponent = ({ saleData }: { saleData: ISalesData }) => {
  const styles = StyleSheet.create({
    page: {
      padding: 40,
      fontFamily: "Helvetica",
      backgroundColor: "#F4F6F9",
    },
    header: {
      fontSize: 28,
      marginBottom: 20,
      textAlign: "center",
      color: "#2E4053",
      fontWeight: "bold",
    },
    subHeader: {
      fontSize: 16,
      marginBottom: 20,
      textAlign: "center",
      color: "#6C757D",
    },
    logo: {
      width: 120,
      height: 60,
      marginBottom: 20,
      alignSelf: "center",
    },
    companyDetails: {
      marginBottom: 30,
      textAlign: "center",
    },
    table: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      marginBottom: 40,
    },
    tableRow: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#D1D8E0",
      padding: 10,
    },
    tableHeader: {
      flexDirection: "row",
      backgroundColor: "#2E4053",
      color: "#FFF",
      fontSize: 14,
      fontWeight: "bold",
      padding: 10,
    },
    tableCellHead: {
      flex: 1,
      textAlign: "center",
      fontSize: 12,
      padding: 8,
      color: "#FFF",
      fontWeight: "bold",
    },
    tableCell: {
      flex: 1,
      textAlign: "center",
      fontSize: 12,
      padding: 8,
      color: "#2E4053",
    },
    rowOdd: {
      backgroundColor: "#F9F9F9",
    },
    footer: {
      position: "absolute",
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      fontSize: 12,
      color: "#888",
    },
    button: {
      backgroundColor: "#2E4053",
      borderColor: "#2E4053",
      marginTop: 20,
      padding: 10,
      fontSize: 16,
      textAlign: "center",
      color: "#FFF",
      borderRadius: 5,
    },
    link: {
      textDecoration: "none",
      color: "#FFF",
    },
    gradientBackground: {
      background: "linear-gradient(135deg, #2E4053, #4A6FA5)",
      padding: 20,
      borderRadius: 10,
      marginBottom: 30,
    },
    invoiceDetails: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    invoiceDetailItem: {
      fontSize: 12,
      color: "#6C757D",
    },
  });

  return (
    <div>
      <h1 style={{ textAlign: "center", color: "#2E4053", marginBottom: 20 }}>Invoice</h1>
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Product</th>
              <th style={styles.tableHeader}>Price</th>
              <th style={styles.tableHeader}>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr style={styles.tableRow}>
              <td style={styles.tableCell}>{saleData.name}</td>
              <td style={styles.tableCell}>{saleData.product}</td>
              <td style={styles.tableCell}>{saleData.price}</td>
              <td style={styles.tableCell}>{new Date(saleData.date).toLocaleDateString()}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <BlobProvider
        document={
          <Document>
            <Page
              size="A4"
              style={styles.page}
            >
              <View style={styles.gradientBackground}>
                <Image
                  style={styles.logo}
                  src="/path/to/logo.png"
                />
                <Text style={{ fontSize: 22, color: "#93278f", fontWeight: "extrabold", marginTop: 10 }}>Sportiz</Text>
                <Text style={{ marginTop: 5, fontSize: 14 }}>Mirpur, Dhaka</Text>
                <Text style={{ marginTop: 5, fontSize: 14 }}>Phone: (123) 456-7890</Text>
                <Text style={{ marginTop: 5, fontSize: 14 }}>Email: info@sportiz.com</Text>
              </View>

              <View style={styles.header}>
                <Text>Invoice</Text>
              </View>

              <View style={styles.invoiceDetails}>
                <Text style={styles.invoiceDetailItem}>Invoice Date: {new Date().toLocaleDateString()}</Text>
                <Text style={styles.invoiceDetailItem}>Invoice Number: INV-{saleData?.key}</Text>
              </View>

              <View style={styles.table}>
                {/* Table Header */}
                <View style={styles.tableHeader}>
                  <Text style={styles.tableCellHead}>Name</Text>
                  <Text style={styles.tableCellHead}>Product</Text>
                  <Text style={styles.tableCellHead}>Price</Text>
                  <Text style={styles.tableCellHead}>Date</Text>
                </View>

                {/* Table Row */}
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>{saleData.name}</Text>
                  <Text style={styles.tableCell}>{saleData.product}</Text>
                  <Text style={styles.tableCell}>{saleData.price}</Text>
                  <Text style={styles.tableCell}>{new Date(saleData.date).toLocaleDateString()}</Text>
                </View>
              </View>

              <View style={styles.footer}>
                <Text>Thank you for your business</Text>
              </View>
            </Page>
          </Document>
        }
      >
        {({ url }) => (
          <Button
            type="primary"
            target="_blank"
            style={{ marginTop: 20, backgroundColor: "#2E4053", borderColor: "#2E4053" }}
          >
            <a
              href={url!}
              download={`sportiz-invoice-${saleData.key}.pdf`}
              style={{ color: "#FFF" }}
            >
              Download Invoice
            </a>
          </Button>
        )}
      </BlobProvider>
    </div>
  );
};

export default PdfComponent;
