# Poster Maker

A web application that allows users to upload images and split them into A4-sized pieces for poster printing. Perfect for creating large posters from regular printer paper.

## Features

- 🖼**Image Upload**: Drag and drop or click to upload images
- **Custom Dimensions**: Input desired poster size in inches
- **Grid Preview**: Visual guide showing how the poster will be split
- **PDF Generation**: Creates properly scaled PDF pages
- **Easy Assembly**: Images positioned for minimal cutting
- **Custom Naming**: Name your PDF files
- **Download Confirmation**: Visual feedback when download is complete

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS
- **PDF Generation**: jsPDF
- **File Handling**: react-dropzone
- **Deployment**: Vercel

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/arnav-k1/posterMaker.git
   ```

2. **Install dependencies**
   ```bash
   cd postermaker
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## Usage

1. Upload an image by dragging and dropping or clicking to select
2. Enter the desired dimensions in inches
3. Preview how the poster will be split into A4 pages
4. Enter a custom filename (optional)
5. Download the PDF
6. Print the pages
7. Cut and assemble the poster

## Development

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run lint`: Run ESLint

## Deployment

The application is automatically deployed to Vercel when changes are pushed to the main branch.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you find this tool useful, consider buying me a chocolate milk:
- Venmo: @arnav-k

## Acknowledgments

- Next.js team for the amazing framework
- Vercel for the deployment platform
- All the open-source libraries that made this possible
