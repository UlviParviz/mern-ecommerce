import React from "react";
import MetaData from "../../layouts/Site/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Empty from "../../assets/images/empty.png";
import { removeCartItem, setCartItem } from "../../redux/features/cartSlice";
const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch()

  const decreaseQuantity = (item, quantity) => {
    const newQty = quantity - 1;
    if (newQty <= 0) return;

    setItemToCart(item, newQty)
  };

  const increaseQuantity = (item, quantity) => {
    const newQty = quantity + 1;
    if (newQty > item?.stock) return;

    setItemToCart(item, newQty)
  };

  const setItemToCart = (item, newQty) => {
    const cartItem = {
      product: item?.product,
      name: item?.name,
      price: item?.price,
      image: item?.image,
      stock: item?.stock,
      quantity: newQty,
    };

    dispatch(setCartItem(cartItem));
  };


  const removeCartItemHandler = (id) => {
    dispatch(removeCartItem(id))
  }

  return (
    <div className="w-[90%] mx-auto">
      <MetaData title={"Your Cart"} />

      {cartItems?.length === 0 ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <img src={Empty} alt="" />
            <p className="capitalize text-gray-500">
              There is no product in your cart
            </p>
          </div>
        </div>
      ) : (
        <div className="min-h-screen px-8">
          <h2 class="mt-12">
            Your Cart: <b>{cartItems?.length} items</b>
          </h2>

          <div class="flex flex-wrap justify-between">
            <div class="w-full lg:w-2/3">
              {cartItems?.map((item) => (
                <>
                  <hr class="my-4" />
                  <div class="cart-item" data-key="product1">
                    <div class="flex flex-wrap">
                      <div class="w-full lg:w-1/4 flex justify-center mb-2">
                        <img src={item?.image} alt="" class="lg:w-[60%] md:w-[42%] w-[50%] " />
                      </div>
                      <div class="w-full lg:w-1/4 text-center">
                        <Link
                          to={`/products/${item?.product}`}
                          class="block mt-4 lg:mt-0 "
                        >
                          {item?.name}
                        </Link>
                      </div>
                      <div class="w-full lg:w-1/6 mt-4 lg:mt-0">
                        <p
                          id="card_item_price"
                          class="text-xl flex justify-center"
                        >
                          ${item?.price}
                        </p>
                      </div>

                      <div class="w-full lg:w-1/4 mt-4 lg:mt-0 flex items-center justify-center">
                        <div class="inline-flex">
                          <span
                            onClick={() =>
                              decreaseQuantity(item, item.quantity)
                            }
                            class="btn w-[30px] rounded-md bg-black text-white px-2 flex items-center justify-center cursor-pointer minus"
                          >
                            {" "}
                            -{" "}
                          </span>
                          <span className="w-[30px] text-center font-semibold">{item?.quantity}</span>
                          <span
                            onClick={() =>
                              increaseQuantity(item, item.quantity)
                            }
                            class="btn bg-black w-[30px] rounded-md text-white flex items-center justify-center px-2 cursor-pointer plus"
                          >
                            {" "}
                            +{" "}
                          </span>
                        </div>
                      </div>
                      <div class="w-full lg:w-1/12 mt-4 lg:mt-0 flex items-center justify-end text-red-500">
                        <FaTrash onClick={() => removeCartItemHandler(item?.product)} className="w-[30px] h-[30px] cursor-pointer pb-1" />
                      </div>
                    </div>
                  </div>
                  <hr class="my-4" />
                </>
              ))}

              {/* <!-- Add more cart items here as needed --> */}
            </div>

            <div class="w-full lg:w-1/4 my-4 border-2 p-3 rounded-lg">
              <div id="order_summary" className="border-2 rounded-lg p-4">
                <h4 class="text-xl font-semibold">Order Summary</h4>
                <hr class="my-4" />
                <p>
                  Units: <span class="order-summary-values">{cartItems?.reduce((acc, item) =>acc + item?.quantity, 0)} (Units)</span>
                </p>
                <p>
                  Est. total: <span class="order-summary-values">${cartItems?.reduce((acc, item) =>acc + item?.quantity * item?.price, 0).toFixed(2)}</span>
                </p>
                <hr class="my-4" />
                <button class="relative h-[43px] rounded-md w-full overflow-hidden border border-black bg-white text-black shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-black before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-black after:duration-500 hover:text-white hover:shadow-black hover:before:h-2/4 hover:after:h-2/4">
                  <span class="relative z-10">Checkout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
