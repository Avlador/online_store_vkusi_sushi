import { create } from "zustand";

export interface CardType{
id: string;
title: string;
price: number
}

export interface CardItem extends CardType {
    quantity:number;
}


interface CardStore {
    items: CardItem[];
    addItems:(items: CardType) => void;
    removeItem: (id: string) => void;
    clearCard: () => void
}


export const UseCardStore = create<CardStore>((set) =>({
    items: [],
    addItems: (items) => set((state) => {
        const poiskItems = state.items.find(i => i.id === items.id);
        if (poiskItems){
            return{
                items: state.items.map(i => 
                    i.id === items.id ? {...i, quantity: i.quantity + 1} : i
                )
            };
        }
        return{items: [...state.items, {...items, quantity: 1}]};
    }),
removeItem: (id) => set((state) => ({
    items: state.items.filter(i => i.id !== id)
  })),

clearCard: () => set({ items: [] }),
    
}))

