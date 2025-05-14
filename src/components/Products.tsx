import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  nasiya: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("https://api.ashyo.fullstackdev.uz/products")
      .then((res) => setProducts(res.data.items));
  }, []);

  return (
    <div className="container max-w-[1440px] mx-auto">
      <div className="product">
        <h2 className="font-bold text-xl mt-[10px]">Most popular product</h2>
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          spaceBetween={24}
          slidesPerView={5}
          className="!pb-10"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="bg-white rounded-2xl shadow p-5 w-[260px] flex flex-col">
                <div className="bg-[#f3f6fa] rounded-xl h-[180px] flex items-center justify-center mb-4">
                  <img
                    src={`https://api.ashyo.fullstackdev.uz${product.image}`}
                    alt={product.name}
                    className="max-h-[140px] object-contain"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>
                <div className="flex-1">
                  <div className="text-[15px] font-medium mb-2">
                    {product.name}
                  </div>
                  <div className="text-[#545d6a] text-[14px] mb-2">
                    {product.description}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div>
                    <div className="text-[20px] font-bold text-[#222] mb-1">
                      {product.price} uzs
                    </div>
                    <div className="text-[13px] bg-pink-100 text-pink-600 rounded px-2 py-1 inline-block">
                      {product.nasiya}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-xl border border-[#e1e8f0] flex items-center justify-center">
                      <svg width="20" height="20" fill="none">
                        <path
                          d="M10 18s-6-4.35-6-8.5A3.5 3.5 0 0110 6a3.5 3.5 0 016 3.5C16 13.65 10 18 10 18z"
                          stroke="#545d6a"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </button>
                    <button className="w-10 h-10 rounded-xl bg-[#1756b0] flex items-center justify-center">
                      <svg width="20" height="20" fill="none">
                        <path
                          d="M6 6h12l-1.5 9h-9L6 6zm0 0V4a2 2 0 012-2h4a2 2 0 012 2v2"
                          stroke="#fff"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Products;
