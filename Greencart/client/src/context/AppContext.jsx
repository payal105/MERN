import { createContext,useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import {assets, dummyProducts} from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext()

export const AppContextProvider = ({children}) => {
    const navigate = useNavigate();
    const [user,setUser] = useState(null);
    const [isSeller,setIsSeller] = useState(false);
    const [showUserLogin,setShowUserLogin] = useState(false);
    const [products,setProducts] = useState([]);
    const [cartItems,setCartItems] = useState({});
    const [searchQuery,setSearchQuery] = useState({});


    const currency = import.meta.VITE_CURRENCY;

    //Fetch all products
    const fetchProducts = async () => {
        setProducts(dummyProducts);
    }

    //Add product to cart
    const addToCart = (itemId) =>{
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId] += 1;
        }
        else{
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Added to cart");
    }
    //Update cart
    const updateCartItems = (itemId,quantity) =>{
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;

        setCartItems(cartData);
        toast.success("Cart updated");
    }

    //Remove product from cart
    const removeFromCart = (itemId) =>{
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]){
            cartData[itemId] -= 1;
            if(cartData[itemId] === 0){
                delete cartData[itemId];
            }
        }
        setCartItems(cartData);
        toast.success("Removed from cart");
    }

    useEffect(() => {
        fetchProducts();
    },[])

    const value = {navigate,user,setUser,isSeller,setIsSeller,showUserLogin,setShowUserLogin,products,currency,addToCart,updateCartItems,removeFromCart,cartItems,searchQuery,setSearchQuery};

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext)
}