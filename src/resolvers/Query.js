async function feed(parent, args, context, info) {
  const { limit, offset } = args;

  const links = await context.prisma.link.findMany({
    skip: offset,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    links,
  };
}

async function info(parent, args, context, info) {
  return "Its Running!!";
}

async function me(parent, args, context, info) {
  const { userId } = context;

  if (!userId) return null;

  return context.prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}

module.exports = {
  feed,
  info,
  me,
};
