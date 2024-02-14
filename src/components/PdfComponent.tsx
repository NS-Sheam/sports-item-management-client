import { BlobProvider, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Button } from "antd";
import { ISalesData } from "../pages/sale/SalesManagement";

const PdfComponent = ({ saleData }: { saleData: ISalesData }) => {
  // Define styles for PDF
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#FFF",
      padding: 20,
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    header: {
      fontSize: 20,
      marginBottom: 20,
      textAlign: "center",
    },
    table: {
      width: "100%",
      borderStyle: "solid",
      borderWidth: 1,
      borderCollapse: "collapse",
    },
    row: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#000",
    },
    cell: {
      padding: 5,
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
      <h1 style={{ textAlign: "center" }}>Invoice</h1>
      <div>
        <table style={{ width: "100%" }}>
          <tr>
            <th>Name</th>
            <th>Product</th>
            <th>Price</th>
            <th>Date</th>
          </tr>
          <tr>
            <td>{saleData.name}</td>
            <td>{saleData.product}</td>
            <td>{saleData.price}</td>
            <td>{new Date(saleData.date).toLocaleDateString()}</td>
          </tr>
        </table>
      </div>
      <BlobProvider
        document={
          <Document>
            <Page
              size="A4"
              style={styles.page}
            >
              <View style={styles.section}>
                <Text style={styles.header}>Invoice</Text>
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
                  <View style={styles.row}>
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
          >
            <a
              href={url!}
              download="invoice.pdf"
            >
              Download invoice
            </a>
          </Button>
        )}
      </BlobProvider>
    </div>
  );
};

export default PdfComponent;
