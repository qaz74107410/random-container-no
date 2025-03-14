# Container Number Generator

A web application that generates valid ISO 6346 shipping container numbers with customizable prefix positions. Built with Next.js, TypeScript, and Tailwind CSS.

![Container Number Generator](https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=1200&h=400)

## Features

- Generate valid ISO 6346 compliant container numbers
- Customize specific positions in the prefix while keeping others random
- Generate multiple container numbers at once (up to 10)
- Copy individual numbers or all generated numbers with one click
- Dark mode support
- Responsive design
- Real-time validation
- Toast notifications for user actions

## Technical Details

### Container Number Format (ISO 6346)

A container number consists of:
- 4 letters (owner code and category identifier)
- 6 numbers (serial number)
- 1 check digit (calculated according to ISO 6346)

Example: `ABCU123456-7`
- `ABC`: Owner code
- `U`: Category identifier
- `123456`: Serial number
- `7`: Check digit

### Check Digit Calculation

The check digit is calculated using a complex algorithm that:
1. Converts letters to numbers using specific weights
2. Applies position-based multiplication
3. Calculates the sum and performs modulo 11 operation
4. Handles special case where result is 10 (converts to 0)

## Technology Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Lucide React](https://lucide.dev/) - Icons
- [Sonner](https://sonner.emilkowal.ski/) - Toast notifications

## Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Building for Production

```bash
npm run build
```

This will create an optimized production build in the `out` directory.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for any purpose.

## Acknowledgments

- ISO 6346 specification for container identification
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful components
- Container image from [Unsplash](https://unsplash.com)