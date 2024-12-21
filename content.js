const hostname = location.hostname;
const id = hostname === 'editor.swagger.io' ? 'swagger-editor' : 'swagger-ui';
const swaggerElement = document.getElementById(id);

const getHostByUrl = url => {
  const a = document.createElement('a');
  a.href = url;

  return a.host;
};

const main = selectElement => {
  const currentHost = window.location.host;
  const selectUrls = [...selectElement.options].map(({ value }) => value);
  const value = selectUrls.find(url => getHostByUrl(url) === currentHost);

  if (value) {
    const customEvent = new CustomEvent('change', { bubbles: true });
    selectElement.value = value;

    selectElement.dispatchEvent(customEvent);
  }
};

const init = () => {
  const mutationObserver = new MutationObserver(() => {
    const selectElement = document.querySelector('.servers select');

    if (selectElement) {
      main(selectElement);
      mutationObserver.disconnect();
    }
  });

  mutationObserver.observe(swaggerElement, { childList: true, subtree: true });
};

if (swaggerElement) {
  init();
}
