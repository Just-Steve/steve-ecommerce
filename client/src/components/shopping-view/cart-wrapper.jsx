import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle, SheetFooter } from "../ui/sheet";
import { ShoppingBag, ArrowRight } from "lucide-react";
import UserCartItemsContent from "./cart-items-content";
import { useEffect, useState } from "react";

function UserCartWrapper({ cartItems = [], setOpenCartSheet, removeCartItem }) {
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [animateTotal, setAnimateTotal] = useState(false);
  const [prevTotal, setPrevTotal] = useState(0);

  const totalCartAmount = cartItems.reduce((sum, item) => {
    const price = item?.salePrice > 0 ? item.salePrice : item.price || 0;
    return sum + price * (item?.quantity || 1);
  }, 0);

  // Detect changes in total amount to trigger animation
  useEffect(() => {
    if (prevTotal !== totalCartAmount && prevTotal !== 0) {
      setAnimateTotal(true);
      const timer = setTimeout(() => setAnimateTotal(false), 1000);
      return () => clearTimeout(timer);
    }
    setPrevTotal(totalCartAmount);
  }, [totalCartAmount, prevTotal]);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    setIsCheckingOut(true);
    setTimeout(() => {
      navigate("/shop/checkout");
      setOpenCartSheet(false);
      setIsCheckingOut(false);
    }, 500);
  };

  return (
    <SheetContent className="flex flex-col h-full sm:max-w-md">
      <SheetHeader className="border-b pb-4">
        <SheetTitle className="flex items-center">
          <ShoppingBag className="mr-2 h-5 w-5" />
          Your Cart ({cartItems.length})
        </SheetTitle>
      </SheetHeader>

      <div className="flex-grow overflow-y-auto py-4">
        {cartItems.length > 0 ? (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <UserCartItemsContent 
                key={item.id || item._id} 
                cartItem={item} 
                removeItem={removeCartItem}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-gray-500 mb-4">Your cart is empty.</p>
            <Button 
              variant="outline" 
              onClick={() => {
                navigate("/shop");
                setOpenCartSheet(false);
              }}
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </div>

      <SheetFooter className="border-t pt-4">
        <div className="w-full space-y-4">
          {cartItems.length > 0 && (
            <>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subtotal</span>
                <span>${totalCartAmount.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Shipping</span>
                <span>{totalCartAmount > 50 ? "Free" : "$5.99"}</span>
              </div>
              
              <div className="flex justify-between font-bold text-lg items-center">
                <span>Total</span>
                <span className={`transition-all ${animateTotal ? "text-green-600 scale-110" : ""}`}>
                  ${(totalCartAmount > 50 ? totalCartAmount : totalCartAmount + 5.99).toFixed(2)}
                </span>
              </div>
            </>
          )}

          <Button
            onClick={handleCheckout}
            className="w-full"
            disabled={cartItems.length === 0 || isCheckingOut}
          >
            {isCheckingOut ? (
              "Processing..."
            ) : (
              <>
                Checkout <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          
          {cartItems.length > 0 && (
            <Button
              variant="ghost"
              className="w-full text-gray-500"
              onClick={() => {
                navigate("/shop");
                setOpenCartSheet(false);
              }}
            >
              Continue Shopping
            </Button>
          )}
        </div>
      </SheetFooter>
    </SheetContent>
  );
}

export default UserCartWrapper;