import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import Footer from "../../components/Footer";

const Home = (props) => {
  // const { allItems, dispatcho } = useFetchItemsContext(); // for checking all the items fetched
  // const { items, dispatch } = useItemsCartContext(); // for adding items to the cart
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [triggerDelete, setTriggerDelete] = useState(0);

  const [activeButton, setActiveButton] = useState();
  const [disableButton, setDisabledButton] = useState();
  const [activeButtonArray, setActiveButtonArray] = useState([]);

  // to handle the MASS DELETE action and sending the reques to the backend

  const handleMassDeleteButton = async () => {
    // fetch request and if ok the cookie will be removed

    const datas = await fetch(
      "https://test-project-api.000webhostapp.com/api/index - Copy.php",
      {
        method: "post",
        body: JSON.stringify(activeButtonArray),
      }
    );

    if (datas.status === 200) {
      // console.log("we are good");
      setTriggerDelete((current) => (current += 1));
    }

    // console.log(datas);
  };

  // try {
  //   const datas = await axios.delete(
  //     "https://test-project-api.000webhostapp.com/api/",
  //     {
  //       data: activeButtonArray,
  //     }
  //   );

  // if (datas.status === 200) {
  //   // console.log(datas);
  //   // setActiveButtonArray([]);
  //   // console.log(activeButtonArray);

  // }

  //     return datas;
  //   } catch (error) {
  //     return error.response.data.error;
  //   }
  // };

  // for fetching the items after MASS DELETE happen and refresh the state with the new data
  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get(
        "https://test-project-api.000webhostapp.com/api/"
      );

      // console.log(response);
      // console.log("we are fetching items now");

      if (response.status === 200) {
        // console.log("reponse is ok");
        setFetchedProducts(response.data);
        // console.log(json);
        // dispatcho({ type: "FETCHED-ALL", payload: json });
      }
    };

    fetchItems();
  }, [triggerDelete]);

  // TO Handle selecting the product to DELETE and turning it's color
  useEffect(() => {
    // setActiveButtonArray(current=>() [activeButton, ...maybeDeleteSelectedItem]);
    if (activeButton) {
      // let temporaryValuev2 = activeButton;
      setActiveButtonArray((current) => [...current, ...activeButton]);
      // temporaryValuev2 = undefined;
    }

    // we want to save the color on it
  }, [activeButton]);

  // TO Handle un-selecting product item which was wished to be DELETED and turning it's color
  useEffect(() => {
    if (disableButton) {
      const deStrcutedArray = disableButton[0];

      // console.log(deStrcutedArray);

      let stillSelectedArray = activeButtonArray.filter(function (value) {
        return value !== deStrcutedArray;
      });

      setActiveButtonArray(stillSelectedArray);
    }
  }, [disableButton]);

  return (
    <div>
      <div className="Nav-container">
        <h1>Product List</h1>

        <div>
          <NavLink className="Nav-ADD-Product-button" to="addproduct">
            ADD
          </NavLink>
          <button
            className="Nav-MassDelete-Button"
            onClick={handleMassDeleteButton}
          >
            MASS DELETE
          </button>
        </div>
      </div>
      <div className="Home-product-container">
        {fetchedProducts &&
          fetchedProducts.map((product) => {
            return (
              <div className="each-product-box-style" key={product.id}>
                <button
                  className="delete-checkbox"
                  onClick={(e) => {
                    // console.log(product);
                    if (activeButtonArray.includes(product.id)) {
                      // console.log("duplicate");
                      setDisabledButton([product.id]);
                    }

                    if (!activeButtonArray.includes(product.id)) {
                      setActiveButton([product.id]);
                    }
                  }}
                  style={{
                    backgroundColor: activeButtonArray.includes(product.id)
                      ? "red"
                      : "white",
                  }}
                ></button>
                <p>{product.sku}</p>
                <p>{product.name}</p>
                <p>{product.price} $</p>
                {product.typeswitcher === "DVD" && (
                  <p>Size: {product.size} MB</p>
                )}
                {product.typeswitcher === "Furniture" && (
                  <p>
                    Dimensions: {product.height}x{product.width}x
                    {product.length}
                  </p>
                )}
                {product.typeswitcher === "Book" && (
                  <p>Weight: {product.weight} Kg </p>
                )}
              </div>
            );
          })}
      </div>

      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
