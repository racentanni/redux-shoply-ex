import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const SecretDiscountsPage = () => {
  const coupons = useSelector((state: any) => state.root.coupons);
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState('');

  const addCoupon = () => {
    if (couponCode && !coupons.includes(couponCode)) {
      dispatch({ type: 'ADD_COUPON', payload: couponCode });
      setCouponCode('');
    }
  };

  const removeCoupon = (coupon: string) => {
    dispatch({ type: 'REMOVE_COUPON', payload: coupon });
  };

  return (
    <div className="container">
      <h2>Secret Discounts Page</h2>
      <div className="form-group">
        <label htmlFor="couponCode">Coupon Code</label>
        <input
          type="text"
          id="couponCode"
          className="form-control"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <button onClick={addCoupon} className="btn btn-primary mt-2">Add Coupon</button>
      </div>
      <h3>Existing Coupons</h3>
      <ul className="list-group">
        {coupons.map((coupon: string) => (
          <li key={coupon} className="list-group-item d-flex justify-content-between align-items-center">
            {coupon}
            <button onClick={() => removeCoupon(coupon)} className="btn btn-danger btn-sm">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SecretDiscountsPage;