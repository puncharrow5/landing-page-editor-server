import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { NoSchemaIntrospectionCustomRule, ValidationRule } from 'graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloServerPlugin } from '@apollo/server';
import * as depthLimit from 'graphql-depth-limit';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  createGqlOptions(): ApolloDriverConfig {
    let csrfPrevention = true;
    const plugins: ApolloServerPlugin<any>[] = [];
    const validationRules: ValidationRule[] = [];

    if (process.env.NODE_ENV === 'dev') {
      csrfPrevention = false;
      plugins.push(
        ApolloServerPluginLandingPageLocalDefault({
          footer: false,
          includeCookies: true,
        }),
      );
    } else {
      validationRules.push(NoSchemaIntrospectionCustomRule, depthLimit(10));
    }

    return {
      driver: ApolloDriver,
      path: '/graphql',
      autoSchemaFile: './schema.graphql',
      playground: false,
      fieldResolverEnhancers: ['guards'],
      csrfPrevention,
      plugins,
      validationRules,
      context: ({ req, res }) => ({ req, res }),
    };
  }
}
