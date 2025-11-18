import camera_image from '@/assets/camera.jpg'
import charging_pad_image from '@/assets/charging_pad.jpg'
import earbuds_image from '@/assets/earbuds.jpg'
import headphone_image from '@/assets/headphones.jpg'
import home_speaker_image from '@/assets/home_speaker.jpg'
import keyboard_image from '@/assets/keyboard.jpg'
import laptop_image from '@/assets/laptop.jpg'
import moniter_image from '@/assets/moniter.jpg'
import mouse_image from '@/assets/mouse.jpg'
import smart_phone_image from '@/assets/smart_phone.jpg'
import smart_watch_image from '@/assets/smart_watch.jpg'
import speaker_image from '@/assets/speaker.jpg'
import ssd_image from '@/assets/ssd.jpg'
import tablet_image from '@/assets/tablet.jpg'
import tv_image from '@/assets/tv.jpg'

export const camera = camera_image;
export const charging_pad = charging_pad_image;
export const earbuds = earbuds_image;
export const headphone = headphone_image;
export const home_speaker = home_speaker_image;
export const keyboard = keyboard_image;
export const laptop = laptop_image;
export const moniter = moniter_image;
export const mouse = mouse_image;
export const smart_phone = smart_phone_image;
export const smart_watch = smart_watch_image;
export const speaker = speaker_image;
export const ssd = ssd_image;
export const tablet = tablet_image;
export const tv = tv_image;

export const featured = [
  {
    id: 1,
    sellerId: 201,
    title: "4K Ultra HD Smart TV 55”",
    description: "High-definition smart TV with HDR and streaming apps built-in.",
    price: 599,
    img: [tv],
    category: "Electronics",
    stockCount: 4,
    rating: 4.7,
    reviews: [
      { user: "John D.", comment: "Great picture quality and colors!" },
      { user: "Emily R.", comment: "Perfect for movies and streaming." },
    ],
    tags: ["4K", "Smart TV", "HDR", "Wi-Fi"],
  },
  {
    id: 2,
    sellerId: 202,
    title: "Wireless Noise Cancelling Headphones",
    description: "Premium over-ear headphones with active noise cancellation.",
    price: 199,
    img: [headphone],
    category: "Audio",
    stockCount: 12,
    rating: 4.5,
    reviews: [
      { user: "Liam K.", comment: "Noise cancellation is top-notch!" },
      { user: "Sophia T.", comment: "Comfortable and great sound quality." },
    ],
    tags: ["Wireless", "Noise Cancelling", "Bluetooth"],
  },
  {
    id: 3,
    sellerId: 203,
    title: "Bluetooth Portable Speaker",
    description: "Compact waterproof speaker with deep bass and long battery life.",
    price: 89,
    img: [speaker],
    category: "Audio",
    stockCount: 20,
    rating: 4.6,
    reviews: [
      { user: "Noah P.", comment: "Amazing sound for its size!" },
      { user: "Olivia C.", comment: "Perfect for outdoor use." },
    ],
    tags: ["Bluetooth", "Waterproof", "Portable"],
  },
  {
    id: 4,
    sellerId: 204,
    title: "Smartphone 128GB 5G",
    description: "Latest generation 5G smartphone with ultra-wide camera.",
    price: 799,
    img: [smart_phone],
    category: "Mobile",
    stockCount: 10,
    rating: 4.8,
    reviews: [
      { user: "Ethan L.", comment: "Fast and smooth performance!" },
      { user: "Ava M.", comment: "Camera quality is excellent." },
    ],
    tags: ["5G", "Smartphone", "Camera"],
  },
  {
    id: 5,
    sellerId: 205,
    title: "Laptop 15.6” i7 16GB RAM",
    description: "Powerful laptop for productivity and gaming.",
    price: 1099,
    img: [laptop],
    category: "Computers",
    stockCount: 6,
    rating: 4.7,
    reviews: [
      { user: "Jacob H.", comment: "Handles multitasking with ease." },
      { user: "Mia B.", comment: "Perfect for both work and play." },
    ],
    tags: ["Laptop", "i7", "16GB RAM", "Gaming"],
  },
  {
    id: 6,
    sellerId: 206,
    title: "Gaming Mouse RGB",
    description: "Ergonomic gaming mouse with adjustable DPI and RGB lighting.",
    price: 49,
    img: [mouse],
    category: "Accessories",
    stockCount: 18,
    rating: 4.4,
    reviews: [
      { user: "Lucas V.", comment: "Smooth tracking and cool lights!" },
      { user: "Emma F.", comment: "Feels great for long sessions." },
    ],
    tags: ["Gaming", "RGB", "Mouse", "DPI"],
  },
  {
    id: 7,
    sellerId: 207,
    title: "Mechanical Keyboard",
    description: "Backlit mechanical keyboard with customizable keys.",
    price: 89,
    img: [keyboard],
    category: "Accessories",
    stockCount: 14,
    rating: 4.6,
    reviews: [
      { user: "Daniel S.", comment: "Satisfying clicks and great feel." },
      { user: "Grace W.", comment: "Perfect for typing and gaming." },
    ],
    tags: ["Mechanical", "Keyboard", "Backlit"],
  },
  {
    id: 8,
    sellerId: 208,
    title: "Smartwatch Series 6",
    description: "Fitness tracking and health monitoring smartwatch.",
    price: 299,
    img: [smart_watch],
    category: "Wearables",
    stockCount: 9,
    rating: 4.5,
    reviews: [
      { user: "Henry J.", comment: "Tracks fitness accurately." },
      { user: "Ella N.", comment: "Stylish and easy to use." },
    ],
    tags: ["Smartwatch", "Fitness", "Health"],
  },
  {
    id: 9,
    sellerId: 209,
    title: "Wireless Charging Pad",
    description: "Fast-charging pad for smartphones and earbuds.",
    price: 39,
    img: [charging_pad],
    category: "Accessories",
    stockCount: 25,
    rating: 4.3,
    reviews: [
      { user: "Sofia P.", comment: "Charges fast and looks sleek." },
      { user: "Leo G.", comment: "Works perfectly with my phone." },
    ],
    tags: ["Wireless", "Charging", "Fast Charge"],
  },
  {
    id: 10,
    sellerId: 210,
    title: "Action Camera 4K",
    description: "Compact waterproof camera ideal for adventure recording.",
    price: 249,
    img: [camera],
    category: "Cameras",
    stockCount: 7,
    rating: 4.6,
    reviews: [
      { user: "Harper T.", comment: "Perfect for travel videos!" },
      { user: "Mason L.", comment: "Sturdy and great video quality." },
    ],
    tags: ["Action", "Camera", "4K", "Waterproof"],
  },
  {
    id: 11,
    sellerId: 211,
    title: "Tablet 10.5” 128GB",
    description: "Lightweight tablet perfect for entertainment and productivity.",
    price: 499,
    img: [tablet],
    category: "Mobile",
    stockCount: 8,
    rating: 4.4,
    reviews: [
      { user: "Zoe D.", comment: "Great for streaming and reading." },
      { user: "Logan E.", comment: "Battery life is impressive." },
    ],
    tags: ["Tablet", "128GB", "Portable"],
  },
  {
    id: 12,
    sellerId: 212,
    title: "Bluetooth Earbuds",
    description: "True wireless earbuds with noise cancellation and long battery life.",
    price: 129,
    img: [earbuds],
    category: "Audio",
    stockCount: 30,
    rating: 4.5,
    reviews: [
      { user: "Nora P.", comment: "Fits perfectly, no drops." },
      { user: "James R.", comment: "Battery lasts the whole day." },
    ],
    tags: ["Bluetooth", "Wireless", "Noise Cancelling"],
  },
  {
    id: 13,
    sellerId: 213,
    title: "Smart Home Speaker",
    description: "Voice-controlled assistant speaker with Wi-Fi and Bluetooth.",
    price: 99,
    img: [home_speaker],
    category: "Smart Home",
    stockCount: 16,
    rating: 4.3,
    reviews: [
      { user: "Stella B.", comment: "Responds quickly to commands." },
      { user: "Eli C.", comment: "Great sound for its size." },
    ],
    tags: ["Smart", "Speaker", "Voice Control"],
  },
  {
    id: 14,
    sellerId: 214,
    title: "4K Monitor 27”",
    description: "Ultra HD monitor with vibrant color accuracy for professionals.",
    price: 349,
    img: [moniter],
    category: "Computers",
    stockCount: 11,
    rating: 4.7,
    reviews: [
      { user: "Isabella Q.", comment: "Crisp display and color accuracy." },
      { user: "Jack M.", comment: "Perfect for design work." },
    ],
    tags: ["4K", "Monitor", "Professional"],
  },
  {
    id: 15,
    sellerId: 215,
    title: "External SSD 1TB",
    description: "Portable solid-state drive with fast USB-C connectivity.",
    price: 159,
    img: [ssd],
    category: "Storage",
    stockCount: 22,
    rating: 4.8,
    reviews: [
      { user: "Violet R.", comment: "Super fast file transfers!" },
      { user: "Benjamin F.", comment: "Small and durable." },
    ],
    tags: ["SSD", "Portable", "USB-C"],
  },
];
