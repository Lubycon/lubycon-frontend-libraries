<p align="center">
  <img width="150" src="https://assets.lubycon.io/logo/symbol-color.svg" alt="Lubycon logo">
</p>

<h1 align="center">Lubycon Frontend Libraries</h1>

루비콘에서 사용하는 모든 프론트엔드 라이브러리가 모여있는 모노레포지토리입니다.
루비콘에 소속된 누구나 자유롭게 자신만의 라이브러리를 편하게 만들어 보실 수 있도록 Rollup을 사용한 빌드 설정 및 CI/CD까지 모두 세팅되어있습니다.

## Resources

- [Documentation](https://fe-lib.lubycon.io/)
- [Temen Changelog](https://github.com/Lubycon/lubycon-frontend-libraries/blob/main/packages/temen/CHANGELOG.md)
- [React Changelog](https://github.com/Lubycon/lubycon-frontend-libraries/blob/main/packages/react/CHANGELOG.md)
- [Logger Changelog](https://github.com/Lubycon/lubycon-frontend-libraries/blob/main/packages/logger/CHANGELOG.md)
- [Borwser-toolkit Changelog](https://github.com/Lubycon/lubycon-frontend-libraries/blob/main/packages/browser-toolkit/CHANGELOG.md)

## Installation

```sh
$ git clone https://github.com/Lubycon/lubycon-frontend-libraries.git
$ cd lubycon-frontend-libraries
$ yarn
```

## Add new Package

```sh
$ yarn new-package
? 패키지 이름을 입력해주세요. › temen
? 패키지 설명을 입력해주세요. › 테슬라 떡상 기원을 외치는 라이브러리입니다.

Loaded templates: _templates
  added: packages/temen/src/index.ts
  added: packages/temen/package.json
  added: packages/temen/README.md
  added: packages/temen/rollup.config.js
  added: packages/temen/.vscode/settings.json
  added: packages/temen/tsconfig.json
Done.
```
