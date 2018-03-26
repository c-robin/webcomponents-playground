exports.config = {
  namespace: 'mycomponent',
  generateDistribution: true,
  bundles: [
    { components: ['calendar-overview'] }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
