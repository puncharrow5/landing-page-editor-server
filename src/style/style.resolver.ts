import { Resolver } from '@nestjs/graphql';
import { StyleService } from './style.service';

@Resolver()
export class StyleResolver {
  constructor(private readonly styleService: StyleService) {}
}
