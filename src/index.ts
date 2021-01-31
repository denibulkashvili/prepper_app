import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import { ChaptersResolver } from './chapters'

createConnection()
  .then(async _conn => {
    const app = express()
    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [ChaptersResolver],
        validate: false,
      }),
    })

    apolloServer.applyMiddleware({ app })

    // TODO: PORT should come from env
    const PORT = 3000
    app.listen(PORT, () => {
      console.log(`🚀 Server started on port ${PORT}`)
    })
  })
  .catch(error => console.log(error))
