import { BlobProvider, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { TSales } from "../types";
import dayjs from "dayjs";

const PdfComponent = ({ saleData }: { saleData: TSales }) => {
  // Define styles for PDF
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
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
      display: "flex",
      width: "100%",
      borderStyle: "solid",
      borderWidth: 1,
      borderCollapse: "collapse",
    },
    row: {
      flexDirection: "row",
    },
    cell: {
      padding: 5,
      borderStyle: "solid",
      borderWidth: 1,
      flexGrow: 1,
      textAlign: "center",
    },
    footer: {
      fontSize: 12,
      textAlign: "center",
      marginTop: 25,
      paddingTop: 10,
      borderWidth: 3,
      borderColor: "gray",
      borderStyle: "dashed",
    },
  });

  return (
    <div>
      <h1>Sales Report</h1>

      <BlobProvider
        document={
          <Document>
            <Page
              size="A4"
              style={styles.page}
            >
              <View style={styles.section}>
                <Text style={styles.header}>Sales Report</Text>
                <View style={styles.table}>
                  <View style={styles.row}>
                    <View style={styles.cell}>
                      <Text>Name</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text>Product</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text>Quantity</Text>
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
                      <Text>{saleData.quantity}</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text>{dayjs(saleData.date).format("DD-MM-YYYY")}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </Page>
          </Document>
        }
      >
        {({ blob, url, loading, error }) => (
          <a
            href={url!}
            download="sales_report.pdf"
          >
            Download PDF
          </a>
        )}
      </BlobProvider>
    </div>
  );
};

export default PdfComponent;
