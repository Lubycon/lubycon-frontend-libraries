import { IconType } from '../models';

export async function fetchIcon(name: string) {
  const response = await fetch(getIconUrl(name));
  const body = await response.text();
  if (response.ok) {
    return body;
  } else {
    throw new Error(body);
  }
}

export const getIconType = (iconName: string, iconType: IconType) => {
  if (iconName === 'logo-apple-ar') {
    return 'outline';
  } else {
    return /^logo-.+/.test(iconName) ? 'filled' : iconType;
  }
};

export function getIconName(name: string, type: IconType) {
  if (name === 'logo-apple-ar') {
    return name;
  }

  return type === 'filled' ? name : `${name}-${type}`;
}

export function getIconUrl(name: string) {
  return `https://icons.lubycon.io/${name}.svg`;
}
