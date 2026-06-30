import React from 'react'

const HeroSection = () => {
  return (
    <div
  className="hero min-h-[400px] "
  style={{
    backgroundImage:
      "url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop)",
  }}
>
  <div className="hero-overlay "></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Step into Style</h1>
      <p className="mb-5">
        Discover our latest collection of premium Products
      </p>

    </div>
  </div>
</div>
  )
}

export default HeroSection
