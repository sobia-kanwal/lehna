/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { useState, useEffect } from "react"
import { HiOutlineMenuAlt4 } from "react-icons/hi"
import { BsHandbag, BsHeart, BsSearch, BsPerson } from "react-icons/bs"
import { FaFacebookF, FaTwitter, FaPinterestP, FaInstagram } from "react-icons/fa"
import { IoClose } from "react-icons/io5"
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"

/* eslint-disable @next/next/no-img-element */

export default function Navbar({ quantity }) {
  const [showMenu, setShowMenu] = useState(false)
  const [isFixed, setIsFixed] = useState(false)
  const { data: session, status } = useSession()

  const handleMenu = () => {
    setShowMenu(!showMenu)
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      
      // Make header fixed when scroll reaches viewport height
      if (scrollY >= viewportHeight) {
        if (!isFixed) {
          setIsFixed(true)
          // Get header height and set CSS variable
          const headerElement = document.querySelector('.header__main')
          if (headerElement) {
            const headerHeight = headerElement.offsetHeight
            document.documentElement.style.setProperty('--header-height', `${headerHeight}px`)
            document.body.classList.add('header-fixed')
          }
        }
      } else {
        if (isFixed) {
          setIsFixed(false)
          document.body.classList.remove('header-fixed')
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.body.classList.remove('header-fixed')
    }
  }, [isFixed])

  return (
    <div className="lehna-header">
      <div className={`header__main ${isFixed ? 'header__main--fixed' : ''}`}>
        <div className="header__main-wrap">
          {/* Social Icons */}
          <div className="header-social">
            <a 
              rel="nofollow noreferrer" 
              className="header__icon header-social__icon" 
              title="Facebook" 
              target="_blank" 
              href="https://www.facebook.com/lehnamcr"
            >
              <FaFacebookF />
            </a>
            <a 
              rel="nofollow noreferrer" 
              className="header__icon header-social__icon" 
              title="Twitter" 
              target="_blank" 
              href="https://x.com/lehnadirect"
            >
              <FaTwitter />
            </a>
            <a 
              rel="nofollow noreferrer" 
              className="header__icon header-social__icon" 
              title="Pinterest" 
              target="_blank" 
              href="https://www.pinterest.co.uk/lehnadirect/_created/"
            >
              <FaPinterestP />
            </a>
            <a 
              rel="nofollow noreferrer" 
              className="header__icon header-social__icon" 
              title="Instagram" 
              target="_blank" 
              href="https://www.instagram.com/lehnadirect/"
            >
              <FaInstagram />
            </a>
          </div>

          {/* Logo */}
          <Link href="/" className="header-logo">
            LEHNA
          </Link>

          {/* Right Side Icons */}
          <div className="header-icons">
            {/* Currency Selector */}
            <div className="header-currency">
              <select className="header-currency__select">
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="USD">USD</option>
              </select>
            </div>

            {/* Search */}
            <div className="header-search">
              <form className="header-search__form" action="/search" method="get" role="search">
                <input 
                  className="header-search__input" 
                  name="q" 
                  type="search" 
                  placeholder="Search" 
                  autoComplete="off"
                />
                <button className="header-search__submit" type="submit" title="Search">
                  <BsSearch />
                </button>
              </form>
            </div>

            {/* Search Icons */}
            <Link href="/a/search" className="header__icon header-wishlist" title="My Wishlist">
              <BsSearch />
            </Link>

                <li className="nav__item nav__dropdown nav__single">
                  <Link href="" className="header__icon header-account">
                     <BsPerson />
                  </Link>
                  {session ? (
                  <ul className="nav__sub-menu">
                    <li className="nav__sub-menu__item nav__sub-menu__item--view-all"><span className="nav__account-link">Welcome, {session.firstName || session.user?.email}</span></li>
                    <li className="nav__sub-menu__item nav__sub-menu__item--view-all">
                      <Link href="/profile" className="nav__account-link" title="My Profile">
                        My Profile
                      </Link>
                      </li>
                      {session.isAdmin && (
                    <li className="nav__sub-menu__item nav__sub-menu__item--view-all">
                        <Link href="/admin/dashboard" className="nav__account-link" title="Admin Dashboard">
                          Admin Dashboard
                        </Link>
                        </li>
                      )}
                    <li className="nav__sub-menu__item nav__sub-menu__item--view-all">
                        <a href="#" target="_self"
                          onClick={() => signOut()} 
                          className="nav__account-link" 
                          title="Sign Out"
                        >
                          Sign Out
                        </a>
                    </li>
                  </ul> ) : (
                  <ul className="nav__sub-menu">
                    <li className="nav__sub-menu__item nav__sub-menu__item--view-all">
                       <Link href="/auth/signin" className="header__icon header__icon--account" title="Login">
                       Sign In
                       </Link>
                    </li>
                  </ul>
            )}
            </li>

            {/* Wishlist */}
            <Link href="/a/wishlist" className="header__icon header-wishlist" title="My Wishlist">
              <BsHeart />
            </Link>

            {/* Cart */}
            <Link href="/cart" className="header__icon header-basket" title="Shopping Cart">
              <BsHandbag />
              {quantity > 0 && (
                <span className="header__icon-count">
                  {quantity}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="header__icon header-mobile" 
              onClick={handleMenu}
              title="Navigation Menu"
            >
              <HiOutlineMenuAlt4 />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="header__nav">
          <div className="header__nav-wrap">
            <nav className={`header-nav ${showMenu ? 'header-nav--active' : ''}`} role="navigation">
              <ul className="nav">
                {/* New In */}
                <li className="nav__item">
                  <Link href="/products?category=new-in" className="nav__link nav__link--new-in">
                    New In<span></span>
                  </Link>
                </li>

                <li className="nav__item">
                  <Link href="/products?category=women" className="nav__link nav__link--new-in">
                    Women<span></span>
                  </Link>
                </li>

                <li className="nav__item">
                  <Link href="/products?category=men" className="nav__link nav__link--new-in">
                    Men<span></span>
                  </Link>
                </li>

                <li className="nav__item">
                  <Link href="kids" className="nav__link nav__link--new-in">
                    Kids<span></span>
                  </Link>
                </li>

                {/* Trends */}
                <li className="nav__item nav__dropdown nav__single">
                  <Link href="/products?category=trends" className="nav__link nav__link--trends">
                    Trends<span></span>
                  </Link>
                  <ul className="nav__sub-menu">
                    <li className="nav__sub-menu__back">Trends</li>
                    <li className="nav__sub-menu__item nav__sub-menu__item--view-all">
                      <Link href="/collections/trends" className="nav__sub-menu__link nav__sub-menu__link--view-all">
                        View All Trends
                      </Link>
                    </li>
                    <li className="nav__sub-menu__item nav__sub-menu__item--single">
                      <Link href="/collections/autumn-winter" className="nav__sub-menu__link nav__sub-menu__link--single">
                        Autumn Winter
                      </Link>
                    </li>
                    <li className="nav__sub-menu__item nav__sub-menu__item--single">
                      <Link href="/collections/celebrity-style" className="nav__sub-menu__link nav__sub-menu__link--single">
                        Celebrity Style
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* Footwear */}
                <li className="nav__item">
                  <Link href="/collections/wholesale-footwear" className="nav__link nav__link--footwear">
                    Footwear<span></span>
                  </Link>
                </li>

                {/* Sale */}
                <li className="nav__item">
                  <Link href="/collections/sale" className="nav__link nav__link--sale">
                    Sale<span></span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="nav-overlay"></div>
        <div className={`mobile-nav-overlay ${showMenu ? 'mobile-nav-overlay--active' : ''}`}></div>
      </div>
    </div>
  )
}

function Categories() {
  return (
    <>
      <li>
        <Link
          href="/products?category=men"
          className="text-sm hover:text-violet-600 transition-colors"
        >
          Mens
        </Link>
      </li>
      <li>
        <Link
          href="/products?category=women"
          className="text-sm hover:text-violet-600 transition-colors"
        >
          Women
        </Link>
      </li>
      <li>
        <Link
          href="/products?category=kids"
          className="text-sm hover:text-violet-600 transition-colors"
        >
          Kids
        </Link>
      </li>
    </>
  )
}

