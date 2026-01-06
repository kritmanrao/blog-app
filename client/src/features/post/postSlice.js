import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  searchPost: "",
};

const postSlice = createSlice({
  name: "post",
  reducers: {},
});

/*
import { createSlice } from "@reduxjs/toolkit"; 

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: {
            amount,
            purpose,
          },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    currencyConverting(state) {
      state.isLoading = true;
    },
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export function deposit(amount, currencyType) {
  if (currencyType === "INR")
    return { type: "account/deposit", payload: amount };

  return async function (dispatch, getState) {
    dispatch({ type: "account/currencyConverting" });
    const res = await fetch(
      `https://api.frankfurter.dev/v1/latest?base=${currencyType}&symbols=INR`
    );
    const data = await res.json();
    const converted = parseInt((amount * data.rates["INR"]).toFixed(2));
    dispatch({ type: "account/deposit", payload: converted });
  };
}

export default accountSlice.reducer;

/*  
export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        balance: state.balance + action.payload.amount,
        loanPurpose: action.payload.purpose,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        balance: state.balance - state.loan,
        loanPurpose: "",
      };
    case "account/currencyConverting":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}

export function deposit(amount, currencyType) {
  if (currencyType === "INR")
    return { type: "account/deposit", payload: amount };

  return async function (dispatch, getState) {
    dispatch({ type: "account/currencyConverting" });
    const res = await fetch(
      `https://api.frankfurter.dev/v1/latest?base=${currencyType}&symbols=INR`
    );
    const data = await res.json();
    const converted = parseInt((amount * data.rates["INR"]).toFixed(2));
    dispatch({ type: "account/deposit", payload: converted });
  };
}
export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}
export function payLoan() {
  return { type: "account/payLoan" };
}


*/
