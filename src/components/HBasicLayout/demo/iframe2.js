export default () => {
  const src = `http://${window.location.host}/#/hbasicLayout/setting`;
  return (
    <div>
      <iframe
        title="setting"
        src={src}
        width="100%"
        style={{ height: '500px' }}
        frameBorder="0"
      />
      <a href={src}>查看</a>
    </div>
  );
};
