# Simple Calendar App

A beautiful and responsive calendar application built with React. This app features a clean, modern design with month navigation and date selection functionality.

## Features

- 📅 Monthly calendar view
- 🔄 Navigate between months with arrow buttons
- 📱 Responsive design for mobile and desktop
- 🎯 Click to select dates
- ✨ Modern, clean UI with smooth animations
- 🗓️ Highlights today's date
- 📍 Shows selected date information

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Simple-Calendar-App
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode. The page will reload when you make changes.

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## Project Structure

```
src/
  ├── components/
  │   ├── Calendar.js      # Main calendar component
  │   └── Calendar.css     # Calendar-specific styles
  ├── App.js              # Main app component
  ├── App.css             # App-level styles
  ├── index.js            # Entry point
  └── index.css           # Global styles
```

## Technologies Used

- **React** - A JavaScript library for building user interfaces
- **CSS3** - For modern styling and responsive design
- **Create React App** - For project setup and build configuration

## How to Use

1. The calendar opens to the current month
2. Use the left and right arrow buttons to navigate between months
3. Click on any date to select it
4. The selected date will be highlighted and displayed below the calendar
5. Today's date is automatically highlighted with a special indicator

## Customization

You can easily customize the calendar by modifying the CSS files:

- `src/components/Calendar.css` - Calendar-specific styles
- `src/App.css` - Main app styles
- `src/index.css` - Global styles

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with Create React App
- Inspired by modern calendar designs
- Uses CSS Grid for responsive layout
