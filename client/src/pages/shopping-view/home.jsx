import { Button } from "@/components/ui/button";
import {
  Airplay, BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightning,
  Heater, Images, Shirt, ShirtIcon, ShoppingBasket, UmbrellaIcon,
  WashingMachine, WatchIcon, Loader2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState, useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts, fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";
import PromoBanner from "../PromoBanner";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
];

// Memoized Category Card component
const CategoryCard = memo(({ item, onClick }) => (
  <Card
    onClick={onClick}
    className="cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300"
  >
    <CardContent className="flex flex-col items-center justify-center p-6">
      <item.icon className="w-12 h-12 mb-4 text-primary" aria-hidden />
      <span className="font-bold">{item.label}</span>
    </CardContent>
  </Card>
));

// Banner Slider component
const BannerSlider = ({ slides, currentSlide, setCurrentSlide }) => {
  if (!slides || slides.length === 0) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-lg text-gray-500">
        No banners available.
      </div>
    );
  }

  return (
    <>
      {slides.map((slide, index) => (
        <img
          src={slide?.image}
          alt={`Slide ${index + 1}`}
          key={index}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Navigation buttons */}
      {slides.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setCurrentSlide((prev) =>
                (prev - 1 + slides.length) % slides.length
              )
            }
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            aria-label="Previous slide"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setCurrentSlide((prev) => (prev + 1) % slides.length)
            }
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            aria-label="Next slide"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </>
      )}
    </>
  );
};

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails, isLoading } = useSelector((state) => state.shopProducts);
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNavigateToListingPage = useCallback((item, section) => {
    sessionStorage.removeItem("filters");
    const currentFilter = { [section]: [item.id] };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }, [navigate]);

  const handleGetProductDetails = useCallback((productId) => {
    dispatch(fetchProductDetails(productId));
  }, [dispatch]);

  const handleAddToCart = useCallback((productId) => {
    if (!user?.id) {
      toast({ 
        title: "Please sign in", 
        description: "You need to sign in to add items to your cart",
        variant: "destructive" 
      });
      navigate("/auth/login");
      return;
    }
    
    dispatch(addToCart({ userId: user.id, productId, quantity: 1 })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user.id));
        toast({ 
          title: "Added to cart",
          description: "Product has been added to your cart",
          variant: "default" 
        });
      } else {
        toast({ 
          title: "Failed to add product", 
          description: data?.payload?.message || "Something went wrong",
          variant: "destructive" 
        });
      }
    });
  }, [dispatch, user, toast, navigate]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    if (featureImageList.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 3000); // Changed from 15000 to 8000 for better engagement
    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    const loadInitialData = async () => {
      await dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: "price-lowtohigh" }));
      await dispatch(getFeatureImages());
    };
    
    loadInitialData();
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Feature Banner Slider */}
      <div className="relative w-full h-96 md:h-[600px] overflow-hidden">
        <BannerSlider 
          slides={featureImageList} 
          currentSlide={currentSlide} 
          setCurrentSlide={setCurrentSlide} 
        />
      </div>

      {/* Category Section */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {categoriesWithIcon.map((item) => (
              <CategoryCard
                key={item.id}
                item={item}
                onClick={() => handleNavigateToListingPage(item, "category")}
              />
            ))}
          </div>
        </div>
      </section>

      <PromoBanner />

      {/* Brands Section */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {brandsWithIcon.map((item) => (
              <CategoryCard
                key={item.id}
                item={item}
                onClick={() => handleNavigateToListingPage(item, "brand")}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">Featured Products</h2>
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-2">Loading products...</span>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {productList?.length > 0 ? (
                  productList.slice(0, 8).map((product) => (
                    <ShoppingProductTile
                      key={product.id}
                      handleGetProductDetails={handleGetProductDetails}
                      product={product}
                      handleAddtoCart={handleAddToCart}
                    />
                  ))
                ) : (
                  <p className="col-span-full text-center text-gray-500 py-8">
                    No products found.
                  </p>
                )}
              </div>
              {productList?.length > 8 && (
                <div className="text-center mt-8">
                  <Button onClick={() => navigate("/shop/listing")} className="px-8">
                    See All Products
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;