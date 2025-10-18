export default {
  routes: [
    {
      method: 'POST',
      path: '/form-submissions/public',
      handler: 'form-submission.createPublic',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};

