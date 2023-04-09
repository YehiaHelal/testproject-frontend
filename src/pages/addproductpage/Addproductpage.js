import {
  Form,
  json,
  NavLink,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import axios from "axios";

import { useEffect, useState } from "react";

import Footer from "../../components/Footer";

export default function AddproductPage() {
  const data = useActionData();
  const allProducts = useLoaderData();
  const navTo = useNavigate();

  console.log(data);
  console.log(allProducts);

  const [selectValue, setSelectValue] = useState("");
  const [skuValue, setSkuValue] = useState(false);

  // To Handle checking SKU value entered with existing SKU values in the database and if it's duplicate and throw error
  const skuChecking = allProducts.some((product) => product.sku === skuValue);
  // console.log(skuChecking); // true

  // to redirect After the Form Submit action is successful,  without error handling tho.
  useEffect(() => {
    if (typeof data === 1) {
      navTo("/");
    }
  }, [data]);

  return (
    <div>
      <div className="Nav-container">
        <h1>Product Add</h1>

        <div>
          <button className="Nav-Save-Button">SAVE</button>
          <NavLink
            className="Nav-ADD-Product-button"
            to="https://testproject-frontend-production.up.railway.app/"
          >
            CANCEL
          </NavLink>
        </div>
      </div>

      {/* <div>
        <NavLink to="/">SAVE</NavLink>
        <NavLink to="/">CANCEL</NavLink>
      </div> */}
      <div className="Add-product-page-container">
        <div id="product_form">
          <Form className="form-component" method="post" action="/addproduct">
            <span>SKU</span>
            <input
              id="sku"
              type="text"
              name="sku"
              required
              onChange={(e) => {
                setSkuValue(e.target.value);
              }}
            />

            <span>Name</span>
            <input id="name" type="text" name="name" required />

            <span>Price($)</span>
            <input id="price" type="number" name="price" required />

            <div>Type Switcher</div>
            <select
              id="productType"
              required
              className="form-drop-down-style"
              type="productType"
              name="productType"
              onChange={(e) => setSelectValue(e.target.value)}
            >
              <option></option>

              <option>DVD</option>
              <option>Furniture</option>
              <option>Book</option>
            </select>

            <div className="drop-down-more-details-fields-containers">
              {selectValue === "DVD" && (
                <div className="drop-down-more-details-fields-elements">
                  <span>Size (MB)</span>
                  <input
                    id="size"
                    className="drop-down-more-details-fields-elements-input"
                    type="number"
                    name="size"
                    required
                  />

                  <div className="drop-down-more-details-fields-elements-text-span">
                    Please, provide Size in MB.
                  </div>
                </div>
              )}
              {selectValue === "Furniture" && (
                <div className="drop-down-more-details-fields-elements">
                  <span>Height (CM)</span>
                  <input
                    id="height"
                    className="drop-down-more-details-fields-elements-input"
                    type="number"
                    name="height"
                    required
                  />

                  <span>Width (CM)</span>
                  <input
                    id="width"
                    className="drop-down-more-details-fields-elements-input"
                    type="number"
                    name="width"
                    required
                  />

                  <span>Length (CM)</span>
                  <input
                    id="lenght"
                    className="drop-down-more-details-fields-elements-input"
                    type="number"
                    name="length"
                    required
                  />

                  <div className="drop-down-more-details-fields-elements-text-span">
                    Please, provide Dimensions HxWxL.
                  </div>
                </div>
              )}
              {selectValue === "Book" && (
                <div className="drop-down-more-details-fields-elements">
                  <span>Weight (KG)</span>
                  <input
                    id="weight"
                    className="drop-down-more-details-fields-elements-input"
                    type="number"
                    name="weight"
                    required
                  />

                  <div className="drop-down-more-details-fields-elements-text-span">
                    Please, provide Weight in Kg.
                  </div>
                </div>
              )}
            </div>

            {!skuChecking && (
              <button id="Save" className="form-Save-button">
                SAVE
              </button>
            )}

            {skuChecking && (
              <button id="Save" disabled className="form-Save-button">
                SAVE
              </button>
            )}
          </Form>
          {/* {showPopup && (
            <p>Product was successfully added, redirecting in 1 second...</p>
          )} */}
          {skuChecking && (
            <p>Same SKU already exist, please enter another SKU </p>
          )}
        </div>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}

export const AddProductAction = async ({ request }) => {
  const data = await request.formData();

  // console.log(request);

  const item = {
    name: data.get("name"),
    sku: data.get("sku"),
    price: data.get("price"),
    typeswitcher: data.get("productType"),
    size: data.get("size") === null ? 0 : data.get("size"),
    height: data.get("height") === null ? 0 : data.get("height"),
    width: data.get("width") === null ? 0 : data.get("width"),
    length: data.get("length") === null ? 0 : data.get("length"),
    weight: data.get("weight") === null ? 0 : data.get("weight"),
  };

  // console.log(item);

  // const submissionv2 = Object.keys(item).forEach((key) => {
  //   if (item[key] === null) {
  //     delete item[key];
  //   }
  // });

  // http://localhost/react/api/

  // https://test-project-api.000webhostapp.com/api/

  // http://localhost/react/api/index.php

  // try {
  // const datas = await axios.post(
  //   "https://test-project-api.000webhostapp.com/api/",
  //   {
  //     name: data.get("name"),
  //     sku: data.get("sku"),
  //     price: 850,
  //     typeswitcher: data.get("productType"),
  //     size: 20,
  //     height: data.get("height") === null ? 0 : data.get("height"),
  //     width: data.get("width") === null ? 0 : data.get("width"),
  //     length: data.get("length") === null ? 0 : data.get("length"),
  //     weight: data.get("weight") === null ? 0 : data.get("weight"),
  //   }
  // );
  // return datas;
  // } catch (error) {
  //   // console.log(error);
  //   return error.response.data.error;
  // }

  const datas = await fetch("https://test-project-api.000webhostapp.com/api/", {
    method: "post",
    body: JSON.stringify(item),
  });

  return redirect("/");
};

// Products loader
export const fetchProductsLoader = async ({ params }) => {
  const response = await axios.get(
    "https://test-project-api.000webhostapp.com/api/"
  );

  // console.log(response);

  return response.data;
};
