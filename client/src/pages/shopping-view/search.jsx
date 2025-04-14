import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import ProductDetailsDialog from "@/components/shopping-view/product-details";

import {
  getSearchResults,
  resetSearchResults,
} from "@/store/shop/search-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const debounceRef = useRef(null);

  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { toast } = useToast();

  const { searchResults, loading } = useSelector((state) => state.shopSearch);
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);

  useEffect(() => {
    const term = keyword.trim();

    clearTimeout(debounceRef.current);

    if (term.length >= 3) {
      debounceRef.current = setTimeout(() => {
        setSearchParams({ keyword: term });
        dispatch(getSearchResults(term));
      }, 500);
    } else {
      setSearchParams({ keyword: "" });
      dispatch(resetSearchResults());
    }
  }, [keyword]);

  const handleAddtoCart = (productId, totalStock) => {
    const items = cartItems.items || [];
    const existing = items.find((item) => item.productId === productId);

    if (existing && existing.quantity + 1 > totalStock) {
      toast({
        title: `Only ${existing.quantity} of this product can be added.`,
        variant: "destructive",
      });
      return;
    }

    dispatch(addToCart({ userId: user?.id, productId, quantity: 1 })).then(
      (res) => {
        if (res?.payload?.success) {
          dispatch(fetchCartItems(user?.id));
          toast({ title: "Product added to cart." });
        }
      }
    );
  };

  const handleGetProductDetails = (productId) => {
    dispatch(fetchProductDetails(productId));
  };

  useEffect(() => {
    if (productDetails) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="container mx-auto px-4 md:px-6 py-10">
      {/* 🔍 Search Bar */}
      <div className="flex flex-col items-center mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Search for Products
        </h2>
        <p className="text-gray-500 mb-4 max-w-md">
          Start typing to explore our product range.
        </p>

        <Input
          value={keyword}
          name="keyword"
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full max-w-lg py-6"
          placeholder="Search Products..."
        />
      </div>

      {/* 🔄 Search Results */}
      {loading && (
        <p className="text-center text-gray-500 mb-6 animate-pulse">
          Searching products...
        </p>
      )}

      {!loading && searchResults.length === 0 && keyword.length >= 3 && (
        <p className="text-center text-2xl text-gray-500 mb-8">
          😞 No results found.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {searchResults.map((product) => (
          <ShoppingProductTile
            key={product._id}
            product={product}
            handleAddtoCart={handleAddtoCart}
            handleGetProductDetails={handleGetProductDetails}
          />
        ))}
      </div>

      {/* 🧾 Product Details Dialog */}
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default SearchProducts;
