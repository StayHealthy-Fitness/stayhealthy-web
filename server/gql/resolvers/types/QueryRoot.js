const hello = async (parent, args, ctx, info) => {
  return "world";
};

module.exports = {
  QueryRoot: {
    hello
  }
};
