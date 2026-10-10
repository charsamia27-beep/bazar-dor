# 🛒 বাজার দর (BazarDor)

**বাজার দর** হলো বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের দাম এক নজরে দেখার একটি ওয়েব অ্যাপ। চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলার আজকের দাম, দামের পরিবর্তন এবং বিভিন্ন বাজারভিত্তিক সর্বনিম্ন-সর্বাধিক-গড় দাম এখানে দেখা যায়।

**Live Link:** _add your link_  
**GitHub Repo:** _add your link_

## 🛠️ Technologies Used
- **Next.js 15** (App Router)
- **React 19**
- **Tailwind CSS v4** + **DaisyUI v5**
- **BetterAuth** (Email/Password, Google, GitHub) + **MongoDB**
- **react-hot-toast** (notifications)
- Bazar Dor REST API

## ✨ Key Features
1. **Live price ticker** — নেভবারের নিচে সব পণ্যের দাম ও ▲/▼ পরিবর্তন নিয়ে অবিরাম স্ক্রলিং স্ট্রিপ।
2. **আজ দাম বেড়েছে / কমেছে** — সবচেয়ে বেশি বেড়েছে ও কমেছে এমন ৬টি করে পণ্য।
3. **Category page with sorting** — ক্যাটাগরি অনুযায়ী পণ্য, দাম কম→বেশি / বেশি→কম সাজানো (সংখ্যার মান অনুযায়ী)।
4. **Protected product details** — লগইন করা ব্যবহারকারীর জন্য সর্বনিম্ন, সর্বাধিক, গড় দাম ও বাজারভিত্তিক টেবিল।
5. **Authentication** — ইমেইল/পাসওয়ার্ড, Google ও GitHub লগইন, প্রোফাইল ও নাম আপডেট।
6. **Fully responsive** — মোবাইল, ট্যাবলেট ও ডেস্কটপে সুন্দরভাবে চলে; skeleton loading ও 404 পেজ সহ।

## 🚀 Run Locally
```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

## 🔐 Environment Variables
```
MONGODB_URI=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```
