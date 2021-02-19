import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { split, HttpLink } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'
import Navbar from '../components/Navbar'
let token
if (typeof window !== 'undefined') {
  token = localStorage.getItem('token')
}

const httpLink = new HttpLink({
  uri: 'http://localhost:9999',
  headers: {
    authorization: `${token}`,
  },
})
const wsLink = process.browser
  ? new WebSocketLink({
      uri: 'ws://localhost:9999',
      options: { reconnect: true },
    })
  : null

const link = process.browser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query)
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        )
      },
      wsLink,
      httpLink
    )
  : httpLink

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

const myApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
export default myApp
