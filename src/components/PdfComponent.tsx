import React from "react";
import { BlobProvider, Document, Page, Text, View, StyleSheet, PDFViewer } from "@react-pdf/renderer";

const PdfComponent = () => {
  const data = [
    { name: "John Doe", product: "Product 1", quantity: 10, date: "2021-10-10" },
    { name: "Jane Doe", product: "Product 2", quantity: 20, date: "2021-10-11" },
    { name: "John Smith", product: "Product 3", quantity: 30, date: "2021-10-12" },
    { name: "Jane Smith", product: "Product 4", quantity: 40, date: "2021-10-13" },
  ];

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
                  {data.map((item, index) => (
                    <View
                      style={styles.row}
                      key={index}
                    >
                      <View style={styles.cell}>
                        <Text>{item.name}</Text>
                      </View>
                      <View style={styles.cell}>
                        <Text>{item.product}</Text>
                      </View>
                      <View style={styles.cell}>
                        <Text>{item.quantity}</Text>
                      </View>
                      <View style={styles.cell}>
                        <Text>{item.date}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </Page>
          </Document>
        }
      >
        {({ blob, url, loading, error }) => (
          <a
            href={url}
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
