# Birthday Surprise Web App 🎂💝

A beautiful, interactive birthday surprise web page built with React and Tailwind CSS.

## Features

- **Opening Page**: A warm greeting with an animated heart
- **Reasons Page**: 10 interactive cards that reveal reasons why you love her when tapped
- **Birthday Letter**: A heartfelt birthday message that unlocks after all reasons are revealed

## How to Use

1. Open `index.html` in any modern web browser
2. Click through the experience:
   - Start with the greeting page
   - Tap each card to reveal a reason
   - Once all reasons are revealed, open the birthday letter

## Customization

### Edit the Reasons
In `app.js`, find the `reasons` array in the `ReasonsPage` component and modify the reasons:

```javascript
const reasons = [
  "Your smile brightens my darkest days",
  "The way you laugh makes my heart skip a beat",
  // Add or modify reasons here...
];
```

### Edit the Birthday Message
In `app.js`, find the `BirthdayLetter` component and customize the message in the paragraphs.

### Change Colors
The app uses a pink and purple color scheme. To change colors, modify the Tailwind classes:
- `from-pink-500 to-purple-500` for gradient backgrounds
- `text-pink-600`, `text-purple-700` for text colors
- `bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200` for the main background

## Technologies Used

- React 18
- Tailwind CSS
- Google Fonts (Dancing Script & Poppins)
- Pure HTML/CSS animations

## Deployment

You can deploy this to:
- **GitHub Pages**: Upload to a GitHub repo and enable Pages
- **Netlify**: Drag and drop the folder
- **Vercel**: Import the folder
- Or simply open the `index.html` file locally!

Enjoy the surprise! ❤️
