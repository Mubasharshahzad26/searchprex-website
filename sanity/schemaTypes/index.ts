import { type SchemaTypeDefinition } from 'sanity'

import homePage from './homePage'
import blogPost from './blogPost'
import caseStudy from './caseStudy'
import pricingPlan from './pricingPlan'
import review from './review'
import teamMember from './teamMember'
import seo from './seo'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    homePage,
    blogPost,
    caseStudy,
    pricingPlan,
    review,
    teamMember,
    seo,
  ],
}