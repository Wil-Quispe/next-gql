import { gql, useSubscription } from '@apollo/client'

const AUTHOR_SUBS = gql`
  subscription {
    author {
      mutation
      data {
        name
      }
    }
  }
`

const subscription = () => {
  const { data, error } = useSubscription(AUTHOR_SUBS)
  console.log(data)
  return (
    <div>
      {data && (
        <div>
          <div>mutation: {data.author.mutation}</div>
          <div>name: {data.author.data.name}</div>
        </div>
      )}
    </div>
  )
}

export default subscription
