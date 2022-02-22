import { gql, useQuery } from '@apollo/client';

const GET_NEW_POST_SUBS = gql`
  subscription {
    newLink {
      id
      description
      url
      votes {
        user {
          name
        }
      }
      postedBy {
        name
      }
    }
  }
`;

const GET_POST_QUERY = gql`
  query allFeeds($limit: Int, $offset: Int) {
    feed(limit: $limit, offset: $offset) {
      links {
        id
        description
        url
        votes {
          user {
            name
          }
        }
        postedBy {
          name
        }
      }
    }
  }
`;

const GET_VOTE_SUBS = gql`
  subscription {
    newVote {
      id
      link {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

const Post = () => {
  const { data, networkStatus, error, subscribeToMore } = useQuery(
    GET_POST_QUERY,
    {
      variables: {
        limit: 20,
        offset: 0,
      },
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true,
    }
  );

  subscribeToMore({
    document: GET_NEW_POST_SUBS,
    updateQuery: (prev: any, { subscriptionData }: any) => {
      if (!subscriptionData.data) return prev;
      const newLink = subscriptionData.data.newLink;
      const exists = prev.feed.links.find((l: any) => l.id === newLink.id);
      if (exists) return prev;
      return {
        ...prev,
        feed: {
          links: [newLink, ...prev.feed.links],
        },
      };
    },
  });

  subscribeToMore({
    document: GET_VOTE_SUBS,
  });

  if (error) return <p>Error :(</p>;

  const feeds = data?.feed?.links || [];
  const isLoading = networkStatus === 1;

  return (
    <div>
      Post
      {isLoading && <p>Loading...</p>}
      {/* Query Post */}
      {feeds?.map((post: any) => {
        return (
          <div
            key={post.id}
            className='p-10 mb-10 w-80 h-80 bg-gray-600 text-white rounded-md'
          >
            <p>{post.description}</p>
            <p>Posted by: {post.postedBy.name}</p>
            <p>Votes: {post.votes.length}</p>
            <p>
              {post.votes.map((vote: any) => {
                return <strong key={vote.id}>Vote by: {vote.user.name}</strong>;
              })}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Post;
