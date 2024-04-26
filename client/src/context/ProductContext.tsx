





// import { PropsWithChildren, createContext, useContext, useState } from "react";

// export interface IProduct {
//     _id: string;
//     name: string;
//     description: string;
//     price: number;
//     image: string;
//   }

//   const ProductContext = createContext<IProduct[]>([])

//   export const useProduct = () => {
//     useContext(ProductContext)
//   }

//   const ProductProvider = ({children}: PropsWithChildren) => {
//     const [products, setProducts] = useState<IProduct[]>([]);

//     return (
//         <ProductContext.Provider value= {{products, setProducts}}>
//             {children}
//         </ProductContext.Provider>
//     )
//   }


// // import { createContext, PropsWithChildren, useState } from "react";

// // interface IProduct {
// //     _id: string;
// //     name: string;
// //     description: string;
// //     price: number;
// //     image: string;
// // }

// // interface IProductContext {
// //     products: IProduct[];
// //     setProducts: React.Dispatch<React.SetStateAction<IProduct>>; 
// // }

// // // const initialProductContext: IProductContext = {
// // //     products: []
// // // };

// // const ProductContext = createContext<IProductContext | null>(null);

// // // export const useProductContext = () => useContext(ProductContext);

// // export const ProductProvider = ({children}: PropsWithChildren) => {
// //     const [products, setProducts] = useState<IProduct[]>([]);

// //     return (
// //         <ProductContext.Provider value={{ products, setProducts}}>
// //             {children}
// //         </ProductContext.Provider>
// //     );
// // }