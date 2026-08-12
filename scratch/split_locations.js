const fs = require('fs');
const path = require('path');

const contentPath = path.join(__dirname, '../src/data/content.json');
const locationsPath = path.join(__dirname, '../src/data/locations.json');

const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));

if (content.locationsData) {
  // Save locationsData into locations.json
  fs.writeFileSync(locationsPath, JSON.stringify(content.locationsData, null, 2), 'utf8');
  console.log('Saved locationsData to src/data/locations.json');

  // Remove locationsData from content.json
  delete content.locationsData;
  fs.writeFileSync(contentPath, JSON.stringify(content, null, 2), 'utf8');
  console.log('Cleaned up src/data/content.json successfully!');
} else {
  console.log('No locationsData found in content.json');
}
