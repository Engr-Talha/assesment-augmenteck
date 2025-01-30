// src/utils/calculations.ts
export const calculateItemTotal = (quantity: number, price: number): number => {
    return quantity * price;
  };
  
  export const calculateSubtotal = (items: Array<{ quantity: number; price: number }>): number => {
    return items.reduce((sum, item) => sum + calculateItemTotal(item.quantity, item.price), 0);
  };
  
  export const calculateTax = (subtotal: number): number => {
    return subtotal * 0.10; // 10% tax
  };
  
  export const calculateTotal = (subtotal: number): number => {
    return subtotal - calculateTax(subtotal);
  };