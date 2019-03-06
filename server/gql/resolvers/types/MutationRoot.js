const bob = async (parent, args, ctx, info) => {
  return "saunders";
};

module.exports = {
  MutationRoot: {
    bob
  }
};
