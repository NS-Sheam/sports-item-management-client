import { Button, Table, Input, Image } from "antd";
import { useState } from "react";
import { useGetProductsQuery } from "../../redux/features/product/productApi";
import { TProduct } from "../../types";
import GenericItemModal from "../../components/modal/GenericItemModal";

import CustomPagination from "../../components/form/CustomPagination";
import { EditOutlined } from "@ant-design/icons";

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);
  const [page, setPage] = useState(1);
  const {
    data: productData,
    isLoading: isProductLoading,
    isFetching: isProductFetching,
  } = useGetProductsQuery([
    { name: "searchTerm", value: searchTerm },
    {
      name: "limit",
      value: 10 + "",
    },
    {
      name: "page",
      value: page + "",
    },
  ]);
  const meta = productData?.meta;
  console.log(meta);

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Action",
      key: "edit",
      render: (item: TProduct) => (
        <Button
          className="cursor-pointer"
          style={{
            background: "#93278f",
            color: "#fff",
          }}
          size="small"
          icon={<EditOutlined />}
          onClick={() => {
            setSelectedProduct(item);
            setIsModalOpen(true);
          }}
        />
      ),
    },
  ];

  // Handle modal close
  // const handleModalClose = () => {
  //   setIsModalOpen(false);
  //   setSelectedProduct(null); // Reset selected product
  // };

  return (
    <div className="space-y-4">
      <h1 className="text-xl lg:text-2xl font-bold text-primary">Products Management</h1>

      {/* Search Bar */}
      <div>
        <Input.Search
          style={{ width: "20rem" }}
          placeholder="Search products"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table to display products */}
      <Table
        scroll={{ x: 400 }}
        columns={columns}
        dataSource={productData?.data}
        rowKey="_id"
        loading={isProductLoading || isProductFetching}
        pagination={false}
      />
      <CustomPagination
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "1rem",
        }}
        page={page}
        setPage={setPage}
        total={meta?.total}
        pageSize={meta?.limit}
      />
      {/* page: number;
  setPage: (value: number) => void;
  total: number;
  pageSize: number; */}
      {/* Generic Modal for displaying product details */}
      <GenericItemModal
        title="Product Details"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        width={800}
      >
        {selectedProduct && (
          <div className="space-y-2 flex justify-center items-start ">
            {/* Product Image */}
            <div
              style={{
                width: "50%",
              }}
            >
              <strong>Product Image:</strong>
              <br />
              {selectedProduct.image ? (
                <Image.PreviewGroup>
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    width={300}
                    style={{ marginTop: "10px", borderRadius: "8px" }}
                  />
                </Image.PreviewGroup>
              ) : (
                <p>No image available</p>
              )}
            </div>
            <div
              style={{
                width: "50%",
              }}
            >
              <p>
                <strong>Name:</strong> {selectedProduct.name}
              </p>
              <p>
                <strong>Price:</strong> ${selectedProduct.price}
              </p>
              <p>
                <strong>Brand:</strong> {selectedProduct.brand || "N/A"}
              </p>
              <p>
                <strong>Quantity:</strong> {selectedProduct.quantity}
              </p>
              <p>
                <strong>Type:</strong> {selectedProduct.type || "N/A"}
              </p>
              <p>
                <strong>Size:</strong> {selectedProduct.size || "N/A"}
              </p>
              <p>
                <strong>Material:</strong> {selectedProduct.material || "N/A"}
              </p>
              <p>
                <strong>Color:</strong> {selectedProduct.color || "N/A"}
              </p>
              <p>
                <strong>Condition:</strong> {selectedProduct.condition || "N/A"}
              </p>
              <p>
                <strong>Weight:</strong> {selectedProduct.weight ? `${selectedProduct.weight} kg` : "N/A"}
              </p>
              <p>
                <strong>Style:</strong> {selectedProduct.style || "N/A"}
              </p>
              <p>
                <strong>Created At:</strong> {new Date(selectedProduct.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Updated At:</strong> {new Date(selectedProduct.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </GenericItemModal>
    </div>
  );
};

export default ProductManagement;
