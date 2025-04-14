import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left side with local MP4 video and eCommerce text in a card */}
      <div className="relative hidden lg:flex w-1/2 items-center justify-center bg-black text-white px-8 py-8">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source
            src="https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/rC3rWV0BBk06c5omv/videoblocks-v1-0009_20230919-as-garelin-girlfriend-shopping-3-veermall-crossmedia000000_hcwwspspxa__f8035cea36e36254320c0fecb0e0bdb7__P360.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10 max-w-md w-full space-y-6 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 p-8 rounded-lg shadow-xl opacity-90">
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            Welcome to Your Ultimate Fashion Destination
          </h1>
          <p className="text-xl font-medium text-white">
            Explore the latest trends, exclusive collections, and unbeatable prices! Shop top-quality clothes for every occasion – from casual wear to elegant styles. Let your wardrobe shine with the best fashion deals.
          </p>
          <p className="text-lg text-white">
            Join us today and discover a shopping experience like never before. Stay ahead with the latest in fashion, right at your fingertips.
          </p>
        </div>
      </div>

      {/* Right side with outlet and growing card */}
      <div className="relative flex flex-col w-full lg:w-1/2 items-center justify-center bg-black px-4 py-8">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source
            src="https://v.ftcdn.net/03/54/75/22/700_F_354752265_79Jf1KiqZjb2wairN6j1DxwQTlVnccIa_ST.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Form Card */}
        <div className="relative z-10 max-w-md w-full space-y-6 text-center bg-white p-8 rounded-lg shadow-xl opacity-90">
          <h2 className="text-2xl font-bold text-gray-800">Sign In</h2>

      

          {/* Render Outlet for additional components */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
