import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// pages and components
import Home from "./pages/home/Home";
// import NotFound from "./pages/notfoundpage/NotFound";
import AddproductPage, {
  AddProductAction,
  fetchProductsLoader,
} from "./pages/addproductpage/Addproductpage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route
        path="addproduct"
        element={<AddproductPage />}
        action={AddProductAction}
        loader={fetchProductsLoader}
      />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
