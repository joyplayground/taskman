import bridge from './bridge';

bridge
  .request('store', 'initDB')
  .then(res => {
    console.log('success', res);
  })
  .catch(res => {
    console.log('fail', res);
  });
