/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51IC61kIMxw1F9JEDm5bJnj7smrXdkDD96fcTLQPqE6FKNksxy4F8DFEpA2WdX0yPvRct4aIaBL6WQyW13kZ9J0dr00gorOz3eH'
);

export const bookTour = async tourId => {
  try {
    //1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    //2) Create checkout form to charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
