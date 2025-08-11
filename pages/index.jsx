/* eslint-disable @next/next/no-img-element */
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import MainLayout from "../components/MainLayout"
import { useContext } from "react"
import HeadDocument from "../components/HeadDocument"
import Link from "next/link"
import CategoryItem from "../components/CategoryItem"
import Item from "../components/Item"
import Promo from "../components/Promo"
import axios from "axios"
import CartQtyContext from "../context/CartQty"
import getApiUrl from "../getApiUrl"
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]"

export async function getServerSideProps({ req, res }) {
  const session = await unstable_getServerSession(req, res, authOptions)

  // request from trending products and categories
  const API_URL = getApiUrl()
  let responses = null
  try {
    const trendingUrl = `${API_URL}/api/products?limit=8`
    const categoriesUrl = `${API_URL}/api/products/categories`
    console.log(trendingUrl)
    console.log(categoriesUrl)
    responses = await Promise.all([
      axios.get(trendingUrl),
      axios.get(categoriesUrl),
    ])
  } catch (error) {
    console.error(error)
  }

  return {
    props: {
      trending: responses[0].data,
      categories: responses[1].data,
      data: JSON.parse(JSON.stringify(session)),
    },
  }
}

const Index = ({ trending, categories, data: session }) => {
  // handles cart items quantity in the navbar
  const { cartQty, fetchCartQty } = useContext(CartQtyContext)
  if (session) fetchCartQty(session.id)

  return (
    <>
      <HeadDocument title="Wholesale Clothing UK | Clothing Suppliers | Wholesale Fashion – lehna Direct" />
      
      

      {/* Top Announcement Bar */}
      <div className="lehna-topbar">
        <div className="lehna-topbar-content">
          <div className="lehna-topbar-message uppercase">
           The Leading Women&#39;s Wholesale Fashion Company
          </div>
        </div>
      </div>

      {/* Header */}
      <Navbar quantity={cartQty} />

      {/* Hero Section */}
      <section className="lehna-hero-banner">
        <div className="lehna-hero-content">
          <div className="lehna-hero-text">
            <div className="lehna-hero-preheader">RENT YOUR STYLE</div>
            <h1 className="lehna-hero-title capitalize">
              WEAR LUXURY FOR LESS – RENT, LOVE, RETURN!
            </h1>
            <p className="lehna-hero-description">
            </p>
            <Link href="/products" className="lehna-hero-button">
              RENT NOW
            </Link>
          </div>
        </div>
      </section>

      <MainLayout>
        {/* Collections Section */}
        <section className="lehna-collections">
          <div className="lehna-collections-header">
            <div className="lehna-collections-preheader">FEATURED COLLECTIONS</div>
            <h2 className="lehna-collections-title">Shop by Collection</h2>
          </div>
          <div className="lehna-collections-grid">
            <Link href="/products?category=new-in" className="lehna-collection-item">
              <div 
                className="lehna-collection-image"
                style={{
                  backgroundImage: 'url(/images/IMG_1902.jpg)'
                }}
              >
                <div className="lehna-collection-overlay">
                  <div className="lehna-collection-content">
                    <div className="lehna-collection-btn">BRIDAL DRESSES</div>
                  </div>
                </div>
              </div>
            </Link>
            
            <Link href="/products?category=dresses" className="lehna-collection-item">
              <div 
                className="lehna-collection-image"
                style={{
                  backgroundImage: 'url(images/IMG_2418.jpg)'
                }}
              >
                <div className="lehna-collection-overlay">
                  <div className="lehna-collection-content">
                    <div className="lehna-collection-btn">FORMAL DRESSES</div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/products?category=outerwear" className="lehna-collection-item">
              <div 
                className="lehna-collection-image"
                style={{
                  backgroundImage: 'url(/images/IMG_20250331_102208.jpg)'
                }}
              >
                <div className="lehna-collection-overlay">
                  <div className="lehna-collection-content">
                    <div className="lehna-collection-btn">Casual Dresses</div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/products?category=tops" className="lehna-collection-item">
              <div 
                className="lehna-collection-image"
                style={{
                  backgroundImage: 'url(/images/IMG_1940.jpg)'
                }}
              >
                <div className="lehna-collection-overlay">
                  <div className="lehna-collection-content">
                    <div className="lehna-collection-btn">Accessories</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Categories Section */}
        {categories && categories.length !== 0 && (
          <section className="lehna-categories">
            <div className="lehna-categories-header">
              <div className="lehna-categories-preheader">SHOP BY CATEGORY</div>
              <h2 className="lehna-categories-title">Browse Our Categories</h2>
            </div>
            <div className="lehna-categories-grid">
              {categories.map((item) => {
                return (
                  <CategoryItem key={item} category={item[0]} image={item[1]} />
                )
              })}
            </div>
          </section>
        )}

        {/* Trending Products Section */}
        {trending && trending.length !== 0 && (
          <section className="lehna-products">
            <div className="lehna-products-header">
              <div className="lehna-products-preheader">TRENDING NOW</div>
              <h2 className="lehna-products-title">Popular Wholesale Items</h2>
            </div>
            <div className="lehna-products-grid">
              {trending.map((item) => {
                return <Item key={item._id} {...item} />
              })}
            </div>
          </section>
        )}

        {/* Why Choose Us Section */}
        <section className="lehna-collections">
          <div className="lehna-collections-header">
            <div className="lehna-collections-preheader">WHY CHOOSE lehna</div>
            <h2 className="lehna-collections-title">Your Trusted Wholesale Partner</h2>
          </div>
          <div className="lehna-collections-grid">
            <div className="lehna-collection-item">
              <div className="lehna-collection-image" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="lehna-collection-overlay">
                  <div className="lehna-collection-content">
                    <h3 className="lehna-collection-label">🚚 Fast Delivery</h3>
                    <p style={{ color: '#666', fontSize: '14px', marginTop: '10px' }}>
                      Quick dispatch and reliable UK delivery
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lehna-collection-item">
              <div className="lehna-collection-image" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="lehna-collection-overlay">
                  <div className="lehna-collection-content">
                    <h3 className="lehna-collection-label">💎 Quality Products</h3>
                    <p style={{ color: '#666', fontSize: '14px', marginTop: '10px' }}>
                      Premium wholesale fashion items
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lehna-collection-item">
              <div className="lehna-collection-image" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="lehna-collection-overlay">
                  <div className="lehna-collection-content">
                    <h3 className="lehna-collection-label">💰 Best Prices</h3>
                    <p style={{ color: '#666', fontSize: '14px', marginTop: '10px' }}>
                      Competitive wholesale pricing
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lehna-collection-item">
              <div className="lehna-collection-image" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="lehna-collection-overlay">
                  <div className="lehna-collection-content">
                    <h3 className="lehna-collection-label">📞 Expert Support</h3>
                    <p style={{ color: '#666', fontSize: '14px', marginTop: '10px' }}>
                      Dedicated customer service team
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>

      <Footer />
    </>
  )
}

export default Index
