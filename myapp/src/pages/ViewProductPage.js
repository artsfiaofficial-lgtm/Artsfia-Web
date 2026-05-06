import React, { useEffect } from "react";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import Swal from "sweetalert2";
export default function ViewProductPage() {
  const [productName, setProductName] = useState("");
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [productLoader, setProductLoader] = useState(true);
  const [productList, setProductList] = useState([]);
  const [bangleCategoryDirect, setBangleCategoryDirect] = useState("");
  const [productType, setProductType] = useState("");
  const [noProductText, setNoProductText] = useState(false);
  const navigate = useNavigate();
  // open aside
  const openAside = () => setIsAsideOpen(true);
  // close aside
  const closeAside = () => setIsAsideOpen(false);
  // navigate and close
  const handleNavigate = (path) => {
    navigate(path);
  };

  //get param data from url
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const product = params.get("product");
  const bangleType = params.get("bangleType");
  const bangleSize = params.get("bangleSize");

  useEffect(() => {
    if (!product) return;
    if (product.includes("eid2026")) {
      setProductName("Eid 2026");
    } else if (product === "under500") {
      setProductName("Under 500");
    } else if (product === "newArrivals") {
      setProductName("New Arrivals");
    } else if (product === "topSelling") {
      setProductName("Top Selling");
    } else if (product === "trending") {
      setProductName("Trending");
    } else if (product.includes("officeWear")) {
      setProductName("Office Wear");
    } else if (product.includes("partyWear")) {
      setProductName("Party Wear");
    } else if (product.includes("bridalWear")) {
      setProductName("Bridal Wear");
    } else if (product.includes("festiveWear")) {
      setProductName("Festive Wear");
    } else if (product.includes("eventWear")) {
      setProductName("Event Wear");
    } else if (product.includes("babyBangle")) {
      setProductName("Baby Bangle");
    } else if (product === "bangle" && bangleType === "all") {
      setProductName("Bangle");
    } else if (product.includes("bangle") && bangleType.includes("fabric")) {
      setProductName("Fabric Bangle");
    } else if (product.includes("bangle") && bangleType.includes("thread")) {
      setProductName("Thread Bangle");
    } else if (product.includes("bangle") && bangleType.includes("square")) {
      setProductName("Square Bangle");
    } else if (product.includes("bangle") && bangleType.includes("shell")) {
      setProductName("Shell Bangle");
    } else if (
      product.includes("bangle") &&
      bangleType.includes("baby") &&
      !bangleSize
    ) {
      setProductName("Baby Bangle");
    } else if (
      product.includes("bangle") &&
      bangleType.includes("baby") &&
      bangleSize.includes("5-3")
    ) {
      setProductName("Baby Bangle (5M - 3Y)");
    } else if (
      product.includes("bangle") &&
      bangleType.includes("baby") &&
      bangleSize.includes("3-7")
    ) {
      setProductName("Baby Bangle (3Y - 7Y)");
    } else if (
      product.includes("bangle") &&
      bangleType.includes("baby") &&
      bangleSize.includes("7-12")
    ) {
      setProductName("Baby Bangle (7Y - 12Y)");
    } else if (product.includes("earing")) {
      setProductName("Earing");
    } else if (product.includes("neckpiece")) {
      setProductName("Neckpiece");
    } else if (product.includes("fingerRing")) {
      setProductName("Finger Ring");
    } else if (product.includes("combo")) {
      setProductName("Combo");
    } else {
      setProductName("No Product Found");
    }
  });

  //auth materials
  //const function
  async function getAuthToken() {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/auth/identify`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: process.env.REACT_APP_AUTH_EMAIL_BACKEND,
        password: process.env.REACT_APP_AUTH_PASSWORD_BACKEND,
      }),
    });
    const tokenId = await res.json();
    if (tokenId) {
      console.log(tokenId);
      return tokenId.token;
    } else {
      return;
    }
  }

  //fetch product according to the data
  async function fetchProducts() {
    const token = await getAuthToken();
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/product`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      setProductLoader(false);
      const data = await res.json();
      if (product === "bangle" && bangleType === "fabric") {
        const products = data.filter(
          (e) => e.bangleDesignCategory === "fabric",
        );
        const productsReverse = products.reverse();
        if (products.length <= 0) {
          setNoProductText(true);
        }
        setProductList(productsReverse);
      } 
      else if (product === "bangle" && bangleType === "square") {
        const products = data.filter(
          (e) => e.bangleDesignCategory === "square",
        );
        const productsReverse = products.reverse();
        if (products.length <= 0) {
          setNoProductText(true);
        }
        setProductList(productsReverse);
      } 
      else if (product === "bangle" && bangleType === "shell") {
        const products = data.filter((e) => e.bangleDesignCategory === "shell");
        const productsReverse = products.reverse();
        if (products.length <= 0) {
          setNoProductText(true);
        }
        setProductList(productsReverse);
      } 
      else if (product === "bangle" && bangleType === "thread") {
        const products = data.filter(
          (e) => e.bangleDesignCategory === "thread",
        );
        const productsReverse = products.reverse();
        if (products.length <= 0) {
          setNoProductText(true);
        }
        setProductList(productsReverse);
      } 
      else if (product === "babyBangle") {
        const products = data.filter((e) => e.productCategory === "babyBangle");
        const productsReverse = products.reverse();
        if (products.length <= 0) {
          setNoProductText(true);
        }
        setProductList(productsReverse);
      } 
      else if (
        product === "bangle" &&
        bangleType === "baby" &&
        bangleSize === "5-3"
      ) {
        const products = data.filter((e) => e.babyBangleCategory === "5-3");
        const productsReverse = products.reverse();
        if (products.length <= 0) {
          setNoProductText(true);
        }
        setProductList(productsReverse);
      } 
      else if (
        product === "bangle" &&
        bangleType === "baby" &&
        bangleSize === "3-7"
      ) {
        const products = data.filter((e) => e.babyBangleCategory === "3-7");
        const productsReverse = products.reverse();
        if (products.length <= 0) {
          setNoProductText(true);
        }
        setProductList(productsReverse);
      } 
      else if (
        product === "bangle" &&
        bangleType === "baby" &&
        bangleSize === "7-12"
      ) {
        const products = data.filter((e) => e.babyBangleCategory === "7-12");
        const productsReverse = products.reverse();
        if (products.length <= 0) {
          setNoProductText(true);
        }
        setProductList(productsReverse);
      } 
      else if (product === "bangle") {
        const products = data.filter((e) => e.productCategory === "bangle");
        const productsReverse = products.reverse();
        if (products.length <= 0) {
          setNoProductText(true);
        }
        setProductList(productsReverse);
      } 
      else if (product === "officeWear") {
        const products = data.filter((e) => e.productCategory === "officeWear");
        const productsReverse = products.reverse();
        if (products.length <= 0) {
          setNoProductText(true);
        }
        setProductList(productsReverse);
      } 
      else if (product === "eid2026") {
        const products = data.filter((e) => e.productCategory === "eid2026");
        const productsReverse = products.reverse();
        if (products.length <= 0) {
          setNoProductText(true);
        }
        setProductList(productsReverse);
      } 
      else if (product === "partyWear") {
        const products = data.filter((e) => e.productCategory === "partyWear");
        const productsReverse = products.reverse();
        if (products.length <= 0) {
          setNoProductText(true);
        }
        setProductList(productsReverse);
      } 
      else if (product === "bridalWear") {
        const products = data.filter((e) => e.productCategory === "bridalWear");
        const productsReverse = products.reverse();
        if (products.length <= 0) {
          setNoProductText(true);
        }
        setProductList(productsReverse);
      } 
      else if (product === "eventWear") {
        const products = data.filter((e) => e.productCategory === "eventWear");
        const productsReverse = products.reverse();
        if (products.length <= 0) {
          setNoProductText(true);
        }
        setProductList(productsReverse);
      } 
      else if (product === "festiveWear") {
        const products = data.filter(
          (e) => e.productCategory === "festiveWear",
        );
        const productsReverse = products.reverse();
        if (products.length <= 0) {
          setNoProductText(true);
        }
        setProductList(productsReverse);
      } 
      else if (product === "earing") {
        const products = data.filter((e) => e.productCategory === "earing");
        const productsReverse = products.reverse();
        if (products.length <= 0) {
          setNoProductText(true);
        }
        setProductList(productsReverse);
      } 
      else if (product === "neckpiece") {
        const products = data.filter((e) => e.productCategory === "neckpiece");
        const productsReverse = products.reverse();
        if (products.length <= 0) {
          setNoProductText(true);
        }
        setProductList(productsReverse);
      } 
      else if (product === "fingerRing") {
        const products = data.filter((e) => e.productCategory === "fingerRing");
        const productsReverse = products.reverse();
        if (products.length <= 0) {
          setNoProductText(true);
        }
        setProductList(productsReverse);
      } 
      else if (product === "combo") {
        const products = data.filter((e) => e.productCategory === "combo");
        const productsReverse = products.reverse();
        if (products.length <= 0) {
          setNoProductText(true);
        }
        setProductList(productsReverse);
      } 
      else if (product === "under500") {
        const products = data.filter((e) => e.productType.includes("under500"));
        const productsReverse = products.reverse();
        if (products.length <= 0) {
          setNoProductText(true);
        }
        setProductList(productsReverse);
      } 
      else if (product === "trending") {
        const products = data.filter((e) => e.productType.includes("trending"));
        const productsReverse = products.reverse();
        if (products.length <= 0) {
          setNoProductText(true);
        }
        setProductList(productsReverse);
      } 
      else if (product === "newArrivals") {
        const products = data.filter((e) =>
          e.productType.includes("newArrivals"),
        );
        const productsReverse = products.reverse();
        if (products.length <= 0) {
          setNoProductText(true);
        }
        setProductList(productsReverse);
      } 
      else if (product === "topSelling") {
        const products = data.filter((e) =>
          e.productType.includes("topSelling"),
        );
        const productsReverse = products.reverse();
        if (products.length <= 0) {
          setNoProductText(true);
        }
        setProductList(productsReverse);
      }
    } else {
      Swal.fire("Failed to get data!", "Please try again", "error");
      return;
    }
  }
  useEffect(() => {
    fetchProducts();
  }, [productName]);

  return (
    <>
      <Navbar isAside={openAside} isMyAsideOpen={isAsideOpen} />
      {
        //Aside Bar
        <div className={`asideBar ${isAsideOpen ? "open" : "close"}`}>
          <div className="asideHeader">
            <div className="asideHeaderLogoBox">
              <img src="./assets/logo/logo.png" alt="" />
            </div>
            <div className="asideHeaderCloseIconBox" onClick={closeAside}>
              <img src="./assets/icons/closeIcon.png" alt="" />
            </div>
          </div>
          <div className="asideBarOptionsBox">
            <div
              className="optionBox"
              onClick={() => handleNavigate("/profile")}
            >
              <div className="optionBoxIcon">
                <img src="./assets/icons/profileIcon.png" alt="" />
              </div>
              <div className="optionBoxTxtContent">User Profile</div>
            </div>
            <div className="optionBox" onClick={() => handleNavigate("/cart")}>
              <div className="optionBoxIcon">
                <img src="./assets/icons/cartIcon.png" alt="" />
              </div>
              <div className="optionBoxTxtContent">Cart</div>
            </div>
            <div
              className="optionBox"
              onClick={() => handleNavigate("/search")}
            >
              <div className="optionBoxIcon">
                <img src="./assets/icons/searchIconBold.png" alt="" />
              </div>
              <div className="optionBoxTxtContent">Search</div>
            </div>
            <div
              className="optionBox"
              onClick={() => handleNavigate("/wishlist")}
            >
              <div className="optionBoxIcon">
                <img src="./assets/icons/wishListIcon.png" alt="" />
              </div>
              <div className="optionBoxTxtContent">Wishlist</div>
            </div>
          </div>
          <hr style={{ margin: "0" }} />
          <div className="asideBarDesignedOptions">
            <p className="asideDOCBOTitle">CATEGORY BY OCCASION</p>
            <ul className="asideUlDOC">
              <li
                onClick={() => handleNavigate("/product-view?product=eid2026")}
              >
                Eid 2026
              </li>
              <li
                onClick={() =>
                  handleNavigate("/product-view?product=officeWear")
                }
              >
                Office Wear
              </li>
              <li
                onClick={() =>
                  handleNavigate("/product-view?product=partyWear")
                }
              >
                Party Wear
              </li>
              <li
                onClick={() =>
                  handleNavigate("/product-view?product=bridalWear")
                }
              >
                Bridal Wear
              </li>
              <li
                onClick={() =>
                  handleNavigate("/product-view?product=festiveWear")
                }
              >
                Festive Wear
              </li>
            </ul>
            <p className="asideDOCBOTitle">ALL CATEGORY</p>
            <ul className="asideUlDOC">
              <li
                onClick={() =>
                  handleNavigate("/product-view?product=bangle&bangleType=all")
                }
              >
                Bangle
              </li>
              <ul
                style={{
                  listStyleType: "square",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <li
                  onClick={() =>
                    handleNavigate(
                      "/product-view?product=bangle&bangleType=fabric",
                    )
                  }
                >
                  Fabric
                </li>
                <li
                  onClick={() =>
                    handleNavigate(
                      "/product-view?product=bangle&bangleType=thread",
                    )
                  }
                >
                  Thread
                </li>
                <li
                  onClick={() =>
                    handleNavigate(
                      "/product-view?product=bangle&bangleType=square",
                    )
                  }
                >
                  Square
                </li>
                <li
                  onClick={() =>
                    handleNavigate(
                      "/product-view?product=bangle&bangleType=shell",
                    )
                  }
                >
                  Shell
                </li>
              </ul>
              <li
                onClick={() =>
                  handleNavigate("/product-view?product=babyBangle")
                }
              >
                Baby Bangle
              </li>
              <ul
                style={{
                  listStyleType: "circle",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <li
                  onClick={() =>
                    handleNavigate(
                      "/product-view?product=bangle&bangleType=baby&bangleSize=5-3",
                    )
                  }
                >
                  5 Months-3 Years
                </li>
                <li
                  onClick={() =>
                    handleNavigate(
                      "/product-view?product=bangle&bangleType=baby&bangleSize=3-7",
                    )
                  }
                >
                  3-7 Years
                </li>
                <li
                  onClick={() =>
                    handleNavigate(
                      "/product-view?product=bangle&bangleType=baby&bangleSize=7-12",
                    )
                  }
                >
                  7-12 Years
                </li>
              </ul>
              <li
                onClick={() => handleNavigate("/product-view?product=earing")}
              >
                Earing
              </li>
              <li
                onClick={() =>
                  handleNavigate("/product-view?product=neckpiece")
                }
              >
                Neckpiece
              </li>
              <li
                onClick={() =>
                  handleNavigate("/product-view?product=fingerRing")
                }
              >
                Finger Ring
              </li>
              <li onClick={() => handleNavigate("/product-view?product=combo")}>
                Combo
              </li>
            </ul>
          </div>
        </div>
        //aside bar ends
      }
      {
        //main content box start from here
        <div className="mainContentBox">
          <div className="productAllPageHeaderBox">
            <div className="productAllPageHeaderBoxIconBox">
              <img
                src="./assets/icons/productIcon.png"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                alt=""
              />
            </div>
            {productName}
            {productType === "bangle" && (
              <select
                name=""
                onChange={(e) => bangleCategoryDirect(e.target.value)}
                className="form-control"
                style={{ fontFamily: "Poppins", width: "150px" }}
                id=""
              >
                <option value="all">All Category</option>
                <option value="premium">Premium</option>
                <option value="affordable">Affordable</option>
              </select>
            )}
          </div>

          <div className="mainProductListRenderBox">
            {
              productLoader && (
                //product loader box start from here
                <div className="productLoaderBoxHome">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )
              //product loader box ends here
            }
            {noProductText && (
              <p className="nopaText">No Products Available Yet</p>
            )}
            {productList.map((data, index) => (
              <ProductCard
                productId={data._id}
                key={index}
                idKey={data.idKey}
                status={data.productStatus}
                title={data.productTitle}
                mrp={data.productMrpPrice}
                bdt={data.productPrice}
                imgUrlFront={data.productFrontImageLink}
              />
            ))}
          </div>
        </div>
        //main content box ends here
      }
      <NavigationBar />
    </>
  );
}
