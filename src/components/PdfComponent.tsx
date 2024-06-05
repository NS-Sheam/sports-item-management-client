import { BlobProvider, Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { Button } from "antd";
import { ISalesData } from "../pages/sale/SalesManagement";

const PdfComponent = ({ saleData }: { saleData: ISalesData }) => {
  // Define styles for PDF

  const styles = StyleSheet.create({
    page: {
      padding: 40,
      fontFamily: "Helvetica",
    },
    header: {
      fontSize: 24,
      marginBottom: 10,
      textAlign: "center",
      color: "#2E4053",
    },
    subHeader: {
      fontSize: 14,
      marginBottom: 20,
      textAlign: "center",
      color: "#6C757D",
    },
    logo: {
      width: 100,
      height: 50,
      marginBottom: 10,
    },
    companyDetails: {
      marginBottom: 20,
      textAlign: "center",
    },
    table: {
      width: "100%",
      marginVertical: 20,
    },
    row: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#2E4053",
      backgroundColor: "#F3F3F3",
    },
    rowOdd: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#2E4053",
      backgroundColor: "#FFF",
    },
    cell: {
      padding: 10,
      borderStyle: "solid",
      borderWidth: 1,
      flexGrow: 1,
      textAlign: "center",
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
  });

  return (
    <div>
      <h1 style={{ textAlign: "center", color: "#2E4053" }}>Invoice</h1>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#2E4053", color: "#FFF" }}>
              <th style={{ padding: 10 }}>Name</th>
              <th style={{ padding: 10 }}>Product</th>
              <th style={{ padding: 10 }}>Price</th>
              <th style={{ padding: 10 }}>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ backgroundColor: "#F3F3F3" }}>
              <td style={{ padding: 10 }}>{saleData.name}</td>
              <td style={{ padding: 10 }}>{saleData.product}</td>
              <td style={{ padding: 10 }}>{saleData.price}</td>
              <td style={{ padding: 10 }}>{new Date(saleData.date).toLocaleDateString()}</td>
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
              <View style={styles.companyDetails}>
                <Image
                  style={styles.logo}
                  src="/path/to/logo.png"
                />
                <Text style={{ fontSize: 18, color: "#2E4053" }}>Sportiz</Text>
                <Text>Mirpur, Dhaka</Text>
                <Text>Phone: (123) 456-7890</Text>
                <Text>Email: info@sportiz.com</Text>
              </View>
              <View style={styles.header}>
                <Text>Invoice</Text>
              </View>
              <View style={styles.subHeader}>
                <Text>Invoice Date: {new Date().toLocaleDateString()}</Text>
                <Text>Invoice Number: INV-{saleData?.key}</Text>
              </View>
              <View style={styles.table}>
                <View style={styles.row}>
                  <View style={styles.cell}>
                    <Text>Name</Text>
                  </View>
                  <View style={styles.cell}>
                    <Text>Product</Text>
                  </View>
                  <View style={styles.cell}>
                    <Text>Price</Text>
                  </View>
                  <View style={styles.cell}>
                    <Text>Date</Text>
                  </View>
                </View>
                <View style={styles.rowOdd}>
                  <View style={styles.cell}>
                    <Text>{saleData.name}</Text>
                  </View>
                  <View style={styles.cell}>
                    <Text>{saleData.product}</Text>
                  </View>
                  <View style={styles.cell}>
                    <Text>{saleData.price}</Text>
                  </View>
                  <View style={styles.cell}>
                    <Text>{new Date(saleData.date).toLocaleDateString()}</Text>
                  </View>
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
