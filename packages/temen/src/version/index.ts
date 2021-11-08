export type SemanticVersion = `${number}.${number}.${number}`;

type SemanticVersionField = 'major' | 'minor' | 'patch';
export type ParsedSemanticVersion = Record<SemanticVersionField, number>;

/**
 * 시맨틱 버전을 major, minor, patch 키를 가진 객체로 파싱합니다.
 *
 * @example
 * parseSemanticVersion('1.2.3'); // { major: 1, minor: 2, patch: 3 }
 */
export function parseSemanticVersion(semver: SemanticVersion): ParsedSemanticVersion {
  const [major, minor, patch] = semver.split('.');
  return {
    major: Number(major),
    minor: Number(minor),
    patch: Number(patch),
  };
}

/**
 * 인자로 주어진 major, minor, patch 버전을 'major.minor.patch'의 시맨틱 버전 형태의 문자열로 변환합니다.
 *
 * @example
 * stringifySemanticVersion({ major: 1, minor: 2, patch: 3 }); // 1.2.3
 */
export function stringifySemanticVersion({
  major,
  minor,
  patch,
}: ParsedSemanticVersion): SemanticVersion {
  return `${major}.${minor}.${patch}`;
}

/**
 * versionA와 versionB를 비교하여, versionA가 더 높다면 1, 같다면 0, 더 낮다면 -1을 반환합니다.
 *
 * @example
 * compareVersion('1.1.1', '1.0.0'); // 1
 * compareVersion('1.1.1', '1.1.1'); // 0
 * compareVersion('1.1.1', '1.2.1'); // -1
 */
export function compareSemanticVersion(versionA: SemanticVersion, versionB: SemanticVersion) {
  const compared = versionA.localeCompare(versionB, undefined, { numeric: true });
  if (compared > 0) {
    return 1;
  } else if (compared < 0) {
    return -1;
  } else {
    return 0;
  }
}

/**
 * 인자로 주어진 versionA가 versionB보다 더 높은 버전인지 확인합니다.
 *
 * @example
 * isGreaterSemanticVersion('1.12.1', '1.0.1'); // true
 */
export function isGreaterSemanticVersion(versionA: SemanticVersion, versionB: SemanticVersion) {
  return compareSemanticVersion(versionA, versionB) === 1;
}

/**
 * 인자로 주어진 versionA가 versionB보다 더 낮은 버전인지 확인합니다.
 *
 * @example
 * isLessSemanticVersion('1.0.1', '1.1.1'); // true
 */
export function isLessSemanticVersion(versionA: SemanticVersion, versionB: SemanticVersion) {
  return compareSemanticVersion(versionA, versionB) === -1;
}

/**
 * 인자로 주어진 versionA와 versionB가 같은 버전인지 확인합니다.
 * @example
 * isSameSemanticVersion('1.0.1', '1.0.1'); // true
 */
export function isSameSemanticVersion(versionA: SemanticVersion, versionB: SemanticVersion) {
  return compareSemanticVersion(versionA, versionB) === 0;
}

/**
 * 인자로 주어진 시맨틱 버전에서 메이저 업데이트한 시맨틱 버전을 반환합니다.
 *
 * @example
 * updateMajorSemanticVersion('1.1.1'); // 2.0.0
 */
export function updateMajorSemanticVersion(version: SemanticVersion): SemanticVersion {
  const { major } = parseSemanticVersion(version);
  return `${major + 1}.0.0`;
}

/**
 * 인자로 주어진 시맨틱 버전에서 마이너 업데이트한 시맨틱 버전을 반환합니다.
 *
 * @example
 * updateMinorSemanticVersion('1.0.0'); // 1.1.0
 */
export function updateMinorSemanticVersion(version: SemanticVersion): SemanticVersion {
  const { major, minor } = parseSemanticVersion(version);
  return `${major}.${minor + 1}.0`;
}

/**
 * 인자로 주어진 시맨틱 버전에서 패치 업데이트한 시맨틱 버전을 반환합니다.
 *
 * @example
 * updatePatchSemanticVersion('1.0.0'); // 1.0.1
 */
export function updatePatchSemanticVersion(version: SemanticVersion): SemanticVersion {
  const { major, minor, patch } = parseSemanticVersion(version);
  return `${major}.${minor}.${patch + 1}`;
}

/**
 * field 인자에 주어진 버전 필드를 한 버전만 업데이트 합니다.
 *
 * @example
 * updateSemanticVersion('1.12.1', 'minor'); // 1.13.0
 */
export function updateSemanticVersion(
  version: SemanticVersion,
  field: 'major' | 'minor' | 'patch'
): SemanticVersion {
  switch (field) {
    case 'major':
      return updateMajorSemanticVersion(version);
    case 'minor':
      return updateMinorSemanticVersion(version);
    case 'patch':
      return updatePatchSemanticVersion(version);
  }
}
