import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Stripe from "stripe";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

//Create stripe checkout session - /api/v1/payment/checkout_session

export const stripeCheckoutSession = catchAsyncErrors(
  async (req, res, next) => {
    const body = req?.body;



    const line_items = body?.orderItems?.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item?.name,
            images: [item?.image],
            metadata: { productId: item?.product },
          },
          unit_amount: item?.price * 100
        },
        tax_rates: ["txr_1PImxfGpvx6Hh5FaduVUE5Hg"],
        quantity: item?.quantity
      };
    });

    const shippingInfo = body?.shippingInfo

    const shipping_rate =
      body?.itemsPrice >= 200
        ? "shr_1PImoDGpvx6Hh5FajLZvkL4N"
        : "shr_1PImp2Gpvx6Hh5FaKJszEKka";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `${process.env.FRONTEND_URL}/me/orders`,
      cancel_url: `${process.env.FRONTEND_URL}`,
      customer_email: req?.user?.email,
      client_reference_id: req?.user?._id?.toString(),
      mode: "payment",
      metadata: {...shippingInfo, itemsPrice: body?.itemsPrice},
      shipping_options: [
        {
          shipping_rate,
        },
      ],
      line_items,
    });


    res.status(200).json({
        url: session.url,

    })
  }
);
