# Zenpep Payer Coverage Map - Veeva CLM

An interactive payer coverage map for Zenpep therapeutic, optimized for Veeva CLM on iPad devices.

## Features

- **Interactive US Map**: Touch-friendly SVG map with all 50 states
- **Coverage Information**: Visual representation of payer coverage percentages
- **Detailed State Data**: Click/tap any state to view:
  - Coverage percentage
  - Major payers covering Zenpep
  - Z-Save program information
  - Prior authorization details
- **iPad Optimized**: Designed specifically for Veeva CLM on iPad
- **Offline Ready**: No external dependencies, runs completely locally
- **Veeva Integration**: Built-in Veeva CLM tracking for interactions

## Coverage Legend

- 🟢 **High Coverage (85%+)**: Excellent market access
- 🟡 **Medium Coverage (75-84%)**: Good market access
- 🔴 **Lower Coverage (<75%)**: Limited market access

## Technical Specifications

- **Framework**: Vanilla HTML/CSS/JavaScript (no build tools required)
- **Compatibility**: iPad, Veeva CLM environment
- **Dependencies**: None (fully self-contained)
- **File Size**: Optimized for Veeva CLM file size limits

## File Structure

```
src/
├── index.html          # Main HTML file
├── app.js             # Main application logic
├── styles/
│   └── app.css        # Styling optimized for iPad
├── components/
│   └── PayerMap.js    # Future modular components
└── assets/            # Future assets (images, icons)
```

## Veeva CLM Integration

### Installation

1. **Prepare Files**: Ensure all files are in the `src/` directory
2. **Upload to Veeva**: Upload the entire `src/` folder contents to Veeva CLM
3. **Set Entry Point**: Set `index.html` as the presentation entry point
4. **Test**: Verify functionality on iPad device

### Key Features for CLM

- **Touch Optimized**: All interactions work with touch gestures
- **No External Calls**: Completely offline, no internet required
- **Veeva Tracking**: Automatic interaction tracking when in CLM environment
- **Fast Loading**: Minimal file size for quick presentation loading

### Veeva CLM Setup

1. Create new presentation in Veeva CLM admin
2. Upload `index.html`, `app.js`, and `styles/app.css`
3. Set presentation settings:
   - Orientation: Landscape or Portrait (responsive)
   - Device: iPad
   - Offline: Yes

### Interaction Tracking

The app automatically tracks:
- State selections
- Coverage information views
- Button interactions
- Time spent viewing each state

## Development

### Local Development

```bash
# Install dependencies (for development only)
npm install

# Start local server
npm start

# Or use Python server
npm run serve
```

### Testing

- Test on actual iPad device for best results
- Verify touch interactions work properly
- Check responsive design at different orientations
- Validate in Veeva CLM environment

### Customization

#### Adding New States or Data

Edit the `payerData` object in `app.js`:

```javascript
const payerData = {
  'STATE_CODE': {
    name: 'State Name',
    coverage: 85, // Percentage
    payers: ['Payer 1', 'Payer 2']
  }
};
```

#### Modifying Coverage Thresholds

Update the coverage classification logic in `showStateData()`:

```javascript
const coverageClass = stateInfo.coverage >= 85 ? 'high' : 
                     stateInfo.coverage >= 75 ? 'medium' : 'low';
```

#### Styling Changes

All visual styling is in `styles/app.css`. Key areas:
- Colors: Update coverage legend colors
- Layout: Modify responsive breakpoints
- Typography: Change fonts and sizes

## Browser Support

- Safari (iPad) - Primary target
- Chrome (for development)
- Modern browsers with SVG support

## Performance Optimization

- SVG map optimized for touch interaction
- CSS animations use hardware acceleration
- Minimal DOM manipulation for smooth performance
- Image assets optimized for retina displays

## Compliance & Validation

- Follows Veeva CLM best practices
- Compliant with pharmaceutical industry standards
- No external data collection
- Privacy-focused design

## Troubleshooting

### Common Issues

1. **Touch not working**: Ensure `-webkit-touch-callout: none` is properly set
2. **Map not responsive**: Check viewport meta tag is present
3. **Veeva tracking not working**: Verify CLM environment detection
4. **Slow performance**: Reduce SVG complexity or optimize CSS animations

### Support

For technical support or feature requests, contact the development team.

## Version History

- **v1.0.0**: Initial release with full state coverage map
- Optimized for Veeva CLM and iPad
- Complete payer data for all 50 states

## License

MIT License - Internal use for pharmaceutical presentations.