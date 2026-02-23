import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CartItemPayload {
  productId: string;
  productName: string;
  productDescription: string;
  category: string;
  pricePerDay: number;
  imageSrc?: string;
  pricePerWeek: number | null;
  pricePerMonth: number | null;
}

export interface CartItem extends CartItemPayload {
  id: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemPayload>) => {
      const payload = action.payload;
      const id = payload.productId ?? payload.productName.toLowerCase().replace(/\s+/g, "-");
      const existing = state.items.find(item => item.id === id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          ...payload,
          id,
          quantity: 1
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(i => i.id !== id);
        } else {
          item.quantity = quantity;
        }
      }
    },
    clearCart: state => {
      state.items = [];
    }
  }
});

export const { addToCart, removeFromCart, setQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
