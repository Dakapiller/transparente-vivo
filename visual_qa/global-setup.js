const fs = require('fs');
const path = require('path');

module.exports = async function globalSetup() {
  const reportsDir = path.join(__dirname, 'reports');
  if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });
  // Reset accumulated results once at the start of each full test run
  fs.writeFileSync(path.join(reportsDir, '_results.json'), '[]');
};
