# @lubycon/logger

## Installation

```bash
$ yarn add @lubycon/logger
```

데이터 로깅을 편하게 할 수 있는 패키지. [Firebase](https://firebase.google.com/)/[Google Analytics](https://analytics.google.com/analytics/web/) 통합 버전과 [Amplitude](https://amplitude.com/)를 선택하여 사용할 수 있습니다.

```js
import { logger } from '@lubycon/logger';

logger.init({
  services: {
    firebase: {
      apiKey: '',
      authDomain: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId: '',
      measurementId: '',
    },
    amplitude: 'AMPLITUDE_APP_KEY',
  },
});
```

초기화 시 `firebase` 설정 값이나 `amplitude` 앱 키를 입력하면 해당하는 서비스의 SDK를 초기화합니다.

이후 `logger`가 제공하는 메소드를 사용하여 이벤트 로깅을 하시면 됩니다.

```js
const myLogger = logger.getPageLogger('화면 이름');

logger.view(); // 뷰 이벤트
logger.click('click_button'); // 클릭 이벤트
logger.impression('impression_profile'); // 노출 이벤트
logger.event('custom_event_name', 'event_type'); // 커스텀 이벤트 타입
```
