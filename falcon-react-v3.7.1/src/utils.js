export function getUrl(site) {
  const reg = /^https?:\/\/|\/+$/g;

  return (site).replace(reg, '');
}