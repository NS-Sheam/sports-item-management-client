import { Card, Col, Empty, Image, Row } from "antd";
import { useGetProductsQuery } from "../../redux/features/product/productApi";
import LoadingSpinner from "../../components/loader/LoadingSpinner";
import { TProduct } from "../../types";

const Inventory = () => {
  const { data, isLoading } = useGetProductsQuery([{ name: "limit", value: 1000 }]);

  if (isLoading) return <LoadingSpinner />;
  const items: TProduct[] = data?.data?.filter((item: TProduct) => item?.quantity > 0 && !item?.isDeleted);
  return (
    <div className="space-y-4">
      <h1 className="text-xl lg:text-2xl font-bold ">Inventory</h1>
      <Row
        gutter={[16, 16]}
        justify={"start"}
      >
        {items?.map((item) => (
          <Col
            sm={24}
            md={8}
            lg={6}
            key={item?._id}
          >
            <Card
              size="default"
              title={item?.name}
              style={{ minHeight: "300px" }}
              cover={
                item?.image ? (
                  <Image
                    style={{
                      objectFit: "contain",
                      height: "200px",
                      width: "100%",
                    }}
                    alt={item?.name}
                    src={item?.image}
                  />
                ) : (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )
              }
            >
              <p>Brand: {item?.brand}</p>
              <p>Style: {item?.style}</p>
              <p>Material: {item?.material}</p>
              <p>Color: {item?.color}</p>
              <p>Size: {item?.size}</p>
              <p>Condition: {item?.condition}</p>
              <p>Price: ${item?.price}</p>
              <p>Quantity: {item?.quantity}</p>
              <p>Weight: {item?.weight}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Inventory;
