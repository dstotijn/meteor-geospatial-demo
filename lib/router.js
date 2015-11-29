FlowRouter.route('/', {
  name: 'restaurants',
  action: function () {
    BlazeLayout.render('defaultLayout', {content: 'restaurants'});
  }
});

