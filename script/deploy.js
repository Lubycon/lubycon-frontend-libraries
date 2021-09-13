const ghpages = require('gh-pages');
const path = require('path');
const fs = require('fs');
const token = process.env.ACCESS_TOKEN;
const subdomain = 'fe-lib';

fs.renameSync(path.resolve(`./CNAME.live`), path.resolve('./docs/CNAME'));

ghpages.publish(
  path.join(__dirname, '../docs'),
  {
    branch: 'main',
    remote: 'origin',
    repo: `https://${token}@github.com/Lubycon/${subdomain}.lubycon.io.git`,
    message: '루비콘 라이브러리 문서 배포',
  },
  (err) => {
    if (err) {
      throw err;
    } else {
      console.log(`🚀  루비콘 라이브러리 문서 배포가 완료되었습니다!`);
    }
  }
);
