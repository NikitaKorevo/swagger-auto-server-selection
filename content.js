const swaggerUIElement = document.getElementById('swagger-ui');

const getHostByUrl = url => {
  const a = document.createElement('a');
  a.href = url;

  return a.host;
};

const main = () => {
  const selectElement = document.getElementById('servers');
  const currentHost = window.location.host;
  const selectUrls = [...selectElement.options].map(({ value }) => value);
  const value = selectUrls.find(url => getHostByUrl(url) === currentHost);

  if (value) {
    const customEvent = new CustomEvent('change', { bubbles: true });
    selectElement.value = value;

    selectElement.dispatchEvent(customEvent);
  }
};

if (swaggerUIElement) {
  setTimeout(() => {
    main();
  }, 4000);
}
