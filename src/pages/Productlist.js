import React, { useEffect } from "react";
import { Table } from "antd";
import { getProducts } from "../features/product/productClice";
import { useDispatch, useSelector } from "react-redux";
import Link from "antd/es/typography/Link";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    sorter: (a, b) => a.quantity - b.quantity,
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Rating",
    dataIndex: "ratings",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Productlist = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const productstate = useSelector((state) => state.product.products);
  const data = [];
  for (let i = 0; i < productstate.length; i++) {
    data.push({
      key: i,
      title: productstate[i].title,
      quantity: productstate[i].quantity,
      category: productstate[i].category,
      color: productstate[i].color,
      imgages: productstate[i].imgages,
      brand: productstate[i].brand,
      ratings: productstate[i].ratings.length,
      price: productstate[i].price,
      action: (
        <div className="d-flex gap-3">
          <Link to="/admin" className="text-dark">
            <FaEdit className="fs-4" />
          </Link>
          <Link to="/admin" className="text-dark">
            <MdDeleteForever className="fs-4" />
          </Link>
        </div>
      ),
    });
  }
  return (
    <div>
      <div>
        <h3 className="mb-4 title">Productlist</h3>
        <div>
          <Table
            columns={columns}
            dataSource={data}
            showSorterTooltip={{
              target: "sorter-icon",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Productlist;
